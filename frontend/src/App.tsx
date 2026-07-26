import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './lib/theme'
import Navbar from './components/Navbar'
import Intro from './components/Intro'
import AboutMe from './components/AboutMe'
import Experience from './components/Experience'
import Signals from './components/Signals'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Sheflang from './components/Sheflang'
import Travel from './components/Travel'
import ScrollProgress from './components/ScrollProgress'
import CommandPalette from './components/CommandPalette'

function Home() {
  return (
    <>
      <Intro />
      <AboutMe />
      <Experience />
      <Signals />
      <Contact />
    </>
  )
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollProgress />
        <CommandPalette />
        <div className="flex min-h-screen flex-col bg-canvas">
          <Navbar />
          <main className="flex-grow pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sheflang" element={<Sheflang />} />
              <Route path="/travel" element={<Travel />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
