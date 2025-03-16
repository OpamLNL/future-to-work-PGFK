import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Typography, Link, Grid } from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";
import css from './SignUpPage.module.css';
import signUpPageLocales from "./Locales/signUpPageLocales.json";
import { LanguageContext } from "../language/language-context";
import { Button } from '../components';
import { axiosInstance } from '../api/axiosConfig';

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: "15px 2px 2px 2px",
        padding: "30px 10px 10px 10px",
        width: "98%",
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
        [theme.breakpoints.down('sm')]: {
            width: 600,
            position: 'fixed',
            left: '5%',
            top: 920,
            marginTop: theme.spacing(2),
        },
    },
    errorText: {
        color: 'red',
        marginTop: theme.spacing(1),
        textAlign: 'center',
    }
}));

export const SignUpPage = () => {
    const language = useContext(LanguageContext);
    const classes = useStyles();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        avatar: '',
        birth_date: '',
        biography: '',
        phone_number: '',
        language: 'en',
        timezone: 'UTC',
    });

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        try {
            const response = await axiosInstance.post('/api/auth/register', formData);
            const { user, accessToken } = response.data;
            localStorage.setItem('jwtAccessToken', accessToken);
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/home');
        } catch (error) {
            const errorMsg = error.response?.data?.error || 'Невідома помилка';
            setError(`Не вдалося зареєструватися: ${errorMsg}`);
        }
    };

    return (
        <div className={css.signUpFieldsBlock}>
            <form onSubmit={handleSubmit} className={classes.paper}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        {error && <Typography className={classes.errorText}>{error}</Typography>}
                    </Grid>
                    {[
                        { name: 'name', type: 'text', labelKey: 'lblUserName' },
                        { name: 'email', type: 'email', labelKey: 'lblEmail' },
                        { name: 'password', type: 'password', labelKey: 'lblPassword' },
                        { name: 'phone_number', type: 'tel', labelKey: 'lblPoneNumber' },
                        { name: 'biography', type: 'text', labelKey: 'lblBio', multiline: true, rows: 3 },
                        { name: 'birth_date', type: 'date', labelKey: 'lblBirthday' },
                        { name: 'language', type: 'text', labelKey: 'lblLanguage' },
                        { name: 'timezone', type: 'text', labelKey: 'lblTimezone' },
                        { name: 'avatar', type: 'url', labelKey: 'lblAvatarUrl' },
                    ].map(({ name, type, labelKey, multiline = false, rows }) => (
                        <Grid item xs={12} sm={6} key={name}>
                            <TextField
                                label={signUpPageLocales.find(item => item[labelKey])?.[labelKey][language.language] || ''}
                                variant="outlined"
                                fullWidth
                                name={name}
                                value={formData[name]}
                                onChange={handleChange}
                                type={type}
                                multiline={multiline}
                                rows={rows}
                                InputLabelProps={{ shrink: true }}
                                className={classes.textField}
                            />
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" fullWidth className={classes.button}>
                            {signUpPageLocales.find(item => item.hasOwnProperty('lblSigIn'))?.lblSigIn[language.language] || ''}
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <div className={classes.bottomText}>
                <Typography>
                    {signUpPageLocales.find(item => item.hasOwnProperty('lblIsHaveAccount'))?.lblIsHaveAccount[language.language] || ''}
                    <Link href="/sign-in" color="inherit">
                        {signUpPageLocales.find(item => item.hasOwnProperty('lblLogIn'))?.lblLogIn[language.language] || ''}
                    </Link>
                </Typography>
            </div>
        </div>
    );
};
