

import OptionsChooser from './components/OptionsChooser'

import AdminOption from './components/AdminOption'

import './App.css'

function App() {


  return (
    <>
      <header>
        <p className="header">
          <button className="devices" onClick={() => alert("hello")}>מכשירים מחוברים</button>
          <br />
          <img src="\public\Wolfit.webp" />
        </p>
      </header>
      <OptionsChooser />
    </>
  )
}

export default App
