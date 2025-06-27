import styles from './app.module.css'
import { Button } from './components/Button'
import { Header } from './components/Header'
import { Input } from './components/Input'
import { Letter } from './components/Letter'
import { LettersUsed } from './components/LettersUsed'
import { Tip } from './components/Tip'
import { useGameLogic } from './hooks/useGameLogic'


function App() {
  const {
    currentLetterInput,
    setCurrentLetterInput,
    lettersUsed,
    challenge,
    attemptLimit,
    handleConfirm,
    handleRestartGame
  } = useGameLogic()

  if (!challenge) return null

  return (
    <div className={styles.container}>
      <main>
        <Header
          current={lettersUsed.length}
          max={attemptLimit}
          onRestart={handleRestartGame}
        />
        <Tip tip={challenge.tip} />
        <div className={styles.words}>
          {challenge.word.split("").map((char, index) => {
            const isCorrect = lettersUsed.some(
              (used) =>
                used.correct && used.value.toUpperCase() === char.toUpperCase()
            );

            return (
              <Letter
                key={index}
                value={isCorrect ? char.toUpperCase() : ""}
                color={isCorrect ? "correct" : "default"}
              />
            );
          })}
        </div>

        <h4>Palpite</h4>
        <div className={styles.guess}>
          <Input
            autoFocus
            maxLength={1}
            placeholder="?"
            onChange={(e) => setCurrentLetterInput(e.target.value)}
            value={currentLetterInput}
          />
          <Button title="Confirmar" onClick={handleConfirm} />
        </div>
        <LettersUsed data={lettersUsed} />
      </main>
    </div>
  )
}

export default App