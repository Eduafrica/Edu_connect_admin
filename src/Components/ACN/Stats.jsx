
function Stats() {
  const dataObject = {
    totalDonations: {
      total: 40689
    },
    totalExpense: {
      total: 10293
    },
    totalDonationsAmount: {
      total: 89000
    },
    totalPeopleReached: {
      total: 2040
    }
  }
  return (
    <div className='w-full flex items-center gap-[33px] justify-between'>
      <div className="card1 bg-white">
        <div className="flex flex-col gap-[34px]">
          <h3 className='text-[16px[ font-medium text-acn-main-color'>Total no of donations</h3>
          <div className="flex items-center gap-[60px] justify-between">
            <p className="font-semibold text-[24px] text-text-color-4">{dataObject?.totalDonations?.total.toLocaleString()}</p>
            <span className={`flex items-center gap-1`}>
              {

              }
            </span>
          </div>
        </div>
      </div>
      <div className="card1 bg-white">
        <div className="flex flex-col gap-[34px]">
          <h3 className='text-[16px[ font-medium text-[#F04438]'>Total expenses</h3>
          <div className="flex items-center gap-[60px] justify-between">
            <p className="font-semibold text-[24px] text-text-color-4">${dataObject?.totalExpense?.total.toLocaleString()}</p>
            <span className={`flex items-center gap-1`}>
              {

              }
            </span>
          </div>
        </div>
      </div>
      <div className="card1 bg-white">
        <div className="flex flex-col gap-[34px]">
          <h3 className='text-[16px[ font-medium text-[#12B76A]'>Total donations</h3>
          <div className="flex items-center gap-[60px] justify-between">
            <p className="font-semibold text-[24px] text-text-color-4">${dataObject?.totalDonationsAmount?.total.toLocaleString()}</p>
            <span className={`flex items-center gap-1`}>
              {

              }
            </span>
          </div>
        </div>
      </div>
      <div className="card1 bg-white">
        <div className="flex flex-col gap-[34px]">
          <h3 className='text-[16px[ font-medium text-acn-main-color'>Total people impacted</h3>
          <div className="flex items-center gap-[60px] justify-between">
            <p className="font-semibold text-[24px] text-text-color-4">{dataObject?.totalPeopleReached?.total.toLocaleString()}</p>
            <span className={`flex items-center gap-1`}>
              {

              }
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stats

