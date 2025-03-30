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
import { deleteEvent, downloadCSV, downloadPDF } from "../../Helpers/arewahub/api";
import toast from "react-hot-toast";

function MembersCard({ memberData, loading, showFilter, showMenuList, showSearch, text, showPagination }) {
  const navigate = useNavigate();
  const [filterValue, setFilterValue] = useState();
  const productFilter = [
    {
      name: "All",
      slug: "all",
    },
    {
      name: "Successful",
      slug: "successful",
    },
    {
      name: "Failed",
      slug: "failed",
    },
    {
      name: "Pending",
      slug: "pending",
    },
  ];
  const [activeCard, setActiveCard] = useState(productFilter[0]?.slug);
  const handleFilterChange = (value) => {
    setActiveCard(value);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Calculate the total number of pages
  const totalPages = Math.ceil((memberData?.length || 0) / itemsPerPage);

  // Get the current page's data
  const currentData = memberData?.slice(
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


  const [downloadingPDF, setDownloadingPDF] = useState(false);
  const handleDownLoadPdf = async () => {
    if (downloadingPDF) {
      return;
    }
    const confirm = window.confirm(`Are you sure you want to download this data as pdf`);
    if (confirm) {
      try {
        setDownloadingPDF(true);
        console.log('handleDownLoadPdf')
        const res = await downloadPDF();
        if (res.success) {
          toast.success(res.data);
          //window.location.reload();
        }
        } catch (error) {
            toast.error(res.data);
        } finally {
            setDownloadingPDF(false);
        }
    }
  };

  const [downloadingCSV, setDownloadingCSV] = useState(false);
  const handleDownLoadCsv = async () => {
    if (downloadingCSV) {
      return;
    }
    const confirm = window.confirm(`Are you sure you want to download this data as csv`);
    if (confirm) {
      try {
        setDownloadingCSV(true);
        const res = await downloadCSV();
        if (res.success) {
          toast.success(res.data);
          //window.location.reload();
        } else {
          toast.error(res.data);
        }
      } catch (error) {
      } finally {
        setDownloadingCSV(false);
      }
    }
  };

  const [searchTerm, setSearchTerm] = useState("");

  // Filter the data based on search term
  const filteredData = currentData?.filter((item) => {
    return (
      item?.firstName?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      item?.lastName?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      item?.email?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      item?.userId?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      item?.location?.toLowerCase().includes(searchTerm?.toLowerCase())
    );
  });

  return (
    <div className="p">
      {showMenuList && (
        <MenuList
          data={productFilter}
          activeCard={activeCard}
          onCLick={handleFilterChange}
          activeStyle={`!text-arewahub-main-color !border-arewahub-main-color`}
        />
      )}

      <div className="px-4 py-5 rounded-t-[12px] border-[1px] border-white bg-white shadow-sm">
        {/**TOP */}
        <div className="w-full flex items-center gap-[50px]">
          <div className="flex items-center min-w-[140px]">
            <h2 className="text-lg font-semibold text-[#121212] w-full">
              {text ? text : `${filteredData?.length} Events`}
            </h2>
          </div>

          <div className="flex w-full items-center justify-between">
            {/**Search */}
            {showSearch && (
              <div className="flex gap-[6px] w-[320px] items-center rounded-[8px] px-[14px] bg-white border-gray-300 border-[1px]">
                <span className="cursor-pointer flex items-center justify-center w-5 h-5">
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 21L17.5001 17.5M20 11.5C20 16.1944 16.1944 20 11.5 20C6.80558 20 3 16.1944 3 11.5C3 6.80558 6.80558 3 11.5 3C16.1944 3 20 6.80558 20 11.5Z"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search"
                  className="input !border-none"
                />
              </div>
            )}

            <div className="flex items-center gap-5">
              {/**Filter */}
              {showFilter && (
                <div className="">
                  <Filter filterValue={filterValue} setFilterValue={setFilterValue} />
                </div>
              )}
              {/**
               * 
              <div onClick={handleNewProduct} className="">
                <Button text={"+ Add Event"} style={`!border-none !bg-arewahub-main-color min-w-[174px]`} />
              </div>
               */}
                <div onClick={handleDownLoadPdf} className="">
                <Button text={"Download PDF"} style={`!border-none !bg-arewahub-main-color min-w-[174px]`} />
              </div>
              <div onClick={handleDownLoadCsv} className="">
                <Button text={"Download CSV"} style={`!border-none !bg-arewahub-main-color min-w-[174px]`} />
              </div>
            </div>
          </div>
        </div>

        {/**BODY */}
        {/* Render the current data here */}
        <table className="min-w-full mt-12 rounded-t-[12px] bg-white">
          <thead className="rounded-t-[12px]">
            <tr className="bg-[#F9F9F9] border-b-[1px] rounded-t-[12px]">
              <th className="px-6 py-3 text-left text-gray-600 font-normal text-sm tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-normal text-sm tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-normal text-sm tracking-wider">
                User ID
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-normal text-sm tracking-wider">
                Type of Craft, Level
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-normal text-sm tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-normal text-sm tracking-wider">
                Date & Time
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <div className="flex items-center justify-center w-full">
                <Spinner />
              </div>
            ) : (
              filteredData?.map((item) => {
                const { formattedDate, formattedTime } = formatDateAndTime(item?.createdAt);
                return (
                  <tr key={item?._id} className="border-t border-gray-200">
                    {/* user name */}
                    <td className="px-6 py-4">
                      <div className="font-normal text=-[14px] text-[#06152B]">{`${item?.firstName} ${item.lastName}`}</div>
                    </td>
                    {/** user contact */}
                    <td className="px-6 py-4">
                      <div className="text-[14px] font-normal text-[#121212]">{item?.mobileNumber}</div>
                      <div className="text-[13px] font-normal text-[#121212]">{`${truncateText(item?.email, 2)}@gmail.com`}</div>
                    </td>
                    {/**user id */}
                    <td className="px-6 py-4">
                      <div className="text-[14px] font-normal text-[#13693B]">{item?.userId}</div>
                    </td>
                    {/* user craft and expertise level */}
                    <td className="px-6 py-4">
                      <div className="text-[14px] font-normal text-[#121212] flex-col">{item?.craftType}</div>
                      <div className="text-[13px] font-normal text-[#121212] flex-col">{item?.experienceLevel}</div>
                    </td>
                    {/* user location */}
                    <td className="px-6 py-4 text-[14px] text-[#121212] font-normal">{item.location}</td>
                    <td className="px-6 py-4">
                      <div className="relative cursor-pointer flex items-start justify-between gap-2 group">
                        <div className="flex flex-col gap-[6px]">
                          <p className="text-[13px] font-normal text-[#121212]">{formattedDate}</p>
                          <p className="text-[13px] font-normal text-[#717171]">{formattedTime}</p>
                        </div>

                        <div>
                          <FiMoreVertical />
                        </div>

                        {/* MODAL POPUP, visible only on hover */}
                        <div className="absolute z-50 top-8 right-0 flex flex-col gap-3 bg-white border-[1px] border-gray-200 shadow-lg rounded-[8px] p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-[170px]">
                          <Link
                            to={`/arewahub/view-member/${item?._id}`}
                            className="flex items-center gap-3 text-sm text-primary-color"
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {showPagination && (
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
                  d="M19 12H5M5 12L9 8M5 12L9 16"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            Prev
          </button>

          <div className="flex gap-2">{renderPagination()}</div>

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
                  d="M5 12H19M19 12L15 8M19 12L15 16"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

export default MembersCard;
