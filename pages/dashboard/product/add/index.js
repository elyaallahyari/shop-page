import AddProductForm from '@/components/form-add-product'
import DashboardLayout from '@/pages/dashboard/_layouts/dashboardLayout'
import BackButton from '@/ui/back-button'
import Link from 'next/link'

export default function AddProduct() {
  async function POSTProduct() {
    const req = await fetch('http://localhost:4000/product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
  }
  return (
    <div className="flex flex-col justify-start items-center  w-full h-screen p-3">
      <AddProductForm />
      <Link href={'/dashboard'}>
        <BackButton />
      </Link>
    </div>
  )
}

AddProduct.getLayout = function (page) {
  return <DashboardLayout>{page}</DashboardLayout>
}
