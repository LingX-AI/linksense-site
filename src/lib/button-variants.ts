import { cva } from 'class-variance-authority'
export const buttonVariants = cva(
  'group/pill relative inline-flex min-h-12 shrink-0 items-center justify-center gap-3 overflow-hidden rounded-full border px-6 text-sm font-medium outline-none transition-colors focus-visible:ring-3 focus-visible:ring-primary/40 focus-visible:ring-offset-4 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4',
  {
    variants: {
      variant: {
        default:
          'border-foreground bg-foreground text-background hover:bg-primary hover:border-primary',
        outline:
          'border-foreground/20 bg-transparent text-foreground hover:border-foreground hover:bg-foreground hover:text-background',
        light:
          'border-white/30 bg-transparent text-white hover:bg-white hover:text-black',
        ghost:
          'border-transparent bg-transparent text-current hover:bg-current/5',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)
