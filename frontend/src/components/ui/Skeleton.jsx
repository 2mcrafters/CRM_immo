import React from 'react'
import { motion } from 'framer-motion'

export function Skeleton({ className = '', variant = 'default' }) {
  const variants = {
    default: 'h-4 bg-slate-800/50',
    title: 'h-8 bg-slate-800/50 w-1/3',
    text: 'h-4 bg-slate-800/50 w-full',
    avatar: 'w-12 h-12 rounded-full bg-slate-800/50',
    card: 'h-32 bg-slate-800/50 rounded-2xl',
  }

  return (
    <motion.div
      animate={{
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={`${variants[variant]} ${className} rounded-lg relative overflow-hidden`}
    >
      <motion.div
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-700/30 to-transparent"
      />
    </motion.div>
  )
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton variant="avatar" />
          <div className="flex-1 space-y-2">
            <Skeleton className="w-1/3" />
            <Skeleton className="w-1/2" />
          </div>
          <Skeleton className="w-20" />
        </div>
      ))}
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Skeleton variant="title" className="w-64" />
        <Skeleton className="w-24 h-10" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} variant="card" />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Skeleton className="h-96" />
        </div>
        <Skeleton className="h-96" />
      </div>
    </div>
  )
}
