import React from 'react'
import Navbar from './Navbar.jsx'
import Sidebar from './Sidebar.jsx'

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 py-6 flex gap-6">
        <Sidebar />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
