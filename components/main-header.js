import Link from 'next/link'
import { FaUserAlt } from 'react-icons/fa'

export default function MainHeader() {
  return (
    <header className="w-screen h-20 shadow flex flex-row justify-between items-centers text-2xl p-5 font-bold bg-gray-100">
      <Link href={'/'}>محصولات</Link>
      <Link href={'/dashboard'}>
        <FaUserAlt className="p-3 rounded-lg bg-blue-500 fill-gray-100 text-5xl" />
      </Link>
    </header>
  )
}
