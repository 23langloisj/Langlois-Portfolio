import { Link, useNavigate } from "react-router-dom"; // useNavigate in v6
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

const Navbar = () => {
  const navItems = [
    { label: "About Me", href: "about-me" },
    { label: "Projects", href: "projects" },
    { label: "Experiences", href: "experiences" },
    { label: "Food", href: "/sheflang" },
  ];

  const resumeLink = "Langlois_Resume.pdf";
  const navigate = useNavigate();

  const handleNavClick = (href) => {
    if (href === "/sheflang") {
      navigate(href);
      setTimeout(() => {
        const sheflangSection = document.getElementById("sheflang");
        if (sheflangSection) {
          sheflangSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } else if (href.startsWith("/")) {
      navigate(href);
    } else {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(href);
        if (element) {
          scroll.scrollTo(element.offsetTop - 80);
        }
      }, 100); 
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 p-3 backdrop-blur bg-opacity-50" id="top">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <ScrollLink
            to="top"
            smooth={true}
            duration={800}
            offset={-2500}
            className="nav-logo hover-pointer"
            title="Home"
          >
            <span className="text-5xl">&lt;lang /&gt;</span>
          </ScrollLink>
          <ul className="flex space-x-4 text-white">
            {navItems.map((item, index) => (
              <li key={index} className="nav-item hover-pointer">
                <button
                  onClick={() => handleNavClick(item.href)}
                  className="text-2xl transition duration-300"
                >
                  {item.label}
                </button>
              </li>
            ))}
  
            <li className="nav-item hover-animation">
              <a href={resumeLink} download className="text-2xl transition duration-300">
                Resume
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
