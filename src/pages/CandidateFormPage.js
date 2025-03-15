import {useState, useEffect, useContext} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Container } from '@mui/material';
import { RoundButton } from '../components';
import { speakText } from '../services/SpeakText';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { Button, Icon } from '../components';

import { LanguageContext } from "../language/language-context";

const useStyles = makeStyles((theme) => ({
    pageContainer: {
        padding: theme.spacing(4),
        margin: 'auto',
        color: theme.palette.text.primary,
        borderRadius: theme.shape.borderRadius,
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(3),
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(1),
    },
    buttonContainer: {
        display: 'flex',
        gap: theme.spacing(2),
    },
    content: {
        textAlign: 'justify',
    },


    title: {
        fontSize: '3rem',
        fontFamily: theme.typography.fontFamily,
        marginBottom: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.primary.contrastText,

        display: 'block',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
            fontSize: '2rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '2.5rem',
        },
    },
    description: {
        fontSize: '1.5rem',
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.primary.dark,

        display: 'block',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
            fontSize: '1.2rem',
            marginTop: theme.spacing(4),
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '1.5rem',
            marginTop: theme.spacing(6),
        },
    },
    button: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(1, 4),
        fontSize: '1rem',
        [theme.breakpoints.up('sm')]: {
            fontSize: '1.2rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '1.5rem',
        },
    },



}));

export const CandidateFormPage = () => {

    const language = useContext(LanguageContext);

    const classes = useStyles();
    const [isSpeaking, setIsSpeaking] = useState(false);

    const handleSpeak = (text) => {
        setIsSpeaking(true);
        speakText(text, [language.language], () => setIsSpeaking(false));
    };

    return (
        <Container className={classes.pageContainer}>


            <Button variant="contained" color="primary">Відправити</Button>
        </Container>
    );
};
