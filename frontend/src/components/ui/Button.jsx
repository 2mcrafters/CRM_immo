import React from 'react'
import { motion } from 'framer-motion'

export default function Button({ className = '', children, ...props }) {
  return (
    <motion.button
      whileHover={{ y: -1, boxShadow: '0 8px 24px rgba(37,99,235,0.25)' }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center justify-center rounded-lg px-4 py-2 font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}
