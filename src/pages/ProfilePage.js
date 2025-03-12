import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, CircularProgress, Container, Box, Paper } from '@mui/material';

import { fetchUserByUsername } from "../store/reducers/users/usersActions";
import { apiBaseURL, avatarsURL } from "../configs/urls";

const IMG_API = apiBaseURL + avatarsURL;

const useStyles = makeStyles((theme) => ({
    profileContainer: {
        maxWidth: '600px',
        padding: theme.spacing(4),
        margin: 'auto',
        backgroundColor: theme.palette.background.paper,
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
}));


export const ProfilePage = () => {
    const { username } = useParams();
    const classes = useStyles();
    const dispatch = useDispatch();
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

    return (
        <div className={classes.profileContainer} >
            <Typography variant="h7" gutterBottom> {userData?.role} </Typography>
            <Box display="flex" flexDirection="column" alignItems="center" marginBottom={2}>
                <img src={IMG_API + userData?.avatar} alt="Avatar" className={classes.profileImage} />
                <Typography variant="h6">{userData?.username}</Typography>
            </Box>
            <Box>
                <Typography className={classes.profileLabel}>Email:</Typography>
                <Typography>{userData?.email}</Typography>
                <Typography className={classes.profileLabel}>Birth Date:</Typography>
                <Typography>{userData?.birth_date}</Typography>
                <Typography className={classes.profileLabel}>Bio:</Typography>
                <Typography>{userData?.bio}</Typography>
                <Typography className={classes.profileLabel}>Phone Number:</Typography>
                <Typography>{userData?.phone_number}</Typography>
                <Typography className={classes.profileLabel}>Language:</Typography>
                <Typography>{userData?.language}</Typography>
                <Typography className={classes.profileLabel}>Timezone:</Typography>
                <Typography>{userData?.timezone}</Typography>
                <Typography className={classes.profileLabel}>Last visit:</Typography>
                <Typography>{userData?.last_visit}</Typography>
            </Box>
        </div>
    );
};
