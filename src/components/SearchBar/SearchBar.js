import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { TextField, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import WebkitSpeechRecognizer from '../../services/WebkitSpeechRecognizer';
import { LanguageContext } from "../../language/language-context";

import searchBarLocales from './searchBarLocales.json';

const speechRecognizer = new WebkitSpeechRecognizer();

export const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isListening, setIsListening] = useState(false);
    const navigate = useNavigate();
    const language = useContext(LanguageContext);

    useEffect(() => {
        speechRecognizer.onResult((result) => {
            setSearchQuery(result);
            navigate(`/search-result/${result}`);
            speechRecognizer.stop();
        });

        speechRecognizer.onError((error) => {
            console.error('Speech recognition error:', error);
            setIsListening(false);
        });

        speechRecognizer.onEnd(() => {
            setIsListening(false);
            speechRecognizer.stop();
        });

        return () => {
            speechRecognizer.stop();
        };
    }, [navigate]);

    const handleSearch = () => {
        if (searchQuery) {
            navigate(`/search-result/${searchQuery}`);
        }
        speechRecognizer.stop();
        setIsListening(false);
    };

    const handleMicClick = () => {
        if (isListening) {
            speechRecognizer.stop();
        } else {
            speechRecognizer.start();
        }
        setIsListening(!isListening);
    };

    return (
        <TextField
            label={
                searchBarLocales.find(item => item.hasOwnProperty('searchString'))
                    ?.searchString[language.language] || ''
            }
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handleSearch}>
                            <SearchIcon />
                        </IconButton>
                        <IconButton onClick={handleMicClick}>
                            {isListening ? <MicIcon /> : <MicOffIcon />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            fullWidth
        />
    );
};
