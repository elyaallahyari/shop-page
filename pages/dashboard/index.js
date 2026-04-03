import ProductList from '@/components/product-list'
import DashboardLayout from '@/pages/dashboard/_layouts/dashboardLayout'
import AddButton from '@/ui/add-button'
import Link from 'next/link'
import useSWR from 'swr'
import { useState } from 'react'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Dashboard() {
  const {
    data: products,
    error,
    isLoading,
    mutate
  } = useSWR('http://localhost:4000/product', fetcher)

  const [deletingId, setDeletingId] = useState(null)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [isSaving, setIsSaving] = useState(false)

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

  const handleEditClick = (product) => {
    setEditingProduct({ ...product })
    setIsModalOpen(true)
  }

  const handleSaveEdit = async () => {
    if (!editingProduct) return

    setIsSaving(true)
    try {
      const updateUrl = `http://localhost:4000/product/${editingProduct.id}`

      const response = await fetch(updateUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: editingProduct.title,
          price: editingProduct.price
        })
      })

      if (!response.ok) {
        throw new Error('خطا در ذخیره اطلاعات')
      }

      mutate()
      setIsModalOpen(false)
      setEditingProduct(null)
    } catch (error) {
      alert('مشکلی در ذخیره اطلاعات پیش آمد')
    } finally {
      setIsSaving(false)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingProduct(null)
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
                <button
                  onClick={() => handleEditClick(item)}
                  className="bg-amber-300 hover:bg-amber-400 p-2 rounded cursor-pointer"
                >
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

      {isModalOpen && editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-xl font-bold mb-4">ویرایش محصول</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">عنوان محصول</label>
              <input
                type="text"
                value={editingProduct.title}
                onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">قیمت</label>
              <input
                type="number"
                value={editingProduct.price}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, price: Number(e.target.value) })
                }
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                انصراف
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={isSaving}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
              >
                {isSaving ? 'در حال ذخیره...' : 'ذخیره'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

Dashboard.getLayout = function (page) {
  return <DashboardLayout>{page}</DashboardLayout>
}
