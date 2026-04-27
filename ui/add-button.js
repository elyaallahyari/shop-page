import { GrFormAdd } from 'react-icons/gr'

export default function AddButton() {
  return (
    <button className="bg-green-600 hover:bg-green-700 p-2 rounded-lg text-2xl absolute top-24 right-10 cursor-pointer">
      <GrFormAdd />
    </button>
  )
}
