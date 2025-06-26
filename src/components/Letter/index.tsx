import styles from "./styles.module.css"

type LetterProps = {
  value?: string
}

export function Letter({ value = "" }: LetterProps) {
  return (
    <div className={styles.container}>
      <span>{value}</span>
    </div>
  )
}