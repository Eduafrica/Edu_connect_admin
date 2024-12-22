import Spinner from '../Helpers/Spinner';
import { Link } from 'react-router-dom';
import { formatDateAndTime } from '../../Helpers/formatDateAndTime';

function TopSellingProducts({ text, data, loading }) {
  return (
    <div className="w-[618px] border-[1px] border-[#F1F1F1] rounded-[10px] shadow-sm">
        {/**TOP */}
        <div className="w-full flex items-center gap-[50px]">
          <div className="flex items-center min-w-[140px] w-full pt-[20px] pl-[25px]">
            <h2 className="text-lg font-semibold text-[#121212] w-full">{ text ? text : `Top 5 Selling Products` }</h2>
          </div>
        </div>

                {/**BODY */}
        {/* Render the current data here */}
        <table className="min-w-full mt-12 rounded-t-[12px] bg-white">
          <thead className="rounded-t-[12px]">
            <tr className="bg-[#F5F7F9] border-b-[1px] rounded-t-[2px]">
              <th className="px-6 py-3 text-left text-[#585858] font-medium text-[12px] tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-[#585858] font-medium text-[12px] tracking-wider">
                Price
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
                        {item?.expense}
                      </div>
                    </td>
                    {/* expense amount */}
                    <td className="px-6 py-4">
                      <div className="text-[18px] font-medium text-[#06152B] flex-col">
                        N{item?.amount.toLocaleString()}
                      </div>
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

export default TopSellingProducts
