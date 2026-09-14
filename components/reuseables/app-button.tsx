import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const appButtonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-1.5 rounded-[6px] px-4 h-10 text-sm font-medium whitespace-nowrap transition-all outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary: "border border-transparent bg-app-primary text-white hover:opacity-90",
        swamp: "border border-transparent bg-app-swamp-green text-white hover:opacity-90",
        // border/text color is supplied at runtime via the `color` prop
        outline: "border bg-transparent",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
)

type AppButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof appButtonVariants> & {
    /** Border & text color used only by the "outline" variant. Defaults to the primary color. */
    color?: string
  }

function AppButton({
  className,
  variant = "primary",
  color,
  style,
  ...props
}: AppButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="app-button"
      className={cn(appButtonVariants({ variant, className }))}
      style={
        variant === "outline"
          ? { borderColor: color ?? "var(--color-app-primary)", color: color ?? "var(--color-app-primary)", ...style }
          : style
      }
      {...props}
    />
  )
}

export { AppButton, appButtonVariants }
