import { useRef } from 'react';
import projects from '../extra/projects.js';
import { ProjectData } from '../extra/projects.js';
import { FiGithub, FiExternalLink, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Projects = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        
        // Define how much to scroll (one full view)
        const scrollAmount = clientWidth;

        if (direction === 'left') {
          // If at the very start, jump to the very end
          if (scrollLeft <= 0) {
            scrollRef.current.scrollTo({ left: scrollWidth, behavior: 'smooth' });
          } else {
            scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
          }
        } else {
          // If at the very end (allowing for 1px rounding error), jump to the start
          if (scrollLeft + clientWidth >= scrollWidth - 1) {
            scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
          }
        }
      }
    };

    return (
        <section id="projects" className="py-20 px-6 max-w-6xl mx-auto">
            {/* Header section remains the same */}
            <div className="flex items-center justify-between mb-12">
                <div className="flex items-center flex-1">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-100 whitespace-nowrap">
                        <span className="font-mono text-teal-400 text-2xl mr-2">03.</span>
                        Projects
                    </h2>
                    <div className="h-[1px] bg-slate-700 w-full ml-6 mr-6"></div>
                </div>

                <div className="flex gap-2">
                    <button 
                        onClick={() => scroll('left')}
                        className="p-2 rounded-full border border-slate-700 text-slate-400 hover:border-teal-400 hover:text-teal-400 transition-all active:scale-95"
                    >
                        <FiChevronLeft size={24} />
                    </button>
                    <button 
                        onClick={() => scroll('right')}
                        className="p-2 rounded-full border border-slate-700 text-slate-400 hover:border-teal-400 hover:text-teal-400 transition-all active:scale-95"
                    >
                        <FiChevronRight size={24} />
                    </button>
                </div>
            </div>

            {/* Scrollable Container */}
            <div 
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-8"
            >
                {projects.map((project: ProjectData, index) => (
                    <div
                        key={index}
                        className="snap-center shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] group bg-slate-800/40 border border-slate-700 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:border-teal-400/50 hover:-translate-y-1"
                    >
                        {/* 1. Project Image Container */}
                        <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                            {project.image ? (
                                <img 
                                    src={project.image} 
                                    alt={project.title}
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-700">
                                    <FiGithub size={40} />
                                </div>
                            )}
                            {/* Dark overlay for text readability if needed */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                            
                            {/* Quick Links Overlayed on Image */}
                            <div className="absolute top-4 right-4 flex gap-3">
                                {project.code && (
                                    <a href={project.code} target="_blank" className="p-2 bg-slate-900/80 backdrop-blur-md rounded-full text-white hover:text-teal-400 transition-colors">
                                        <FiGithub size={18} />
                                    </a>
                                )}
                                {project.live && (
                                    <a href={project.live} target="_blank" className="p-2 bg-slate-900/80 backdrop-blur-md rounded-full text-white hover:text-teal-400 transition-colors">
                                        <FiExternalLink size={18} />
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* 2. Content Container */}
                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-teal-400 transition-colors">
                                {project.title}
                            </h3>
                            
                            <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-6">
                                {project.description}
                            </p>

                            {/* 3. Tech Stack - pushed to bottom */}
                            <div className="mt-auto flex flex-wrap gap-2">
                                {project.technologies.slice(0, 4).map((tech, idx) => (
                                    <span 
                                        key={idx} 
                                        className="font-mono text-[10px] text-teal-400/80 bg-teal-400/10 px-2 py-1 rounded border border-teal-400/20"
                                    >
                                        {tech}
                                    </span>
                                ))}
                                {project.technologies.length > 4 && (
                                    <span className="text-slate-500 text-[10px] self-center">
                                        +{project.technologies.length - 4} more
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;