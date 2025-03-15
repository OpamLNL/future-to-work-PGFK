import { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Container } from '@mui/material';
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
        position: 'relative', // Додаємо для позиціонування кнопки
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
        position: 'absolute',
        top: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

export const ForEmployersPage = () => {
    const classes = useStyles();
    const [isSpeaking, setIsSpeaking] = useState(false);
    const language = useContext(LanguageContext);
    const lang = language.language;

    // Отримуємо локалізований контент
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
    };

    // Об'єднання тексту для озвучування
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

    return (
        <Container className={classes.container}>
            <div className={classes.header}>
                <Typography variant="h2" className={classes.title}>
                    {content.title}
                </Typography>
                <RoundButton
                    className={classes.button}
                    onClick={() => speakText(fullText, voiceLang)}
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
        </Container>
    );
};