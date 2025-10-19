import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  const base = 'px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-800'
  const active = 'bg-blue-100 dark:bg-slate-800 text-blue-700 dark:text-blue-300'
  return (
    <aside className="w-60 shrink-0 border-r border-slate-200 dark:border-slate-800 p-3">
      <nav className="flex flex-col gap-1">
        <NavLink to="/" end className={({isActive}) => `${base} ${isActive?active:''}`}>Dashboard</NavLink>
        <NavLink to="/units" className={({isActive}) => `${base} ${isActive?active:''}`}>Units</NavLink>
        <NavLink to="/owners" className={({isActive}) => `${base} ${isActive?active:''}`}>Owners</NavLink>
        <NavLink to="/tenants" className={({isActive}) => `${base} ${isActive?active:''}`}>Tenants</NavLink>
        <NavLink to="/leases" className={({isActive}) => `${base} ${isActive?active:''}`}>Leases</NavLink>
      </nav>
    </aside>
  )
}
