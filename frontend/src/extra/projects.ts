import peaceofmind from '../assets/peaceofmind.png'
import ghosts from '../assets/ghosts.png'
import neurojump from '../assets/neurojump.png'

export interface ProjectData {
  image: string
  title: string
  description: string
  live: string | null
  code: string | null
  technologies: string[]
}

const projects: ProjectData[] = [
  {
    image: peaceofmind,
    title: 'Peace of Mind',
    description:
      'A mental-health AI chatbot built for college students — a Next.js front end over a Python/Flask backend with Firebase auth and storage.',
    live: null,
    code: 'https://github.com/Oasis-NEU/f23-group23',
    technologies: ['TypeScript', 'Next.js', 'React', 'Python', 'Flask', 'Firebase'],
  },
  {
    image: ghosts,
    title: 'GHOSTS Lite',
    description:
      'A lightweight rewrite of the GHOSTS framework that cheaply simulates realistic network activity for cyber-training environments. Built at the SEI.',
    live: null,
    code: 'https://github.com/23langloisj/GHOSTS/tree/master/src/Ghosts.Client.Lite',
    technologies: ['.NET', 'C#'],
  },
  {
    image: neurojump,
    title: 'NeuroJump',
    description:
      'A jumping game whose AI teaches itself to play using NEAT neuroevolution — genomes mutate and compete until they clear every obstacle.',
    live: null,
    code: 'https://github.com/23langloisj/NeuroJump',
    technologies: ['Python', 'Pygame', 'NEAT'],
  },
]

export default projects
