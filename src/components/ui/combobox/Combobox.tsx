import React, { createContext, useContext, useState } from "react"
import styles from "./Combobox.module.css"

type ComboboxContent = {
  isOpen: boolean
  set: (value: boolean) => void
}

const defaultContextValue = {
  isOpen: false,
  set: () => {},
}

const ComboboxContext = createContext<ComboboxContent>(defaultContextValue)

const Combobox = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const [isOpen, setIsOpen] = useState(false)

  const set = (value: boolean) => {
    setIsOpen(value)
  }

  return (
    <ComboboxContext.Provider value={{ isOpen: isOpen, set: set }}>
      <div
        aria-label="Combobox"
        ref={ref}
        className={[styles.combobox, className].join(" ")}
        {...props}
      />
    </ComboboxContext.Provider>
  )
})
Combobox.displayName = "Container"

const ComboboxHead = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      aria-label="ComboboxHead"
      ref={ref}
      className={[styles.comboboxHead, className].join(" ")}
      {...props}
    />
  )
})
ComboboxHead.displayName = "ComboboxHead"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const ComboboxInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const { set } = useContext(ComboboxContext)

    return (
      <input
        type={type}
        ref={ref}
        className={[styles.comboboxInput, className].join(" ")}
        // onFocus={() => set(true)}
        // onBlur={() => set(false)}
        {...props}
      />
    )
  }
)
ComboboxInput.displayName = "ComboboxInput"

const ComboboxClear = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  return (
    <button
      aria-label="ComboboxClear"
      ref={ref}
      className={[styles.comboboxItem, className].join(" ")}
      {...props}
    >
      X
    </button>
  )
})
ComboboxClear.displayName = "ComboboxClear"

const ComboboxDropdown = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { isOpen } = useContext(ComboboxContext)

  // if (!isOpen)
  //   return null

  return (
    <div
      aria-label="ComboboxDropdown"
      ref={ref}
      className={[styles.comboboxDropdown, className].join(" ")}
      {...props}
    />
  )
})
ComboboxDropdown.displayName = "ComboboxDropdown"

const ComboboxItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      aria-label="ComboboxItem"
      ref={ref}
      className={[styles.comboboxItem, className].join(" ")}
      {...props}
    />
  )
})
ComboboxItem.displayName = "ComboboxItem"

const ComboboxButton = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  return (
    <button
      aria-label="ComboboxButton"
      ref={ref}
      className={[styles.comboboxItem, className].join(" ")}
      {...props}
    />
  )
})
ComboboxButton.displayName = "ComboboxButton"

export {
  Combobox,
  ComboboxHead,
  ComboboxInput,
  ComboboxClear,
  ComboboxDropdown,
  ComboboxItem,
  ComboboxButton,
}
