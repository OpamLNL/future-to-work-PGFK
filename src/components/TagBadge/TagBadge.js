import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, Link} from '@mui/material';
import {useNavigate} from "react-router-dom";



const useStyles = makeStyles((theme) => ({
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        border: '2px solid transparent',
        borderRadius: '12%',
        margin: '2px',
        cursor: 'pointer',
        color: `${theme.palette.primary.dark} !important`,
        // background: `${theme.palette.primary.dark} !important`,
        '&:hover': {
                boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.3)',
                transform: 'translateY(-2px)',
            background: `${theme.palette.primary.light} !important`,
        },
}}));

export const TagBadge = React.forwardRef(({ onClick, children, className, ...rest }, ref) => {
    const classes = useStyles();
    const navigate = useNavigate();

    const handleSearch = () => {
        if (children) {
            navigate(`/search-result/${children}`);
        }
    };



    return (
        <Link to={`/search-result/${children}`}>
            <Button
                ref={ref}
                onClick={handleSearch}
                className={`${classes.button} ${className || ''}`}
                {...rest}
            >
                {children}
            </Button>
        </Link>
    );
});
