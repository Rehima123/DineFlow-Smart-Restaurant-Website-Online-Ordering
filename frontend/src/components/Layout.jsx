import Navbar from './Navbar'
import Footer from './Footer'

// Layout wrapper for customer-facing pages
export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-cream-50">
      <Navbar />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
    </div>
  )
}
