import { useFetchLastestEvent } from "../../Helpers/arewahub/fetch.hooks"
import { convertTo12HourFormat } from "../../Helpers/formatDateAndTime"
import Spinner from "../Helpers/Spinner"
import RevenueGraph from "./RevenueGraph"

function RevenueCard({ setSelectedDate, selectedDate }) {
    const totalExpenseOnEvent = {
        total: 2040,
        percentage: 1.5,
        percentageType: 'positive',
      }

    const { data: lastestEvent, isFetching: loadingEvents } = useFetchLastestEvent()
    const eventData = lastestEvent?.data
    console.log('object events', eventData)
    return (
    <div className='flex items-start gap-[30px]'>
      <RevenueGraph selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

      <div className="flex w-[370px] flex-col gap-[30px]">
        {
            loadingEvents ? (
                <Spinner />
            ) : (
                <div className="rounded-[12px] w-full min-h-[163px] flex shadow-sm overflow-x-hidden bg-arewahub-main-color">
                    <div className="p-5 flex flex-col flex-1 w-full gap-5">
                        <div className="text-[16px] text-white font-medium">
                            Past <br /> Event 
                        </div>
                        <div className="text-[14px] text-white font-normal">
                            <p>{eventData?.latestPastEvent?.eventDate}</p>
                            <p>{convertTo12HourFormat(eventData?.latestPastEvent?.eventTime)}</p>
                        </div>
                    </div>
                    <span className="border-l-[1px] h-full border-white"></span>
                    <div className="border-l-[1px] p-5 flex flex-col flex-1 w-full gap-5">
                        <div className="text-[16px] text-white font-medium">
                            Upcoming <br /> Event 
                        </div>
                        <div className="text-[14px] text-white font-normal">
                        <p>{eventData?.nearestFutureEvent?.eventDate}</p>
                        <p>{convertTo12HourFormat(eventData?.nearestFutureEvent?.eventTime)}</p>
                        </div>
                    </div>
                </div>
            )
        }

        <div className="rounded-[14px] w-[370px] h-[171px] border-[1px] border-[#EAEBEF] bg-white flex items-center justify-center">
            <div className="w-[309.32px] flex flex-col gap-[34px]">
                <p className="text-[#000000] font-medium text-[16px]">Total expense on event</p>
                
                <span className="flex items-center justify-between">
                    <p className="text-[24px] font-semibold text-[#202224]">{totalExpenseOnEvent?.total.toLocaleString()}</p>
                    <span className={`flex items-center gap-1 font-semibold text-[16px] ${totalExpenseOnEvent?.percentageType === 'positive' ? 'text-[#00B69B]' : 'text-[#F93C65]'}`}>
                        <span className="flex items-center justify-center w-5 h-5">
                        {
                            totalExpenseOnEvent?.percentageType === 'positive' ? (
                            <svg width="20" height="13" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#00B69B]">
                                <path d="M14.2689 0.900391L16.4541 3.19039L11.7976 8.07039L7.98077 4.07039L0.910156 11.4904L2.25558 12.9004L7.98077 6.90039L11.7976 10.9004L17.809 4.61039L19.9941 6.90039V0.900391H14.2689Z" fill="#00B69B"/>
                            </svg>
                            ) : (
                            <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#F93C65]">
                                <path d="M14.2689 11.8495L16.4541 9.64224L11.7976 4.93862L7.98077 8.79405L0.910156 1.64224L2.25558 0.283203L7.98077 6.06634L11.7976 2.21091L17.809 8.27356L19.9941 6.06634V11.8495H14.2689Z" fill="#F93C65"/>
                            </svg>
                            )
                        }
                        </span>
                        {totalExpenseOnEvent?.percentage}%
                    </span>
                </span>
            </div>
        </div>
      </div>

    </div>
  )
}

export default RevenueCard
