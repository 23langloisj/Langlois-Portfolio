import afterflea from '../assets/afterflea.png';
import ornl from '../assets/ornl.png';
import cmu from '../assets/cmu.png';
import khoury from '../assets/khoury.jpeg';
import sandbox from '../assets/sandbox.png'
import smartleaf from '../assets/smartleaf.jpeg';
import emoney from '../assets/emoney.png';

export interface ExperienceData {
    company: string;
    role: string;
    description: string;
    live: string | null;
    image: string;
    date: string;
}

const experiences: ExperienceData[]= [
    {
        company: "eMoney Advisors",
        role: "Software Engineer Co-op",
        description: "",
        live: null,
        image: emoney,
        date: "Jan 2026 - Present"
    },
    {
        company: "Smartleaf",
        role: "Software Engineer Co-op",
        description: "",
        live: null,
        image: smartleaf,
        date: "Jan 2025 - June 2025"
    },
    {
        company: "Khoury College of Computer Sciences",
        role: "DS3000 - Teaching Assistant",
        description: "",
        live: null,
        image: khoury,
        date: "Aug 2024 - Dec 2024"
    },

    {
        company: "Sandbox @ Northeastern",
        role: "Software Developer",
        description: "",
        live: null,
        image: sandbox,
        date: "Aug 2024 - Present"
    },

    {
        company: "Software Engineering Institute - CMU",
        role: "Software Developer Intern",
        description: "",
        live: null,
        image: cmu,
        date: "May 2024 - Aug 2024"
    },

    {
        company: "Oak Ridge National Laboratory",
        role: "Robotics Intern",
        description: "",
        live: null,
        image: ornl,
        date: "Jul 2022 - Aug 2022"

    },
];

export default experiences