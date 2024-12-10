import { Link } from "react-router-dom"

function DashBoardLinks({ name }) {

    const menu = [
        {
            name: 'Educonnect',
            slug: 'educonnect'
        },
        {
            name: 'EduAfrica',
            slug: 'eduAfrica'
        },
        {
            name: 'Arewa hub',
            slug: 'arewahub'
        },
        {
            name: 'African Child Network',
            slug: 'acn'
        },
    ]
  return (
    <div className="w-full flex items-center gap-4 border-b-[1px] border-[#D9DBE9]">
      {
        menu.map((i, idx) => (
            <Link key={idx} className={`min-w-[103px] border-b-[2px] pt-[1px] pb-[11px] px-[4px] flex gap-2 flex-col text-[14px] font-semibold ${ name === i.slug ? 'text-edu-main-color border-edu-main-color' : 'border-transparent text-gray-700'} `}>
                {i.name}
            </Link>
        ))
      }
    </div>
  )
}

export default DashBoardLinks
