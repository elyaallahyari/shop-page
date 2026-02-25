import Link from 'next/link'

export default function errorHandler() {
  return (
    <>
      <div className="flex flex-col bg-white text-black justify-start items-center h-screen gap-40 pt-30">
        <h2 className="text-3xl font-extrabold">There must have be a problem. Try again.</h2>

        <button className="bg-gray-300 rounded p-3 hover:bg-gray-200 shadow">
          <Link href={'/'}>Go to Home</Link>
        </button>
      </div>
    </>
  )
}
