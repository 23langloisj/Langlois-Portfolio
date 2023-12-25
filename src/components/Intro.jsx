import { useEffect, useRef } from "react";
import { Link } from 'react-scroll';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';


const Intro = () => {   
    
    return (
    <header>
        <div className="flex items-center justify-center h-screen mb-8">
            <div className="text-center">
                <h1 className = "text-white text-center text-6xl font-bold">Hi! I'm <span className ="horizontal-gradient">Jake Langlois</span></h1>
                <p className = "text-white font-bold text-2xl text-center mt-4">I'm an aspiring Software Engineer studying CS @ 
                <span className="northeastern-color"> Northeastern University</span> 
                </p>
                <div className="flex items-center justify-center space-x-4 text-center">
                    <a href="https://github.com/23langloisj" target="_blank">
                    <AiFillGithub className="text-4xl text-gray-900 github-icon duration-300"/>
                    </a>
                    <p className="seperator-line mt-4 w-20 mx-auto"></p>
                    <a href="https://www.linkedin.com/in/jacob-langlois/" target="_blank">
                        <AiFillLinkedin className="text-4xl text-gray-900 linkedin-icon duration-300" />
                    </a>
                    
                </div>
                <button className="text-white px-4 py-2 rounded mt-1 w-44 animation-gradient"
                onClick={() => {
                    const targetSection = document.getElementById('projects');
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }}
                >
                    Check Out My Work!</button>
            </div>
        </div>
    </header>
    );

};

export default Intro;