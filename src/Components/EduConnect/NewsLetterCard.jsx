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
import { deleteNewsLetter } from "../../Helpers/api";
import toast from "react-hot-toast";

function NewsLetterCard({ 
    newsLetterData = [], 
    loading = false, 
    showFilter = false, 
    showMenuList = false, 
    showSearch = false, 
    text = "", 
    showPagination = false 
}) {
    const navigate = useNavigate();
    const data = menuOption;
    const [filterValue, setFilterValue] = useState("");
    const [activeCard, setActiveCard] = useState(data[0]?.slug);
    const [currentPage, setCurrentPage] = useState(1);
    const [deleting, setDeleting] = useState(false);

    const itemsPerPage = 6;
    const totalPages = Math.ceil(newsLetterData.length / itemsPerPage);

    const filteredData = newsLetterData.filter((item) => {
        const lowercasedFilterValue = filterValue.toLowerCase();
        return (
            item?.title.toLowerCase().includes(lowercasedFilterValue) || 
            item?.author.toLowerCase().includes(lowercasedFilterValue)
        );
    });

    const currentData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const renderPagination = () => {
        if (totalPages <= 6) {
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
        }

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
    };

    const handleNavigate = () => navigate("/edu-connect/newsletter-form/noid");

    const handleDelete = async (id) => {
        if (deleting || !id) {
            toast.error(!id ? "Provide an Id" : "Deletion in progress");
            return;
        }

        if (window.confirm("Are you sure you want to delete this newsletter?")) {
            try {
                setDeleting(true);
                const res = await deleteNewsLetter({ id });

                if (res.success) {
                    toast.success(res.data);
                    window.location.reload();
                } else {
                    toast.error(res.data);
                }
            } catch (error) {
                toast.error("An error occurred while deleting the newsletter.");
            } finally {
                setDeleting(false);
            }
        }
    };

    return (
        <div className="p">
            {showMenuList && (
                <MenuList
                    data={data}
                    activeCard={activeCard}
                    onCLick={handleCardChange}
                />
            )}

            <div className="px-4 py-5 rounded-t-[12px] border-[1px] border-white bg-white shadow-sm">
                {/* TOP */}
                <div className="w-full flex items-center gap-[50px]">
                    <div className="flex items-center min-w-[140px]">
                        <h2 className="text-lg font-semibold text-[#121212] w-full">{text ? text : `${newsLetterData?.length} NewsLetter`}</h2>
                    </div>

                    <div className="flex w-full items-center justify-between">
                        {/* Search */}
                        {showSearch && (
                            <div className="flex gap-[6px] w-[320px] items-center rounded-[8px] px-[14px] bg-white border-gray-300 border-[1px]">
                                <span className="cursor-pointer flex items-center justify-center w-5 h-5">
                                    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21 21L17.5001 17.5M20 11.5C20 16.1944 16.1944 20 11.5 20C6.80558 20 3 16.1944 3 11.5C3 6.80558 6.80558 3 11.5 3C16.1944 3 20 6.80558 20 11.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </span>
                                <input onChange={(e) => setFilterValue(e.target.value)} placeholder="Search" className="input !border-none" />
                            </div>
                        )}

                        <div className="flex items-center gap-[6px]">
                            {/* Filter */}
                            {showFilter && (
                                <div className="">
                                    <Filter filterValue={filterValue} setFilterValue={setFilterValue} />
                                </div>
                            )}

                            <div className="">
                                <Button disabled={false} text={'+ Add New'} onCLick={handleNavigate} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* BODY */}
                {/* Render the current data here */}
                <table className="min-w-full mt-12 rounded-t-[12px] bg-white">
                    <thead className="rounded-t-[12px]">
                        <tr className="bg-[#F9F9F9] border-b-[1px] rounded-t-[12px]">
                            <th className="px-6 py-3 text-left text-gray-600 font-normal text-sm tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-gray-600 font-normal text-sm tracking-wider">Description</th>
                            <th className="px-6 py-3 text-left text-gray-600 font-normal text-sm tracking-wider">Author</th>
                            <th className="px-6 py-3 text-left text-gray-600 font-normal text-sm tracking-wider">Date & Time</th>
                            <th className="px-6 py-3 text-left text-gray-600 font-normal text-sm tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <div className="flex items-center justify-center w-full">
                                <Spinner />
                            </div>
                        ) : currentData?.map((item) => {
                            const { formattedDate, formattedTime } = formatDateAndTime(item?.createdAt);
                            return (
                                <tr key={item?._id} className="border-t border-gray-200">
                                    {/* Course Column */}
                                    <td className="px-6 py-4">
                                        <div className="font-normal text=-[14px] text-[#364152]">
                                            {item?.title}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-[14px] font-normal text-gray-600" dangerouslySetInnerHTML={{ __html: item?.message }} >
                                        </div>
                                    </td>
                                    {/* Order Amount Column */}
                                    <td className="px-6 py-4">
                                        {item?.author}
                                    </td>
                                    {/* Date and time */}
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
                                                    item?.blocked === true
                                                        ? "bg-[#D8E0E5] text-[#585858]"
                                                        : item?.active === true
                                                        ? "bg-[#05A75312] text-[#05A753]"
                                                        : item?.active === false
                                                        ? "bg-[#FEF3F2] text-error"
                                                        : "bg-[#D8E0E5] text-[#585858]"
                                                }`}
                                            >
                                                {item?.blocked ? 'Blacklisted' : item?.status }
                                            </div>

                                            <div>
                                                <FiMoreVertical />
                                            </div>

                                            {/* MODAL POPUP, visible only on hover */}
                                            <div className="absolute z-50 top-8 flex flex-col gap-3 bg-white border-[1px] border-gray-200 shadow-lg rounded-[8px] p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-[170px]">
                                                <Link
                                                    to={`/edu-connect/newsletter-form/${item?.newsLetterId}`}
                                                    className="flex items-center gap-3 text-sm text-primary-color"
                                                >
                                                    View
                                                </Link>
                                                <p onClick={() => handleDelete(item?.newsLetterId)} className="flex items-center gap-3 text-sm text-error">
                                                    Delete
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
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
            )}
        </div>
    );
}

export default NewsLetterCard;
