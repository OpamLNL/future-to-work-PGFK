// ServiceBar.js
import { useNavigate } from "react-router-dom";

import { SectionContainer } from "../Containers";
import css from "./ServiceBar.module.css";

import {
    LanguageSwitcher,
    ThemeSwitcher,
    SearchBar, UserInfo
} from "../../components";

import { HomeButton } from "../Buttons";
import serviceBarLocales from "./serviceBarLocales.json";
import { LanguageContext } from "../../language/language-context";
import { useContext } from "react";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
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
        fontSize: '1.5rem',
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
        fontSize: '1rem',
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1),
        textAlign: 'left',
        color: theme.palette.primary.dark,

        display: 'block',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
            fontSize: '1.2rem',
            marginTop: theme.spacing(1),
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '1.5rem',
            marginTop: theme.spacing(1),
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




export const ServiceBar = () => {
    const navigate = useNavigate();
    const language = useContext(LanguageContext);
    const classes = useStyles();

    return (
        <div>
            <div>
                <div className={classes.description}>

                    {serviceBarLocales.find(item => item.hasOwnProperty('startButton1'))?.startButton1[language.language] || ''}
                    {serviceBarLocales.find(item => item.hasOwnProperty('startButton2'))?.startButton2[language.language] || ''}
                    — Fair View
                </div>

            </div>
            <SectionContainer className={css.container}>

                <HomeButton onClick={() => navigate('/home')}/>

                <SearchBar/>

                <div className={css.switcherContainer}>
                    <div className={css.settingItem}>
                        <LanguageSwitcher/>
                    </div>
                    <div className={css.settingItem}>
                        <ThemeSwitcher/>
                    </div>
                </div>
                <div>
                    <UserInfo/>
                </div>

            </SectionContainer>
        </div>
    );
};


