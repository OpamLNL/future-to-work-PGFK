import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import homeIcon from '../../../assets/transparent_home.png';


const useStyles = makeStyles((theme) => ({
    button: {

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        border: '2px',
        borderRadius: '50%',
        margin: '5px 15px 5px 5px',
        cursor: 'pointer',
        color: theme.palette.primary.contrastText,
        background: theme.palette.primary.dark,
        '&:hover': {
            background: theme.palette.primary.light,
        },
    },
        img: {
            width: '34px',
            height: '34px',

        }
}));

export const HomeButton = React.forwardRef(({ onClick, children, className, ...rest }, ref) => {
    const classes = useStyles();

    return (
        <button ref={ref} onClick={onClick} className={`${classes.button} ${className}`} {...rest}>
            <img src={homeIcon} alt="Home" className={classes.img} />

        </button>
    );
});

