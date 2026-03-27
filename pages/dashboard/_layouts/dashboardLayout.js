import DashboardSidebar from '@/components/sidebar-dashboard'
import MenuButton from '@/ui/menu-button'
import { useState } from 'react'

export default function DashboardLayout({ children }) {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <div className="flex flex-row justify-start items-center w-screen height_adjusted_content">
      <DashboardSidebar isVisible={showMenu} />
      <MenuButton toggleMenu={() => setShowMenu(!showMenu)} />

      <main className="flex flex-col justify-start items-center width_adjusted_content">
        {children}
      </main>
    </div>
  )
}
