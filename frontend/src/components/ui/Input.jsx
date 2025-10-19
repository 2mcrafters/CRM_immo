import React, { forwardRef, useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

const Input = forwardRef(
  (
    {
      className = "",
      label = "",
      error = "",
      leftIcon = null,
      rightIcon = null,
      type = "text",
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <motion.label
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="block text-sm font-medium text-slate-300"
          >
            {label}
          </motion.label>
        )}

        <div className="relative group">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-400 transition-colors">
              {leftIcon}
            </div>
          )}

          <motion.input
            ref={ref}
            type={type}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={clsx(
              "w-full rounded-xl border bg-slate-900/50 backdrop-blur-sm px-4 py-3 outline-none transition-all duration-300",
              "text-white placeholder:text-slate-500",
              "focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:shadow-lg focus:shadow-blue-500/20",
              error
                ? "border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50"
                : "border-slate-700/50 hover:border-slate-600",
              leftIcon && "pl-11",
              rightIcon && "pr-11",
              className
            )}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-400 transition-colors">
              {rightIcon}
            </div>
          )}

          {/* Focus glow effect */}
          {isFocused && (
            <motion.div
              layoutId="input-focus"
              className="absolute inset-0 rounded-xl bg-blue-500/5 -z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </div>

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-400 flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
