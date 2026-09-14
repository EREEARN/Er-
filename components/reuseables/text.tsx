import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const textVariants = cva("", {
  variants: {
    variant: {
      h1: "text-4xl font-bold",
      h2: "text-3xl font-bold",
      h3: "text-2xl font-semibold",
      h4: "text-xl font-semibold",
      body: "text-base font-normal",
      small: "text-sm font-normal",
      caption: "text-xs font-normal",
    },
  },
  defaultVariants: {
    variant: "body",
  },
})

type TextElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "label"

type TextProps<T extends TextElement = "p"> = Omit<
  React.ComponentPropsWithoutRef<T>,
  "color"
> &
  VariantProps<typeof textVariants> & {
    /** Element/tag to render as. Defaults to "p". */
    as?: T
  }

function Text<T extends TextElement = "p">({
  as,
  variant,
  className,
  ...props
}: TextProps<T>) {
  const Component = (as ?? "p") as React.ElementType
  return <Component className={cn(textVariants({ variant }), className)} {...props} />
}

export { Text, textVariants }
