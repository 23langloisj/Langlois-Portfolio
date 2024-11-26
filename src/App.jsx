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
      {/* Navbar remains at the top */}
      <Navbar />

      <div className="mt-16"> 
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Intro />
                <AboutMe />
                <Experience />
                <Projects />
                <Footer />
              </>
            }
          />
          <Route path="/sheflang" element={<Sheflang />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
