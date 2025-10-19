import React from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

export default function Badge({ 
  children, 
  variant = 'default',
  size = 'md',
  dot = false,
  className = '',
}) {
  const variants = {
    default: 'bg-slate-700/50 text-slate-300 border-slate-600/50',
    primary: 'bg-blue-600/20 text-blue-400 border-blue-500/30',
    success: 'bg-green-600/20 text-green-400 border-green-500/30',
    warning: 'bg-yellow-600/20 text-yellow-400 border-yellow-500/30',
    danger: 'bg-red-600/20 text-red-400 border-red-500/30',
    info: 'bg-cyan-600/20 text-cyan-400 border-cyan-500/30',
  }

  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  }

  return (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-full border font-medium backdrop-blur-sm',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {dot && (
        <motion.span
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-1.5 h-1.5 rounded-full bg-current"
        />
      )}
      {children}
    </motion.span>
  )
}
