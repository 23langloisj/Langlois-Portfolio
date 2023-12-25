import projects from '../extra/projects.js';


const Projects = () => {
    return (
        <div className="text-black flex flex-col items-center justify-center pt-10">
            <h2 className="subheading text-5xl font-bold" id="projects">
                Projects
            </h2>
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 py-10 px-4">
            {projects.map((project, index) => (
                <div
                    key={index}
                    className="border-2 border-blue-800 p-4 rounded-lg w-full flex-col text-center items-center transition-transform transform hover:scale-105"
                    >
                    <div className="flex flex-col items-center h-full">
                        {project.image && (
                            <img
                                src={project.image}
                                alt={`Project ${index + 1}`}
                                className="mx-auto mb-4 rounded-lg max-w-full w-64"
                            />
                        )}
                            <h3 className="text-black font-bold text-3xl m-2">{project.title}</h3>
                            <p className="text-2xl font-semibold">{project.description}</p>
                            <div className="mt-2 text-xl">
                                <p className="font-semibold">{project.technologies.join(" | ")}</p>
                            </div>
                            <div className="flex-grow"></div>
                            <div className="flex mt-2 gap-2 justify-center">
                                {project.live && (
                                    <a
                                    href={project.live}
                                    target="_blank"
                                    className="link-text"
                                    >
                                    Live
                                    </a>
                                )}
                                {project.code && (
                                    <a
                                    href={project.code}
                                    target="_blank"
                                    className="link-text text-2xl text-green hover:text-blue-600 duration-300"
                                    >
                                    Visit
                                    </a>
                        )}
                    </div>
                </div>
            </div>
            ))}
        </div>
    </div>
    );
};

   

export default Projects;