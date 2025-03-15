import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Container, CircularProgress } from '@mui/material';

import {
    selectEpicWorks,
    selectEpicWorksError,
    selectEpicWorksLoading
} from "../store/reducers/epicWorks/epicWorksSelectors";

import { fetchEpicWorks } from "../store/reducers/epicWorks/epicWorksActions";
import { EpicWorksCard } from "../components";

const useStyles = makeStyles((theme) => ({
    pageContainer: {
        width: '1200px',
        padding: theme.spacing(4),
        margin: 'auto',
        color: theme.palette.text.primary,
        borderRadius: theme.shape.borderRadius,
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: theme.spacing(2),
        alignItems: 'start',
    },
}));

export const HowItWorksPage = () => {
    const classes = useStyles();



    return (
        <div className={classes.pageContainer}>


        </div>
    );
};
