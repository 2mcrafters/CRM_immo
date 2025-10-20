import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMe } from "./features/auth/authSlice.js";
import { useEffect } from "react";
import React from "react";
import { ThemeProvider } from "./theme/ThemeProvider.jsx";
import AppLayout from "./components/layout/AppLayout.jsx";
import PageTransition from "./components/layout/PageTransition.jsx";
import { ToastProvider } from "./components/ui/Toast.jsx";
import { motion } from "framer-motion";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

// Protected Route Component
function ProtectedRoute({ children }) {
  const token = useSelector((s) => s.auth.token);
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

// Home Page Component
function Home() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);
  const DashboardComponent = React.lazy(() =>
    import("./components/dashboard/Dashboard.jsx")
  );

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  return (
    <AppLayout>
      <PageTransition>
        <React.Suspense
          fallback={
            <div className="flex items-center justify-center h-96">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
              />
            </div>
          }
        >
          <DashboardComponent user={user} />
        </React.Suspense>
      </PageTransition>
    </AppLayout>
  );
}

function ClientsRoute() {
  const ClientsPage = React.lazy(() =>
    import("./components/pages/ClientsPage.jsx")
  );
  return (
    <AppLayout>
      <PageTransition>
        <React.Suspense
          fallback={
            <div className="flex items-center justify-center h-96">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
              />
            </div>
          }
        >
          <ClientsPage />
        </React.Suspense>
      </PageTransition>
    </AppLayout>
  );
}

function PropertiesRoute() {
  const PropertiesPage = React.lazy(() =>
    import("./pages/properties/PropertiesPage.jsx")
  );
  return (
    <AppLayout>
      <PageTransition>
        <React.Suspense
          fallback={
            <div className="flex items-center justify-center h-96">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
              />
            </div>
          }
        >
          <PropertiesPage />
        </React.Suspense>
      </PageTransition>
    </AppLayout>
  );
}

function RentalsRoute() {
  const RentalsPage = React.lazy(() =>
    import("./pages/rentals/RentalsPage.jsx")
  );
  return (
    <AppLayout>
      <PageTransition>
        <React.Suspense
          fallback={
            <div className="flex items-center justify-center h-96">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
              />
            </div>
          }
        >
          <RentalsPage />
        </React.Suspense>
      </PageTransition>
    </AppLayout>
  );
}

function OwnersRoute() {
  const OwnersPage = React.lazy(() => import("./pages/owners/OwnersPage.jsx"));
  return (
    <AppLayout>
      <PageTransition>
        <React.Suspense
          fallback={
            <div className="flex items-center justify-center h-96">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
              />
            </div>
          }
        >
          <OwnersPage />
        </React.Suspense>
      </PageTransition>
    </AppLayout>
  );
}

function DocumentsRoute() {
  const DocumentsPage = React.lazy(() =>
    import("./pages/documents/DocumentsPage.jsx")
  );
  return (
    <AppLayout>
      <PageTransition>
        <React.Suspense
          fallback={
            <div className="flex items-center justify-center h-96">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
              />
            </div>
          }
        >
          <DocumentsPage />
        </React.Suspense>
      </PageTransition>
    </AppLayout>
  );
}

function ReportsRoute() {
  const ReportsPage = React.lazy(() =>
    import("./pages/reports/ReportsPage.jsx")
  );
  return (
    <AppLayout>
      <PageTransition>
        <React.Suspense
          fallback={
            <div className="flex items-center justify-center h-96">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
              />
            </div>
          }
        >
          <ReportsPage />
        </React.Suspense>
      </PageTransition>
    </AppLayout>
  );
}

function AddClientRoute() {
  const AddClientPage = React.lazy(() =>
    import("./pages/clients/AddClientPage.jsx")
  );
  return (
    <AppLayout>
      <PageTransition>
        <React.Suspense
          fallback={
            <div className="flex items-center justify-center h-96">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
              />
            </div>
          }
        >
          <AddClientPage />
        </React.Suspense>
      </PageTransition>
    </AppLayout>
  );
}

function EditClientRoute() {
  const EditClientPage = React.lazy(() =>
    import("./pages/clients/EditClientPage.jsx")
  );
  return (
    <AppLayout>
      <PageTransition>
        <React.Suspense
          fallback={
            <div className="flex items-center justify-center h-96">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
              />
            </div>
          }
        >
          <EditClientPage />
        </React.Suspense>
      </PageTransition>
    </AppLayout>
  );
}

function UsersRoute() {
  const UsersManagement = React.lazy(() =>
    import("./components/users/UsersManagement.jsx")
  );
  return (
    <AppLayout>
      <PageTransition>
        <React.Suspense
          fallback={
            <div className="flex items-center justify-center h-96">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
              />
            </div>
          }
        >
          <UsersManagement />
        </React.Suspense>
      </PageTransition>
    </AppLayout>
  );
}

function DebugRoute() {
  const DebugPage = React.lazy(() => import("./pages/DebugPage.jsx"));
  return (
    <AppLayout>
      <PageTransition>
        <React.Suspense
          fallback={
            <div className="flex items-center justify-center h-96">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
              />
            </div>
          }
        >
          <DebugPage />
        </React.Suspense>
      </PageTransition>
    </AppLayout>
  );
}

// Main App Component
export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clients"
            element={
              <ProtectedRoute>
                <ClientsRoute />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clients/add"
            element={
              <ProtectedRoute>
                <AddClientRoute />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clients/:id/edit"
            element={
              <ProtectedRoute>
                <EditClientRoute />
              </ProtectedRoute>
            }
          />
          <Route
            path="/properties"
            element={
              <ProtectedRoute>
                <PropertiesRoute />
              </ProtectedRoute>
            }
          />
          <Route
            path="/rentals"
            element={
              <ProtectedRoute>
                <RentalsRoute />
              </ProtectedRoute>
            }
          />
          <Route
            path="/owners"
            element={
              <ProtectedRoute>
                <OwnersRoute />
              </ProtectedRoute>
            }
          />
          <Route
            path="/documents"
            element={
              <ProtectedRoute>
                <DocumentsRoute />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <ReportsRoute />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <UsersRoute />
              </ProtectedRoute>
            }
          />
          <Route
            path="/debug"
            element={
              <ProtectedRoute>
                <DebugRoute />
              </ProtectedRoute>
            }
          />
        </Routes>
      </ToastProvider>
    </ThemeProvider>
  );
}
