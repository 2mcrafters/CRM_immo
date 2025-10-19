import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice.js";
import { Link } from "react-router-dom";
import Avatar from "../ui/Avatar.jsx";
import ThemeToggle from "../ui/ThemeToggle.jsx";
import { t } from "../../lib/i18n.js";

export default function Navbar({ onMenuClick }) {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, text: "Nouveau client ajouté", time: "5 min", unread: true },
    { id: 2, text: "Paiement reçu", time: "1h", unread: true },
    { id: 3, text: "Bail signé", time: "3h", unread: false },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-700/50 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 shadow-sm dark:shadow-lg dark:shadow-black/20 transition-colors"
    >
      <div className="px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30"
          >
            <svg
              className="w-4 h-4 sm:w-6 sm:h-6 text-white"
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
          </motion.div>
          <div className="hidden sm:block">
            <h1 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              CRM Immobilier
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Gestion professionnelle
            </p>
          </div>
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Search */}
          <motion.div
            whileFocus={{ scale: 1.02 }}
            className="hidden md:flex items-center gap-2 px-3 sm:px-4 py-2 bg-slate-100 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/50 hover:border-blue-500 dark:hover:border-blue-500/50 transition-colors"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder={t("common.search")}
              className="bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder:text-slate-500 w-32 sm:w-48 lg:w-64 text-sm"
            />
          </motion.div>

          {/* Theme Toggle */}
          <ThemeToggle className="hidden sm:flex" />

          {/* Notifications */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors relative"
            >
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
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              {unreadCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
                >
                  {unreadCount}
                </motion.span>
              )}
            </motion.button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-72 sm:w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/50 rounded-2xl shadow-2xl dark:shadow-black/50 overflow-hidden"
                >
                  <div className="p-4 border-b border-slate-200 dark:border-slate-700/50">
                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      Notifications
                    </h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notif) => (
                      <motion.div
                        key={notif.id}
                        whileHover={{
                          backgroundColor: "rgba(51, 65, 85, 0.1)",
                        }}
                        className="p-4 border-b border-slate-100 dark:border-slate-800/50 cursor-pointer"
                      >
                        <div className="flex items-start gap-3">
                          {notif.unread && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                          )}
                          <div className="flex-1">
                            <p className="text-slate-900 dark:text-white text-sm">
                              {notif.text}
                            </p>
                            <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                              {notif.time}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Menu */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <Avatar name={user?.name || "User"} size="sm" status="online" />
              <div className="hidden md:block text-left">
                <p className="text-slate-900 dark:text-white text-sm font-medium">
                  {user?.name || "Utilisateur"}
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-xs">
                  {user?.email || ""}
                </p>
              </div>
              <svg
                className="w-4 h-4 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </motion.button>

            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/50 rounded-2xl shadow-2xl dark:shadow-black/50 overflow-hidden"
                >
                  <div className="p-4 border-b border-slate-200 dark:border-slate-700/50">
                    <p className="text-slate-900 dark:text-white font-medium">
                      {user?.name}
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                      {user?.email}
                    </p>
                  </div>
                  <div className="p-2">
                    <motion.button
                      whileHover={{ backgroundColor: "rgba(51, 65, 85, 0.1)" }}
                      className="w-full text-left px-4 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                      {t("nav.settings")}
                    </motion.button>
                    <motion.button
                      whileHover={{ backgroundColor: "rgba(220, 38, 38, 0.1)" }}
                      onClick={() => dispatch(logout())}
                      className="w-full text-left px-4 py-2 rounded-xl text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors flex items-center gap-2"
                    >
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
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      {t("nav.logout")}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
