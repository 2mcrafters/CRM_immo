import React from 'react'

export default function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 outline-none focus:ring-2 ring-blue-400 transition ${className}`}
      {...props}
    />
  )
}
