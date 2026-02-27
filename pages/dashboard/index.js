import ProductList from '@/components/product-list'

export default function Dashboard() {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <h1>Dashboard</h1>
      <ProductList />
    </div>
  )
}
