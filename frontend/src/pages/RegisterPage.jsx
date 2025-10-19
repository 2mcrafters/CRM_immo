import { useDispatch, useSelector } from 'react-redux'
import { register as registerUser } from '../features/auth/authSlice.js'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Button from '../components/ui/Button.jsx'
import Input from '../components/ui/Input.jsx'
import Card from '../components/ui/Card.jsx'
import PageTransition from '../components/layout/PageTransition.jsx'
import { t } from "../lib/i18n.js"
import { motion } from "framer-motion"

export default function RegisterPage() {
  const dispatch = useDispatch()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const status = useSelector((s) => s.auth.status)
  const error = useSelector((s) => s.auth.error)
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(registerUser({ name, email, password }))
      .unwrap()
      .then(() => {
        navigate("/")
      })
      .catch(() => {})
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 sm:p-6 lg:p-8">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-cyan-600/20 to-blue-600/20 rounded-full blur-3xl"
        />
      </div>

      <PageTransition>
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-4xl 2xl:max-w-5xl mx-auto">
          <Card
            glass
            className="w-full p-6 sm:p-8 md:p-10 lg:p-14 xl:p-20 relative backdrop-blur-xl"
          >
          {/* Logo/Header */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-center mb-6 sm:mb-8"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/50">
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {t("auth.register")}
            </h1>
            <p className="text-slate-400 mt-2 text-sm sm:text-base">
              {t("auth.welcome")}
            </p>
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 sm:p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm sm:text-base flex items-center gap-2"
            >
              <svg
                className="w-5 h-5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              {String(error)}
            </motion.div>
          )}

          <form onSubmit={onSubmit} className="space-y-5 sm:space-y-6">
            <Input
              label={t("auth.name")}
              type="text"
              placeholder="Jean Dupont"
              value={name}
              onChange={(e) => setName(e.target.value)}
              leftIcon={
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
              }
            />
            <Input
              label={t("auth.email")}
              type="email"
              placeholder="jean.dupont@exemple.fr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={
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
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              }
            />
            <Input
              label={t("auth.password")}
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              }
            />

            <Button
              type="submit"
              loading={status === "loading"}
              className="w-full"
              size="lg"
            >
              {t("auth.signUp")}
            </Button>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-center"
          >
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {t("auth.hasAccount")}{" "}
              <Link
                to="/login"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
              >
                {t("auth.login")}
              </Link>
            </p>
          </motion.div>
          </Card>
        </div>
      </PageTransition>
    </div>
  )
}
