import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import ClashStats from './ClashStats'; // Import your component

const Intro = () => {    
    return (
    <header className="relative min-h-screen flex items-center justify-center bg-[#0f172a] overflow-hidden">
        {/* Subtle Background Decoration */}
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[1fr_350px] gap-12 items-center">
            
            {/* LEFT SIDE: YOUR CORE INFO */}
            <div className="text-center lg:text-left">
                <p className="font-mono text-teal-500 text-sm mb-3 tracking-widest uppercase">
                    Nice to meet you
                </p>

                <h1 className="text-4xl md:text-6xl font-bold text-slate-100 mb-6 tracking-tight">
                    <span className="font-medium text-slate-400">Hi, I'm </span>
                    Jake Langlois
                </h1>

                <p className="text-slate-400 text-lg md:text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed mb-10">
                    I'm an aspiring Software Engineer studying CS and Math at 
                    <span className="text-rose-500/90 font-semibold"> Northeastern</span>. 
                    I like building things.
                </p>
                
                <div className="flex flex-col lg:flex-row items-center gap-8">
                    <button 
                        className="group px-8 py-3 border border-teal-500/50 text-teal-400 text-sm hover:bg-teal-500/10 transition-all duration-300 rounded-lg"
                        onClick={() => {
                            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        Check out my work
                    </button>

                    <div className="flex items-center space-x-10 text-slate-500">
                        <a href="https://github.com/23langloisj" target="_blank" className="hover:text-white transition-colors text-2xl">
                            <AiFillGithub />
                        </a>
                        <a href="https://www.linkedin.com/in/jacob-langlois/" target="_blank" className="hover:text-white transition-colors text-2xl">
                            <AiFillLinkedin />
                        </a>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE: THE STRATEGIC DATA WIDGET */}
            <div className="relative group mx-auto lg:mx-0">
                {/* Modern Glass Wrapper */}
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                
                <div className="relative bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-1 rounded-2xl shadow-2xl">
                    {/* Header for the widget to make it look like a mini-app */}
                    <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800/50">
                        <div className="flex gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-red-500/40"></div>
                            <div className="w-2 h-2 rounded-full bg-amber-500/40"></div>
                            <div className="w-2 h-2 rounded-full bg-teal-500/40"></div>
                        </div>
                        <span className="text-[9px] font-mono text-slate-500 tracking-[0.2em] uppercase">API Live Feed</span>
                    </div>
                    
                    <div className="p-2">
                        <ClashStats />
                    </div>
                </div>
            </div>

        </div>
    </header>
    );
};

export default Intro;