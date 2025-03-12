import { useState, useEffect } from 'react';
import { FormControlLabel, FormGroup, Switch, styled } from '@mui/material';
// import MicIcon from '@mui/icons-material/Mic';
// import MicOffIcon from '@mui/icons-material/MicOff';

import WebkitSpeechRecognizer from '../../services/WebkitSpeechRecognizer';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
}));

const MicrophoneSwitcher = () => {
    const [isMicOn, setIsMicOn] = useState(false);
    const [transcript, setTranscript] = useState('');
    const speechRecognizer = new WebkitSpeechRecognizer();

    useEffect(() => {
        speechRecognizer.onResult((result) => {
            setTranscript(result);
        });
        speechRecognizer.onError((error) => {
            console.error(error);
        });

        return () => {
            speechRecognizer.stop();
        };
    }, []);

    const handleMicChange = () => {
        if (!isMicOn) {
            speechRecognizer.start();
        } else {
            speechRecognizer.stop();
        }
        setIsMicOn(!isMicOn);
    };


    return (
        <FormGroup>
            <FormControlLabel
                control={<MaterialUISwitch checked={isMicOn} onChange={handleMicChange} />}
                label={isMicOn ? 'Microphone On' : 'Microphone Off'}
                labelPlacement="start"
            />
            {/* Можливо відображення транскрипту */}
            <div>
                {transcript}
            </div>
        </FormGroup>
    );
}

export { MicrophoneSwitcher };
