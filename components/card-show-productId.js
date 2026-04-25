import BackButton from '@/ui/back-button'
import Image from 'next/image'
import Link from 'next/link'

export default function ProductidCard({ image, title, price }) {
  return (
    <section className="flex flex-col justify-start items-start gap-15 max-w-200 w-full min-h-100 border border-gray-100 rounded-md shadow p-4">
      <Link href="/">
        <BackButton />
      </Link>
      <div className="flex flex-row justify-start items-center h-42 w-full">
        {image &&
          image.map((item) => (
            <div key={item.id}>
              <Image src={item.url} alt={item.url} width={100} height={100} />
            </div>
          ))}
      </div>
      <div className="flex flex-row gap-3">
        <span>نام محصول: </span>
        <h3>{title}</h3>
      </div>
      <div>
        <span>قیمت: </span>
        <span>{price}</span>
        <span> تومان </span>
      </div>
    </section>
  )
}
