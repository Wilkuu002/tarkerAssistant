import './App.css';
import VoiceAssistant from './voiceAssistant/webSpeech'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainComponent from "./components/homePage/MainComponent.tsx";
import VoiceAssistant2 from "./voiceAssistant/webSpeechNew.tsx";

function App() {

  return (
    <>
      <div className={"container"}>
        <MainComponent/>
          <div>
              <VoiceAssistant />
              <VoiceAssistant2/>
          </div>
      </div>


    </>
  )
}

export default App
