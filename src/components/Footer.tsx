import React from 'react';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';

const Footer = () => {
    return (
        <footer className="py-12 px-6 border-t border-slate-800/60 bg-[#0f172a]">
            <div className="max-w-6xl mx-auto flex flex-col items-center">
                <div className="flex gap-8 mb-8 text-slate-400">
                    <a 
                        href="https://github.com/23langloisj" 
                        target="_blank" 
                        className="hover:text-teal-400 transition-colors duration-300"
                    >
                        <AiFillGithub size={24} />
                    </a>
                    <a 
                        href="https://www.linkedin.com/in/jacob-langlois/" 
                        target="_blank" 
                        className="hover:text-teal-400 transition-colors duration-300"
                    >
                        <AiFillLinkedin size={24} />
                    </a>
                </div>
                <p className="font-mono text-sm tracking-widest text-slate-500 uppercase mb-2">
                    Designed & Built by <span className="text-slate-300">Jake Langlois</span>
                </p>
                <p className="text-[10px] font-mono text-slate-600 uppercase tracking-tighter">
                    React · Tailwind · TypeScript · Framer Motion
                </p>
            </div>
        </footer>
    );
};

export default Footer;