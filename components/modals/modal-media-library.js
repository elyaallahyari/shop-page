import Image from 'next/image'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function MediaLibraryModal({
  isVisible,
  selectedItems,
  onToggleSelection,
  onClose
}) {
  const { data: media, error, isLoading, mutate } = useSWR('http://localhost:4000/media', fetcher)

  if (!isVisible) return null

  return (
    <>
      {/* پس‌زمینه تیره برای کلیک خارج از مودال */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>

      {/* کانتینر اصلی مودال */}
      <section className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
        <div
          className="bg-white rounded-lg shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col pointer-events-auto overflow-hidden"
          onClick={(e) => e.stopPropagation()} // جلوگیری از بسته شدن هنگام کلیک داخل مودال
        >
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="text-xl font-bold">کتابخانه تصاویر</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-red-500 text-2xl">
              &times;
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {media && Array.isArray(media) && media.length > 0 ? (
                media.map((item) => {
                  const isSelected = selectedItems?.some((i) => i.id === item.id)
                  return (
                    <div
                      key={item?.id}
                      onClick={() => onToggleSelection(item)}
                      className={`
                        relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all
                        ${isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-transparent hover:border-gray-300'}
                      `}
                    >
                      <Image
                        src={item?.url}
                        width={200}
                        height={200}
                        alt={item.url}
                        className="w-full h-40 object-cover"
                      />
                      {isSelected && (
                        <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                          ✓
                        </div>
                      )}
                    </div>
                  )
                })
              ) : (
                <p className="col-span-full text-center text-gray-500">تصویری یافت نشد.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
