import MainHeader from '@/components/main-header'

export default function Layout({ children }) {
  return (
    <>
      <MainHeader />
      {children}
    </>
  )
}
