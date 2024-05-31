import { useAuth } from '../../contexts/authContext/authContext.tsx'
import MainComponent from "../homePage/MainComponent.tsx";
import VoiceAssistant from "../../voiceAssistant/webSpeech.tsx";


const Home = () => {

    return (

    <div className={"container"}>
        <MainComponent/>
        <div>
            <VoiceAssistant />
        </div>
    </div>
    )
}

export default Home