import { useState } from 'react'
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

export default function CreateMediaForm({ mutateGlobal }) {
  const [urlInput, setUrlInput] = useState('')
  const [message, setMessage] = useState('')

  const { trigger, isMutating } = useSWRMutation('http://localhost:4000/media', sendRequest)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')

    try {
      const result = await trigger({ url: urlInput })

      if (!result.ok) {
        setMessage(result.message || 'خطایی رخ داد')
        return
      }

      setMessage(result.message || 'تصویر با موفقیت ارسال شد')
      setUrlInput('')

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
