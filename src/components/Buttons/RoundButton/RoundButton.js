import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button} from "@mui/material";


const useStyles = makeStyles((theme) => ({
    button: {

        margin: "3px",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        border: 'none',
        borderRadius: '50%',
        padding: '5px 5px 5px 5px',
        cursor: 'pointer',
        color: `${theme.palette.primary.dark} !important`,
        // background: `${theme.palette.primary.contrastText} !important`,
        '&:hover': {
            background: '#ddd',
        },
    }
}));

export const RoundButton = React.forwardRef(({ onClick, children, className, ...rest }, ref) => {
    const classes = useStyles();

    return (
        <Button ref={ref} onClick={onClick} className={`${classes.button} ${className}`} {...rest}>
            {children}
        </Button>
    );
});

