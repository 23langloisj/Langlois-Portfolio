import { useNavigate } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import { FiFileText } from 'react-icons/fi'; 

const Navbar = () => {
  const navItems = [
    { label: "About", href: "about-me" },
    { label: "Experience", href: "experiences" },
    { label: "Projects", href: "projects" },
    { label: "Food", href: "/sheflang" },
  ];

  const resumeLink = "Langlois_Resume.pdf";
  const navigate = useNavigate();

  const handleNavClick = (href: string) => {
    if (href === "/sheflang") {
      navigate(href);
      setTimeout(() => {
        const section = document.getElementById("sheflang");
        section?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else if (href.startsWith("/")) {
      navigate(href);
    } else {
      if (window.location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const element = document.getElementById(href);
          if (element) {
            scroll.scrollTo(element.offsetTop - 100, { duration: 800 });
          }
        }, 150);
      } else {
        const element = document.getElementById(href);
        if (element) {
          scroll.scrollTo(element.offsetTop - 100, { duration: 800 });
        }
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <div
          className="cursor-pointer group"
          onClick={() => {
            if (window.location.pathname === "/") {
              scroll.scrollToTop({ duration: 800 });
            } else {
              navigate("/");
              // Reset to top instantly on route change
              window.scrollTo(0, 0);
            }
          }}
        >
          <div className="text-2xl font-bold tracking-tighter text-slate-100 transition-all group-hover:text-teal-400">
            <span className="text-teal-400 font-mono text-xl">&lt;</span>
            lang 
            <span className="text-teal-400 font-mono text-xl"> /&gt;</span>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => handleNavClick(item.href)}
                  className="flex items-center gap-2 group"
                >
                  <span className="font-mono text-teal-400 text-xs"></span>
                  <span className="text-slate-300 text-sm font-medium tracking-wide uppercase group-hover:text-teal-400 transition-colors">
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <a 
            href={resumeLink} 
            download 
            className="px-5 py-2 border border-teal-400 text-teal-400 font-mono text-xs uppercase tracking-widest rounded hover:bg-teal-400/10 transition-all duration-300 flex items-center gap-2"
          >
            Resume
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;