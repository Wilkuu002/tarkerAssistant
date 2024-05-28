import React, { useState, useEffect } from 'react';
import TarkovApiFetch from "../tarkovApi/tarkovApiFetch.tsx";

const VoiceAssistant: React.FC = () => {
    const [transcript, setTranscript] = useState('');
    const [isListening, setIsListening] = useState(false);

    useEffect(() => {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            alert('Twoja przeglądarka nie obsługuje Web Speech API.');
            return;
        }

        const recognition = new (window.SpeechRecognition || (window as any).webkitSpeechRecognition)();
        recognition.lang = 'pl-PL';
        recognition.interimResults = false;

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            const speechResult = event.results[0][0].transcript;
            setTranscript(speechResult);
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
            console.error('Recognition error: ', event.error);
            setIsListening(false);
        };

        if (isListening) {
            recognition.start();
        } else {
            recognition.stop();
        }

        return () => {
            recognition.stop();
        };
    }, [isListening]);

    const handleButtonClick = () => {
        setIsListening((prevState) => !prevState);
    };

    return (
        <div>
            <h1>Asystent Głosowy</h1>
            <button onClick={handleButtonClick}>
                {isListening ? 'Zatrzymaj' : 'Aktywuj Asystenta'}
            </button>
            <div>Kliknij Check Price aby rozpocząć szukanie {transcript}</div>
            <TarkovApiFetch transcript={transcript} />
        </div>
    );
};

export default VoiceAssistant;
