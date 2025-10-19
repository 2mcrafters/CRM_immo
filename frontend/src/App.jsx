import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login, register as registerUser, logout, fetchMe } from './features/auth/authSlice.js'
import { useEffect, useState } from 'react'
import { ThemeProvider } from './theme/ThemeProvider.jsx'
import AppLayout from './components/layout/AppLayout.jsx'
import Button from './components/ui/Button.jsx'
import Input from './components/ui/Input.jsx'
import Card from './components/ui/Card.jsx'
import PageTransition from './components/layout/PageTransition.jsx'

function ProtectedRoute({ children }) {
  const token = useSelector((s) => s.auth.token)
  if (!token) return <Navigate to="/login" replace />
  return children
}

function Login() {
  const dispatch = useDispatch()
  const status = useSelector((s) => s.auth.status)
  const error = useSelector((s) => s.auth.error)
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('password')
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(login({ email, password })).unwrap().then(()=>{
      navigate('/')
    }).catch(()=>{})
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-950 p-4">
      <PageTransition>
        <Card className="w-full max-w-md p-6">
          <h1 className="text-2xl font-semibold mb-2">Login</h1>
          {error && <div className="text-red-600 text-sm mb-2">{String(error)}</div>}
          <div className="space-y-3">
            <Input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <Input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <Button disabled={status==='loading'} onClick={onSubmit} className="w-full">{status==='loading'?'Signing in...':'Sign in'}</Button>
            <p className="text-sm">No account? <Link to="/register" className="text-blue-600 dark:text-blue-400">Register</Link></p>
          </div>
        </Card>
      </PageTransition>
    </div>
  )
}

function Register() {
  const dispatch = useDispatch()
  const [name, setName] = useState('Admin')
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('password')
  const status = useSelector((s)=>s.auth.status)

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(registerUser({ name, email, password }))
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-950 p-4">
      <PageTransition>
        <Card className="w-full max-w-md p-6">
          <h1 className="text-2xl font-semibold mb-2">Register</h1>
          <div className="space-y-3">
            <Input placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
            <Input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <Input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <Button disabled={status==='loading'} onClick={onSubmit} className="w-full">{status==='loading'?'Creating...':'Create account'}</Button>
            <p className="text-sm">Have an account? <Link to="/login" className="text-blue-600 dark:text-blue-400">Login</Link></p>
          </div>
        </Card>
      </PageTransition>
    </div>
  )
}

function Home() {
  const dispatch = useDispatch()
  const user = useSelector((s) => s.auth.user)
  useEffect(() => { dispatch(fetchMe()) }, [dispatch])
  return (
    <AppLayout>
      <PageTransition>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <Button className="!bg-red-600" onClick={()=>dispatch(logout())}>Logout</Button>
          </div>
          <Card className="p-4">
            <h2 className="font-semibold mb-2">Welcome</h2>
            <pre className="overflow-auto max-h-80 text-sm bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">{JSON.stringify(user,null,2)}</pre>
          </Card>
        </div>
      </PageTransition>
    </AppLayout>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      </Routes>
    </ThemeProvider>
  )
}
