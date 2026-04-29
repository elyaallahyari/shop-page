import Image from 'next/image'
import Link from 'next/link'

export async function getStaticProps() {
  const request = await fetch('http://localhost:4000/product')
  const response = await request.json()
  return { props: { response }, revalidate: 180 }
}

export default function Home({ response }) {
  return (
    <div className="flex flex-col justify-start items-center p-4">
      <h1 className="font-bold text-blue-700 text-2xl">محصولات</h1>
      <div className="flex flex-row justify-center items-start flex-wrap w-full gap-8 mt-5">
        {response ? (
          response.map((item) => (
            <Link
              href={`/product/${item.id}`}
              key={item.id}
              className="p-5 flex flex-col justify-start items-center max-w-70 w-full max-h-200 h-full shadow rounded-md hover:bg-gray-50 cursor-pointer gap-4"
            >
              <Image
                src={item?.media[0]?.url}
                alt={item.title}
                height={150}
                width={150}
                priority
                className="bg-transparent rounded"
              />
              <div className="flex flex-col justify-center items-start gap-4">
                <p> محصول: {item.title}</p>
                <p>قیمت: {item.price} تومان</p>
                <button className="p-2 rounded bg-green-600 hover:bg-green-500 w-full cursor-pointer">
                  خرید
                </button>
              </div>
            </Link>
          ))
        ) : (
          <p className="notification_yellow max-w-11/12">محصولی یافت نشد!</p>
        )}
      </div>
    </div>
  )
}
