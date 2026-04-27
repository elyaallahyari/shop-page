import Link from 'next/link'
import { TbHome } from 'react-icons/tb'

export default function DashboardSidebar({ isVisible }) {
  return (
    <div className={`${isVisible ? 'block' : 'hidden'}`}>
      <aside className="flex-col justify-start items-center text-left h-full w-full max-w-50 bg-gray-100 pt-10 z-50 p-3">
        <ul className="flex flex-col gap-10 items-center ltr">
          <li className="menu_li">
            <Link href={'/dashboard'} className="menu_link">
              Home <TbHome />
            </Link>
          </li>
          <li className="menu_li">
            <Link href={'/dashboard/media'} className="menu_link">
              Media 📷
            </Link>
          </li>
          <li className="menu_li">
            <Link href={'/dashboard/product/add'} className="menu_link">
              Add item ➕
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  )
}
