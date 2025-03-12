import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Paper } from '@mui/material';

import logo from '../assets/transparent_home.png';

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: "auto",
        padding: theme.spacing(4),
        width: "90%",
        maxWidth: 500,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        borderRadius: theme.shape.borderRadius,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    logo: {
        width: 100,
        marginBottom: theme.spacing(2),
    },
    contactInfo: {
        margin: theme.spacing(1),
    }
}));

export const ContactPage = () => {
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <img src={logo} alt="Company Logo" className={classes.logo} />
            <Typography variant="h6" gutterBottom>Contact Us</Typography>
            <Typography variant="body1" className={classes.contactInfo}>
                Name: Your Company Name
            </Typography>
            <Typography variant="body1" className={classes.contactInfo}>
                Email: contact@example.com
            </Typography>
            <Typography variant="body1" className={classes.contactInfo}>
                Phone: +123 456 7890
            </Typography>
            <Typography variant="body1" className={classes.contactInfo}>
                Address: 1234 Street, City, Country
            </Typography>
        </Paper>
    );
};
