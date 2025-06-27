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
  const [attempts, setAttempts] = useState(0)
  const [letter, setLetter] = useState("")
  const [letterUsed, setLetterUsed] = useState<LettersUsedProps[]>([])
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [score, setScore] = useState(0)

  function handleRestartGame() {
    alert("Reinicie o jogo!");
  }

  function startGame() {
    const index = Math.floor(Math.random() * WORDS.length);
    const randomWORD = WORDS[index]
    setChallenge(randomWORD)

    setAttempts(0)
    setLetter("")
  }

  function handleConfirm() {
    if (!challenge) return
    if (!letter.trim()) return alert("Digite uma letra!")

    const value = letter.toUpperCase()
    const exists = letterUsed.find((used) => used.value.toUpperCase() === value)

    if (exists) return alert("Você já digitou essa letra " + value)

    const hits = challenge.word.toUpperCase().split("").filter((chat) => chat === value).length

    const correct = hits > 0
    const currentScore = score + hits

    setLetterUsed((prevState) => [...prevState, { value, correct }])
    setScore(currentScore)
    setLetter("")
  }

  useEffect(() => {
    startGame()
  }, [])

  if (!challenge) return

  return (
    <div className={styles.container}>
      <main>
        <Header current={attempts} max={10} onRestart={handleRestartGame} />
        <Tip tip={challenge.tip} />
        <div className={styles.words}>
          {challenge.word.split("").map(() => (<Letter />))}
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
        <LettersUsed data={letterUsed} />
      </main>
    </div>
  )
}

export default App
