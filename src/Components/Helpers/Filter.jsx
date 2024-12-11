import { useState } from "react"

function Filter({ filterValue, setFilterValue }) {
    const [ showFilter, setShowFilter ] = useState(false)

    const toggleFilter = () => {
        setShowFilter((prev) => !prev)
    }
  return (
    <div>
      <div onClick={toggleFilter} className="py-[10px] px-[18px] bg-white text-gray-700 font-medium text-[16px] flex items-center gap-2 border-[1px] rounded-[8px] border-gray-300 shadow-sm cursor-pointer">
        <span className="flex items-center justify-center w-5 h-5">
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 12H18M3 6H21M9 18H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </span>
        Filters
      </div>

      {
        setShowFilter && (
            <div className=""></div>
        )
      }
    </div>
  )
}

export default Filter
