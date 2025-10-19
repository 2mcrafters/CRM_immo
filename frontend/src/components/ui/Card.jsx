import React from 'react'
import { motion } from "framer-motion";
import clsx from "clsx";

export default function Card({
  className = "",
  children,
  hover = true,
  gradient = false,
  glass = false,
  onClick = null,
}) {
  const baseClasses =
    "rounded-2xl border backdrop-blur-sm transition-all duration-300";

  const styleClasses = glass
    ? "bg-slate-900/30 border-slate-700/30 shadow-xl"
    : gradient
    ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700/50 shadow-2xl"
    : "bg-slate-900/80 border-slate-700/50 shadow-lg";

  const hoverClasses = hover
    ? "hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/30 hover:-translate-y-1"
    : "";

  const clickableClasses = onClick ? "cursor-pointer" : "";

  const CardWrapper = onClick ? motion.button : motion.div;

  return (
    <CardWrapper
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { y: -4 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={clsx(
        baseClasses,
        styleClasses,
        hoverClasses,
        clickableClasses,
        className
      )}
      onClick={onClick}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 pointer-events-none" />

      <div className="relative z-10">{children}</div>
    </CardWrapper>
  );
}
