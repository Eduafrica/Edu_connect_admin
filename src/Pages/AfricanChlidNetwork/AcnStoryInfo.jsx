import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Helpers/Navbar";
import DashBoardLinks from "../../Components/Helpers/DashBoardLinks";
import Button from "../../Components/Helpers/Button";
import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";
import { formatDateAndTime } from "../../Helpers/formatDateAndTime";
import toast from "react-hot-toast";
import Sidebar from "../../Components/ACN/Sidebar";
import { useFetchStories } from "../../Helpers/acn/fetch.hooks";
import { deleteStory, toggleStoryActiveState } from "../../Helpers/acn/api";

function AcnStoryInfo() {
    const navigate = useNavigate()
    const loc = useLocation()
    const pathName = loc.pathname.split('/')[4]
    const { data: storyDataInfo, isFetching } = useFetchStories(pathName)

    const storyData = storyDataInfo?.data || {}

    const [ loading, setLoading ] = useState(false)
    const handleToggleActive = async () => {
        if(loading){
            return;
        }
        const confirm = window.confirm('Are you sure you want to update the active status?')
        if(confirm){
            try {
                setLoading(true)
                const res = await toggleStoryActiveState({ id: pathName })
                if(res.success){
                    toast.success(res.data)
                    window.location.reload()
                } else {
                    toast.error(res.data)
                }
            } catch (error) {
                
            } finally {
                setLoading(false)
            }
        }
    }

    const handleDelete = async () => {
        if(loading){
            return;
        }
        const confirm = window.confirm('Are you sure you want to delete this post?')
        if(confirm){
            try {
                setLoading(true)
                const res = await deleteStory({ id: pathName })
                if(res.success){
                    toast.success(res.data)
                    navigate('/acn/stories')
                } else {
                    toast.error(res.data)
                }
            } catch (error) {
                
            } finally {
                setLoading(false)
            }
        }
    }

    const handleEdit = (id) => {
        navigate(`/acn/story/story-form/${pathName}`)
    }

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

    const { formattedDate, formattedTime } = formatDateAndTime(
        storyData?.createdAt
      );
  return (
    <div className="page flex-row">

      {/* Sidebar */}
      <div className="fixed w-[280px] h-[100vh] left-0 top-0">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="relative ml-[280px] w-[calc(100vw-280px)]">
        <div className=" w-full h-[60px] top-0 left-0 bg-white">
          <Navbar />
        </div>

        <div className="bg-bgColor pad1 flex flex-col gap-[39px]">
            <div className="flex flex-col gap-[30px]">

              <DashBoardLinks name={'acn'} color={`text-acn-main-color border-acn-main-color`} />

                <div className="card1">
                    <div className="flex items-center gap-[50px]">
                        <Link to={`/acn/stories`} className="">
                            <IoIosArrowBack />
                        </Link>

                        <div className="">
                            <div className="flex items-center gap-[6px]">
                            <div className="flex items-center gap-4">
                                {storyData?.writerImg ? (
                                <img
                                    src={storyData?.writerImg}
                                    alt={`${storyData?.writers}'s profile`}
                                    className="w-[45px] h-[45px] rounded-full"
                                />
                                ) : (
                                <div
                                    className={`w-[45px] h-[45px] rounded-full flex items-center justify-center text-gray-800 font-bold ${
                                    storyData?.blocked
                                        ? "bg-[#D8E0E5] text-[#585858]" // Blacklisted style
                                        : storyData?.active
                                        ? "bg-[#05A75312] text-[#05A753]" // Active style
                                        : "bg-[#FEF3F2] text-error" // Inactive style
                                    }`}
                                >
                                    {storyData?.writers?.charAt(0).toUpperCase()}
                                </div>
                                )}

                                <div className="flex  flex-col">
                                <h2 className="text-lg text-[#14142B] font-semibold">
                                    {storyData?.writers}
                                </h2>
                                <p className="text-xs font-normal text-[12px] text-[#929292]">
                                    {storyData?.email}
                                </p>
                                </div>
                            </div>

                            <div
                                className={`py-[5px] px-[10px] rounded-[100px] font-semibold ${
                                storyData?.blocked
                                    ? "bg-[#D8E0E5] text-[#585858]" // Blacklisted style
                                    : storyData?.active
                                    ? "bg-[#05A75312] text-success" // Active style
                                    : "bg-[#FEF3F2] text-error" // Inactive style
                                }`}
                            >
                                {storyData?.blocked
                                ? "Blacklisted"
                                : storyData?.active
                                ? "Active"
                                : "Inactive"}
                            </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-[14px]">
                        <div onClick={() => handleEdit(storyData?._id)} className="w-fit">
                            <Button style={`!bg-acn-main-color !text-white !border-none`} text={`Edit`} />
                        </div>
                        
                        <div onClick={handleDelete} className="w-fit">
                            <Button style={`!bg-transparent !text-error !border-[2px] !font-semibold !text-[16px] !border-error`} text={`Delete`} />
                        </div>
                    </div>

                </div>

                <div className="card1 flex flex-col">
                    <div className="border-b-[1px] border-[#EFF0F6] w-full p-4">
                        <h2 className="text-[#344054] text-[16px] font-semibold">Testimonies Info</h2>
                    </div>

                    <div className="flex flex-col gap-4 mr-auto mt-8">
                        <div className="flex items-center gap-4">
                            <p className="text-start text-sm font-medium text-[#929292] min-w-[200px]">Title</p>
                            <p className="text-start text-sm font-medium text-[#1F2A37]">{storyData?.title}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <p className="text-start text-sm font-medium text-[#929292] min-w-[200px]">Writer's Name</p>
                            <p className="text-start text-sm font-medium text-[#1F2A37]">{storyData?.writers}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <p className="text-start text-sm font-medium text-[#929292] min-w-[200px]">Stroy Id</p>
                            <p className="text-start text-sm font-medium text-[#1F2A37]">{storyData?.postId}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <p className="text-start text-sm font-medium text-[#929292] min-w-[200px]">Categories</p>
                            <p className="text-start text-sm font-medium text-[#1F2A37] flex items-center gap-2 flex-wrap">
                            {
                          storyData?.category?.map((i, idx) => {
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
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <p className="text-start text-sm font-medium text-[#929292] min-w-[200px]">Created Date</p>
                            <p className="text-start text-sm font-medium text-[#1F2A37]">{formattedDate}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <p className="text-start text-sm font-medium text-[#929292] min-w-[200px]">Story</p>
                            <p className="text-start text-sm font-medium text-[#1F2A37]" dangerouslySetInnerHTML={{ __html: storyData?.story }}></p>
                        </div>
                    </div>

                </div>

                <div className="flex gap-[56px]">
                    <div onClick={handleToggleActive} className="">
                        <Button text={`${storyData?.active ? 'Make Inactive' : 'Make Active'}`} style={`!bg-error !border-none`} />
                    </div>
                </div>

            </div>
        </div>


      </div>

    </div>
  );
}

export default AcnStoryInfo;
