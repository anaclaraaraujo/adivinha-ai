import styles from "./styles.module.css"
import React from "react"

type InputProps = React.ComponentProps<"input">

export function Input({ onChange, ...rest }: InputProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value.toUpperCase()
    if (/^[A-Z]*$/.test(val)) {
      if (onChange) onChange({ ...e, target: { ...e.target, value: val } })
    }
  }

  return (
    <input
      type="text"
      className={styles.input}
      onChange={handleChange}
      {...rest}
    />
  )
}
