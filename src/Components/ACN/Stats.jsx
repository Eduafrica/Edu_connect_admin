import { useFetchDonationStats } from "../../Helpers/acn/fetch.hooks"

function Stats({ data, loading }) {
  /**
   const dataObject = {
     totalDonations: {
       total: 40689,
       percentage: 8.5,
       percentageType: 'positive',
     },
     totalExpense: {
       total: 10293,
       percentage: 1.3,
       percentageType: 'positive',
     },
     totalDonationsAmount: {
       total: 89000,
       percentage: 4.3,
       percentageType: 'negative',
     },
     totalSuccessfulDonation: {
       total: 2040,
       percentage: 1.5,
       percentageType: 'positive',
     }
   }
   * 
   */

   const { data: donationStatsData, isFetching: loadingDonationStats } = useFetchDonationStats('30days')
   const donationReport = donationStatsData?.data
    const dataObject = data || donationReport
  return (
    <div className='w-full flex items-center gap-[33px] justify-between'>
      <div className="card1 bg-white">
        <div className="flex flex-col gap-[34px] w-full">
          <h3 className='text-[16px[ font-medium text-acn-main-color'>Total no of donations</h3>
          <div className="flex items-center gap-[60px] justify-between">
            <p className="font-semibold text-[24px] text-text-color-4">{dataObject?.totalDonations?.total.toLocaleString()}</p>
            <span className={`flex items-center gap-1 font-semibold text-[16px] ${dataObject?.totalDonations?.percentageType === 'positive' ? 'text-[#00B69B]' : 'text-[#F93C65]'}`}>
              <span className="flex items-center justify-center w-5 h-5">
                  {
                    dataObject?.totalDonations?.percentageType === 'positive' ? (
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
              {dataObject?.totalDonations?.percentage}%
            </span>
          </div>
        </div>
      </div>
      <div className="card1 bg-white">
        <div className="flex flex-col gap-[34px] w-full">
          <h3 className='text-[16px[ font-medium text-[#F04438]'>Total expenses</h3>
          <div className="flex items-center gap-[60px] justify-between">
            <p className="font-semibold text-[24px] text-text-color-4">${dataObject?.totalExpense?.total.toLocaleString()}</p>
            <span className={`flex items-center gap-1 font-semibold text-[16px] ${dataObject?.totalExpense?.percentageType === 'positive' ? 'text-[#00B69B]' : 'text-[#F93C65]'}`}>
              <span className="flex items-center justify-center w-5 h-5">
                {
                  dataObject?.totalExpense?.percentageType === 'positive' ? (
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
              {dataObject?.totalExpense?.percentage}%
            </span>
          </div>
        </div>
      </div>
      <div className="card1 bg-white">
        <div className="flex flex-col gap-[34px] w-full">
          <h3 className='text-[16px[ font-medium text-[#12B76A]'>Total donations</h3>
          <div className="flex items-center gap-[60px] justify-between">
            <p className="font-semibold text-[24px] text-text-color-4">${dataObject?.totalDonationsAmount?.total.toLocaleString()}</p>
            <span className={`flex items-center gap-1 font-semibold text-[16px] ${dataObject?.totalDonationsAmount?.percentageType === 'positive' ? 'text-[#00B69B]' : 'text-[#F93C65]'}`}>
              <span className="flex items-center justify-center w-5 h-5">
                  {
                    dataObject?.totalDonationsAmount?.percentageType === 'positive' ? (
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
              {dataObject?.totalDonationsAmount?.percentage}%
            </span>
          </div>
        </div>
      </div>
      <div className="card1 bg-white">
        <div className="flex flex-col gap-[34px] w-full">
          <h3 className='text-[16px[ font-medium text-acn-main-color'>Total successful donation</h3>
          <div className="flex items-center gap-[60px] justify-between">
            <p className="font-semibold text-[24px] text-text-color-4">{dataObject?.totalSuccessfulDonation?.total.toLocaleString()}</p>
            <span className={`flex items-center gap-1 font-semibold text-[16px] ${dataObject?.totalSuccessfulDonation?.percentageType === 'positive' ? 'text-[#00B69B]' : 'text-[#F93C65]'}`}>
              <span className="flex items-center justify-center w-5 h-5">
                  {
                    dataObject?.totalSuccessfulDonation?.percentageType === 'positive' ? (
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
              {dataObject?.totalSuccessfulDonation?.percentage}%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stats

