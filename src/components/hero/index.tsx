import Link from 'next/link'
import {
  CheckCircle2,
  Zap,
  BarChart3,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import HeroNavigation from './navigation'
import FooterSection from '../footer'

export default function Hero() {
  return (
    <main className="bg-background min-h-screen">
      {/* Navigation */}
      <HeroNavigation />

      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl overflow-hidden px-6 py-24 md:px-12 md:py-40">
        <div className="absolute inset-0 -z-10">
          <div className="bg-primary/20 absolute top-0 right-0 h-96 w-96 animate-pulse rounded-full opacity-20 blur-3xl" />
          <div className="bg-accent/20 absolute bottom-0 left-0 h-96 w-96 animate-pulse rounded-full opacity-20 blur-3xl" />
        </div>

        <div className="space-y-8 text-center">
          {/* Badge */}
          <div className="inline-block">
            <div className="bg-primary/10 text-primary border-primary/20 flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold">
              <Sparkles className="h-4 w-4" />✨ Productivity Reimagined
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-foreground text-6xl leading-tight font-bold text-balance md:text-7xl lg:text-8xl">
            Get things done,{' '}
            <span className="from-primary via-accent to-primary animate-pulse bg-linear-to-r bg-clip-text text-transparent">
              effortlessly
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-muted-foreground mx-auto max-w-3xl text-lg leading-relaxed font-light md:text-xl">
            TaskFlow helps you organize, prioritize, and complete your tasks
            with an intuitive interface designed for modern productivity. Join
            thousands of users getting more done every day.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col justify-center gap-4 pt-8 sm:flex-row">
            <Link
              href="/auth/register"
              className="group bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-primary/20 flex items-center justify-center gap-2 rounded-lg px-8 py-4 font-semibold transition-all hover:shadow-xl"
            >
              Get Started Free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="#features"
              className="border-primary text-primary hover:bg-primary/10 rounded-lg border-2 px-8 py-4 font-semibold transition-all"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-24 md:px-12">
        <div className="mb-16 text-center">
          <h2 className="text-foreground mb-4 text-4xl font-bold md:text-5xl">
            Powerful Features
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Everything you need to stay organized and productive
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Feature 1 */}
          <div className="group bg-card border-border hover:border-primary/50 rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="bg-primary/10 group-hover:bg-primary/20 mb-6 flex h-14 w-14 items-center justify-center rounded-xl transition-colors">
              <CheckCircle2 className="text-primary h-7 w-7" />
            </div>
            <h3 className="text-foreground mb-3 text-xl font-bold">
              Smart Organization
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Organize tasks by projects, priorities, and due dates. Keep
              everything in one place with powerful filtering and search.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group bg-card border-border hover:border-primary/50 rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="bg-primary/10 group-hover:bg-primary/20 mb-6 flex h-14 w-14 items-center justify-center rounded-xl transition-colors">
              <Zap className="text-primary h-7 w-7" />
            </div>
            <h3 className="text-foreground mb-3 text-xl font-bold">
              Lightning Fast
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Instant sync across all your devices. Never lose track of what
              matters with real-time updates.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group bg-card border-border hover:border-primary/50 rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="bg-primary/10 group-hover:bg-primary/20 mb-6 flex h-14 w-14 items-center justify-center rounded-xl transition-colors">
              <BarChart3 className="text-primary h-7 w-7" />
            </div>
            <h3 className="text-foreground mb-3 text-xl font-bold">
              Track Progress
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Visualize your productivity with beautiful charts and insights.
              Celebrate your wins.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="text-primary mb-2 text-4xl font-bold md:text-5xl">
              10K+
            </div>
            <p className="text-muted-foreground">Active Users</p>
          </div>
          <div className="text-center">
            <div className="text-primary mb-2 text-4xl font-bold md:text-5xl">
              500K+
            </div>
            <p className="text-muted-foreground">Tasks Completed</p>
          </div>
          <div className="text-center">
            <div className="text-primary mb-2 text-4xl font-bold md:text-5xl">
              99.9%
            </div>
            <p className="text-muted-foreground">Uptime</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-4xl px-6 py-24 md:px-12">
        <div className="from-primary/10 via-accent/5 to-primary/5 border-primary/20 rounded-3xl border bg-linear-to-br p-12 md:p-16">
          <h2 className="text-foreground mb-4 text-center text-4xl font-bold text-balance md:text-5xl">
            Ready to transform your productivity?
          </h2>
          <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-center text-lg">
            Join thousands of users who are already getting more done with
            TaskFlow. Start your free trial today.
          </p>
          <div className="flex justify-center">
            <Link
              href="/auth/register"
              className="group bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-primary/20 flex items-center gap-2 rounded-lg px-8 py-4 font-semibold transition-all hover:shadow-xl"
            >
              Start Your Free Trial
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  )
}
