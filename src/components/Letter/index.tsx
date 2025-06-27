import styles from "./styles.module.css"

type LetterProps = {
  value?: string
  size?: "default" | "small"
  color?: "default" | "correct" | "wrong"
}

export function Letter({ value = "", size = "default", color = "default" }: LetterProps) {
  return (
    <div className={`
      ${styles.container} 
      ${size === "small" && styles.letterSmall} 
      ${color === "correct" && styles.letterCorrect}
      ${color === "wrong" && styles.letterWrong}
      `
    }>
      <span>{value}</span>
    </div>
  )
}