import React from "react"
import styles from "./Loader.module.css"

const Loader = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    aria-label="Loader"
    ref={ref}
    className={[styles.loader, className].join(" ")}
    {...props}
  />
))
Loader.displayName = "Loader"

export { Loader }
