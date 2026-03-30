import ProductList from '@/components/product-list'
import DashboardLayout from '@/pages/dashboard/_layouts/dashboardLayout'
import AddButton from '@/ui/add-button'
import Link from 'next/link'
import useSWR from 'swr'
import { useState } from 'react'

const fetcher = (url) => fetch(url).then((res) => res.json())

// export async function getStaticProps() {
//   const response = await fetch('http://localhost:4000/product')
//   const products = await response.json()
//   return { props: { products } }
// }

export default function Dashboard() {
  const {
    data: products,
    error,
    isLoading,
    mutate
  } = useSWR('http://localhost:4000/product', fetcher)

  const [deletingId, setDeletingId] = useState(null)
  const handleDelete = async (id) => {
    if (!id) return

    if (confirm(`آیا از حذف تصویر با شناسه ${id} مطمئن هستید؟`)) {
      setDeletingId(id)

      try {
        const deleteUrl = `http://localhost:4000/product/${id}`

        const response = await fetch(deleteUrl, {
          method: 'DELETE'
        })
        if (!response.ok) {
          throw new Error('خطا در ارتباط با سرور برای حذف')
        }
        mutate()
      } catch (error) {
        alert('مشکلی در حذف تصویر پیش آمد')
      } finally {
        setDeletingId(null)
      }
    }
  }
  if (isLoading) return <div>در حال بارگذاری...</div>
  if (error) return <div>خطا در دریافت اطلاعات</div>

  return (
    <div className="flex flex-col justify-start items-center w-full h-screen p-3">
      <Link href={'/dashboard/product/add'}>
        <AddButton />
      </Link>
      <ProductList>
        {products && products.length > 0 ? (
          products.map((item) => (
            <tr
              key={item.id}
              className="*:p-3 *:text-center hover:bg-gray-100 rounded-md border-b border-gray-100"
            >
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.price}</td>
              <td>
                <button className="bg-amber-300 hover:bg-amber-400 p-2 rounded cursor-pointer">
                  ویرایش
                </button>
                /
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDelete(item?.id)
                  }}
                  disabled={deletingId === item?.id}
                  className="bg-red-500 hover:bg-red-600 p-2 rounded cursor-pointer"
                >
                  حذف
                </button>
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
