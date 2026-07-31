import { useEffect, useState, ReactNode } from 'react'
import { Command } from 'cmdk'
import {
  FiArrowRight,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiInstagram,
  FiFileText,
  FiSun,
  FiMoon,
  FiCoffee,
  FiMapPin,
  FiEdit3,
} from 'react-icons/fi'
import { useSiteNav, SECTIONS, EXTERNAL } from '../lib/useSiteNav'
import { useTheme } from '../lib/theme'
import { thoughts } from '../lib/thoughts'

const Kbd = ({ children }: { children: ReactNode }) => (
  <kbd className="rounded border border-hairline bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] leading-none text-muted">
    {children}
  </kbd>
)

const CommandPalette = () => {
  const [open, setOpen] = useState(false)
  const { go } = useSiteNav()
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    const onOpen = () => setOpen(true)
    document.addEventListener('keydown', onKey)
    window.addEventListener('cmdk:open', onOpen)
    return () => {
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('cmdk:open', onOpen)
    }
  }, [])

  const run = (fn: () => void) => {
    setOpen(false)
    window.setTimeout(fn, 10)
  }

  const Item = ({
    icon,
    label,
    onSelect,
  }: {
    icon: ReactNode
    label: string
    onSelect: () => void
  }) => (
    <Command.Item
      value={label}
      onSelect={onSelect}
      className="flex items-center gap-3 rounded-md px-3 py-2.5 text-[14px] text-body data-[selected=true]:text-ink"
    >
      <span className="text-muted">{icon}</span>
      <span className="flex-1">{label}</span>
    </Command.Item>
  )

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command menu"
      className="w-full max-w-[560px] overflow-hidden rounded-xl border border-hairline bg-surface shadow-pop animate-pop-in"
    >
      <Command.Input
        placeholder="Search or jump to…"
        className="w-full border-b border-hairline bg-transparent px-4 py-3.5 text-[15px] text-ink outline-none placeholder:text-faint"
      />
      <Command.List className="max-h-[340px] overflow-y-auto p-2">
        <Command.Empty className="px-3 py-6 text-center text-[13px] text-muted">
          No results.
        </Command.Empty>

        <Command.Group heading="Navigate">
          {SECTIONS.map((s) => (
            <Item
              key={s.target}
              icon={<FiArrowRight size={15} />}
              label={s.label}
              onSelect={() => run(() => go(s.target))}
            />
          ))}
          <Item
            icon={<FiEdit3 size={15} />}
            label="Thoughts"
            onSelect={() => run(() => go('/thoughts'))}
          />
          <Item
            icon={<FiCoffee size={15} />}
            label="The kitchen"
            onSelect={() => run(() => go('/sheflang'))}
          />
          <Item
            icon={<FiMapPin size={15} />}
            label="Travel"
            onSelect={() => run(() => go('/travel'))}
          />
        </Command.Group>

        {thoughts.length > 0 && (
          <Command.Group heading="Read">
            {thoughts.slice(0, 6).map((entry) => (
              <Item
                key={entry.slug}
                icon={
                  entry.icon ? (
                    <span className="text-[15px] leading-none">{entry.icon}</span>
                  ) : (
                    <FiFileText size={15} />
                  )
                }
                label={entry.title}
                onSelect={() => run(() => go(`/thoughts/${entry.slug}`))}
              />
            ))}
          </Command.Group>
        )}

        <Command.Group heading="Links">
          <Item
            icon={<FiFileText size={15} />}
            label="Download résumé"
            onSelect={() => run(() => window.open(EXTERNAL.resume, '_blank'))}
          />
          <Item
            icon={<FiGithub size={15} />}
            label="GitHub"
            onSelect={() => run(() => window.open(EXTERNAL.github, '_blank'))}
          />
          <Item
            icon={<FiLinkedin size={15} />}
            label="LinkedIn"
            onSelect={() => run(() => window.open(EXTERNAL.linkedin, '_blank'))}
          />
          <Item
            icon={<FiInstagram size={15} />}
            label="Instagram"
            onSelect={() => run(() => window.open(EXTERNAL.instagram, '_blank'))}
          />
          <Item
            icon={<FiMail size={15} />}
            label="Email me"
            onSelect={() => run(() => (window.location.href = EXTERNAL.email))}
          />
        </Command.Group>

        <Command.Group heading="Theme">
          <Item
            icon={theme === 'dark' ? <FiSun size={15} /> : <FiMoon size={15} />}
            label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            onSelect={() => run(toggle)}
          />
        </Command.Group>
      </Command.List>

      <div className="flex items-center justify-between border-t border-hairline px-3 py-2 font-mono text-[10px] text-faint">
        <span>jakelanglois.com</span>
        <span className="flex items-center gap-1.5">
          <Kbd>↑↓</Kbd> move <Kbd>↵</Kbd> select <Kbd>esc</Kbd> close
        </span>
      </div>
    </Command.Dialog>
  )
}

export default CommandPalette
