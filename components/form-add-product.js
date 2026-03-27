// import { useState } from 'react'
// import MediaLibraryModal from '@/components/modals/modal-media-library'
// import Image from 'next/image'
// import useSWRMutation from 'swr/mutation' // توجه: ایمپورت از swr/mutation

// async function sendRequest(url, { arg }) {
//   // arg همان داده‌ای است که به trigger پاس می‌دهیم
//   return fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(arg)
//   }).then((res) => res.json())
// }

// export default function AddProductForm() {
//   const [showModal, setShowModal] = useState(false)
//   const [media, setMedia] = useState([]) // لیست عکس‌های انتخاب شده

//   const { trigger, isMutating } = useSWRMutation('http://localhost:4000/media', sendRequest)

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setMessage('')

//     try {
//       // ارسال داده به سرور
//       const result = await trigger({ url: urlInput })

//       // بررسی پاسخ سرور (طبق کد قبلی شما)
//       if (!result.ok) {
//         // فرض بر این است که سرور فیلد ok را برمی‌گرداند یا وضعیت را چک می‌کنیم
//         // اگر ساختار پاسخ سرورت متفاوت است اینجا را اصلاح کن
//         setMessage(result.message || 'خطایی رخ داد')
//         return
//       }

//       // اگر موفق بود
//       setMessage(result.message || 'تصویر با موفقیت ارسال شد')
//       setUrlInput('') // خالی کردن اینپوت

//       // بسیار مهم: دستور به SWR که لیست مدیا را آپدیت کند
//       if (mutateGlobal) {
//         mutateGlobal()
//       }
//     } catch (error) {
//       console.error(error)
//       setMessage('خطا در ارتباط با سرور')
//     }
//   }
//   // تابع برای افزودن یا حذف عکس از لیست انتخاب شده
//   const toggleMediaSelection = (item) => {
//     setMedia((prev) => {
//       const exists = prev.find((i) => i.id === item.id)
//       if (exists) {
//         return prev.filter((i) => i.id !== item.id)
//       } else {
//         return [...prev, item]
//       }
//     })
//   }

//   return (
//     <section className="flex flex-col justify-center items-center w-full max-w-200 _:flex_ :flex-col *:rounded-lg">
//       <form action={handleSubmit} className="flex flex-col max-w-100 gap-3.5 w-full">
//         <label className="label" htmlFor="images">
//           عکس‌ها
//         </label>

//         {/* پاس دادن توابع و استیت‌های لازم به مودال */}
//         <MediaLibraryModal
//           isVisible={showModal}
//           selectedItems={media}
//           onToggleSelection={toggleMediaSelection}
//           onClose={() => setShowModal(false)}
//         />

//         <div className="flex flex-row justify-center items-center input cursor-pointer gap-3">
//           <div className="flex flex-row gap-1">
//             {media &&
//               media.map((item) => (
//                 <div key={item.id} className="border border-gray-100 rounded">
//                   <Image src={item?.url} width={90} height={90} alt={item?.url} />
//                 </div>
//               ))}
//           </div>
//           <div
//             className="flex flex-row justify-center items-center w-full input"
//             onClick={() => setShowModal(!showModal)}
//           >
//             +
//           </div>
//         </div>

//         <label className="label" htmlFor="title">
//           عنوان محصول
//         </label>
//         <input className="input" type="text" />

//         <label className="label" htmlFor="price">
//           قیمت
//         </label>
//         <input className="input" type="number" />

//         <button
//           type="submit"
//           disabled={isMutating}
//           className="cursor-pointer bg-green-600 hover:bg-green-500 rounded-lg p-2 font-semibold mt-6"
//         >
//           {isMutating ? 'در حال ارسال..' : 'ساخت'}
//         </button>
//       </form>
//     </section>
//   )
// }

import { useState } from 'react'
import MediaLibraryModal from '@/components/modals/modal-media-library'
import Image from 'next/image'
import useSWRMutation from 'swr/mutation'

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
  const [media, setMedia] = useState([]) // لیست آبجکت‌های تصویر انتخاب شده
  const [message, setMessage] = useState('')

  const { trigger, isMutating } = useSWRMutation('http://localhost:4000/product', sendRequest)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')

    // دریافت مقادیر از فرم با استفاده از FormData
    const formData = new FormData(e.currentTarget)
    const title = formData.get('title')
    const price = formData.get('price')

    // استخراج آیدی‌ها از لیست مدیا
    const mediaIds = media.map((item) => item.id)

    // اعتبارسنجی ساده
    if (!title || !price) {
      setMessage('لطفا عنوان و قیمت را وارد کنید')
      return
    }

    try {
      // ساخت آبجکت دقیقاً طبق فرمت درخواستی
      const payload = {
        title: title,
        price: Number(price), // اطمینان از اینکه قیمت عدد است
        media: mediaIds
      }

      const result = await trigger(payload)

      if (!result.ok) {
        setMessage(result.message || 'خطایی رخ داد')
        return
      }

      setMessage('محصول با موفقیت ساخته شد')
      setMedia([]) // پاک کردن لیست انتخاب شده
      e.target.reset() // پاک کردن اینپوت‌های فرم (عنوان و قیمت)

      // اگر نیاز به آپدیت کردن کش سرور دارید
      // mutateGlobal()
    } catch (error) {
      console.error(error)
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
      <form onSubmit={handleSubmit} className="flex flex-col max-w-100 gap-3.5 w-full">
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

        {/* نمایش پیام‌ها */}
        {message && (
          <div
            className={`p-2 rounded text-sm ${message.includes('خطا') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}
          >
            {message}
          </div>
        )}

        <label className="label" htmlFor="title">
          عنوان محصول
        </label>
        {/* اضافه کردن ویژگی name */}
        <input className="input" type="text" name="title" />

        <label className="label" htmlFor="price">
          قیمت
        </label>
        {/* اضافه کردن ویژگی name */}
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
