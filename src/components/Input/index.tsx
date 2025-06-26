import styles from "./styles.module.css"

type InputProps = React.ComponentProps<"input">

export function Input({ ...rest }: InputProps) {
  return (
    <input type="text" className={styles.input} {...rest} />
  )
}