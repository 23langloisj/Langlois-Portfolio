import { FiArrowUpRight } from 'react-icons/fi'
import experiences, { ExperienceData } from '../extra/experiences'
import { Section, Reveal } from './primitives'

const Experience = () => {
  return (
    <Section
      id="experience"
      index="02"
      title="Experience"
      action={
        <a
          href="https://www.linkedin.com/in/jacob-langlois/"
          target="_blank"
          rel="noreferrer"
          className="link-sweep inline-flex items-center gap-1 font-mono text-[12px] text-link transition-colors hover:text-link-hover"
        >
          Full history <FiArrowUpRight size={13} />
        </a>
      }
    >
      <ol className="border-t border-hairline">
        {experiences.map((exp: ExperienceData, i) => (
          <Reveal key={exp.company} delay={Math.min(i * 40, 200)}>
            <li className="group flex gap-4 border-b border-hairline py-5">
              <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-md border border-hairline bg-surface font-mono text-[11px] font-semibold text-muted transition-colors duration-200 group-hover:border-line group-hover:text-ink">
                {exp.mark}
              </span>

              <div className="flex flex-1 flex-col">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                  <h3 className="text-[15px] font-semibold text-ink">
                    {exp.role}
                  </h3>
                  <span className="tnum font-mono text-[12px] text-muted">
                    {exp.date}
                  </span>
                </div>

                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <span className="text-[13px] text-body">{exp.company}</span>
                  <span className="font-mono text-[10px] uppercase tracking-label text-faint">
                    {exp.domain}
                  </span>
                </div>

                <p className="mt-1.5 max-w-[58ch] text-[14px] leading-relaxed text-body">
                  {exp.summary}
                </p>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}

export default Experience
