import { FiArrowUpRight, FiGithub } from 'react-icons/fi'
import projects, { ProjectData } from '../extra/projects'
import { Section, Reveal, Chip } from './primitives'

const Projects = () => {
  return (
    <Section
      id="work"
      index="03"
      title="Selected work"
      action={
        <a
          href="https://github.com/23langloisj"
          target="_blank"
          rel="noreferrer"
          className="link-sweep inline-flex items-center gap-1 font-mono text-[12px] text-link transition-colors hover:text-link-hover"
        >
          GitHub <FiArrowUpRight size={13} />
        </a>
      }
    >
      <div className="flex flex-col gap-4">
        {projects.map((project: ProjectData, i) => {
          const href = project.live ?? project.code ?? undefined
          return (
            <Reveal key={project.title} delay={Math.min(i * 60, 180)}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group block overflow-hidden rounded-lg border border-hairline bg-surface transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-line hover:shadow-card"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="shrink-0 overflow-hidden border-b border-hairline bg-surface-2 sm:w-[210px] sm:border-b-0 sm:border-r">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-44 w-full object-cover grayscale-[30%] transition duration-500 ease-out group-hover:grayscale-0 sm:h-full"
                      />
                    ) : (
                      <div className="grid h-44 w-full place-items-center text-line sm:h-full">
                        <FiGithub size={32} />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-[16px] font-semibold text-ink transition-colors group-hover:text-link">
                        {project.title}
                      </h3>
                      <FiArrowUpRight
                        size={17}
                        className="mt-0.5 shrink-0 text-faint transition-colors group-hover:text-link"
                      />
                    </div>

                    <p className="mt-2 flex-1 text-[14px] leading-relaxed text-body">
                      {project.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <Chip key={tech}>{tech}</Chip>
                      ))}
                    </div>
                  </div>
                </div>
              </a>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}

export default Projects
