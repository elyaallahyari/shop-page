import BackButton from '@/ui/back-button'

export default function ProductidCard() {
  return (
    <section className="flex flex-col justify-start items-start gap-15 w-200 min-h-100 border border-gray-100 rounded-md shadow relative p-4">
      <BackButton />
      <div className="flex flex-row justify-start items-center h-42 w-full">
        <div></div>
        <div></div>
      </div>
      <div className="flex flex-row gap-3">
        <span>نام محصول: </span>
        <h3></h3>
      </div>
      <div>
        <span>قیمت: </span>
        <span></span>
        <span>تومان</span>
      </div>
    </section>
  )
}
