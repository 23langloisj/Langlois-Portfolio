import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Experience from './components/Experience';
import AboutMe from './components/AboutMe';
import Intro from './components/Intro';
import Projects from './components/Projects';
import Footer from './components/Footer';
import Sheflang from './components/Sheflang';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navbar remains at the top */}
        <Navbar />

        <div className="flex-grow mt-16">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Intro />
                  <AboutMe />
                  <Experience />
                  <Projects />
                </>
              }
            />
            <Route path="/sheflang" element={<Sheflang />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
