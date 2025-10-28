import Link from 'next/link'
import AppLogo from '../app-logo'

const HeroNavigation = () => {
  return (
    <nav className="bg-background/80 border-border sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
        <AppLogo size={'md'} />
        <div className="flex items-center gap-4">
          <Link
            href="/auth/login"
            className="text-foreground hover:text-primary font-medium transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/auth/register"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-6 py-2 font-semibold transition-all hover:shadow-lg"
          >
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default HeroNavigation
