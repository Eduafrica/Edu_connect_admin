import { useSelector } from 'react-redux'
import ProfileImg from '../../assets/image/profile.png'
import { useFetchNotifications } from '../../Helpers/fetch.hooks'
import { useEffect, useState } from 'react'
import Spinner from './Spinner'
import { formatDateAndTime } from '../../Helpers/formatDateAndTime'
import { markNotificationAsRead } from '../../Helpers/api'

function Navbar() {
    const data = useSelector((state) => state.admin)
    const user = data?.currentAdmin

    const { data: notificationsData, isFetching: loadingNotification } = useFetchNotifications()
    const notificationData = notificationsData?.data
    const [ showPopup, setShowPopup ] = useState(false)
    const [ newNotification, setNewNotification ] = useState(false)
    
    const handlePopup = () => {
        setShowPopup((prev) => !prev)
    }

    useEffect(() => {
        if (notificationData && notificationData.length > 0) {
            const hasUnreadNotifications = notificationData.some(notification => notification.read === false);
            setNewNotification(hasUnreadNotifications);
        }
    }, [notificationData]);

    useEffect(() => {
        if (showPopup) {
            const markAsRead = async () => {
                try {
                    const res = await markNotificationAsRead();
                    if (res.success) {
                        setNewNotification(false)
                    }
                } catch (error) {
                }
            };
            markAsRead();
        }
    }, [showPopup]);    


  return (
    <div className="fixed z-[999] w-[calc(100vw-280px)] h-[60px] bg-white border-b-[1px] border-[#D9DBE9] pt-3 pb-3 px-6 flex">
        
        <div className="relative ml-auto flex items-center gap-2">
            <div className="w-[34px] h-[34px] rounded-full">
                <img alt="" src={user?.profileImg || ProfileImg} className="w-full h-full rounded-full object-cover object-center" />
            </div>

            <div className="flex flex-col">
                <p className='text-[12px] font-medium text-[#3F9243]'>{user?.role}</p>
                <p className='font-normal text-[14px] text-[#929292]'>{user?.firstName} {user?.lastName}</p>
            </div>

            <span className='w-[1px] h-[100%] bg-[#D9DBE9]'></span>

            <div onClick={handlePopup} className="relative">
                <span className='flex items-center justify-center w-6 h-6'>
                    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='text-[#697586]'>
                        <path d="M15.6459 18.0148C16.0747 19.6152 15.125 21.2602 13.5246 21.689C11.9242 22.1178 10.2792 21.1681 9.85036 19.5677M2.05683 11.6133C1.66734 10.2151 2.07238 8.70349 3.10878 7.68738M12.1463 5.74085C12.4505 5.19355 12.5507 4.53205 12.3759 3.87945C12.0185 2.54579 10.6477 1.75433 9.314 2.11168C7.98034 2.46904 7.18888 3.83988 7.54624 5.17355C7.7211 5.82614 8.13863 6.34891 8.67573 6.67079M20.319 6.72C19.9572 5.31439 18.8506 4.20779 17.445 3.84602M17.4906 9.44528C17.1337 8.11315 16.1808 6.99919 14.8415 6.34845C13.5022 5.69772 11.8863 5.56352 10.3492 5.97538C8.81214 6.38724 7.47981 7.31142 6.64533 8.54461C5.81085 9.77779 5.54258 11.219 5.89952 12.5511C6.4901 14.7552 6.37542 16.5135 6.00247 17.8497C5.5774 19.3725 5.36487 20.134 5.42228 20.2869C5.48798 20.4618 5.53549 20.5098 5.70973 20.5773C5.86202 20.6363 6.50179 20.4649 7.78133 20.122L19.6464 16.9428C20.9259 16.5999 21.5657 16.4285 21.6681 16.3013C21.7852 16.1557 21.8024 16.0904 21.7718 15.906C21.7451 15.7449 21.1803 15.1918 20.0508 14.0855C19.0597 13.1148 18.0812 11.6493 17.4906 9.44528Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </span>
                {
                    notificationData?.length > 0 && newNotification && (
                        <div className="absolute top-[-8px] right-0 w-3 h-3 rounded-full bg-edu-main-color"></div>
                    )
                }
            </div>

            {/**Show Popup */}
            {
                showPopup && (
                    <div className="absolute z-[9990] top-16 right-1 bg-white shadow-md w-[450px] h-[50vh] overflow-y-auto scrollbar-thin rounded-[16px] p-4 py-4 flex flex-col gap-7">
                        <div className="flex items-center justify-between">
                            <h3 className='text-[#000000] font-semibold text-[18px]'>Notifications</h3>

                            <div onClick={handlePopup} className="flex items-center justify-center w-6 h-6 cursor-pointer">
                                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 9L9 15M9 9L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                        </div>

                        <div className="py-4">
                            {
                                loadingNotification ? (
                                    <div className="flex items-center justify-center">
                                        <Spinner />
                                    </div>
                                ) : (
                                    <div className="flex  flex-col gap-5">
                                        {
                                            notificationData?.map((i) => {
                                            const { formattedDate, formattedTime } = formatDateAndTime(i?.createdAt);
                                            return (
                                                <div key={i?._id} className="flex flex-col items-start min-h-[59px] border-b-[1px] pb-3">
                                                    <p className={`font-normal text-[14px] ${i.read ? `text-[#121212]` : `text-edu-main-color` }`}>{i?.message}</p>
                                                    <p className='text-[12px] text-[#878C96] font-normal'>{`${formattedDate} ${formattedTime}`}</p>
                                                </div>
                                            )})
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )
            }

        </div>
    </div>
  )
}

export default Navbar
