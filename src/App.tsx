import { useEffect, useReducer, useState } from 'react';
import styles from './app.module.css';
import { Button } from './components/Button';
import { Header } from './components/Header';
import { Input } from './components/Input';
import { Letter } from './components/Letter';
import { LettersUsed } from './components/LettersUsed';
import { Tip } from './components/Tip';

import { WORDS } from "./utils/words";

import { gameReducer, initialGameState } from './reducer/gameReducer';


function App() {
  const [state, dispatch] = useReducer(gameReducer, initialGameState)

  const { lettersUsed, challenge, score, attemptLimit } = state
  const [currentLetterInput, setCurrentLetterInput] = useState("")

  const ATTEMPT_MARGIN = 5

  function handleRestartGame() {
    const isConfirmed = confirm("Você tem certeza que deseja reiniciar o jogo?")
    if (isConfirmed) {
      dispatch({ type: "RESET_GAME" })
      startGame()
    }
  }

  function startGame() {
    const index = Math.floor(Math.random() * WORDS.length)
    const randomWORD = WORDS[index]
    const newAttemptLimit = randomWORD.word.length + ATTEMPT_MARGIN

    dispatch({
      type: "START_GAME",
      payload: { challenge: randomWORD, attemptLimit: newAttemptLimit },
    })
    setCurrentLetterInput("")
  }

  function handleConfirm() {
    if (!challenge) return
    if (!currentLetterInput.trim()) return alert("Digite uma letra!")

    const value = currentLetterInput.toUpperCase()
    const exists = lettersUsed.find((used) => used.value.toUpperCase() === value)

    if (exists) {
      alert(`Você já utilizou a letra: ${value}`)
      setCurrentLetterInput("")
      return
    }

    const hits = challenge.word.toUpperCase().split("").filter((char) => char === value).length
    const correct = hits > 0

    dispatch({
      type: "ADD_LETTER_USED",
      payload: { value, correct, hits },
    })
    setCurrentLetterInput("")
  }

  function endGame(message: string) {
    alert(message)
    startGame()
  }

  useEffect(() => {
    startGame()
  }, [])

  useEffect(() => {
    if (!challenge) return

    if (score === challenge.word.length) {
      return endGame("Parabéns! 🎉 Você descobriu a palavra! 👏🏽")
    }

    if (lettersUsed.length === attemptLimit && lettersUsed.length > 0) {
      return endGame("Que pena, você usou todas as tentativas!")
    }
  }, [score, lettersUsed.length, challenge, attemptLimit, endGame])

  if (!challenge) return null

  return (
    <div className={styles.container}>
      <main>
        <Header current={lettersUsed.length} max={attemptLimit} onRestart={handleRestartGame} />
        <Tip tip={challenge.tip} />
        <div className={styles.words}>
          {challenge.word.split("").map((char, index) => {
            const isCorrect = lettersUsed.some(
              (used) => used.correct && used.value.toUpperCase() === char.toUpperCase()
            )

            return (
              <Letter
                key={index}
                value={isCorrect ? char.toUpperCase() : ""}
                color={isCorrect ? "correct" : "default"}
              />
            )
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