import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'

type Theme = 'light' | 'dark'

interface ThemeCtx {
  theme: Theme
  toggle: () => void
  setTheme: (t: Theme) => void
}

const Ctx = createContext<ThemeCtx>({
  theme: 'light',
  toggle: () => {},
  setTheme: () => {},
})

/** Read the theme the anti-FOUC script already applied to <html>. */
const initialTheme = (): Theme =>
  typeof document !== 'undefined' &&
  document.documentElement.classList.contains('dark')
    ? 'dark'
    : 'light'

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(initialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* ignore */
    }
  }, [theme])

  const setTheme = useCallback((t: Theme) => setThemeState(t), [])
  const toggle = useCallback(
    () => setThemeState((t) => (t === 'dark' ? 'light' : 'dark')),
    [],
  )

  return <Ctx.Provider value={{ theme, toggle, setTheme }}>{children}</Ctx.Provider>
}

export const useTheme = () => useContext(Ctx)

/** Sun/moon toggle used in the nav. */
export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'
  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`grid h-9 w-9 place-items-center rounded-md text-muted transition-colors hover:bg-surface-2 hover:text-ink ${className}`}
    >
      <span className="relative block h-[18px] w-[18px]">
        <FiSun
          size={18}
          className={`absolute inset-0 transition-all duration-300 ease-out ${
            isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
          }`}
        />
        <FiMoon
          size={18}
          className={`absolute inset-0 transition-all duration-300 ease-out ${
            isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
          }`}
        />
      </span>
    </button>
  )
}
