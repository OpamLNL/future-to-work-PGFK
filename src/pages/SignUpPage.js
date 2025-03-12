import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { createUser } from '../store/reducers/users/usersActions';
import { TextField, Typography, Link, Grid } from '@mui/material';
import css from './SignUpPage.module.css';
import { makeStyles } from "@material-ui/core/styles";
import signUpPageLocales from "./Locales/signUpPageLocales.json";
import { LanguageContext } from "../language/language-context";
import { Button } from '../components';

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
    }
}));

export const SignUpPage = () => {
    const language = useContext(LanguageContext);
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        avatar: '',
        birth_date: '',
        bio: '',
        phone_number: '',
        language: '',
        timezone: '',
    });

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        dispatch(createUser(formData, (user, tokens) => {
            if (tokens) {
                localStorage.setItem('jwtAccessToken', tokens.accessToken);
                localStorage.setItem('jwtRefreshToken', tokens.refreshToken);
                localStorage.setItem('user', JSON.stringify(user));
                navigate('/home');
            }
            
        }));
        navigate('/home');
    };

    return (
        <div className={css.signUpFieldsBlock}>
            <form onSubmit={handleSubmit} className={classes.paper}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label={`${signUpPageLocales.find(item => item.hasOwnProperty('lblUserName'))?.lblUserName[language.language] || ''}`}
                            variant="outlined"
                            fullWidth
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                            className={classes.textField}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label={`${signUpPageLocales.find(item => item.hasOwnProperty('lblEmail'))?.lblEmail[language.language] || ''}`}
                            variant="outlined"
                            fullWidth
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                            InputLabelProps={{ shrink: true }}
                            className={classes.textField}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label={`${signUpPageLocales.find(item => item.hasOwnProperty('lblPassword'))?.lblPassword[language.language] || ''}`}
                            variant="outlined"
                            fullWidth
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            type="password"
                            InputLabelProps={{ shrink: true }}
                            className={classes.textField}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label={`${signUpPageLocales.find(item => item.hasOwnProperty('lblPoneNumber'))?.lblPoneNumber[language.language] || ''}`}
                            variant="outlined"
                            fullWidth
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            type="tel"
                            InputLabelProps={{ shrink: true }}
                            className={classes.textField}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label={`${signUpPageLocales.find(item => item.hasOwnProperty('lblBio'))?.lblBio[language.language] || ''}`}
                            variant="outlined"
                            fullWidth
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            multiline
                            rows={3}
                            InputLabelProps={{ shrink: true }}
                            className={classes.textField}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label={`${signUpPageLocales.find(item => item.hasOwnProperty('lblBirthday'))?.lblBirthday[language.language] || ''}`}
                            variant="outlined"
                            fullWidth
                            name="birth_date"
                            value={formData.birth_date}
                            onChange={handleChange}
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            className={classes.textField}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label={`${signUpPageLocales.find(item => item.hasOwnProperty('lblLanguage'))?.lblLanguage[language.language] || ''}`}
                            variant="outlined"
                            fullWidth
                            name="language"
                            value={formData.language}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                            className={classes.textField}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label={`${signUpPageLocales.find(item => item.hasOwnProperty('lblTimezone'))?.lblTimezone[language.language] || ''}`}
                            variant="outlined"
                            fullWidth
                            name="timezone"
                            value={formData.timezone}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                            className={classes.textField}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label={`${signUpPageLocales.find(item => item.hasOwnProperty('lblAvatarUrl'))?.lblAvatarUrl[language.language] || ''}`}
                            variant="outlined"
                            fullWidth
                            name="avatar"
                            value={formData.avatar}
                            onChange={handleChange}
                            type="url"
                            InputLabelProps={{ shrink: true }}
                            className={classes.textField}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" fullWidth className={classes.button}>
                            {`${signUpPageLocales.find(item => item.hasOwnProperty('lblSigIn'))?.lblSigIn[language.language] || ''}`}
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <div className={classes.bottomText}>
                <Typography >
                    {`${signUpPageLocales.find(item => item.hasOwnProperty('lblIsHaveAccount'))?.lblIsHaveAccount[language.language] || ''}`}
                    <Link href="/sign-in" color="inherit">{`${signUpPageLocales.find(item => item.hasOwnProperty('lblLogIn'))?.lblLogIn[language.language] || ''}`}</Link>
                </Typography>
            </div>
        </div>
    );
};
