import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';

const Intro = () => {   
    return (
    <header className="relative h-screen flex items-center justify-center bg-[#0f172a]">
        <div className="max-w-3xl mx-auto px-6 text-center">
            
            <p className="font-mono text-teal-500 text-sm mb-3 tracking-widest uppercase">
                Nice to meet you
            </p>

            <h1 className="text-4xl md:text-6xl font-bold text-slate-100 mb-6 tracking-tight">
                <span className="font-medium text-slate-400">Hi, I'm </span>
                Jake Langlois
            </h1>

            <p className="text-slate-400 text-lg md:text-xl max-w-lg mx-auto leading-relaxed mb-10">
                I'm an aspiring Software Engineer studying CS and Math at 
                <span className="text-rose-500/90 font-semibold"> Northeastern</span>. 
                I like building things.
            </p>
            
            <div className="flex flex-col items-center gap-8">
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
    </header>
    );
};

export default Intro;