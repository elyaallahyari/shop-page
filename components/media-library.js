// import Image from 'next/image'
// import useSWR from 'swr'

// const fetcher = (url) => fetch(url).then((res) => res.json())

// export default function MediaLibrary() {
//   const { data: media, error, isLoading } = useSWR('http://localhost:4000/media', fetcher)

//   if (isLoading) return <div>در حال بارگذاری کتابخانه...</div>
//   if (error) return <div>خطا در دریافت اطلاعات</div>

//   return (
//     <section className="max-w-300 w-full flex flex-col justify-start items-center flex-wrap h-full min-h-100">
//       <h3>کتابخانه تصاویر</h3>
//       <div className="flex flex-row mt-14 border border-gray-50 w-full max-w-270 shadow rounded h-full flex-wrap">
//         {media && Array.isArray(media) && media.length > 0 ? (
//           media.map((item) => (
//             <div key={item?.id} className="p-2 m-1 h-20">
//               <Image
//                 src={item?.url}
//                 width={200}
//                 height={200}
//                 alt={item.url}
//                 className="cursor-pointer object-cover"
//               />
//             </div>
//           ))
//         ) : (
//           <p>تصویری یافت نشد.</p>
//         )}
//       </div>
//     </section>
//   )
// }
import useSWR from 'swr';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function MediaLibrary() {
  const { data: media, error, isLoading, mutate } = useSWR('http://localhost:4000/media', fetcher);
  
  // یک استیت برای اینکه بدانیم کدام آیتم در حال حذف است (برای لودینگ روی دکمه)
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    // چک کردن اینکه ID وجود دارد
    if (!id) return;

    if (confirm(`آیا از حذف تصویر با شناسه ${id} مطمئن هستید؟`)) {
      setDeletingId(id); // شروع لودینگ برای این آیتم خاص
      
      try {
        // ساخت آدرس دقیق حذف
        const deleteUrl = `http://localhost:4000/media/${id}`;
        console.log('Deleting URL:', deleteUrl);

        const response = await fetch(deleteUrl, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('خطا در ارتباط با سرور برای حذف');
        }

        // اگر حذف موفق بود، لیست را آپدیت کن
        mutate(); 

      } catch (error) {
        console.error('خطا در حذف:', error);
        alert('مشکلی در حذف تصویر پیش آمد');
      } finally {
        setDeletingId(null); // پایان لودینگ
      }
    }
  };

  if (isLoading) return <div>در حال بارگذاری کتابخانه...</div>;
  if (error) return <div>خطا در دریافت اطلاعات</div>;

  return (
    <section className="max-w-300 w-full flex flex-col justify-start items-center">
      <h3>کتابخانه تصاویر</h3>
      <div className="flex flex-row flex-wrap mt-14 border border-gray-50 w-full shadow rounded min-h-100 p-5">
        {media && Array.isArray(media) && media.length > 0 ? (
          media.map((item) => (
            <div 
              key={item?.id} 
              className="group relative p-2 m-1 h-20  border rounded overflow-hidden"
            >
              <Image
                src={item?.url}
                width={200}
                height={200}
                alt={item.url}
                className="cursor-pointer w-full h-full object-cover"
              />

              {/* لایه هاور و دکمه حذف */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(item?.id);
                  }}
                  disabled={deletingId === item?.id} // غیرفعال کردن دکمه‌ای که در حال حذف است
                  className="text-white bg-red-600 p-2 rounded-full hover:bg-red-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  title="حذف تصویر"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>تصویری یافت نشد.</p>
        )}
      </div>
    </section>
  );
}