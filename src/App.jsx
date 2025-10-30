import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import AppRoutes from './routes'
import './App.css'

function App() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      {/* Header */}
      <Header 
        onMenuClick={() => setMobileSidebarOpen(true)}
      />

      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <Sidebar
          open={true}
          mobileOpen={mobileSidebarOpen}
          onMobileClose={() => setMobileSidebarOpen(false)}
        />
        
        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          <AppRoutes />
        </main>
      </div>
    </div>
  )
}

export default App
