import React, { useContext } from 'react';
import { Container, Typography } from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";
import { LanguageContext } from "../language/language-context";
import homePageLocales from './Locales/homePageLocales.json';

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

export const HomePage = () => {
    const classes = useStyles();
    const language = useContext(LanguageContext);

    return (
        <Container className={classes.container}>
            <Typography variant="h3" className={classes.title}>
                {`${homePageLocales.find(item => item.hasOwnProperty('welcome'))?.welcome[language.language] || ''}`}
            </Typography>
            <br/>
            <Typography variant="h4" className={classes.description}>
                {`${homePageLocales.find(item => item.hasOwnProperty('subtitle'))?.subtitle[language.language] || ''}`}
            </Typography>
            <br/>
            <Typography variant="h4" className={classes.description}>
                {`${homePageLocales.find(item => item.hasOwnProperty('text1'))?.text1[language.language] || ''}`}
            </Typography>
            <br/>
            <Typography variant="body1" className={classes.description}>
                {`${homePageLocales.find(item => item.hasOwnProperty('text2'))?.text2[language.language] || ''}`}
            </Typography>
            <br/>
            <Typography variant="body1" className={classes.description}>
                {`${homePageLocales.find(item => item.hasOwnProperty('text3'))?.text3[language.language] || ''}`}
            </Typography>
            <br/>
            <Typography variant="body1" className={classes.description}>
                {`${homePageLocales.find(item => item.hasOwnProperty('text4'))?.text4[language.language] || ''}`}
            </Typography>
            <br/>
            <Typography variant="body1" className={classes.description}>
                {`${homePageLocales.find(item => item.hasOwnProperty('text5'))?.text5[language.language] || ''}`}
            </Typography>

            <br/>
            <Typography variant="h5" className={classes.title}>
                {`${homePageLocales.find(item => item.hasOwnProperty('subtitle2'))?.subtitle2[language.language] || ''}`}
            </Typography>

        </Container>
    );
};
