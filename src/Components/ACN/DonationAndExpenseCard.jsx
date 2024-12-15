import { useEffect } from "react"

function DonationAndExpenseCard({ setSelectedDate, selectedDate }) {
    const dateFilter = [
        {
            name: '12 months',
            value: '12mth',
        },
        {
            name: '3 months',
            value: '3mth',
        },
        {
            name: '30 days',
            value: '30days',
        },
        {
            name: '7 days',
            value: '7days',
        },
        {
            name: '24 hours',
            value: '24hrs',
        }
    ] 

    useEffect(() => {
        setSelectedDate(dateFilter[0].value)
    }, [ setSelectedDate ])

    const handleDate = (value) => {
        setSelectedDate(value)
    }
  return (
    <div className="w-full rounded-[12px] border-[1px] border-[#EAECF0] p-6 flex flex-col gap-5 shadow-sm">
      <div className="flex flex-col border-b-[1px] gap-5">
        <h2 className="text-lg font-semibold text-gray-900">Donations and expense</h2>

        <div className="flex items-center gap-2">
            {
                dateFilter.map((i) => (
                    <div key={i.value} onClick={() => handleDate(i.value)} className={`text-sm font-semibold py-[8px] px-[12px] rounded-[6px] cursor-pointer ${ selectedDate === i.value ? 'text-gray-700' : 'text-gray-500'} `}>
                        {i.name}
                    </div>
                ))
            }
        </div>
      </div>
    </div>
  )
}

export default DonationAndExpenseCard
