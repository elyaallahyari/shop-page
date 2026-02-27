import { IoMdSettings } from 'react-icons/io'

export default function ProductList({ children }) {
  return (
    <section className="flex flex-col justify-start items-center h-screen w-full max-w-280 gap-4 relative">
      <button className="bg-green-600 cursor-pointer hover:bg-green-700 px-4 py-2 rounded-lg text-2xl absolute top-0 right-0">
        +
      </button>
      <table className="border border-gray-100 shadow rounded-lg w-full max-w-250 mt-15">
        <tr className="border-b border-gray-100 *:p-3">
          <th>کد</th>
          <th>نام</th>
          <th>قیمت</th>
          <th className="flex flex-row justify-center items-center">
            <IoMdSettings className="fill-gray-950 cursor-pointer mt-1" />
          </th>
        </tr>
        {children}
      </table>
    </section>
  )
}
