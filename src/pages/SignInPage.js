import {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';

import { makeStyles } from "@material-ui/core/styles";
import { axiosInstance } from '../api/axiosConfig';

import { TextField, Typography, Link, Grid } from '@mui/material';

import { SectionContainer } from "../components/Containers";
import { Button } from '../components';

import signInPageLocales from "./Locales/signInPageLocales.json";
import {LanguageContext} from "../language/language-context";

const useStyles = makeStyles((theme) => ({
    main: {
        margin: "auto",
        padding: theme.spacing(4),
        width: "90%",
        maxWidth: 500,
        backgroundColor: theme.palette.background.containerBackground,
        boxShadow: theme.shadows[5],
        borderRadius: theme.shape.borderRadius,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        margin: "15px 2px 2px 2px",
        padding: "30px 10px 10px 10px",
        width: "98%",
        maxWidth: 600,
        position: 'fixed',
        left: '5%',
        top: 220,

        color: theme.palette.primary.light,
        backgroundColor: theme.palette.primary.containerBackground,
        justifyContent: "center",
        [theme.breakpoints.down('sm')]: {
            width: 600,
            position: 'fixed',
            left: '5%',
            top: 220,
        },
    },
    textField: {
        marginTop: theme.spacing(2),
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.light,
        '& .MuiInputBase-root': {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.contrastText,
            height: '40px',
        },
        '& .MuiInputLabel-root': {
            color: theme.palette.primary.contrastText,
        },
        '& .MuiInputLabel-shrink': {
            transform: 'translate(14px, -6px) scale(0.75)',
        },
    },
    button: {
        marginTop: theme.spacing(2),
        width: "100%",
        backgroundColor: theme.palette.primary.light,
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
        },
    },
    bottomText: {
        marginTop: theme.spacing(2),
        textAlign: 'center',
        // position: 'fixed',
        top: 580,
        color: theme.palette.primary.contrastText,
        [theme.breakpoints.down('sm')]: {
            width: 600,
            position: 'fixed',
            left: '5%',
            top: 540,
            marginTop: theme.spacing(2),
        },
    },
    errorText: {
        color: theme.palette.error.main,
    },
}));

export const SignInPage = () => {
    const language = useContext(LanguageContext);
    const classes = useStyles();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axiosInstance.post('/api/auth/signin', formData);
            const { user, accessToken, refreshToken } = response.data;
            localStorage.setItem('jwtAccessToken', accessToken);
            localStorage.setItem('jwtRefreshToken', refreshToken);
            localStorage.setItem('user', JSON.stringify(user));

            navigate('/home');
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Невідома помилка';
            setError('Не вдалося ввійти: ' + errorMsg);
        }
    };

    return (
        <SectionContainer title="" className={classes.main}>
            <div className={classes.main}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
                            <TextField
                                label={`${signInPageLocales.find(item => item.hasOwnProperty('lblEmail'))?.lblEmail[language.language] || ''}`}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                required
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                autoComplete="email"
                                InputLabelProps={{ shrink: true }}
                                className={classes.textField}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label={`${signInPageLocales.find(item => item.hasOwnProperty('lblPassword'))?.lblPassword[language.language] || ''}`}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                required
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                type="password"
                                autoComplete="current-password"
                                InputLabelProps={{ shrink: true }}
                                className={classes.textField}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                // fullWidth
                                variant="contained"
                                className={classes.button}
                            >
                                {`${signInPageLocales.find(item => item.hasOwnProperty('lblLogIn'))?.lblLogIn[language.language] || ''}`}
                            </Button>
                            {error && <Typography className={classes.errorText}>{error}</Typography>}
                        </Grid>

                        <Grid>

                        </Grid>
                    </Grid>
                    <div className={classes.bottomText}>
                        <Typography>
                            {`${signInPageLocales.find(item => item.hasOwnProperty('lblIsHaveAccount'))?.lblIsHaveAccount[language.language] || ''}`}
                            <Link href="/sign-up" color="inherit">
                                {`${signInPageLocales.find(item => item.hasOwnProperty('lblSigIn'))?.lblSigIn[language.language] || ''}`}
                            </Link>
                        </Typography>
                    </div>

                </form>

            </div>
        </SectionContainer>
    )
};
