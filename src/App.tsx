import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { SplashScreen } from './components/SplashScreen'
import Layout from './components/Layout'
import About from './pages/About'
import Thoughts from './pages/Thoughts'
import TIL from './pages/TIL'
import Projects from './pages/Projects'
import Photography from './pages/Photography'
import Bookmarks from './pages/Bookmarks'
import Music from './pages/Music'
import Uses from './pages/Uses'
import Friends from './pages/Friends'
import Profile from './pages/Profile'
import Career from './pages/Career'

export default function App() {
  const [showSplash, setShowSplash] = useState(true)

  return (
    <>
      {showSplash && <SplashScreen onDone={() => setShowSplash(false)} />}
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/about" replace />} />
            <Route
              path="/*"
              element={
                <Layout>
                  <Routes>
                    <Route path="about" element={<About />} />
                    <Route path="thoughts" element={<Thoughts />} />
                    <Route path="til" element={<TIL />} />
                    <Route path="projects" element={<Projects />} />
                    <Route path="photography" element={<Photography />} />
                    <Route path="bookmarks" element={<Bookmarks />} />
                    <Route path="music" element={<Music />} />
                    <Route path="uses" element={<Uses />} />
                    <Route path="friends" element={<Friends />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="career" element={<Career />} />
                  </Routes>
                </Layout>
              }
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}
