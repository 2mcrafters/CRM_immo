import React from 'react'
import { motion } from 'framer-motion'

export default function PageTransition({ children }) {
  const variants = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.35 } },
    exit: { opacity: 0, y: -12, transition: { duration: 0.25 } },
  }
  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={variants}>
      {children}
    </motion.div>
  )
}
