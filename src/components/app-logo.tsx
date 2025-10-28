'use client'

import { Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'

const brandVariants = cva('flex items-center font-bold select-none', {
  variants: {
    size: {
      sm: 'text-sm gap-1',
      md: 'text-base gap-1.5',
      lg: 'text-xl gap-2',
      xl: 'text-2xl gap-3.5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const iconBoxVariants = cva(
  'flex items-center justify-center rounded-lg shadow-md',
  {
    variants: {
      size: {
        sm: 'h-6 w-6',
        md: 'h-8 w-8',
        lg: 'h-10 w-10',
        xl: 'h-12 w-12',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

interface AppLogoProps extends VariantProps<typeof brandVariants> {
  className?: string
}

const AppLogo = ({ size, className }: AppLogoProps) => {
  return (
    <div
      className={cn(
        brandVariants({ size }),
        'motion-safe:motion-preset-fade motion-safe:motion-duration-1000',
        className
      )}
    >
      <div
        className={cn(
          iconBoxVariants({ size }),
          'from-primary to-primary/50 bg-linear-to-br' // updated to blue-green gradient
        )}
      >
        <Sparkles className="h-[60%] w-[60%] text-white" />
      </div>

      <span className="text-foreground ml-2">TaskFlow</span>
    </div>
  )
}

export default AppLogo
