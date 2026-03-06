import MediaLibrary from '@/components/media-library'
import BackButton from '@/ui/back-button'
import Link from 'next/link'
import DashboardLayout from '@/pages/dashboard/_layouts/dashboardLayout'
import AddButton from '@/ui/add-button'

export default function Mediaa() {
  return (
    <div className="flex flex-col justify-start items-center w-full h-screen p-3">
      <AddButton />
      <MediaLibrary />
      <Link href={'/dashboard'}>
        <BackButton />
      </Link>
    </div>
  )
}

Mediaa.getLayout = function (page) {
  return <DashboardLayout>{page}</DashboardLayout>
}
