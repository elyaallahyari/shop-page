import ProductList from '@/components/product-list'
import DashboardLayout from '@/pages/dashboard/_layouts/dashboardLayout'
import AddButton from '@/ui/add-button'
import Link from 'next/link'

export async function getStaticProps() {
  const response = await fetch('http://localhost:4000/product')
  const products = await response.json()
  return { props: { products } }
}

export default function Dashboard({ products }) {
  return (
    <div className="flex flex-col justify-start items-center w-full h-screen p-3">
      <Link href={'/dashboard/product/add'}>
        <AddButton />
      </Link>
      <ProductList>
        {products ? (
          products.map((item) => (
            <tr
              key={item.id}
              className="*:p-3 *:text-center hover:bg-gray-100 rounded-md border-b border-gray-100"
            >
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.price}</td>
              <td>
                <Link href={'/'}>
                  <button className="bg-amber-300 hover:bg-amber-400 p-2 rounded">ویرایش</button>
                </Link>
                /
                <Link href={'/'}>
                  <button className="bg-red-500 hover:bg-red-600 p-2 rounded">حذف</button>
                </Link>
              </td>
            </tr>
          ))
        ) : (
          <p className="mt-3 max-w-250 notification_blue">محصولی یافت نشد!</p>
        )}
      </ProductList>
    </div>
  )
}

Dashboard.getLayout = function (page) {
  return <DashboardLayout>{page}</DashboardLayout>
}
