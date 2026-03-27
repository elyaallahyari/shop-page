import { useState } from 'react'
import useSWRMutation from 'swr/mutation' // توجه: ایمپورت از swr/mutation

// تابعی برای ارسال درخواست POST
async function sendRequest(url, { arg }) {
  // arg همان داده‌ای است که به trigger پاس می‌دهیم
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(arg)
  }).then((res) => res.json())
}

export default function CreateMediaForm({ mutateGlobal }) {
  // برای مدیریت ورودی‌ها از useState استفاده می‌کنیم (چون فرم سروری نیست)
  const [urlInput, setUrlInput] = useState('')
  const [message, setMessage] = useState('')

  // استفاده از useSWRMutation
  // آرگومان اول: آدرس API
  // آرگومان دوم: تابع ارسال کننده
  const { trigger, isMutating } = useSWRMutation('http://localhost:4000/media', sendRequest)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')

    try {
      // ارسال داده به سرور
      const result = await trigger({ url: urlInput })

      // بررسی پاسخ سرور (طبق کد قبلی شما)
      if (!result.ok) {
        // فرض بر این است که سرور فیلد ok را برمی‌گرداند یا وضعیت را چک می‌کنیم
        // اگر ساختار پاسخ سرورت متفاوت است اینجا را اصلاح کن
        setMessage(result.message || 'خطایی رخ داد')
        return
      }

      // اگر موفق بود
      setMessage(result.message || 'تصویر با موفقیت ارسال شد')
      setUrlInput('') // خالی کردن اینپوت

      // بسیار مهم: دستور به SWR که لیست مدیا را آپدیت کند
      if (mutateGlobal) {
        mutateGlobal()
      }
    } catch (error) {
      console.error(error)
      setMessage('خطا در ارتباط با سرور')
    }
  }

  return (
    <section className="flex flex-col justify-center items-center max-w-100 h-40 w-full shadow rounded-md p-3">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-start w-full gap-3"
      >
        <label htmlFor="url" className="label">
          URL تصویر را وارد کنید:
        </label>
        <input
          type="text"
          placeholder="url..."
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          className="input"
        />

        {message && <p className="text-sm text-blue-500">{message}</p>}

        <button
          type="submit"
          disabled={isMutating}
          className="bg-green-600 cursor-pointer p-2 rounded shadow text-white disabled:opacity-50"
        >
          {isMutating ? 'در حال ارسال..' : 'ارسال تصویر'}
        </button>
      </form>
    </section>
  )
}
