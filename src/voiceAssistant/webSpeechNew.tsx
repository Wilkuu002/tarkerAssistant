import React, { useState, useEffect } from 'react';
import TarkovApi from "../tarkovApi/tarkovApi.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';

const VoiceAssistant: React.FC = () => {
    const [transcript, setTranscript] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [stage, setStage] = useState<'keyword' | 'item'>('keyword');

    useEffect(() => {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            alert('Twoja przeglądarka nie obsługuje Web Speech API.');
            return;
        }

        const recognition = new (window.SpeechRecognition || (window as any).webkitSpeechRecognition)();
        recognition.lang = 'pl-PL';
        recognition.interimResults = false;
        recognition.continuous = true; // Ustawienie continuous na true zeby bylo aktywe w tle

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            const speechResult = event.results[event.results.length - 1][0].transcript;
            console.log(`Detected speech: ${speechResult}`);

            if (stage === 'keyword') {
                if (speechResult.toLowerCase().includes(keyword.toLowerCase())) {
                    setStage('item');
                    setTranscript(''); // Wyczyść transkrypt
                    console.log(`Keyword detected: ${keyword}`);
                }
            }if (stage === 'item') {
                console.log('jestesmy na item')
                setTranscript(speechResult);
                setStage('keyword'); // Przełącz z powrotem na etap nasłuchu słowa kluczowego
                console.log(`Item detected: ${speechResult}`);
            }
        };

        recognition.onerror = (event) => {
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
    }, [isListening, keyword, stage]);

    const handleButtonClick = () => {
        setIsListening((prevState) => !prevState);
    };

    const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value);
    };

    return (
        <div className="container mt-4">
            <button type="button" className="btn btn-primary" onClick={handleButtonClick}>
                {isListening ? 'Zatrzymaj' : 'Aktywuj Asystenta'}
            </button>
            <div className="mt-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Wprowadź słowo kluczowe"
                    value={keyword}
                    onChange={handleKeywordChange}
                />
            </div>
            {isListening && <div>Szukamy przedmiotu</div>}
            {transcript && <TarkovApi transcript={transcript} />}
        </div>
    );
};

export default VoiceAssistant;
