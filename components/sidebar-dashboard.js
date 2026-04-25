import Link from 'next/link'

export default function DashboardSidebar({ isVisible }) {
  return (
    <div className={`${isVisible ? 'block' : 'hidden'}`}>
      <aside className="flex-col justify-start items-center text-left h-full w-full max-w-50 bg-gray-100 pt-10 z-50 p-3">
        <ul className="flex flex-col gap-10 items-center ltr">
          <li className="menu_item">
            <Link href={'/dashboard'}>Home 🏠</Link>
          </li>
          <li className="menu_item">
            <Link href={'/dashboard/media'}>Media 📷</Link>
          </li>
          <li className="menu_item">
            <Link href={'/dashboard/product/add'}>Add item ➕</Link>
          </li>
        </ul>
      </aside>
    </div>
  )
}
