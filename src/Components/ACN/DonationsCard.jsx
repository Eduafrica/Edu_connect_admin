import { useState } from "react";
import { menuOption } from "../../Data/menu";
import MenuList from "../Helpers/MenuList";
import Filter from "../Helpers/Filter";
import { formatDateAndTime } from "../../Helpers/formatDateAndTime";
import { Link } from "react-router-dom";
import Spinner from "../Helpers/Spinner";

function DonationsCard({ donationData, loading, showFilter, showMenuList, showSearch, text, showPagination }) {
  const data = menuOption;
  const [ filterValue, setFilterValue ] = useState()
  const [activeCard, setActiveCard] = useState(data[0].slug);

  const handleCardChange = (value) => {
    setActiveCard(value);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Calculate the total number of pages
  const totalPages = Math.ceil((donationData?.length || 0) / itemsPerPage);

  // Get the current page's data
  const currentData = donationData?.slice(
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
  
  return (
    <div className="p">
      {
        showMenuList && (
          <MenuList
            data={data}
            activeCard={activeCard}
            onCLick={handleCardChange}
          />
        )
      }

      <div className="px-4 py-5 rounded-t-[12px] border-[1px] border-white bg-white shadow-sm">
        {/**TOP */}
        <div className="w-full flex items-center gap-[50px]">
          <div className="flex items-center min-w-[140px] w-full">
            <h2 className="text-lg font-semibold text-[#121212] w-full">{ text ? text : `34 Donations` }</h2>
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
                      <input onChange={''} placeholder="Search" className="input !border-none" />
                    </div>
                  )
                }

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

        {/**BODY */}
        {/* Render the current data here */}
        <table className="min-w-full mt-12 rounded-t-[12px] bg-white">
          <thead className="rounded-t-[12px]">
            <tr className="bg-[#F9F9F9] border-b-[1px] rounded-t-[12px]">
              <th className="px-6 py-3 text-left text-gray-600 font-normal text-sm tracking-wider">
                First Name
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-normal text-sm tracking-wider">
                Last Name
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-normal text-sm tracking-wider">
                Donation ID
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-normal text-sm tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-normal text-sm tracking-wider">
                Phone number
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-normal text-sm tracking-wider">
                Date & Time
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-normal text-sm tracking-wider">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {
              loading ? (
                <div className="flex items-center justify-center w-full m-auto">
                  <Spinner />
                </div>
              ) : 
              currentData?.map((item) => {
                const { formattedDate, formattedTime } = formatDateAndTime(
                  item?.createdAt
                );
                return (
                  <tr key={item?._id} className="border-t border-gray-200">
                    {/* Course Column */}
                    <td className="px-6 py-4 text-[14px] font-normal text-gray-600">
                        {item?.firstName}
                      <div className="font-semibold text=-[14px] text-[#364152]">
                      </div>
                      <div className="text-[14px] font-normal text-gray-600">
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[14px] font-normal text-gray-600">
                        {item?.lastName}
                    </td>
                    {/* Order Amount Column */}
                    <td className="px-6 py-4 text-[14px] font-normal text-gray-600">
                        {item?.donationId}
                    </td>
                    {/* contact details */}
                    <td className="px-6 py-4">
                      <div className="text-[14px] font-normal text-gray-600 flex-col">
                        {item?.email}
                      </div>
                    </td>
                    {/* Image */}
                    <td className="px-6 py-4 text-[14px] font-normal text-gray-600">
                          {item?.phoneNumber}
                    </td>
                    <td className="px-6 text-center py-4 text-[13px] text-[#121212] font-normal">
                      <p className="text-[13px] font-normal text-[#121212]">
                        {formattedDate}
                      </p>
                      <p className="text-[13px] font-normal text-[#717171]">
                        {formattedTime}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-[14px] font-normal text-gray-600 flex gap-4">
                          {item?.amount.toLocaleString()}
                          <Link to={`/acn/donation/info/${item?._id}`} className="text-edu-main-color text-[16px] font-semibold">View</Link>
                      </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        
      </div>

      {/* Pagination Controls */}
      {
        showPagination && (
        <div className="flex items-center justify-between border-t-[1px] border-t-gray-200 py-4 px-6">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="flex items-center justify-center gap-2 px-4 py-2 mr-2 bg-white border-[1px] text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            <span className="flex items-center justify-center w-5 h-5">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 12H5M5 12L12 19M5 12L12 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            Previous
          </button>

          <div className="flex gap-1">{renderPagination()}</div>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center gap-2 px-4 py-2 ml-2 bg-white border-[1px] text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
            <span className="flex items-center justify-center w-5 h-5">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </div>
        )
      }

    </div>
  );
}

export default DonationsCard;
