import React from "react"
import styles from "./Container.module.css"

const Container = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    aria-label="container"
    ref={ref}
    className={[styles.container, className].join(" ")}
    {...props}
  />
))
Container.displayName = "Container"

export { Container }
