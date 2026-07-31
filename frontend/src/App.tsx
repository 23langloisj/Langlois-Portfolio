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
import Thoughts from './components/Thoughts'
import Thought from './components/Thought'
import ScrollProgress from './components/ScrollProgress'
import CommandPalette from './components/CommandPalette'
import ScrollToTop from './components/ScrollToTop'

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
        <ScrollToTop />
        <CommandPalette />
        <div className="flex min-h-screen flex-col bg-canvas">
          <Navbar />
          <main className="flex-grow pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/thoughts" element={<Thoughts />} />
              <Route path="/thoughts/:slug" element={<Thought />} />
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
