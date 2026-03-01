export default function MediaLibrary() {
  return (
    <section className="flex flex-row justify-center gap-7 relative w-full h-full">
      <button className="bg-green-600 cursor-pointer hover:bg-green-700 rounded-md px-5 py-2 text-2xl absolute top-0 right-14">
        +
      </button>
      <div className="max-w-200 w-full flex flex-col justify-center items-center">
        <h3>کتابخانه تصاویر</h3>
        <div className="flex flex-row mt-14 border border-gray-50 w-full shadow rounded min-h-100"></div>
      </div>
    </section>
  )
}
