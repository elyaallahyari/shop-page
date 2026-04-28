import ProductList from '@/components/product-list'
import DashboardLayout from '@/pages/dashboard/_layouts/dashboardLayout'
import AddButton from '@/ui/add-button'
import Link from 'next/link'
import useSWR from 'swr'
import { useState } from 'react'
import Image from 'next/image'
import MediaLibraryModal from '@/components/modals/modal-media-library'
import useSWRMutation from 'swr/mutation'

const fetcher = (url) => fetch(url).then((res) => res.json())

async function UpdateProduct(url, { arg }) {
  const { id, ...data } = arg
  return fetch(`${url}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'Application/json' },
    body: JSON.stringify(data)
  }).then((res) => res.json())
}

async function DeleteProduct(url, { arg }) {
  return fetch(`${url}/${arg}`, {
    method: 'DELETE'
  }).then((res) => res.json())
}

export default function Dashboard() {
  const {
    data: products,
    error,
    isLoading,
    mutate
  } = useSWR('http://localhost:4000/product', fetcher)

  const { trigger: updateTrigger, isMutating: isUpdating } = useSWRMutation(
    'http://localhost:4000/product',
    UpdateProduct
  )

  const { trigger: deleteTrigger, isMutating: isDeleting } = useSWRMutation(
    'http://localhost:4000/product',
    DeleteProduct
  )

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [media, setMedia] = useState([])

  const mediaIds = media.map((item) => item.id)

  const action = async (formData) => {
    const userData = {
      media: mediaIds,
      title: formData.get('title'),
      price: Number(formData.get('price'))
    }
    try {
      await updateTrigger({ id: editingProduct.id, ...userData })
      mutate()
      setMedia([])
      setEditingProduct(null)
    } catch (error) {
      return error.message
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('آیا مطمئن هستید؟')) return

    try {
      await deleteTrigger(id)
      mutate()
    } catch (error) {
      alert('خطا در حذف: ' + error.message)
    }
  }

  const handleEditClick = (item) => {
    setEditingProduct(item)
    setIsModalOpen(true)
    if (item.media) {
      setMedia(item.media)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingProduct(null)
  }

  const toggleMediaSelection = (item) => {
    setMedia((prev) => {
      const exists = prev.find((i) => i.id === item.id)
      if (exists) {
        return prev.filter((i) => i.id !== item.id)
      } else {
        return [...prev, item]
      }
    })
  }

  return (
    <div className="flex flex-col justify-start items-center w-full p-1 lg:p-3">
      <Link href={'/dashboard/product/add'}>
        <AddButton />
      </Link>

      {isLoading ? 'در حال دریافت اطلاعات...' : 'نمایش داده ها'}
      {error && error.message}

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
                  className="bg-amber-300 hover:bg-amber-400 p-1 rounded cursor-pointer"
                >
                  ویرایش
                </button>
                /
                <button
                  onClick={() => handleDelete(item.id)}
                  disabled={isDeleting}
                  className="bg-red-500 hover:bg-red-600 p-1 rounded cursor-pointer"
                >
                  {isDeleting ? 'حذف...' : 'حذف'}
                </button>
              </td>
            </tr>
          ))
        ) : (
          <p className="mt-3 max-w-250 notification_blue">محصولی یافت نشد!</p>
        )}
      </ProductList>

      {isModalOpen && editingProduct && (
        <div className="fixed inset-0 bg-black/90 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-xl font-bold mb-4">ویرایش محصول</h2>
            <div className="bg-yellow-100 p-2 rounded mb-5">
              در حال ویرایش : {editingProduct.title}
            </div>
            <form action={action}>
              <label className="label" htmlFor="images">
                عکس‌ها
              </label>

              <MediaLibraryModal
                isVisible={showModal}
                selectedItems={media}
                onToggleSelection={toggleMediaSelection}
                onClose={() => setShowModal(false)}
              />

              <div className="flex flex-row justify-center items-center input cursor-pointer gap-3">
                <div className="flex flex-row gap-1">
                  {media &&
                    media.map((item) => (
                      <div key={item.id} className="border border-gray-100 rounded">
                        <Image src={item?.url} width={90} height={90} alt={item?.url} />
                      </div>
                    ))}
                </div>
                <div
                  className="flex flex-row justify-center items-center w-full input"
                  onClick={() => setShowModal(!showModal)}
                >
                  +
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">عنوان محصول</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={editingProduct?.title || ''}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">قیمت</label>
                <input
                  type="number"
                  name="price"
                  defaultValue={editingProduct?.price || ''}
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
                  disabled={isUpdating}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
                >
                  {isUpdating ? 'در حال ذخیره...' : 'ذخیره'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

Dashboard.getLayout = function (page) {
  return <DashboardLayout>{page}</DashboardLayout>
}
