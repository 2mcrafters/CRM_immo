import React from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from "framer-motion";
import { t } from "../../lib/i18n.js";
import Badge from "../ui/Badge.jsx";
import { Can } from "../permissions/Can.jsx";
import ThemeToggle from "../ui/ThemeToggle.jsx";

export default function Sidebar({ onClose, isMobile = false }) {
  const menuItems = [
    {
      to: "/",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      label: t("nav.dashboard"),
      exact: true,
    },
    {
      to: "/clients",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      label: t("nav.clients"),
      badge: "247",
    },
    {
      to: "/properties",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      label: t("nav.properties"),
      badge: "856",
    },
    {
      to: "/rentals",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      label: t("nav.rentals"),
      badge: "634",
    },
    {
      to: "/owners",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      label: t("nav.owners"),
    },
    {
      to: "/documents",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
      label: t("nav.documents"),
    },
    {
      to: "/reports",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      label: t("nav.reports"),
    },
    {
      to: "/users",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      label: t("users.title"),
      permission: "users.view",
    },
  ];

  return (
    <motion.aside
      initial={isMobile ? { x: -300 } : { x: 0 }}
      animate={{ x: 0 }}
      className={`
        w-72 shrink-0 h-screen overflow-y-auto
        border-r border-slate-200 dark:border-slate-700/50
        bg-white dark:bg-slate-900/50 backdrop-blur-xl
        p-4
        ${isMobile ? "fixed left-0 top-0 bottom-0 z-50" : ""}
      `}
    >
      {isMobile && (
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="font-bold text-slate-900 dark:text-white">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}

      <nav className="space-y-2">
        {menuItems.map((item, index) => {
          const linkContent = (
            <NavLink
              key={index}
              to={item.to}
              end={item.exact}
              onClick={isMobile ? onClose : undefined}
              className={({ isActive }) => `
                group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50"
                }
              `}
            >
              {({ isActive }) => (
                <>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className={
                      isActive
                        ? "text-white"
                        : "text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                    }
                  >
                    {item.icon}
                  </motion.div>

                  <span className="flex-1 font-medium">{item.label}</span>

                  {item.badge && (
                    <Badge variant={isActive ? "default" : "primary"} size="sm">
                      {item.badge}
                    </Badge>
                  )}

                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute left-0 w-1 h-8 bg-white rounded-r-full"
                    />
                  )}
                </>
              )}
            </NavLink>
          );

          // If the item requires a permission, wrap it in Can component
          if (item.permission) {
            return (
              <Can key={index} permission={item.permission}>
                {linkContent}
              </Can>
            );
          }

          return linkContent;
        })}
      </nav>

      {/* Mobile Theme Toggle */}
      {isMobile && (
        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between px-2">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Thème
            </span>
            <ThemeToggle />
          </div>
        </div>
      )}

      {/* Quick Stats Section */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-4 rounded-2xl bg-gradient-to-br from-blue-600/10 dark:from-blue-600/20 to-cyan-600/10 dark:to-cyan-600/20 border border-blue-500/20 dark:border-blue-500/30"
        >
          <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
            Statistiques rapides
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">
                Taux d'occupation
              </span>
              <span className="text-green-600 dark:text-green-400 font-bold">
                94%
              </span>
            </div>
            <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "94%" }}
                transition={{ duration: 1, delay: 0.7 }}
                className="h-full bg-gradient-to-r from-green-600 to-emerald-500"
              />
            </div>
          </div>
        </motion.div>
      )}
    </motion.aside>
  );
}
