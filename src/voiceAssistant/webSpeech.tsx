import React from 'react';
import TarkovApi from "../tarkovApi/tarkovApi.tsx";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import useVoiceRecognition from '../hooks/voiceRecognitionHook.tsx';

const VoiceAssistant: React.FC = () => {
    const { transcript, isListening, startListening, stopListening } = useVoiceRecognition();

    const handleButtonClick = () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    };

    return (
        <div>
            <div>Kliknij Aktywacje aby rozpocząć szukanie </div>
            <button type="button" className="btn btn-primary" onClick={handleButtonClick}>
                {isListening ? 'Zatrzymaj' : 'Aktywuj Asystenta'}
            </button>
            {isListening && <div>Szukamy przedmiotu</div>}
            <TarkovApi transcript={transcript} />
        </div>
    );
};

export default VoiceAssistant;