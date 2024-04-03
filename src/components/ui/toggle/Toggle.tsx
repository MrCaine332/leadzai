import React from "react"
import styles from "./Toggle.module.css"

type ToggleProps = {
  isActive?: boolean
} & React.HTMLAttributes<HTMLButtonElement>

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, isActive, ...props }, ref) => (
    <button
      aria-label="toggle"
      ref={ref}
      className={[
        styles.toggle,
        isActive ? styles.toggleActive : "",
        className,
      ].join(" ")}
      {...props}
    />
  )
)
Toggle.displayName = "Toggle"

export { Toggle }
