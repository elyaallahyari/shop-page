import { IoMdSettings } from 'react-icons/io'

export default function ProductList({ children }) {
  return (
    <section className="flex-col justify-center items-center w-full max-w-280 gap-4 relative text-sm lg:text-base">
      <table className="border border-gray-100 shadow rounded-lg w-full max-w-270 mt-15">
        <tr className="border-b border-gray-100 *:p-1 lg:*:p-3">
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
