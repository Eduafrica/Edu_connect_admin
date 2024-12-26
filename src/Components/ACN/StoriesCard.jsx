import { useState } from "react";
import { menuOption } from "../../Data/menu";
import MenuList from "../Helpers/MenuList";
import Filter from "../Helpers/Filter";
import { formatDateAndTime } from "../../Helpers/formatDateAndTime";
import { Link, useNavigate } from "react-router-dom";
import { FiMoreVertical } from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import Spinner from "../Helpers/Spinner";
import Button from "../Helpers/Button";
import { deleteStory } from "../../Helpers/acn/api";
import toast from "react-hot-toast";

function StoriesCard({ newsData, loading, showFilter, showMenuList, showSearch, text, showPagination }) {
  const data = menuOption;
  const navigate = useNavigate();
  const [filterValue, setFilterValue] = useState();
  const [activeCard, setActiveCard] = useState(data[0].slug);
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query

  const handleCardChange = (value) => {
      setActiveCard(value);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Calculate the total number of pages
  const totalPages = Math.ceil((newsData?.length || 0) / itemsPerPage);

  // Get the current page's data
  const currentData = newsData
      ?.filter(item =>
          // Filter newsData based on title, writers, or postId
          item?.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item?.writers.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item?.storyId.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
                  className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-gray-300" : "bg-white"}`}
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
                          className={`px-3 py-1 border rounded ${currentPage === page ? "bg-gray-300" : "bg-white"}`}
                      >
                          {page}
                      </button>
                  ))}
                  <span className="px-2">...</span>
                  {endPages.map((page) => (
                      <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-1 border rounded ${currentPage === page ? "bg-gray-300" : "bg-white"}`}
                      >
                          {page}
                      </button>
                  ))}
              </>
          );
      }
  };


  const colorOptions = [
    { 
        bgColor: '#ECFDF3',
        textColor: '#027A48',
    },
    { 
        bgColor: '#FDF2FA',
        textColor: '#C11574',
    },
    { 
        bgColor: '#FFF1F3',
        textColor: '#C01048',
    },
    { 
        bgColor: '#F0F9FF',
        textColor: '#026AA2',
    },
    { 
        bgColor: '#F8F9FC',
        textColor: '#363F72',
    },
  ]

  const handleNavigate = () => {
    navigete('/acn/story/story-form/noid')
  }


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

      <div className="px-4 w-full py-5 rounded-t-[12px] border-[1px] border-white bg-white shadow-sm">
        {/**TOP */}
        <div className="w-full flex items-center gap-[50px]">
          <div className="flex items-center min-w-[140px]">
            <h2 className="text-lg font-semibold text-[#121212] w-full">{ text ? text : `${newsData?.length} Story` }</h2>
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
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search" 
                        className="input !border-none" 
                      />
                    </div>
                  )
                }

                {/**Filter */}
                {
                  showFilter && (
                    <div className="flex items-center gap-5">
                      <Filter filterValue={filterValue} setFilterValue={setFilterValue} />

                      <Button onCLick={handleNavigate} text={`+ Add New`} style={`!bg-acn-main-color !text-white flex items-center !gap-2 !min-w-[174px] !text-[16px] !font-semibold`} />
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
                Title
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-normal text-sm tracking-wider">
                Writer
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-normal text-sm tracking-wider">
                Writer ID
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-normal text-sm tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-normal text-sm tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-normal text-sm tracking-wider">
                Date & Time
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-normal text-sm tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {
              loading ? (
                <div className="flex items-center justify-center w-full">
                  <Spinner />
                </div>
              ) :
              currentData?.map((item) => {
                const { formattedDate, formattedTime } = formatDateAndTime(
                  item?.createdAt
                );
                return (
                  <tr key={item?._id} className="border-t border-gray-200">
                    {/* title */}
                    <td className="px-6 py-4 flex-1">
                      <div className="font-normal text-[14px] text-[#364152]">
                        {item?.title}
                      </div>
                    </td>
                    {/**writer names */}
                    <td className="px-6 py-4 flex-1">
                      <div className="text-[14px] font-normal text-gray-600">
                        {item?.writers}
                      </div>
                    </td>
                    {/* writer id */}
                    <td className="px-6 py-4 flex-1 text-[14px] text-[#13693B]">
                        {item?.storyId}
                    </td>
                    {/* categories */}
                    <td className="px-6 py-4 flex-1 flex flex-wrap">
                        <div className="flex items-center flex-wrap gap-1">
                        {
                          item?.category?.map((i, idx) => {
                            const randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
                            return (
                              <div
                                key={idx}
                                className="text-[14px] font-normal py-[2px] px-[10px] rounded-[16px]"
                                style={{
                                  backgroundColor: randomColor.bgColor,
                                  color: randomColor.textColor,
                                }}
                              >
                                {i}
                              </div>
                            );
                          })
                        }
                        </div>
                    </td>
                    {/* Image */}
                    <td className="px-6 py-4 flex-1 items-center justify-center">
                      <div className="flex items-center gap-2">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={`${item.title} user`}
                            className="w-[32px] h-[32px] rounded-full"
                          />
                        ) : (
                          <div className="w-[32px] h-[32px] rounded-full bg-gray-300 flex items-center justify-center text-gray-800 font-bold">
                            {item?.writers?.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 flex-1 text-start py-4 text-[13px] text-[#121212] font-normal">
                      <p className="text-[13px] font-normal text-[#121212]">
                        {formattedDate}
                      </p>
                      <p className="text-[13px] font-normal text-[#717171]">
                        {formattedTime}
                      </p>
                    </td>
                    <td className="px-6 py-4 flex-1">
                    <div className="relative cursor-pointer flex items-center justify-between gap-2 group">
                          <div
                              className={`py-[5px] px-[10px] rounded-[100px] ${
                                  item?.active === false
                                  ? "bg-[#FEF3F2] text-error"// Pending style
                                  : item?.active === true
                                  ? "bg-[#05A75312] text-success" // Successful style
                                  : item?.active === false
                                  ? "bg-[#FEF3F2] text-error"
                                  : "bg-[#D8E0E5] text-[#585858]" // Inactive or other status style
                              }`}
                          >
                              {item?.active ? 'Active' : 'In Active' }
                          </div>

                          <div>
                            <FiMoreVertical />
                          </div>

                          {/* MODAL POPUP, visible only on hover */}
                          <div className="absolute z-50 top-8 flex flex-col gap-3 bg-white border-[1px] border-gray-200 shadow-lg rounded-[8px] p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-[115px]">
                            <Link
                              to={`/acn/story/info/${item?._id}`}
                              className="py-[2px] px-[6px] font-normal items-center gap-3 text-sm text-[#585858]"
                            >
                              View
                            </Link>
                            <Link
                              to={`/acn/story/story-form/${item?._id}`}
                              className="py-[2px] px-[6px] font-normal items-center gap-3 text-sm text-[#585858]"
                            >
                              Edit
                            </Link>
                          </div>


                        </div>
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

export default StoriesCard;
