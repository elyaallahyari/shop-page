import DashboardSidebar from '@/components/sidebar-dashboard'
import MenuButton from '@/ui/menu-button'
import { useState } from 'react'

export default function DashboardLayout({ children }) {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <div className="flex flex-row-reverse justify-between  w-full min-h-screen height_adjusted_content">
      <div className="flex min-h-screen">
        <DashboardSidebar isVisible={showMenu} />
      </div>
      <MenuButton toggleMenu={() => setShowMenu(!showMenu)} />

      <main className="flex flex-col justify-start items-center overflow-scroll w-full p-4">
        {children}
      </main>
    </div>
  )
}
