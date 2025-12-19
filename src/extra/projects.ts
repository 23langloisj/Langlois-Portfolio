import peaceofmind from '../assets/peaceofmind.png';
import ghosts from '../assets/ghosts.png';
import neurojump from '../assets/neurojump.png';

export interface ProjectData {
    image: string | null;
    title: string;
    description: string;
    live: string | null;
    code: string | null;
    technologies: string[];
}

const projects = [
    {
        image: peaceofmind,
        title: "Peace of Mind",
        description: "Peace of Mind is a mental health AI chatbot tailored to help college students.",
        live: null,
        code: "https://github.com/Oasis-NEU/f23-group23",
        technologies: ["TypeScript", "ReactJS", "Firebase", "Python", "Flask", "NextJS", "TailwindCSS"],
    },

    {
        image: ghosts,
        title: "GHOSTS LITE",
        description: "GHOSTS LITE is a streamlined version of the GHOSTS framework designed to simulate realistic network without the expense of running actual applications",
        live: null,
        code: "https://github.com/23langloisj/GHOSTS/tree/master/src/Ghosts.Client.Lite",
        technologies: [".NET", "C#"],
    },

    {
        image: neurojump,
        title: "NeuroJump",
        description: "NeuroJump is a simple machine learning-based jumping game developed using Pygame and NeuroEvolution of Augmenting Topologies",
        live: null,
        code: "https://github.com/23langloisj/NeuroJump",
        technologies: ["Python", "Pygame", "NEAT-Python"]
    },
];

export default projects;