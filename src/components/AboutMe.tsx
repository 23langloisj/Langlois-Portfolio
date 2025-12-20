import headshot from "../assets/headshot.jpg";
import { useEffect, useRef } from "react";
import Typed from 'typed.js';
import { FaInstagram } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';

const AboutMe = () => {
  const emailAddress = 'langlois.j@northeastern.edu';

  const handleEmailClick = () => {
    window.location.href = `mailto:${emailAddress}`;
  };

  const interestsRef = useRef<HTMLSpanElement>(null);
  const typed = useRef<Typed | null>(null);

  useEffect(() => {
    const options = {
      strings: [
        "Bouldering", "Ping Pong", "Music", "Math", "Hiking", 
        "Fortnite", "National Parks", "Minecraft", "Swimming", 
        "Philosophy", "Among Us", "HSY's"
      ],
      typeSpeed: 60,
      backSpeed: 30,
      loop: true,
    };

    typed.current = new Typed(interestsRef.current, options);

    return () => {
      typed.current?.destroy();
    };
  }, []);

  return (
    <section id="about-me" className="py-20 px-6 max-w-6xl mx-auto">
      <div className="flex items-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-100 whitespace-nowrap">
          <span className="font-mono text-teal-400 text-2xl mr-2">01.</span>
          About Me
        </h2>
        <div className="h-[1px] bg-slate-700 w-full ml-6"></div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        <div className="lg:w-2/3 space-y-6">
          <p className="text-slate-400 text-lg leading-relaxed">
            I am an Honors Computer Science and Math student at{" "}
            <a 
              href="https://www.northeastern.edu/" 
              className="text-[#e31c25] hover:brightness-125 transition-all font-semibold underline decoration-[#e31c25]/30 underline-offset-4"
            >
              Northeastern University
            </a>. 
            I'm currently in my third year, seeking software engineering internships for{" "}
            <span className="text-slate-100 font-bold border-b border-teal-400/50">Summer 2026</span>{" "}
            and upcoming full-time roles.
          </p>

          <p className="text-slate-400 text-lg leading-relaxed">
            Previously, I worked as a Software Engineer Co-op at{" "}
            <a href="https://www.smartleaf.com/" className="text-green-400 font-semibold hover:underline decoration-green-400/30">
              Smartleaf
            </a>, 
            building core features for their Advisor Portal. Before that, I supported the CERT Cyber Mission Readiness team at the{" "}
            <span className="text-slate-300 font-semibold border-b border-slate-500/30 hover:underline"><a href="https://sei.cmu.edu/" target="_blank" rel="noopener noreferrer">SEI @ CMU</a></span>.
          </p>

          <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-xl backdrop-blur-sm">
            <p className="text-slate-400 text-lg leading-relaxed">
              Currently, I serve as a{" "}
              <span className="text-slate-100 font-semibold">Technical Lead & Head of DevOps</span> 
              {" "}at{" "}
              <a href="https://www.sandboxnu.com/" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors hover:underline decoration-blue-400/30">
                Sandbox @ Northeastern
              </a>, 
              leading the development of student platforms and managing infrastructure. I am also working as a 
              <span className="text-slate-100 font-semibold"> Software Engineering Co-op</span> 
              {" "}at{" "}
              <a href="https://emoneyadvisor.com/" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors hover:underline decoration-blue-400/30">
                eMoney Advisors.
              </a>
            </p>
          </div>

          <p className="text-slate-400 text-lg leading-relaxed">
            Aside from CS, I'm a member of the professional business fraternity{" "}
            <span className="text-amber-400 font-semibold hover:underline"><a href="https://www.neuakpsi.org/" target="_blank" rel="noopener noreferrer">Alpha Kappa Psi</a></span>. 
            When I'm not coding, you can find me hiking, climbing, or swimming!
          </p>
        </div>

        <div className="lg:w-1/3 w-full flex flex-col items-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            
            <img
              src={headshot}
              alt="Jake Langlois Headshot"
              className="relative rounded-lg w-64 h-auto object-cover grayscale hover:grayscale-0 transition-all duration-500 border border-slate-700"
            />
          </div>

          <div className="mt-8 text-center">
            <div className="flex items-center justify-center gap-4 mb-2 text-slate-300">
              <button onClick={handleEmailClick} className="hover:text-teal-400 transition-colors">
                <AiOutlineMail size={28} />
              </button>
              <h3 className="text-xl font-mono text-slate-200 uppercase tracking-widest">
                Talk to me about:
              </h3>
              <a href="https://www.instagram.com/jake.langlois1/" target="_blank" className="hover:text-pink-500 transition-colors">
                <FaInstagram size={26} />
              </a>
            </div>
            
            <div className="h-12 flex items-center justify-center">
               <span 
                ref={interestsRef} 
                className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent"
               ></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;