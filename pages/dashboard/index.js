import ProductList from '@/components/product-list'
import DashboardLayout from '@/pages/dashboard/_layouts/dashboardLayout'
import AddButton from '@/ui/add-button'

export default function Dashboard() {
  return (
    <div className="flex flex-col justify-start items-center w-full h-screen p-3">
      <AddButton />
      <ProductList />
    </div>
  )
}

Dashboard.getLayout = function (page) {
  return <DashboardLayout>{page}</DashboardLayout>
}
