import viteLogo from '/vite.svg';
import './App.css';
import VoiceAssistant from './voiceAssistant/webSpeech'

function App() {

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
        <div>
            <VoiceAssistant />
        </div>

    </>
  )
}

export default App
