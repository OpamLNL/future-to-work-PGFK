import { useState } from 'react';

const useSpeechSynthesis = () => {
    const [isSpeaking, setIsSpeaking] = useState(false);

    const speakText = (text, language) => {
        if ('speechSynthesis' in window) {
            const speechSynthesis = window.speechSynthesis;
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.voice = speechSynthesis.getVoices().find(voice => voice.lang === language);
            speechSynthesis.cancel();
            speechSynthesis.speak(utterance);
            setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
        }
    };

    return { speakText, isSpeaking };
};

export default useSpeechSynthesis;
