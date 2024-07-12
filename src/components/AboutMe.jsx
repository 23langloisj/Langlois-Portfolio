import headshot from "../assets/headshot.png";
import { useEffect, useRef } from "react";
import Typed from 'typed.js';
import { FaInstagram } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';


const AboutMe = () => {

  const emailAddress = 'langlois.j@northeastern.edu';

  const handleEmailClick = () => {
    window.location.href = `mailto:${emailAddress}`;
  };

const interestsRef = useRef(null);
const typed = useRef(null);

useEffect(() => {

  const options = {
    strings: ["Bouldering", 
              "Ping Pong", 
              "Music", 
              "Math", 
              "Hiking", 
              "Fortnite", 
              "National Parks", 
              "Minecraft",
              "Swimming",
              "Philosophy",
              "Among Us"],
    typeSpeed: 60,
    backSpeed: 30,
    loop: true,
  };

  typed.current = new Typed(interestsRef.current, options);

  return () => {
      typed.current.destroy();
  };

}, []);

    return (
      <section className="flex flex-col h-100 text-gray p-2 py-0 sm:p-6 mt-0 mb-16">
        <div className="max-w-4xl mx-auto text-center lg:flex lg:items-center lg:justify-end">
          <div className="lg:w-2/3 lg:order-2 p-5">
            <h2 className="font-bold text-5xl subheading" id="about-me">
              About Me
              </h2>
            <p className="about-text text-3xl p-4 text-gray-800">
            I am an Honors Computer Science and Math student at
            <span className="font-bold text-black"> <a href="https://www.northeastern.edu/">Northeastern University. </a></span>
            I&apos;m currently in my second year, actively seeking
            opportunities for Co-ops in the field of software
            engineering for the 
            <span className="font-bold text-black"> Spring of 2024 </span>
            as well as internships for the 
            <span className="font-bold text-black"> Summer of 2025.</span>
          </p>
          <p className="about-me text-3xl text-gray-800">
            Currently I am interning for the <span className="font-bold text-black"> <a href="https://www.sei.cmu.edu/">SEI @ CMU </a></span> 
            and am working for the CERT Cyber
            Mission Readiness team.
            In the Fall I'll be working as a TA for <span className="font-bold text-black"> <a href="https://www.khoury.northeastern.edu/home/rachlin/ds/ds3000_ds5110/">DS3000</a></span>, 
            helping students with the foundations of Data Science!
          </p>
          <p className="about-me text-3xl mt-4 text-gray-800">
            Aside from CS, I am involved in the professional business
            fraternity <span className="font-bold text-black"><a href="https://www.akpsineu.org/">Alpha Kappa Psi </a></span> 
            and enjoy playing video games, hiking, climbing, and swimming!
          </p>
          </div>
          <div className="lg:w-1/3 lg:order-1 lg:mt-6">
            <div className="justify-center lg:flex-col">
                <img
                src ={headshot}
                alt="headshot"
                className="rounded-lg w-52 md:w-56 lg:w-64 h-auto mx-auto mt-4">
                </img>
                <h1 className="mt-2 text-3xl flex justify-center">
                  <span className="pr-2"><a href={`mailto:${emailAddress}`} onClick={handleEmailClick}><AiOutlineMail className="mail-icon duration-300"/></a></span>
                  Talk to me about:
                  <span className="pl-3 "><a href="https://www.instagram.com/jake.langlois1/" ><FaInstagram className="instagram-icon duration-300"/></a></span>
                </h1>
                <h1 className="text-3xl font-bold">
                  <span ref={interestsRef}></span>
                </h1>
                
              </div>
          </div>
        </div>
      </section>
    );
  };

export default AboutMe;