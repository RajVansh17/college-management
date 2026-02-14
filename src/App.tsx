import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from '@/components/Layout'

const Dashboard = lazy(() => import('@/pages/Dashboard'))
const Societies = lazy(() => import('@/pages/Societies'))
const Events = lazy(() => import('@/pages/Events'))
const AI = lazy(() => import('@/pages/AI'))

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="w-12 h-12 rounded-3xl border-2 border-neon-cyan border-t-transparent animate-spin" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/societies" element={<Societies />} />
          <Route path="/events" element={<Events />} />
          <Route path="/ai" element={<AI />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}

export default App
