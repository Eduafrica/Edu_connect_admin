import { Link } from "react-router-dom"

function DashBoardLinks({ name, color }) {

    const menu = [
        {
            name: 'Educonnect',
            slug: 'educonnect',
            link: '/edu-connect/dashboard',
        },
        {
            name: 'EduAfrica',
            slug: 'eduafrica',
            link: '/edu-africa/dashboard',
        },
        {
            name: 'Arewa hub',
            slug: 'arewahub',
            link: '/arewahub/dashboard',
        },
        {
            name: 'African Child Network',
            slug: 'acn',
            link: '/acn/dashboard',
        },
    ]
  return (
    <div className="w-full flex items-center gap-4 border-b-[1px] border-[#D9DBE9]">
      {
        menu.map((i, idx) => (
            <Link to={`${i?.link}`} key={idx} className={`min-w-[103px] border-b-[2px] pt-[1px] pb-[11px] px-[4px] flex gap-2 flex-col text-[14px] font-semibold text-center ${ name === i.slug ? `${color}` : 'border-transparent text-gray-700'} `}>
                {i.name}
            </Link>
        ))
      }
    </div>
  )
}

export default DashBoardLinks
