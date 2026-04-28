import { useState } from 'react'
import MediaLibraryModal from '@/components/modals/modal-media-library'
import Image from 'next/image'
import useSWRMutation from 'swr/mutation'
import { GrFormAdd } from 'react-icons/gr'
import { mutate } from 'swr'

async function sendRequest(url, { arg }) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(arg)
  }).then((res) => res.json())
}

export default function AddProductForm() {
  const [showModal, setShowModal] = useState(false)
  const [media, setMedia] = useState([])
  const [message, setMessage] = useState('')

  const { trigger, isMutating } = useSWRMutation('http://localhost:4000/product', sendRequest)

  const action = async (formData) => {
    setMessage('')
    const mediaIds = media.map((item) => item.id)

    const payload = {
      title: formData.get('title'),
      price: Number(formData.get('price')),
      media: mediaIds
    }

    try {
      const result = await trigger(payload)

      if (!result.ok) {
        setMessage(result.message || 'خطایی رخ داد')
        return
      }

      mutate()
      setMedia([])
      setMessage('محصول با موفقیت ساخته شد')
    } catch (error) {
      setMessage('خطا در ارتباط با سرور')
    }
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
    <section className="flex flex-col justify-center items-center w-full max-w-200 _:flex_ :flex-col *:rounded-lg">
      <form action={action} className="flex flex-col max-w-100 gap-3.5 w-full">
        {message && (
          <div
            className={`p-2 rounded text-sm ${message.includes('خطا') ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}
          >
            {message}
          </div>
        )}

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
            <GrFormAdd />
          </div>
        </div>

        <label className="label" htmlFor="title">
          عنوان محصول
        </label>
        <input className="input" type="text" name="title" />

        <label className="label" htmlFor="price">
          قیمت
        </label>
        <input className="input" type="number" name="price" />

        <button
          type="submit"
          disabled={isMutating}
          className="cursor-pointer bg-green-600 hover:bg-green-500 rounded-lg p-2 font-semibold mt-6"
        >
          {isMutating ? 'در حال ارسال..' : 'ساخت'}
        </button>
      </form>
    </section>
  )
}
