import { Button as Primitive } from '@base-ui/react/button'
import type { VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/lib/button-variants'

export function Button({
  className,
  variant,
  ...props
}: Primitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <Primitive
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    />
  )
}
