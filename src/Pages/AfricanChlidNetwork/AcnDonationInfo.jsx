import { Link, useLocation } from "react-router-dom";
import Navbar from "../../Components/Helpers/Navbar";
import DashBoardLinks from "../../Components/Helpers/DashBoardLinks";
import Button from "../../Components/Helpers/Button";
import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";
import { replyMessage } from "../../Helpers/educonnect/api";
import { formatDateAndTime } from "../../Helpers/formatDateAndTime";
import toast from "react-hot-toast";
import LoadingBtn from "../../Components/Helpers/LoadingBtn";
import Spinner from "../../Components/Helpers/Spinner";
import Sidebar from "../../Components/ACN/Sidebar";
import { useFetchDonations } from "../../Helpers/acn/fetch.hooks";
import { toggleDonationActiveStatus } from "../../Helpers/acn/api";

function AcnDonationInfo() {
    const loc = useLocation()
    const pathName = loc.pathname.split('/')[4]
    const { data, isFetching } = useFetchDonations(pathName)

    const donationData = data?.data || {}


    const { formattedDate, formattedTime } = formatDateAndTime(
        donationData?.createdAt
      );
    
      const [ loading, setLoading ] = useState(false)
    const handleDonationActiveStatus = async () => {
        if(loading){
            return
        }
        try {
            setLoading(true)
            const res = await toggleDonationActiveStatus({ id: pathName })
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

                <div className="card1 justify-between">
                    <div className="flex items-center gap-[50px]">
                        <Link to={`/acn/donations`} className="">
                            <IoIosArrowBack />
                        </Link>

                        <div className="">
                            <div className="flex items-center gap-[6px]">
                            <div className="flex items-center gap-4">

                                <div className="flex  flex-col">
                                    <h2 className="text-lg text-[#14142B] font-semibold">
                                        {donationData?.firstName} {donationData?.lastName}
                                    </h2>
                                    <p className="text-xs font-normal text-[12px] text-[#929292]">
                                        {donationData?.email}
                                    </p>
                                </div>
                            </div>

                            </div>
                        </div>
                    </div>

                    <div className="">
                        <Button disabled={loading} onCLick={handleDonationActiveStatus} text={loading ? 'Updating...' : donationData?.status ? 'Unapprove' : 'Approve'} style={`!bg-acn-main-color border-acn-main-color`} />
                    </div>

                </div>

                <div className="card1 flex flex-col">
                    <div className="border-b-[1px] border-[#EFF0F6] w-full p-4">
                        <h2 className="text-[#344054] text-[16px] font-semibold">Contact us Info</h2>
                    </div>

                    {
                        isFetching ? (
                            <div className="flex items-center justify-center">
                                <Spinner />
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4 mr-auto mt-8">
                                <div className="flex items-center gap-4">
                                    <p className="text-start text-sm font-medium text-[#929292] min-w-[190px]">First Name</p>
                                    <p className="text-start text-sm font-medium text-[#1F2A37]">{donationData?.firstName}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <p className="text-start text-sm font-medium text-[#929292] min-w-[190px]">Last Name</p>
                                    <p className="text-start text-sm font-medium text-[#1F2A37]">{donationData?.lastName}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <p className="text-start text-sm font-medium text-[#929292] min-w-[190px]">Donation Id</p>
                                    <p className="text-start text-sm font-medium text-[#1F2A37]">{donationData?.donationId}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <p className="text-start text-sm font-medium text-[#929292] min-w-[190px]">Email</p>
                                    <p className="text-start text-sm font-medium text-[#1F2A37]">{donationData?.email}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <p className="text-start text-sm font-medium text-[#929292] min-w-[190px]">Phone number</p>
                                    <p className="text-start text-sm font-medium text-[#1F2A37]">{donationData?.phoneNumber}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <p className="text-start text-sm font-medium text-[#929292] min-w-[190px]">Date</p>
                                    <p className="text-start text-sm font-medium text-[#1F2A37]">{formattedDate}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <p className="text-start text-sm font-medium text-[#929292] min-w-[190px]">Amount</p>
                                    <p className="text-start text-sm font-medium text-[#1F2A37]">{donationData?.amount?.toLocaleString()}</p>
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

export default AcnDonationInfo;
