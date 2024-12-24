import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Helpers/Navbar";
import DashBoardLinks from "../../Components/Helpers/DashBoardLinks";
import Button from "../../Components/Helpers/Button";
import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";
import { formatDateAndTime } from "../../Helpers/formatDateAndTime";
import toast from "react-hot-toast";
import Sidebar from "../../Components/EduConnect/Sidebar";
import Spinner from "../../Components/Helpers/Spinner";
import { useFetchTeamMembers } from "../../Helpers/educonnect/fetch.hooks";
import { deleteTeamMember, toggleTeamActiveStatus } from "../../Helpers/educonnect/api";

function EduConnectTeamsInfo() {
    const navigate = useNavigate()
    const loc = useLocation()
    const pathName = loc.pathname.split('/')[4]

    const { data: teamMemberData, isFetching } = useFetchTeamMembers(pathName)

    const teamData = teamMemberData?.data || {}

    const [ loading, setLoading ] = useState(false)
    const handleDelete = async () => {
        if(loading){
            return;
        }
        const confirm = window.confirm('Are you sure you want to delete this testimony?')
        if(confirm){
            try {
                setLoading(true)
                const res = await deleteTeamMember({ id: pathName })
                if(res.success){
                    toast.success(res.data)
                    navigate('/acn/team')
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
        const confirm = window.confirm('Are you sure you want to update this status?')
        if(confirm){
            try {
                setLoading(true)
                const res = await toggleTeamActiveStatus({ id: pathName })
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
        teamData?.createdAt
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
                        <Link to={`/acn-connect/testimonies`} className="">
                            <IoIosArrowBack />
                        </Link>

                        <div className="">
                            <div className="flex items-center gap-[6px]">
                            <div className="flex items-center gap-4">
                                {teamData?.image ? (
                                <img
                                    src={teamData?.image}
                                    alt={`${teamData?.firstName}'s profile`}
                                    className="w-[45px] h-[45px] rounded-full"
                                />
                                ) : (
                                <div
                                    className={`w-[45px] h-[45px] rounded-full flex items-center justify-center text-gray-800 font-bold ${
                                    teamData?.blocked
                                        ? "bg-[#D8E0E5] text-[#585858]" // Blacklisted style
                                        : teamData?.active
                                        ? "bg-[#05A75312] text-[#05A753]" // Active style
                                        : "bg-[#FEF3F2] text-error" // Inactive style
                                    }`}
                                >
                                    {teamData?.firstName?.charAt(0).toUpperCase()}
                                </div>
                                )}

                                <div className="flex  flex-col">
                                <h2 className="text-lg text-[#14142B] font-semibold">
                                    {teamData?.firstName} {teamData?.lastName}
                                </h2>
                                <p className="text-xs font-normal text-[12px] text-[#929292]">
                                    {teamData?.email}
                                </p>
                                </div>
                            </div>

                            <div
                                className={`py-[5px] px-[10px] rounded-[100px] font-semibold ${
                                teamData?.blocked
                                    ? "bg-[#D8E0E5] text-[#585858]" // Blacklisted style
                                    : teamData?.active
                                    ? "bg-[#05A75312] text-[#05A753]" // Active style
                                    : "bg-[#FEF3F2] text-error" // Inactive style
                                }`}
                            >
                                {teamData?.blocked
                                ? "Blacklisted"
                                : teamData?.active
                                ? "Active"
                                : "Inactive"}
                            </div>
                            </div>
                        </div>
                    </div>

                    <div onClick={handleDelete} className="w-fit">
                        <Button style={`!bg-error !border-none`} text={`Delete`} />
                    </div>
                </div>

                <div className="card1 flex flex-col">
                    <div className="border-b-[1px] border-[#EFF0F6] w-full p-4">
                        <h2 className="text-[#344054] text-[16px] font-semibold">Testimonies Info</h2>
                    </div>
                    
                    {
                        isFetching ? (
                            <Spinner />
                        ) : (
                            <div className="flex flex-col gap-4 mr-auto mt-8">
                                <div className="flex items-center gap-4">
                                    <p className="text-start text-sm font-medium text-[#929292] min-w-[200px]">First Name</p>
                                    <p className="text-start text-sm font-medium text-[#1F2A37]">{teamData?.firstName}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <p className="text-start text-sm font-medium text-[#929292] min-w-[200px]">Last Name</p>
                                    <p className="text-start text-sm font-medium text-[#1F2A37]">{teamData?.lastName}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <p className="text-start text-sm font-medium text-[#929292] min-w-[200px]">User Id</p>
                                    <p className="text-start text-sm font-medium text-[#1F2A37]">{teamData?.teamMemberId}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <p className="text-start text-sm font-medium text-[#929292] min-w-[200px]">Postion</p>
                                    <p className="text-start text-sm font-medium text-[#1F2A37]">{teamData?.position}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <p className="text-start text-sm font-medium text-[#929292] min-w-[200px]">Testimony Date</p>
                                    <p className="text-start text-sm font-medium text-[#1F2A37]">{formattedDate}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <p className="text-start text-sm font-medium text-[#929292] min-w-[200px]">Testimony</p>
                                    <p className="text-start text-sm font-medium text-[#1F2A37]">{teamData?.testimony}</p>
                                </div>
                            </div>
                        )
                    }

                </div>

                <div className="flex gap-[56px]">
                    <div onClick={handleApprove} className="">
                        <Button text={`Add to website`} style={`!bg-acn-main-color`} />
                    </div>
                    <div onClick={handleApprove} className="">
                        <Button text={`Remove from website`} style={`!bg-error !border-none`} />
                    </div>
                </div>

            </div>
        </div>


      </div>

    </div>
  );
}

export default EduConnectTeamsInfo;
