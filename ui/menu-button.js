import { BsMenuButtonFill } from 'react-icons/bs'
export default function MenuButton({ toggleMenu }) {
  return (
    <button
      onClick={toggleMenu}
      className="bg-gray-300 hover:bg-gray-200 rounded-lg px-4 py-2 cursor-pointer absolute right-6 bottom-6 shadow z-10"
    >
      <BsMenuButtonFill />
    </button>
  )
}
