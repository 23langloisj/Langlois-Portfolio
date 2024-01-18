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
            I am an Honors Computer Science student with a Math minor at
            <span className="font-bold text-black"> <a href="https://www.northeastern.edu/">Northeastern University. </a></span>
            I&apos;m currently in my first year, actively seeking
            opportunities for internships in the field of software
            engineering for the 
            <span className="font-bold text-black"> Summer of 2024.</span>
          </p>
          <p className="about-me text-3xl text-gray-800">
            Currently, I am working as an intern for the startup
            <span className="font-bold text-black"> <a href="https://afterflea.com/">AfterFlea AIOS </a></span>
            and have gotten the chance to contribute to cutting edge conversational AI.
            At Northeastern, I have joined Oasis and created
            my first full-stack web application. Currently, I am a member of the Northeastern Electric Racing software
            team and am working on the product <span className="font-bold text-black"><a href="https://finishlinebyner.com/login"> Finish Line </a></span>
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
                className="rounded-lg w-40 md:w-4 lg:w-48 h-auto mx-auto mt-4">
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