import { useEffect } from "react"

function Graph({ selectedDateValue, setSelectedDateValue }) {

    const dateFilter = [
        {
            text: '12 months',
            value: '12mth'
        },
        {
            text: '3 months',
            value: '3mth'
        },
        {
            text: '30 days',
            value: '30days'
        },
        {
            text: '7 days',
            value: '7days'
        },
        {
            text: '24 hours',
            value: '24 hours'
        },
    ]

    useEffect(() => {
        setSelectedDateValue(dateFilter[0].value)
    }, [selectedDateValue, setSelectedDateValue])

    const handleDateFilter = (value) => {
        setSelectedDateValue(value)
    }

  return (
    <div className="flex items-start gap-8 justify-between">
        <div className="flex-[6] flex flex-col border-[1px] rounded-[12px] gap-5 p-6 border-[#EAECF0] shadow-sm"> 
            <div className="flex flex-col gap-5 pb-[8px]">
                <h2 className="text-lg font-semibold text-gray-900">Web traffic</h2>

                <div className="flex items-center gap-2">
                    {
                        dateFilter.map((i, idx) => (
                            <div key={idx} onClick={() => handleDateFilter(i.value)} className={`cursor-pointer py-2 px-3 flex items-center justify-center gap-2 rounded-[6px] text-sm font-semibold ${i.value === selectedDateValue ? 'bg-gray-50 text-gray-700' : 'text-gray-500'}`}>
                                {i.text}
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className=""></div>
        </div>

        <div className="flex-[4] rounded-[12px] border-[1px] border-gray-200 bg-white p-6 flex flex-col gap-[67px] shadow-sm">
            <div className="flex items-center justify-between gap-5">
                <p className="text-lg text-gray-900 font-semibold">Clicks breakdown</p>

                <span className="flex items-center justify-center w-5 h-5">
                    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
                        <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </span>
            </div>

            <div className="flex items-start gap-6 justify-between">
                {/**PIE CHART */}

                {/** */}

            </div>
        </div>
    </div>
  )
}

export default Graph
