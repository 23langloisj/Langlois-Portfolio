import peaceofmind from '../assets/peaceofmind.png';
import langbot from '../assets/langbot.png';
import neurojump from '../assets/neurojump.png';

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
        image: langbot,
        title: "LangBot",
        description: "LangBot: Bring fun to your discord server, one command at a time :)",
        live: null,
        code: "https://github.com/23langloisj/LangBot",
        technologies: ["JavaScript", "NodeJS", "DiscordJS"],
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