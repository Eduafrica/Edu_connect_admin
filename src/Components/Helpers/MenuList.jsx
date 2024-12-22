import { Link } from "react-router-dom"

function MenuList({ data, onCLick, activeCard, activeStyle }) {

  return (
    <div className="w-full flex items-center gap-4 border-b-[1px] border-[#D9DBE9]">
      {
        data.map((i, idx) => (
            <div key={idx} onClick={() => onCLick(i.slug)} className={`min-w-[103px] cursor-pointer border-b-[2px] pt-[1px] pb-[11px] px-[4px] flex gap-2 flex-col text-center text-[14px] font-semibold ${ activeCard === i.slug ? `text-edu-main-color border-edu-main-color ${activeStyle}` : 'border-transparent text-gray-700'}  `}>
                {i.name}
            </div>
        ))
      }
    </div>
  )
}

export default MenuList
