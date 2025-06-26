import styles from './app.module.css'
import { Button } from './components/Button';
import { Header } from './components/Header'
import { Input } from './components/Input';
import { Letter } from './components/Letter';
import { LettersUsed } from './components/LettersUsed';
import { Tip } from './components/Tip';

function App() {

  function handleRestartGame() {
    alert("Reinicie");
  }

  return (
    <div className={styles.container}>
      <main>
        <Header current={5} max={10} onRestart={handleRestartGame} />
        <Tip tip='Uma das linguagem de programação mais utilizadas' />
        <div className={styles.words}>
          <Letter value='J' />
          <Letter value='A' />
          <Letter value='V' />
          <Letter value='' />
        </div>
        <h4>Palpite</h4>
        <div className={styles.guess}>
          <Input autoFocus maxLength={1} placeholder="?" />
          <Button title="Confirmar" />
        </div>
        <LettersUsed />
      </main>
    </div>
  )
}

export default App
