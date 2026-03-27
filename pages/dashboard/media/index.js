import MediaLibrary from '@/components/media-library'
import BackButton from '@/ui/back-button'
import Link from 'next/link'
import DashboardLayout from '@/pages/dashboard/_layouts/dashboardLayout'
import CreateMediaForm from '@/components/form-create-media'
import useSWR, { useSWRConfig } from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())
export default function Mediaa() {
  const { mutate } = useSWRConfig()

  useSWR('http://localhost:4000/media', fetcher)

  return (
    <div className="flex flex-col justify-start items-center w-full h-screen p-4 gap-10">
      <CreateMediaForm mutateGlobal={mutate} />

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
