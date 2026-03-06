import ProductList from '@/components/product-list'
import DashboardSidebar from '@/components/sidebar-dashboard'
import MenuButton from '@/ui/menu-button'
import Link from 'next/link'
import { useState } from 'react'

export default function DashboardLayout({ children }) {
  const [showMenu, setShowMenu] = useState(true)
  console.log(showMenu)
  return (
    <div className="flex flex-row justify-start items-center w-screen height_adjusted_content">
      <main className="flex flex-col justify-start items-center width_adjusted_content">
        {children}
      </main>

      <DashboardSidebar className={showMenu ? 'hidden' : 'visible'} />
      <MenuButton onClick={() => setShowMenu(!showMenu)} />

      {/* <button
        className="bg-gray-300 hover:bg-gray-200 rounded-lg px-4 py-2 cursor-pointer absolute right-6 bottom-6 shadow"
        onClick={() => setShowMenu(!showMenu)}
      >
        ⑆
      </button>

      <div className={showMenu ? 'hidden' : 'visible'}>
        <section className="flex-col justify-start items-center text-left h-screen w-full max-w-50 bg-gray-100 absolute top-19 left-0 pt-10">
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
        </section>
      </div> */}
    </div>
  )
}
