import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'
import { FaInstagram } from 'react-icons/fa'
import { AiOutlineMail } from 'react-icons/ai'
import { FiArrowUp } from 'react-icons/fi'

const Footer = () => {
  return (
    <footer className="mx-auto w-full max-w-content px-6 pb-14 pt-[72px] md:pt-[88px]">
      <div className="border-t border-hairline pt-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <span className="grid h-6 w-6 place-items-center rounded bg-ink font-mono text-[11px] font-bold leading-none text-canvas">
              jl
            </span>
            <span className="font-mono text-[12px] text-muted">
              jakelanglois.com
            </span>
          </div>

          <div className="flex items-center gap-5 text-muted">
            <a
              href="mailto:langlois.j@northeastern.edu"
              aria-label="Email"
              className="transition-colors hover:text-ink"
            >
              <AiOutlineMail size={19} />
            </a>
            <a
              href="https://github.com/23langloisj"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="transition-colors hover:text-ink"
            >
              <AiFillGithub size={19} />
            </a>
            <a
              href="https://www.linkedin.com/in/jacob-langlois/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="transition-colors hover:text-ink"
            >
              <AiFillLinkedin size={19} />
            </a>
            <a
              href="https://www.instagram.com/jake.langlois1/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="transition-colors hover:text-ink"
            >
              <FaInstagram size={17} />
            </a>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] text-faint">
            Designed and built by Jake Langlois · React · TypeScript · Tailwind
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-1.5 self-start font-mono text-[11px] uppercase tracking-label text-muted transition-colors hover:text-ink sm:self-auto"
          >
            Back to top <FiArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
