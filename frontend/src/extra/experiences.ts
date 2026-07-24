export interface ExperienceData {
  company: string
  role: string
  mark: string // monogram tile
  date: string
  domain: string // one-word context tag
  summary: string // one concrete line
}

const experiences: ExperienceData[] = [
  {
    company: 'Klaviyo',
    role: 'Software Engineer Co-op',
    mark: 'KL',
    date: 'Jul 2026 — Present',
    domain: 'Martech',
    summary: 'Building on KSocial, the social side of Klaviyo’s marketing platform.',
  },
  {
    company: 'fore.tv',
    role: 'Software Engineer',
    mark: 'FT',
    date: 'Mar 2026 — Present',
    domain: 'Media',
    summary:
      'Part-time engineer on a live-streaming golf media platform (5,300+ viewers in month one).',
  },
  {
    company: 'eMoney Advisor',
    role: 'Software Engineer Co-op',
    mark: 'EM',
    date: 'Jan 2026 — Jun 2026',
    domain: 'Fintech',
    summary: 'Shipped features for financial-planning software used by advisors.',
  },
  {
    company: 'Smartleaf',
    role: 'Software Engineer Co-op',
    mark: 'SL',
    date: 'Jan 2025 — Jun 2025',
    domain: 'Fintech',
    summary:
      'Built core Advisor Portal features for the automated portfolio-rebalancing platform.',
  },
  {
    company: 'Sandbox @ Northeastern',
    role: 'Technical Lead & Head of DevOps',
    mark: 'SB',
    date: 'Aug 2024 — Present',
    domain: 'Platform',
    summary:
      'Lead student platforms and own infrastructure at Northeastern’s student-run software consultancy.',
  },
  {
    company: 'Khoury College of Computer Sciences',
    role: 'Teaching Assistant — DS 3000',
    mark: 'TA',
    date: 'Aug 2024 — Dec 2024',
    domain: 'Teaching',
    summary: 'TA’d Foundations of Data Science: office hours, grading, and support.',
  },
  {
    company: 'Software Engineering Institute — CMU',
    role: 'Software Engineer Intern',
    mark: 'SEI',
    date: 'May 2024 — Aug 2024',
    domain: 'Security',
    summary:
      'Built GHOSTS Lite to cheaply simulate realistic network activity for cyber training.',
  },
  {
    company: 'Oak Ridge National Laboratory',
    role: 'Robotics Intern',
    mark: 'OR',
    date: 'Jul 2022 — Aug 2022',
    domain: 'Robotics',
    summary: 'Summer robotics research at a U.S. Department of Energy national lab.',
  },
]

export default experiences
