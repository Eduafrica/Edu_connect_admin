import Navbar from "../../Components/Helpers/Navbar";
import DashBoardLinks from "../../Components/Helpers/DashBoardLinks";
import Sidebar from "../../Components/Arewahub/Sidebar";
import Stats from "../../Components/Arewahub/Stats";
import { useFetchProducts } from "../../Helpers/arewahub/fetch.hooks";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Spinner from "../../Components/Helpers/Spinner";
import Button from "../../Components/Helpers/Button";
import { useState } from "react";
import { deleteProduct, toggleActive } from "../../Helpers/arewahub/api";
import ErrorCard from "../../Components/Helpers/ErrorCard";
import SuccessCard from "../../Components/Helpers/SuccessCard";
import { truncateText } from "../../Helpers/truncateText";
import { formatDateAndTime } from "../../Helpers/formatDateAndTime";
import LoadingBtn from "../../Components/Helpers/LoadingBtn";

function ArewaHubProductInfo({  }) {
    const navigate = useNavigate()
    const loc = useLocation()
    const pathName = loc.pathname.split('/')[4]
    const { data: productData, isFetching } = useFetchProducts(pathName)
    const data = productData?.data

    const [ errorText, setErrorText ]= useState()
    const [ successText, setSuccessText ]= useState()
    
    const [ loading, setLoading ] = useState(false)
    const handleToggleActive = async () => {
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
            const res = await toggleActive({ id: pathName })
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

    const handleDelete = async () => {
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
            const confirm = window.confirm('Are you sure you want to delete this product')
            if(confirm){
                setLoading(true)
                const res = await deleteProduct({ id: pathName })
                console.log(res)
                if(res.success){
                    setSuccessText(res.data)
                    setTimeout(() => {
                        setSuccessText()
                    }, 2500)
                    
                    navigate('/arewahub/products')
                } else {
                    setErrorText(res.data)
                    setTimeout(() => {
                        setErrorText()
                    }, 2500)
                    return
                }
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
                                        <h2 className="text-[#14142B] text-lg font-semibold">Product details</h2>
                                        <p className="text-sm font-normal text-[#13693B]">{data?.productId}</p>
                                    </div>

                                    <div className={`rounded-[100px] py-[5px] px-[10px] flex items-center justify-center ${data?.active === true ? 'bg-[#05A75312] text-[#05A753]' : 'bg-[#FFFAEE] text-[#FCB90B]'}`}>
                                        {data?.active ? 'Active' : 'Pending'}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                {
                                    
                                    loading ? (
                                        <div className="">
                                            <LoadingBtn style={`!bg-arewahub-main-color`}  />
                                        </div>
                                    ) : (
                                        <>
                                            <div className="flex items-center gap-5">
                                                <Button disabled={loading} onCLick={handleToggleActive} text={loading ? 'Updating...' : data?.active ? `Make inactive` : `Make Active`} style={data?.active ? `!bg-[#8C52FF] !border-[#8C52FF] !text-[#F9F9F9]` : `!bg-transparent !border-[#D0D5DD] !text-[#344054]`} />
                                            </div>
                                            <div className="flex items-center gap-5">
                                                <Button disabled={loading} onCLick={handleDelete} text={loading ? 'Deleting...' :  `Delete`} style={`!bg-error !border-error`} />
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                        </div>

                        <div className="card1 p-0 flex-col">
                            <div className="p-4 min-h-[55px] w-full flex items-center border-b-[1px] border-[#EFF0F6]">
                                <p className="text-[16px] font-normal text-[#121212]">Order Details</p>
                            </div>

                            <div className="p-4 mt-4 flex flex-col gap-2 w-full">
                                <div className="flex items-center">
                                    <div className="min-w-[200px] text-sm font-medium text-[#929292]">Product Name</div>
                                    <div className="text-sm font-normal text-[#121212]">{data?.productName}</div>
                                </div>
                                <div className="flex items-center">
                                    <div className="min-w-[200px] text-sm font-medium text-[#929292]">Product Id</div>
                                    <div className="text-sm font-normal text-[#121212]">{data?.productId}</div>
                                </div>
                                <div className="flex items-center">
                                    <div className="min-w-[200px] text-sm font-medium text-[#929292]">Product description</div>
                                    <div className="text-sm font-normal text-[#121212]" dangerouslySetInnerHTML={{ __html: truncateText(data?.description, 2) }}></div>
                                </div>
                                <div className="flex items-center">
                                    <div className="min-w-[200px] text-sm font-medium text-[#929292]">Unit sold/left</div>
                                    <div className="text-sm font-normal text-[#121212]">{data?.quantitySold} / {data?.quantityInStock - data?.quantitySold}</div>
                                </div>
                                <div className="flex items-center">
                                    <div className="min-w-[200px] text-sm font-medium text-[#929292]">Date</div>
                                    <div className="text-sm font-normal text-[#121212] flex gap-[2px]">
                                        <p>{formattedDate}</p>
                                        <p className="text-[#717171]">{formattedTime}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="min-w-[200px] text-sm font-medium text-[#929292]">Amount</div>
                                    <div className="text-sm font-normal text-[#121212]">₦{data?.price.toLocaleString()}</div>
                                </div>
                                <div className="flex items-center">
                                    <div className="min-w-[200px] text-sm font-medium text-[#929292]">Status</div>
                                    <div className="text-sm font-normal text-[#121212]">
                                    <div
                              className={`py-[5px] px-[10px] rounded-[100px] ${
                                  data?.blocked === true
                                  ? "bg-[#D8E0E5] text-[#585858]"// Pending style
                                  : data?.active === true
                                  ? "bg-[#05A75312] text-[#05A753]" // Successful style
                                  : data?.active === false
                                  ? "bg-[#FCB90B12] text-[#FCB90B]"
                                  : "bg-[#D8E0E5] text-[#585858]" // Inactive or other status style
                              }`}
                          >
                              {data?.active ? 'Active' : 'In Active' }
                          </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card1 p-0 flex-col justify-start items-start">
                            <div className="p-4 min-h-[46px] w-full flex items-center border-b-[1px] border-[#EFF0F6]">
                                <p className="text-[16px] font-normal text-[#121212]">Product image</p>
                            </div>

                            <div className="mt-4 p-4">
                                <img src={data?.image} alt={data?.productName} className="w-[1245px]" />
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

export default ArewaHubProductInfo;
