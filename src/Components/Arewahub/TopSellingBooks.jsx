import Spinner from '../Helpers/Spinner';
import { Link } from 'react-router-dom';
import { formatDateAndTime } from '../../Helpers/formatDateAndTime';

function TopSellingBooks({ text, data, loading }) {
  return (
    <div className="w-[618px] border-[1px] border-[#F1F1F1] rounded-[10px] shadow-sm">
        {/**TOP */}
        <div className="w-full flex items-center gap-[50px]">
          <div className="flex items-center min-w-[140px] w-full pt-[20px] pl-[25px]">
            <h2 className="text-lg font-semibold text-[#121212] w-full">{ text ? text : `Top 5 Selling Books` }</h2>
          </div>
        </div>

                {/**BODY */}
        {/* Render the current data here */}
        <table className="min-w-full mt-12 rounded-t-[12px] bg-white">
          <thead className="rounded-t-[12px]">
            <tr className="bg-[#F5F7F9] border-b-[1px] rounded-t-[2px]">
              <th className="px-6 py-3 text-left text-[#585858] font-medium text-[12px] tracking-wider">
                Store
              </th>
              <th className="px-6 py-3 text-left text-[#585858] font-medium text-[12px] tracking-wider">
                Orders
              </th>
              <th className="px-6 py-3 text-left text-[#585858] font-medium text-[12px] tracking-wider">
                Earnings
              </th>
              <th className="px-6 py-3 text-left text-[#585858] font-medium text-[12px] tracking-wider">
                
              </th>
            </tr>
          </thead>
          <tbody>
            {
              loading ? (
                <div className="flex items-center justify-center w-full">
                  <Spinner />
                </div>
              ) :
              data?.map((item) => {
                const { formattedDate, formattedTime } = formatDateAndTime(
                  item?.createdAt
                );
                return (
                  <tr key={item?._id} className="border-t border-gray-200">
                    {/* name */}
                    <td className="px-6 py-4">
                      <div className="font-medium text-[18px] text-[#06152B]">
                        {item?.firstName}
                      </div>
                      <div className="text-[18px] font-medium text-[#06152B]">
                        {item?.lastName}
                      </div>
                    </td>
                    {/* email */}
                    <td className="px-6 py-4">
                        {item?.email}
                    </td>
                    {/* donation amount */}
                    <td className="px-6 py-4">
                      <div className="text-[18px] font-medium text-[#06152B] flex-col">
                        N{item?.amount.toLocaleString()}
                      </div>
                    </td>
                    {/* More */}
                    <td className="px-6 py-4">
                      <Link to={''} className="flex items-center gap-2">
                        <span className="flex items-center justify-center w-5 h-5">
                            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='text-[#929292]'>
                                <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </span>
                      </Link>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
    </div>
  )
}

export default TopSellingBooks
