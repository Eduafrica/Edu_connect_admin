import { useState } from "react";
import { menuOption } from "../../Data/menu";
import MenuList from "../Helpers/MenuList";
import Filter from "../Helpers/Filter";
import { formatDateAndTime } from "../../Helpers/formatDateAndTime";
import { Link, useNavigate } from "react-router-dom";
import { FiMoreVertical } from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import Spinner from "../Helpers/Spinner";
import { truncateText } from "../../Helpers/truncateText";
import Button from "../Helpers/Button";

function OrderCard({ orderData, loading, showFilter, showMenuList, showSearch, text, showPagination }) {
  const navigate = useNavigate();
  const [filterValue, setFilterValue] = useState();
  const productFilter = [
    {
      name: 'All',
      slug: 'all'
    },
    {
      name: 'Successful',
      slug: 'successful'
    },
    {
      name: 'Not Paid',
      slug: 'notpaid'
    },
    {
      name: 'Pending',
      slug: 'pending'
    }
  ];

  const [activeCard, setActiveCard] = useState(productFilter[0]?.slug);

  const handleFilterChange = (value) => {
    setActiveCard(value);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Calculate the total number of pages
  const totalPages = Math.ceil((orderData?.length || 0) / itemsPerPage);

  // Get the current page's data
  const currentData = orderData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle changing to the next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle changing to the previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to generate static pagination numbers
  const renderPagination = () => {
    if (totalPages <= 6) {
      // Display all pages if there are 6 or fewer
      return Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => setCurrentPage(i + 1)}
          className={`px-3 py-1 border rounded ${
            currentPage === i + 1 ? "bg-gray-300" : "bg-white"
          }`}
        >
          {i + 1}
        </button>
      ));
    } else {
      // Display 1, 2, 3, ..., last 3 pages when total pages > 6
      const startPages = [1, 2, 3];
      const endPages = [totalPages - 2, totalPages - 1, totalPages];

      return (
        <>
          {startPages.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 border rounded ${
                currentPage === page ? "bg-gray-300" : "bg-white"
              }`}
            >
              {page}
            </button>
          ))}
          <span className="px-2">...</span>
          {endPages.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 border rounded ${
                currentPage === page ? "bg-gray-300" : "bg-white"
              }`}
            >
              {page}
            </button>
          ))}
        </>
      );
    }
  };

  const handleNewProduct = () => {
    navigate('/arewahub/new-product/noid');
  };

  const [searchTerm, setSearchTerm] = useState("");

  // Filter orders based on search term
  const filteredData = currentData?.filter((item) => {
    return (
      item?.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.orderId.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Apply product filter based on the active filter selection
  const filteredByStatus = filteredData?.filter((item) => {
    if (activeCard === 'all') {
      return true; // Show all items
    }
    if (activeCard === 'successful' && item?.status === 'Approved') {
      return true;
    }
    if (activeCard === 'notpaid' && item?.paid === false) {
      return true;
    }
    if (activeCard === 'pending' && item?.status === 'Pending') {
      return true;
    }
    return false;
  });

  return (
    <div className="p">
      {
        showMenuList && (
          <MenuList
            data={productFilter}
            activeCard={activeCard}
            onCLick={handleFilterChange}
            activeStyle={`!text-arewahub-main-color !border-arewahub-main-color`}
          />
        )
      }

      <div className="px-4 py-5 rounded-t-[12px] border-[1px] border-white bg-white shadow-sm">
        {/**TOP */}
        <div className="w-full flex items-center gap-[50px]">
          <div className="flex items-center min-w-[140px]">
            <h2 className="text-lg font-semibold text-[#121212] w-full">{text ? text : `${filteredByStatus?.length} Order`}</h2>
          </div>

          <div className="flex w-full items-center justify-between">
            {/**Search */}
            {
              showSearch && (
                <div className="flex gap-[6px] w-[320px] items-center rounded-[8px] px-[14px] bg-white border-gray-300 border-[1px]">
                  <span className="cursor-pointer flex items-center justify-center w-5 h-5">
                    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 21L17.5001 17.5M20 11.5C20 16.1944 16.1944 20 11.5 20C6.80558 20 3 16.1944 3 11.5C3 6.80558 6.80558 3 11.5 3C16.1944 3 20 6.80558 20 11.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                  <input 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    placeholder="Search" 
                    className="input !border-none" 
                    value={searchTerm} 
                  />
                </div>
              )
            }

            <div className="flex items-center gap-5">
              {/**Filter */}
              {
                showFilter && (
                  <div className="">
                    <Filter filterValue={filterValue} setFilterValue={setFilterValue} />
                  </div>
                )
              }
            </div>
          </div>
        </div>

        {/**BODY */}
        {/* Render the filtered data here */}
        <table className="min-w-full mt-12 rounded-t-[12px] bg-white">
          <thead className="rounded-t-[12px]">
            <tr className="bg-[#F9F9F9] border-b-[1px] rounded-t-[12px]">
              <th className="px-6 py-3 text-left text-gray-600 font-normal text-[12px] tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-gray-600 font-normal text-[12px] tracking-wider">Phone number</th>
              <th className="px-6 py-3 text-left text-gray-600 font-normal text-[12px] tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-gray-600 font-normal text-[12px] tracking-wider">Email address</th>
              <th className="px-6 py-3 text-left text-gray-600 font-normal text-[12px] tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-gray-600 font-normal text-[12px] tracking-wider">Date & Time</th>
              <th className="px-6 py-3 text-left text-gray-600 font-normal text-[12px] tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {
              loading ? (
                <div className="flex items-center justify-center w-full">
                  <Spinner />
                </div>
              ) :
              filteredByStatus?.map((item) => {
                const { formattedDate, formattedTime } = formatDateAndTime(
                  item?.createdAt
                );
                return (
                  <tr key={item?._id} className="border-t border-gray-200">
                    {/* product name */}
                    <td className="px-6 py-4">
                      <div className="font-normal text=-[14px] text-[#364152]">
                        {item?.customerName}
                      </div>
                    </td>
                    {/** product Id */}
                    <td className="px-6 py-4">
                      <div className="text-[14px] font-normal text-gray-600">
                        {item?.phoneNumber}
                      </div>
                    </td>
                    {/* product description */}
                    <td className="px-6 py-4" >
                      {item?.orderId}
                    </td>
                    {/* pasition */}
                    <td className="px-6 py-4">
                      <div className="text-[14px] font-normal text-gray-600 flex-col">
                        {item?.customerEmail}
                      </div>
                    </td>
                    {/* Amount */}
                    <td className="px-6 py-4">
                      <div className="text-[14px] font-normal text-gray-600 flex-col">
                        ₦{item?.amount.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 text-start py-4 text-[13px] text-[#121212] font-normal">
                      <p className="text-[13px] font-normal text-[#121212]">
                        {formattedDate}
                      </p>
                      <p className="text-[13px] font-normal text-[#717171]">
                        {formattedTime}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative cursor-pointer flex items-start justify-between gap-2 group">
                        <div
                          className={`py-[5px] px-[10px] rounded-[100px] ${
                            item?.paid === false
                              ? "bg-[#D8E0E5] text-[#585858]" // Pending style
                              : item?.status === 'Approved'
                              ? "bg-[#05A75312] text-[#05A753]" // Successful style
                              : item?.status === 'Pending'
                              ? "bg-[#FCB90B12] text-[#FCB90B]"
                              : "bg-[#D8E0E5] text-[#585858]" // Inactive or other status style
                          }`}
                        >
                          { !item?.paid ? 'Not paid' : item?.status}
                        </div>

                        <div>
                          <FiMoreVertical />
                        </div>

                        {/* MODAL POPUP, visible only on hover */}
                        <div className="absolute z-50 top-8 flex flex-col gap-3 bg-white border-[1px] border-gray-200 shadow-lg rounded-[8px] p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-[170px]">
                          <Link
                            to={`/arewahub/order/info/${item?._id}`}
                            className="text-xs text-gray-600"
                          >
                            <div className="flex gap-2 items-center">
                              <MdOutlineRemoveRedEye />
                              <p className="font-medium text-[13px]">View details</p>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>

      {/**Pagination */}
      {
        showPagination && (
          <div className="px-6 py-3 flex justify-between items-center">
            <div>
              <button
                onClick={handlePreviousPage}
                className="px-3 py-1 border rounded bg-white"
              >
                Previous
              </button>
            </div>

            <div className="flex gap-2 items-center justify-between">
              {renderPagination()}
            </div>

            <div>
              <button
                onClick={handleNextPage}
                className="px-3 py-1 border rounded bg-white"
              >
                Next
              </button>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default OrderCard;
