import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, CircularProgress, Container, Box, Paper } from '@mui/material';

import {fetchUserByUsername, logoutUser} from "../../store/reducers/users/usersActions";
import { apiBaseURL, avatarsURL } from "../../configs/urls";
import { ContrastContainer } from "../Containers";
import {EditButton, RoundButton} from "../Buttons";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const IMG_API = apiBaseURL + avatarsURL;

const useStyles = makeStyles((theme) => ({
    profileContainer: {
        maxWidth: '600px',
        padding: theme.spacing(2),
        margin: 'auto',
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        borderRadius: theme.shape.borderRadius,
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2),
        alignItems: 'center',
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: '50%',
        objectFit: 'cover',
        border: '4px solid white',
    },
    profileLabel: {
        fontWeight: theme.typography.fontWeightMedium,
        color: theme.palette.text.secondary,
    },
    profileValue: {
        fontWeight: theme.typography.fontWeightBold,
        color: theme.palette.text.primary,
    },

    editField: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '58px',
        width: '58px',
        margin: theme.spacing(2, 0),
        backgroundColor: theme.palette.primary.contrastText,
        color: '#fff',
        '&:hover': {
            backgroundColor: '#5c7c8a',
        },
    },
}));


export const UserProfile = () => {
    const { username } = useParams();
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector(state => state.users.currentUser);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (username) {
            dispatch(fetchUserByUsername(encodeURIComponent(username)))
                .then(() => setLoading(false))
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                    setLoading(false);
                });
        }
    }, [username, dispatch]);

    if (loading) {
        return (
            <Container>
                <CircularProgress color="secondary" />
            </Container>
        );
    }

    const handleLogout = () => {
        localStorage.removeItem('jwtAccessToken');
        localStorage.removeItem('jwtRefreshToken');
        localStorage.removeItem('user');
        localStorage.removeItem('favorites');
        dispatch(logoutUser());
        navigate('/home');
    };

    return (
        <div className={classes.profileContainer} >
            <Box display="flex" flexDirection="column" alignItems="center" marginBottom={2}>
                <img src={IMG_API + userData?.avatar} alt="Avatar" className={classes.profileImage} />
                <Typography variant="h6">{userData?.username}</Typography>
            </Box>

            <div className={classes.editField}>
                <Typography variant="h7" gutterBottom>
                    {userData?.role !== 'viewer' && userData?.role !== 'default_role' ? userData?.role : ''}
                </Typography>
                <RoundButton className={classes.button} onClick={handleLogout} >
                    <ExitToAppIcon />
                </RoundButton>
                {(userData?.role === 'admin') &&
                    <div className={classes.editField}>
                        <a href='/admin-page'>Admin Page</a>
                
                    </div>}


            </div>

            <Box>
                <Typography className={classes.profileLabel}>Email:</Typography>
                {
                    (userData?.username === JSON.parse(localStorage.getItem('user')).username) &&
                    <div className={classes.editField}>
                        <Typography>{userData?.email}</Typography>
                        <EditButton />
                    </div>
                }
                <Typography className={classes.profileLabel}>Birth Date:</Typography>
                <Typography>{userData?.birth_date}</Typography>
                <Typography className={classes.profileLabel}>Bio:</Typography>
                {
                    (userData?.username === JSON.parse(localStorage.getItem('user')).username) &&
                    <div className={classes.editField}>
                        <Typography>{userData?.bio}</Typography>
                        <EditButton />
                    </div>
                }
                <Typography className={classes.profileLabel}>Phone Number:</Typography>
                {
                    (userData?.username === JSON.parse(localStorage.getItem('user')).username) &&
                    <div className={classes.editField}>
                        <Typography>{userData?.phone_number}</Typography>
                        <EditButton />
                    </div>
                }
                <Typography className={classes.profileLabel}>Language:</Typography>
                {
                    (userData?.username === JSON.parse(localStorage.getItem('user')).username) &&
                    <div className={classes.editField}>
                        <Typography>{userData?.language}</Typography>
                        <EditButton />
                    </div>
                }
                <Typography className={classes.profileLabel}>Timezone:</Typography>
                {
                    (userData?.username === JSON.parse(localStorage.getItem('user')).username) &&
                    <div className={classes.editField}>
                        <Typography>{userData?.timezone}</Typography>
                        <EditButton />
                    </div>
                }
                <Typography className={classes.profileLabel}>Last visit:</Typography>
                <Typography>{userData?.last_visit}</Typography>
            </Box>


        </div>
    );
};

