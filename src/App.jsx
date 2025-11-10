import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import AppRoutes from './routes'
import './App.css'

function App() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const location = useLocation()

  // Routes where sidebar and header should not be shown
  const authRoutes = ['/login', '/register']
  const isAuthPage = authRoutes.includes(location.pathname)

  // If it's an auth page, render without sidebar and header
  if (isAuthPage) {
    return (
      <div className="min-h-screen">
        <AppRoutes />
      </div>
    )
  }

  // Regular layout with sidebar and header
  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      {/* Header */}
      <Header 
        onMenuClick={() => setMobileSidebarOpen(true)}
      />

      <div className="flex flex-1 pt-[70px]">
        {/* Sidebar */}
        <Sidebar
          open={true}
          mobileOpen={mobileSidebarOpen}
          onMobileClose={() => setMobileSidebarOpen(false)}
        />
        
        {/* Main Content */}
        <main className="flex-1 w-full p-3 sm:p-4 md:p-6 lg:p-8 overflow-x-hidden transition-all duration-300" style={{ marginLeft: 0 }}>
          <div className="max-w-full">
            <AppRoutes />
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
