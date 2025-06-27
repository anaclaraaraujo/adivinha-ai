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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [letter, setLetter] = useState("")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [letterUsed, setLetUsed] = useState<LettersUsedProps[]>([])
  const [challenge, setChallenge] = useState<Challenge | null>(null)

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
          {
            challenge.word.split("").map(() => (
              <Letter />
            ))}
        </div>
        <h4>Palpite</h4>
        <div className={styles.guess}>
          <Input autoFocus maxLength={1} placeholder="?" />
          <Button title="Confirmar" />
        </div>
        <LettersUsed data={letterUsed } />
      </main>
    </div>
  )
}

export default App
