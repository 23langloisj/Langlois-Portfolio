import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'
import { FiArrowUpRight } from 'react-icons/fi'
import { Reveal } from './primitives'

const email = 'langlois.j@northeastern.edu'

const Contact = () => {
  return (
    <section
      id="contact"
      className="mx-auto max-w-content scroll-mt-24 px-6 pb-4 pt-[72px] md:pt-[88px]"
    >
      <Reveal>
        <div className="overflow-hidden rounded-2xl bg-inverse px-7 py-10 text-inverse-fg md:px-11 md:py-14">
          <span className="font-mono text-eyebrow uppercase tracking-label text-inverse-fg/45">
            04 · Contact
          </span>
          <h2 className="mt-4 max-w-[18ch] text-[30px] font-semibold leading-[1.08] tracking-display md:text-[38px]">
            HMU!
          </h2>
          <p className="mt-5 max-w-[48ch] text-[16px] leading-relaxed text-inverse-fg/65">
            Graduating 2027. I&rsquo;m open to software engineering internships
            and new-grad roles &mdash; and always up for a good technical
            conversation. Email is the fastest way to reach me.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 rounded-md bg-inverse-fg px-4 py-2.5 text-[14px] font-medium text-inverse transition-transform duration-200 ease-out hover:-translate-y-0.5"
            >
              {email}
            </a>
            <a
              href="/Langlois_Resume.pdf"
              download
              className="inline-flex items-center gap-1.5 rounded-md border border-inverse-fg/20 px-4 py-2.5 text-[14px] font-medium text-inverse-fg transition-colors hover:bg-inverse-fg/10"
            >
              Résumé <FiArrowUpRight size={15} />
            </a>
          </div>

          <div className="mt-9 flex items-center gap-5 text-inverse-fg/55">
            <a
              href="https://github.com/23langloisj"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="transition-colors hover:text-inverse-fg"
            >
              <AiFillGithub size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/jacob-langlois/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="transition-colors hover:text-inverse-fg"
            >
              <AiFillLinkedin size={20} />
            </a>
            <span className="ml-auto font-mono text-[11px] text-inverse-fg/40">
              Boston · Greater Pittsburgh
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

export default Contact
