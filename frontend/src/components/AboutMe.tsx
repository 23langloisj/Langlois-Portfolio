import { useEffect, useRef } from 'react'
import Typed from 'typed.js'
import headshot from '../assets/headshot.jpg'
import { Section, Reveal } from './primitives'

const linkClass =
  'font-medium text-link underline decoration-link/25 underline-offset-[3px] transition-colors hover:text-link-hover hover:decoration-link/60'

const AboutMe = () => {
  const interestsRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const typed = new Typed(interestsRef.current, {
      strings: [
        'bouldering',
        'ping pong',
        'hiking national parks',
        'cooking',
        'swimming',
        'Minecraft',
        'Fortnite',
        'Clash of Clans',
        'philosophy',
      ],
      typeSpeed: 55,
      backSpeed: 28,
      backDelay: 1400,
      loop: true,
    })
    return () => typed.destroy()
  }, [])

  return (
    <Section id="about" index="01" title="About">
      <div className="flex flex-col-reverse gap-8 sm:flex-row sm:items-start sm:gap-10">
        <Reveal className="flex-1">
          <div className="space-y-5 text-[16px] leading-[1.65] text-body">
            <p>
              I&rsquo;m a third-year Honors student at Northeastern studying
              computer science and mathematics (3.97 GPA). Right now I&rsquo;m a
              software engineer co-op at{' '}
              <span className="font-medium text-ink">Klaviyo</span>, working on
              KSocial.
            </p>
            <p>
              Before this I built advisor tooling at{' '}
              <span className="font-medium text-ink">eMoney</span> and{' '}
              <span className="font-medium text-ink">Smartleaf</span>, supported
              the CERT cyber mission readiness team at the{' '}
              <a
                href="https://sei.cmu.edu/"
                target="_blank"
                rel="noreferrer"
                className={linkClass}
              >
                SEI at Carnegie Mellon
              </a>
              , and did robotics work at Oak Ridge National Laboratory. On
              campus I&rsquo;m technical lead and head of DevOps at{' '}
              <a
                href="https://www.sandboxnu.com/"
                target="_blank"
                rel="noreferrer"
                className={linkClass}
              >
                Sandbox
              </a>
              , Northeastern&rsquo;s student-led software consultancy.
            </p>
            <p>
              I care about clean systems, fast feedback loops, and shipping
              tools people actually use.
            </p>

            <div className="flex items-baseline gap-2.5 pt-2 font-mono text-[13px]">
              <span className="text-[11px] uppercase tracking-label text-muted">
                Off the clock
              </span>
              <span className="text-line">/</span>
              <span className="text-ink">
                <span ref={interestsRef} />
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80} className="shrink-0">
          <figure className="w-[150px] sm:w-[168px]">
            <img
              src={headshot}
              alt="Jake Langlois"
              className="w-full rounded-lg border border-hairline object-cover grayscale transition-[filter,transform] duration-500 ease-out hover:grayscale-0"
            />
            <figcaption className="mt-2.5 text-center font-mono text-[11px] text-muted">
              Boston, MA
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </Section>
  )
}

export default AboutMe
