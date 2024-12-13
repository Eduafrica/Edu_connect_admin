import { Link, useLocation } from "react-router-dom";
import Navbar from "../../Components/Helpers/Navbar";
import Sidebar from "../../Components/EduConnect/Sidebar";
import DashBoardLinks from "../../Components/Helpers/DashBoardLinks";
import Button from "../../Components/Helpers/Button";
import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";
import { approveTestimony, deleteTestimony, toggleBlacklist } from "../../Helpers/educonnect/api";
import { formatDateAndTime } from "../../Helpers/formatDateAndTime";
import toast from "react-hot-toast";

function EduConnectTestimoniesInfo() {
    const loc = useLocation()
    const pathName = loc.pathname.split('/')[4]

    const testimonyData = {}

    const [ loading, setLoading ] = useState(false)
    const handleBlock = async () => {
        if(loading){
            return;
        }
        const confirm = window.confirm('Are you sure you want to blacklist this testimony?')
        if(confirm){
            try {
                setLoading(true)
                const res = await toggleBlacklist({ id: pathName })
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

    const handleApprove = async () => {
        if(loading){
            return;
        }
        const confirm = window.confirm('Are you sure you want to approve this testimony?')
        if(confirm){
            try {
                setLoading(true)
                const res = await approveTestimony({ id: pathName })
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
        const confirm = window.confirm('Are you sure you want to delete this testimony?')
        if(confirm){
            try {
                setLoading(true)
                const res = await deleteTestimony({ id: pathName })
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

    const { formattedDate, formattedTime } = formatDateAndTime(
        testimonyData?.createdAt
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

              <DashBoardLinks name={'educonnect'} color={`text-edu-main-color border-edu-main-color`} />

                <div className="card1">
                    <div className="flex items-center gap-[50px]">
                        <Link to={`/edu-connect/testimonies`} className="">
                            <IoIosArrowBack />
                        </Link>

                        <div className="">
                            <div className="flex items-center gap-[6px]">
                            <div className="flex items-center gap-4">
                                {testimonyData?.profileImg ? (
                                <img
                                    src={testimonyData?.profileImg}
                                    alt={`${testimonyData?.firstName}'s profile`}
                                    className="w-[45px] h-[45px] rounded-full"
                                />
                                ) : (
                                <div
                                    className={`w-[45px] h-[45px] rounded-full flex items-center justify-center text-gray-800 font-bold ${
                                    testimonyData?.blocked
                                        ? "bg-[#D8E0E5] text-[#585858]" // Blacklisted style
                                        : testimonyData?.approved
                                        ? "bg-[#05A75312] text-primary-color" // Active style
                                        : "bg-[#FEF3F2] text-error" // Inactive style
                                    }`}
                                >
                                    {testimonyData?.firstName?.charAt(0).toUpperCase()}
                                </div>
                                )}

                                <div className="flex  flex-col">
                                <h2 className="text-lg text-[#14142B] font-semibold">
                                    {testimonyData?.firstName} {testimonyData?.lastName}
                                </h2>
                                <p className="text-xs font-normal text-[12px] text-[#929292]">
                                    {testimonyData?.email}
                                </p>
                                </div>
                            </div>

                            <div
                                className={`py-[5px] px-[10px] rounded-[100px] ${
                                testimonyData?.blocked
                                    ? "bg-[#D8E0E5] text-[#585858]" // Blacklisted style
                                    : testimonyData?.approved
                                    ? "bg-[#05A75312] text-primary-color" // Active style
                                    : "bg-[#FEF3F2] text-error" // Inactive style
                                }`}
                            >
                                {testimonyData?.blocked
                                ? "Blacklisted"
                                : testimonyData?.approved
                                ? "Active"
                                : "Inactive"}
                            </div>
                            </div>
                        </div>
                    </div>

                    <div onClick={handleBlock} className="w-fit">
                        <Button style={`!bg-error !border-none`} text={`Blacklist`} />
                    </div>
                </div>

                <div className="card1 flex flex-col">
                    <div className="border-b-[1px] border-[#EFF0F6] w-full p-4">
                        <h2 className="text-[#344054] text-[16px] font-semibold">Testimonies Info</h2>
                    </div>

                    <div className="flex flex-col gap-4 mr-auto mt-8">
                        <div className="flex items-center gap-4">
                            <p className="text-start text-sm font-medium text-[#929292]">First Name</p>
                            <p className="text-start text-sm font-medium text-[#1F2A37]">{testimonyData?.firstName}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <p className="text-start text-sm font-medium text-[#929292]">Last Name</p>
                            <p className="text-start text-sm font-medium text-[#1F2A37]">{testimonyData?.lastName}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <p className="text-start text-sm font-medium text-[#929292]">User Id</p>
                            <p className="text-start text-sm font-medium text-[#1F2A37]">{testimonyData?.userId}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <p className="text-start text-sm font-medium text-[#929292]">Postion</p>
                            <p className="text-start text-sm font-medium text-[#1F2A37]"></p>
                        </div>
                        <div className="flex items-center gap-4">
                            <p className="text-start text-sm font-medium text-[#929292]">Testimony Date</p>
                            <p className="text-start text-sm font-medium text-[#1F2A37]">{formattedDate}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <p className="text-start text-sm font-medium text-[#929292]">messgae</p>
                            <p className="text-start text-sm font-medium text-[#1F2A37]">{testimonyData?.message}</p>
                        </div>
                    </div>

                </div>

                <div className="flex gap-[56px]">
                    <div onClick={handleApprove} className="">
                        <Button text={`Add to website`} />
                    </div>
                    <div onClick={handleDelete} className="">
                        <Button text={`Remove from website`} style={`!bg-error !border-none`} />
                    </div>
                </div>

            </div>
        </div>


      </div>

    </div>
  );
}

export default EduConnectTestimoniesInfo;
