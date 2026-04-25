import ProductidCard from '@/components/card-show-productId'
import Head from 'next/head'

export async function getServerSideProps({ params }) {
  try {
    const { productId } = params
    const res = await fetch(`http://localhost:4000/product/${productId}`)
    const product = await res.json()
    return { props: { product, error: '' } }
  } catch (error) {
    return { props: { product: [], error } }
  }
}

export default function ProductId({ product, error }) {
  if (error) {
    return <p>{error}</p>
  }
  return (
    <>
      <Head>
        <title>{product.title}</title>
      </Head>
      <div className="flex flex-col justify-center items-center h-screen w-screen p-6">
        <ProductidCard image={product.media} title={product.title} price={product.price} />
      </div>
    </>
  )
}
