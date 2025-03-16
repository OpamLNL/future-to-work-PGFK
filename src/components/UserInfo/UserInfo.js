import{ useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Typography, Button } from '@mui/material';
import { ThemeContext } from '../../themes/theme-context';
import { Login as LoginIcon } from '@mui/icons-material';
import {useNavigate} from "react-router-dom";
// import {apiBaseURL, avatarsURL} from "../../configs/urls";

const IMG_API = '../assets/avatar.png';

const useStyles = makeStyles((theme) => ({
    userCard: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(1),
        borderRadius: theme.shape.borderRadius,
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
            boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.3)',
            transform: 'translateY(-2px)',
        },
    },
    userCardText: {
        marginLeft: theme.spacing(2),
    },
    userName: {
        color: theme.palette.primary.dark,
    },
    authButton: {
        marginLeft: theme.spacing(2),
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        },
    },
    loginIcon: {
        color: theme.palette.secondary.dark,
    },
}));

const UserInfo = () => {
    const classes = useStyles();
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        return (
            <Button
                className={classes.userCard}
                href="/sign-in"
                startIcon={<LoginIcon className = {classes.loginIcon} />}
            >
            </Button>
        );
    }

    const handleUserProfile = () => {
            navigate('user-profile/' + user.username);
    };


    return (
        <div className={classes.userCard}>
            <Avatar onClick={handleUserProfile}
                alt={user.username}
                src={user.avatar}
                sx={{ width: 31, height: 31 }}
            />
            <div className={classes.userCardText}>
                <Typography
                    component={theme.components.MuiTypography.defaultProps.variantMapping.body2}
                    className={classes.userName}
                >
                    {user.username}
                </Typography>

            </div>
        </div>
    );
};

export { UserInfo };
