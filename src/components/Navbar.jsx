import { Link } from "react-scroll";

const Navbar = () => {
  const navItems = [
    { label: "About Me", href: "about-me" },
    { label: "Projects", href: "projects" },
  ];

  const resumeLink = "/Users/jake.langlois/Desktop/Jake Langlois CS+Math Resume.pdf";

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 p-3 backdrop-blur bg-opacity-50" id="top">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link
            to="top"
            smooth={true}
            duration={800}
            offset={-2500}
            className="nav-logo hover-pointer"
            title="Home"
          >
            <span className="text-5xl">&lt;lang /&gt;</span>
          </Link>
          <ul className="flex space-x-4 text-white">
            {navItems.map((item, index) => (
              <li key={index} className="nav-item hover-pointer">
                <Link to={item.href} smooth={true} duration={600} offset={-80}
                className="text-2xl color transition duration-300">
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="nav-item hover-animation">
              <a href={resumeLink} download className="text-2xl color duration-300">
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