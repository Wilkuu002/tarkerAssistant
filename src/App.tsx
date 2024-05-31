import './App.css';
import VoiceAssistant from './voiceAssistant/webSpeech'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/home/home.tsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./components/auth/login/login.tsx";
import Register from "./components/auth/register/register.tsx";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App
