import React from 'react'
import { motion } from 'framer-motion'
import clsx from "clsx";

export default function Button({
  className = "",
  children,
  variant = "primary",
  size = "md",
  loading = false,
  leftIcon = null,
  rightIcon = null,
  disabled,
  ...props
}) {
  const baseClasses =
    "font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden inline-flex items-center justify-center gap-2 shadow-lg";

  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white hover:shadow-blue-500/50 hover:shadow-2xl focus:ring-blue-500 border border-blue-400/20",
    secondary:
      "bg-gradient-to-r from-slate-700 to-slate-600 text-white hover:shadow-slate-500/50 hover:shadow-xl focus:ring-slate-500 border border-slate-500/20",
    outline:
      "border-2 border-blue-500/50 text-blue-400 hover:bg-blue-500/10 hover:border-blue-400 focus:ring-blue-500 backdrop-blur-sm",
    ghost:
      "text-blue-400 hover:bg-blue-500/10 focus:ring-blue-500 hover:shadow-lg hover:shadow-blue-500/20",
    danger:
      "bg-gradient-to-r from-red-600 to-red-500 text-white hover:shadow-red-500/50 hover:shadow-2xl focus:ring-red-500 border border-red-400/20",
    success:
      "bg-gradient-to-r from-green-600 to-emerald-500 text-white hover:shadow-green-500/50 hover:shadow-2xl focus:ring-green-500 border border-green-400/20",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3.5 text-lg",
    xl: "px-10 py-4 text-xl",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={clsx(baseClasses, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {/* Shimmer effect */}
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6 }}
      />

      {loading && (
        <motion.svg
          className="w-5 h-5 relative z-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </motion.svg>
      )}

      {!loading && leftIcon && (
        <span className="w-5 h-5 relative z-10">{leftIcon}</span>
      )}

      <span className="relative z-10">{children}</span>

      {!loading && rightIcon && (
        <span className="w-5 h-5 relative z-10">{rightIcon}</span>
      )}
    </motion.button>
  );
}
