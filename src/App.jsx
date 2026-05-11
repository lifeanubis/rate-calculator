import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import './App.css';
import GadiRateCalculator from './components/tab_calculation';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <section id="center">
        <GadiRateCalculator />
      </section>
    </>
  );
}

export default App;
