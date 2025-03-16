import { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Container, Button } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { RoundButton } from "../components"; 
import { speakText } from "../services/SpeakText";
import { LanguageContext } from "../language/language-context";
import employersPageLocales from './Locales/employersPageLocales.json';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'start',
        minHeight: '100vh',
        padding: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(3),
        },
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(4),
        },
        overflow: 'hidden',
        position: 'relative',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    title: {
        fontSize: '3rem',
        fontFamily: theme.typography.fontFamily,
        marginBottom: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.primary.contrastText,
        display: 'block',
        [theme.breakpoints.up('sm')]: {
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
        padding: theme.spacing(1),
        fontSize: '1rem',
        [theme.breakpoints.up('sm')]: {
            fontSize: '1.2rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '1.5rem',
        },
        position: 'absolute',
        top: theme.spacing(2),
        right: theme.spacing(2),
    },
    actionButtons: {
        display: 'flex',
        gap: theme.spacing(2),
        marginTop: theme.spacing(2),
    },
    actionButton: {
        padding: theme.spacing(1, 2),
        backgroundColor: '#4caf50', // Зелений колір (можesz змінити на інший відтінок)
        color: '#fff', // Білий текст
        '&:hover': {
            backgroundColor: '#388e3c', // Темніший зелений при наведенні
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: '1.2rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '1.5rem',
        },
    },
}));

export const ForEmployersPage = () => {
    const classes = useStyles();
    const [isSpeaking, setIsSpeaking] = useState(false);
    const language = useContext(LanguageContext);
    const lang = language.language;

    const content = {
        title: employersPageLocales.find(item => item.hasOwnProperty('title'))?.title[lang] || '',
        intro: employersPageLocales.find(item => item.hasOwnProperty('intro'))?.intro[lang] || '',
        benefitsTitle: employersPageLocales.find(item => item.hasOwnProperty('benefitsTitle'))?.benefitsTitle[lang] || '',
        benefitsItems: employersPageLocales.find(item => item.hasOwnProperty('benefitsItems'))?.benefitsItems[lang] || [],
        inclusiveHiringTitle: employersPageLocales.find(item => item.hasOwnProperty('inclusiveHiringTitle'))?.inclusiveHiringTitle[lang] || '',
        inclusiveHiringItems: employersPageLocales.find(item => item.hasOwnProperty('inclusiveHiringItems'))?.inclusiveHiringItems[lang] || [],
        grantsTitle: employersPageLocales.find(item => item.hasOwnProperty('grantsTitle'))?.grantsTitle[lang] || '',
        grantsDescription: employersPageLocales.find(item => item.hasOwnProperty('grantsDescription'))?.grantsDescription[lang] || '',
        callToAction: employersPageLocales.find(item => item.hasOwnProperty('callToAction'))?.callToAction[lang] || '',
        slogan: employersPageLocales.find(item => item.hasOwnProperty('slogan'))?.slogan[lang] || '',
        registerButton: employersPageLocales.find(item => item.hasOwnProperty('registerButton'))?.registerButton[lang] || '',
        statsButton: employersPageLocales.find(item => item.hasOwnProperty('statsButton'))?.statsButton[lang] || '',
    };
    const fullText = [
        content.title,
        content.intro,
        content.benefitsTitle,
        ...content.benefitsItems,
        content.inclusiveHiringTitle,
        ...content.inclusiveHiringItems,
        content.grantsTitle,
        content.grantsDescription,
        content.callToAction,
        content.slogan
    ].join(' ');

    const voiceLang = lang === 'en' ? 'en-US' : 'uk-UA';

    const handleSpeak = () => {
        setIsSpeaking(true);
        speakText(fullText, voiceLang, () => setIsSpeaking(false));
    };

    return (
        <Container className={classes.container}>
            <div className={classes.header}>
                <Typography variant="h2" className={classes.title}>
                    {content.title}
                </Typography>
                <RoundButton
                    className={classes.button}
                    onClick={handleSpeak}
                    disabled={isSpeaking}
                >
                    <VolumeUpIcon />
                </RoundButton>
            </div>
            <br />
            <Typography variant="h3" className={classes.description}>
                {content.intro}
            </Typography>
            <br />
            <Typography variant="h4" className={classes.description}>
                {content.benefitsTitle}
            </Typography>
            {content.benefitsItems.map((item, index) => (
                <Typography key={index} variant="body1" className={classes.description}>
                    • {item}
                </Typography>
            ))}
            <br />
            <Typography variant="h4" className={classes.description}>
                {content.inclusiveHiringTitle}
            </Typography>
            {content.inclusiveHiringItems.map((item, index) => (
                <Typography key={index} variant="body1" className={classes.description}>
                    • {item}
                </Typography>
            ))}
            <br />
            <Typography variant="h4" className={classes.description}>
                {content.grantsTitle}
            </Typography>
            <Typography variant="body1" className={classes.description}>
                {content.grantsDescription}
            </Typography>
            <br />
            <Typography variant="body1" className={classes.description}>
                {content.callToAction}
            </Typography>
            <br />
            <Typography variant="h5" className={classes.title}>
                "{content.slogan}"
            </Typography>
<div className={classes.actionButtons}>
    <Button
        variant="contained"
        className={classes.actionButton}
        onClick={() => console.log('Register clicked')}
    >
        {content.registerButton}
    </Button>
    <Button
        variant="contained"
        className={classes.actionButton}
        onClick={() => console.log('Stats clicked')}
    >
        {content.statsButton}
    </Button>
</div>
        </Container>
    );
};

export default ForEmployersPage;