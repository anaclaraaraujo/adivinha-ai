import styles from './app.module.css'
import { Header } from './components/Header'
import { Letter } from './components/Letter';
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
      </main>
    </div>
  )
}

export default App
