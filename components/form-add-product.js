export default function AddProductForm() {
  return (
    <section className="flex flex-col justify-center items-center w-full max-w-200 *:flex *:flex-col *:rounded-lg">
      <form action="" className="flex flex-col max-w-100 gap-3.5">
        <label className="label" htmlFor="images">
          عکس‌ها
        </label>
        <input className="input cursor-pointer" type="file" placeholder="+" />

        <label className="label" htmlFor="title">
          عنوان محصول
        </label>
        <input className="input" type="text" />

        <label className="label" htmlFor="price">
          قیمت
        </label>
        <input className="input" type="number" />

        <button
          type="submit"
          className="cursor-pointer bg-green-600 hover:bg-green-500 rounded-lg p-2 font-semibold mt-6"
        >
          ساخت
        </button>
      </form>
    </section>
  )
}
