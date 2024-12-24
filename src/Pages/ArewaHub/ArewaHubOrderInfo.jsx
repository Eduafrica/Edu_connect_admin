import Navbar from "../../Components/Helpers/Navbar";
import DashBoardLinks from "../../Components/Helpers/DashBoardLinks";
import Sidebar from "../../Components/Arewahub/Sidebar";
import Stats from "../../Components/Arewahub/Stats";
import { useFetchOrders } from "../../Helpers/arewahub/fetch.hooks";
import { Link, useLocation } from "react-router-dom";
import Spinner from "../../Components/Helpers/Spinner";
import Button from "../../Components/Helpers/Button";
import { useState } from "react";
import { toggleOrderActiveStatus, togglePayment } from "../../Helpers/arewahub/api";
import ErrorCard from "../../Components/Helpers/ErrorCard";
import SuccessCard from "../../Components/Helpers/SuccessCard";
import { truncateText } from "../../Helpers/truncateText";
import { formatDateAndTime } from "../../Helpers/formatDateAndTime";

function ArewaHubOrderInfo({  }) {
    const loc = useLocation()
    const pathName = loc.pathname.split('/')[4]
    const { data: productData, isFetching } = useFetchOrders(pathName)
    const data = productData?.data

    const [ errorText, setErrorText ]= useState()
    const [ successText, setSuccessText ]= useState()
    
    const [ loading, setLoading ] = useState(false)
    const handleToggleOrderDelivered = async () => {
        if(loading){
            return
        }
        if(!pathName){
            setErrorText('Product Id is requried')
            setTimeout(() => {
                setErrorText()
            }, 2500)
            return
        }
        try {
            setLoading(true)
            const res = await toggleOrderActiveStatus({ id: pathName })
            console.log(res)
            if(res.success){
                setSuccessText(res.data)
                setTimeout(() => {
                    setSuccessText()
                }, 2500)
                window.location.reload()
            } else {
                setErrorText(res.data)
                setTimeout(() => {
                    setErrorText()
                }, 2500)
                return
            }
        } catch (error) {
            
        } finally {
            setLoading(false)
        }
    }

    const handleTogglePayment = async () => {
        if(loading){
            return
        }
        if(!pathName){
            setErrorText('Product Id is requried')
            setTimeout(() => {
                setErrorText()
            }, 2500)
            return
        }
        try {
            setLoading(true)
            const res = await togglePayment({ id: pathName })
            console.log(res)
            if(res.success){
                setSuccessText(res.data)
                setTimeout(() => {
                    setSuccessText()
                }, 2500)
                window.location.reload()
            } else {
                setErrorText(res.data)
                setTimeout(() => {
                    setErrorText()
                }, 2500)
                return
            }
        } catch (error) {
            
        } finally {
            setLoading(false)
        }
    }

    const { formattedDate, formattedTime } = formatDateAndTime(data?.createdAt)

  return (
    <div className="page flex-row">
        {
            errorText && (
                <ErrorCard errorText={errorText} />
            )
        }
        {
            successText && (
                <SuccessCard successText={successText} />
            )
        }

      {/* Sidebar */}
      <div className="fixed w-[280px] h-[100vh] left-0 top-0">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="relative ml-[280px] w-[calc(100vw-280px)]">
        <div className=" w-full h-[60px] top-0 left-0 bg-white">
          <Navbar />
        </div>

        <div className="bg-bgColor pad1 flex flex-col gap-[30px]">
            <div className="flex flex-col gap-[30px]">

              <DashBoardLinks name={'arewahub'} color={`text-arewahub-main-color border-arewahub-main-color`} />

            </div>

            {
                isFetching ? (
                    <div className="">
                        <Spinner />
                    </div>
                ) : (
                    <div className="flex flex-col gap-[30px]">
                        {/**ADD HERE */}
                        <div className="card1 ">
                            <div className="flex items-center gap-[40px]">
                                <Link to={`/arewahub/products`} className="flex items-center justify-center w-5 h-5">
                                    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </Link>
                                <div className="flex items-center gap-8">
                                    <div className="flex flex-col gap-2px]">
                                        <h2 className="text-[#14142B] text-lg font-semibold">Order details</h2>
                                        <p className="text-sm font-normal text-[#13693B]">{data?.orderId}</p>
                                    </div>

                                    <div className={`rounded-[100px] py-[5px] px-[10px] flex items-center justify-center ${data?.status === 'Approved' ? 'bg-[#05A75312] text-[#05A753]' : 'bg-[#FFFAEE] text-[#FCB90B]'}`}>
                                        {!data?.paid ? 'Not paid' : data?.status}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-5">
                                <Button disabled={loading} onCLick={handleTogglePayment} text={loading ? 'Updating...' : data?.paid ? 'Unpaid' : `Approve Payment`} style={data?.paid ? `!bg-[#8C52FF] !border-[#8C52FF] !text-[#F9F9F9]` : `!bg-transparent !border-[#D0D5DD] !text-[#344054]`} />
                                <Button disabled={loading} onCLick={handleToggleOrderDelivered} text={loading ? 'Updating...' : data?.status === 'Pending' ? `Make Successful` : `Make Pending`} style={data?.status === 'Approved' ? `!bg-[#8C52FF] !border-[#8C52FF] !text-[#F9F9F9]` : `!bg-transparent !border-[#D0D5DD] !text-[#344054]`} />
                            
                            </div>
                        </div>

                        <div className="card1 p-0 flex-col">
                            <div className="p-4 min-h-[55px] w-full flex items-center border-b-[1px] border-[#EFF0F6]">
                                <p className="text-[16px] font-normal text-[#121212]">Order Details</p>
                            </div>

                            <div className="p-4 mt-4 flex flex-col gap-2 w-full">
                                <div className="flex items-center">
                                    <div className="min-w-[200px] text-sm font-medium text-[#929292]">Phone Number</div>
                                    <div className="text-sm font-normal text-[#121212]">{data?.phoneNumber}</div>
                                </div>
                                <div className="flex items-center">
                                    <div className="min-w-[200px] text-sm font-medium text-[#929292]">Order Id</div>
                                    <div className="text-sm font-normal text-[#121212]">{data?.orderId}</div>
                                </div>
                                <div className="flex items-center">
                                    <div className="min-w-[200px] text-sm font-medium text-[#929292]">Amount</div>
                                    <div className="text-sm font-normal text-[#121212]">₦{data?.amount?.toLocaleString()}</div>
                                </div>
                                <div className="flex items-center">
                                    <div className="min-w-[200px] text-sm font-medium text-[#929292]">Email</div>
                                    <div className="text-sm font-normal text-[#121212]">{data?.customerEmail}</div>
                                </div>
                                <div className="flex items-center">
                                    <div className="min-w-[200px] text-sm font-medium text-[#929292]">Date</div>
                                    <div className="text-sm font-normal text-[#121212] flex gap-[2px]">
                                        <p>{formattedDate}</p>
                                        <p className="text-[#717171]">{formattedTime}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="min-w-[200px] text-sm font-medium text-[#929292]">Status</div>
                                    <div className="text-sm font-normal text-[#121212]">
                                    <div
                              className={`py-[5px] px-[10px] rounded-[100px] ${
                                  data?.paid === false
                                  ? "bg-[#D8E0E5] text-[#585858]"// Pending style
                                  : data?.status === 'Successful'
                                  ? "bg-[#05A75312] text-[#05A753]" // Successful style
                                  : data?.status === 'Pending'
                                  ? "bg-[#FCB90B12] text-[#FCB90B]"
                                  : "bg-[#D8E0E5] text-[#585858]" // Inactive or other status style
                              }`}
                          >
                              { !data?.paid ? 'Not paid' : data?.status}
                          </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card1 p-0 flex-col justify-start items-start">
                            <div className="p-4 min-h-[46px] w-full flex items-center border-b-[1px] border-[#EFF0F6]">
                                <p className="text-[16px] font-normal text-[#121212]">Products ordered</p>
                            </div>

                            <div className="mt-4 p-4 pb-12">
                                <div className="flex items-start gap-[47px]">
                                {
                                    data?.items?.map((i, idx) => (
                                            <div className="flex flex-col gap-[7px] w-[124px]">
                                                    <img src={i?.image} alt={i?.productName} className="w-full" />
                                                    <p className="text-[#364152] font-semibold text-[14px]">{i.name}</p>
                                                    <p className="text-[16px] font-bold text-[#364152]">{i.price}</p>
                                            </div>
                                    ))
                                }
                                </div>
                            </div>

                            <div className="border-t-[1px] border-[#EFF0F6] min-h-[48px] w-full flex items-center px-4">
                                <p className="font-normal text-[14px] text-[#585858]">Total Amount</p>
                                <p className="font-semibold text-[14px] text-[#344054]">₦{data?.amount?.toLocaleString()}</p>
                            </div>
                        </div>
                        
                    </div>
                )
            }

        </div>


      </div>

    </div>
  );
}

export default ArewaHubOrderInfo;
