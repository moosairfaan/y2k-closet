import { Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Closet from './components/Closet'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/closet" element={<Closet />} />
    </Routes>
  )
}
