import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Helpers/Navbar";
import DashBoardLinks from "../../Components/Helpers/DashBoardLinks";
import Button from "../../Components/Helpers/Button";
import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";
import toast from "react-hot-toast";
import Sidebar from "../../Components/ACN/Sidebar";
import Spinner from "../../Components/Helpers/Spinner";
import { useFetchTeamMembers } from "../../Helpers/acn/fetch.hooks";
import { editeam, newTeam } from "../../Helpers/acn/api";

function AcnNewTeamMember() {
    const navigate = useNavigate()
    const loc = useLocation()
    const pathName = loc.pathname.split('/')[3]
    const [ formData, setFormData ] = useState({ id: pathName })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const { data: teamMemberData, isFetching } = useFetchTeamMembers(pathName)

    const teamData = teamMemberData?.data || {}

    const [ loading, setLoading ] = useState(false)
    const handleTeamMember = async () => {
        if(loading){
            return;
        }
        try {
            setLoading(true)
            const res = pathName === 'noid' ? await newTeam(formData) : await editeam(formData)
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
                        <Link to={`/acn-connect/testimonies`} className="">
                            <IoIosArrowBack />
                        </Link>

                        <div className="">
                            <div className="flex items-center gap-[6px]">
                            <div className="flex items-center gap-4">


                                <div className="flex  flex-col">
                                <h2 className="text-lg text-[#14142B] font-semibold">
                                    { pathName === 'noid' ? 'Add New' : 'Update'} Team Member
                                </h2>
                                </div>
                            </div>

                            </div>
                        </div>
                    </div>

                    <div onClick={handleTeamMember} className="w-fit">
                        <Button disabled={loading} style={`!bg-acn-main-color !border-none`} text={loading ? 'Saving...' : pathName === 'noid' ?  `Add` : `Update`} />
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
                                    <input id="firstName" onChange={handleChange} defaultValue={teamData?.firstName} className="input" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <p className="text-start text-sm font-medium text-[#929292] min-w-[200px]">Last Name</p>
                                    <input id="lastName" onChange={handleChange} defaultValue={teamData?.lastName} className="input" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <p className="text-start text-sm font-medium text-[#929292] min-w-[200px]">Postion</p>
                                    <input id="position" onChange={handleChange} defaultValue={teamData?.position} className="input" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <p className="text-start text-sm font-medium text-[#929292] min-w-[200px]">Email</p>
                                    <input id="email" onChange={handleChange} defaultValue={teamData?.email} className="input" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <p className="text-start text-sm font-medium text-[#929292] min-w-[200px]">Linkedin Handle</p>
                                    <input id="linkedinHandle" onChange={handleChange} defaultValue={teamData?.linkedinHandle} className="input" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <p className="text-start text-sm font-medium text-[#929292] min-w-[200px]">Twitter Handle</p>
                                    <input id="twitterHandle" onChange={handleChange} defaultValue={teamData?.twitterHandle} className="input" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <p className="text-start text-sm font-medium text-[#929292] min-w-[200px]">Instagram Handle</p>
                                    <input id="instagramHandle" onChange={handleChange} defaultValue={teamData?.instagramHandle} className="input" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <p className="text-start text-sm font-medium text-[#929292] min-w-[200px]">Testimony</p>
                                    <input id="testimony" onChange={handleChange} defaultValue={teamData?.testimony} className="input" />
                                </div>
                            </div>
                        )
                    }

                </div>


            </div>
        </div>


      </div>

    </div>
  );
}

export default AcnNewTeamMember;
