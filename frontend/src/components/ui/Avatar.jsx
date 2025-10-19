import React from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

export default function Avatar({ 
  src, 
  alt = '', 
  name = '',
  size = 'md',
  status = null,
  className = '',
}) {
  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
    '2xl': 'w-20 h-20 text-2xl',
  }

  const statusColors = {
    online: 'bg-green-500 ring-green-400/30',
    offline: 'bg-slate-500 ring-slate-400/30',
    busy: 'bg-red-500 ring-red-400/30',
    away: 'bg-yellow-500 ring-yellow-400/30',
  }

  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="relative inline-block">
      <motion.div
        whileHover={{ scale: 1.05 }}
        className={clsx(
          'relative rounded-full overflow-hidden border-2 border-slate-700/50 bg-gradient-to-br from-blue-600 to-cyan-600',
          'flex items-center justify-center font-semibold text-white shadow-lg',
          sizes[size],
          className
        )}
      >
        {src ? (
          <img src={src} alt={alt || name} className="w-full h-full object-cover" />
        ) : (
          <span>{initials || '??'}</span>
        )}
      </motion.div>

      {status && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={clsx(
            'absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-900 ring-2',
            statusColors[status]
          )}
        />
      )}
    </div>
  )
}
