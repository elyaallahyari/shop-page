import { IoIosArrowBack } from 'react-icons/io'

export default function BackButton() {
  return (
    <button className="bg-gray-200 hover:bg-gray-100 cursor-pointer shadow rounded-lg p-2 absolute top-24 left-54">
      <IoIosArrowBack />
    </button>
  )
}
