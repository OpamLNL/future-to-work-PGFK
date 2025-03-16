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
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(3),
        },
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(4),
        },
        overflow: 'hidden',
    },
    title: {
        fontSize: '1.8rem',
        fontFamily: theme.typography.fontFamily,
        marginBottom: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.primary.contrastText,
        [theme.breakpoints.up('sm')]: {
            fontSize: '2rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '2.2rem',
        },
    },
    description: {
        fontSize: '1rem',
        marginBottom: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.primary.dark,
        [theme.breakpoints.up('sm')]: {
            fontSize: '1.2rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '1.4rem',
        },
    },
}));

export const HomePage = () => {
    const classes = useStyles();
    const language = useContext(LanguageContext);

    return (
        <Container className={classes.container}>
            <Typography variant="h4" className={classes.title}>
                {homePageLocales.find(item => item.hasOwnProperty('welcome'))?.welcome[language.language] || ''}
            </Typography>
            <Typography variant="h5" className={classes.description}>
                {homePageLocales.find(item => item.hasOwnProperty('subtitle'))?.subtitle[language.language] || ''}
            </Typography>
            {[ 'text1', 'text2', 'text3', 'text4', 'text5', 'subtitle2'].map((key, index) => (
                <Typography
                    key={index}
                    variant="body1"
                    className={classes.description}
                >
                    {homePageLocales.find(item => item.hasOwnProperty(key))?.[key][language.language] || ''}
                </Typography>
            ))}
        </Container>
    );
};