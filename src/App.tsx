import { useEffect, useState } from 'react';
import styles from './app.module.css'
import { Button } from './components/Button';
import { Header } from './components/Header'
import { Input } from './components/Input';
import { Letter } from './components/Letter';
import { LettersUsed, type LettersUsedProps } from './components/LettersUsed';
import { Tip } from './components/Tip';

import { WORDS, type Challenge } from "./utils/words"

function App() {
  const [letter, setLetter] = useState("")
  const [lettersUsed, setLettersUsed] = useState<LettersUsedProps[]>([])
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [score, setScore] = useState(0)

  const ATTEMPT_MARGIN = 5;

  function handleRestartGame() {
    const isConfirmed = confirm("Você tem certeza que deseja reiniciar o jogo?");
    if (isConfirmed) startGame();
  }

  function startGame() {
    const index = Math.floor(Math.random() * WORDS.length);
    const randomWORD = WORDS[index]
    setChallenge(randomWORD)

    setScore(0)
    setLetter("")
    setLettersUsed([])
  }

  function handleConfirm() {
    if (!challenge) return
    if (!letter.trim()) return alert("Digite uma letra!")

    const value = letter.toUpperCase()
    const exists = lettersUsed.find((used) => used.value.toUpperCase() === value)

    if (exists) {
      alert(`Você já utilizou a letra: ${value}`);
      setLetter("");
      return;
    }

    const hits = challenge.word.toUpperCase().split("").filter((chat) => chat === value).length

    const correct = hits > 0
    const currentScore = score + hits

    setLettersUsed((prevState) => [...prevState, { value, correct }])
    setScore(currentScore)
    setLetter("")
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

    setTimeout(() => {
      if (score === challenge.word.length)
        return endGame("Parabéns! 🎉 Você descobriu a palavra! 👏🏽")

      const attemptLimit = challenge.word.length + ATTEMPT_MARGIN

      if (lettersUsed.length === attemptLimit)
        return endGame("Que pena, você usou todas as tentativas!")

    }, 200)
  }, [score, lettersUsed.length, challenge, endGame])

  if (!challenge) return

  return (
    <div className={styles.container}>
      <main>
        <Header current={lettersUsed.length} max={challenge.word.length + ATTEMPT_MARGIN} onRestart={handleRestartGame} />
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
            onChange={(e) => setLetter(e.target.value)}
            value={letter}
          />
          <Button title="Confirmar" onClick={handleConfirm} />
        </div>
        <LettersUsed data={lettersUsed} />
      </main>
    </div>
  )
}

export default App
