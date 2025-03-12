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

export const EpicWorksPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const epicWorks = useSelector(selectEpicWorks);
    const loading = useSelector(selectEpicWorksLoading);
    const error = useSelector(selectEpicWorksError);

    useEffect(() => {
        dispatch(fetchEpicWorks());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchEpicWorks());
    }, [dispatch]);

    if (loading) {
        return (
            <Container className={classes.pageContainer}>
                <CircularProgress color="secondary" />
            </Container>
        );
    }
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className={classes.pageContainer}>
            {epicWorks.length > 0 ? epicWorks.map(epicWork => (
                <EpicWorksCard key={epicWork.id} epicWorkId={epicWork.id} />
            )) : (
                <Typography variant="h6">No characters found</Typography>
            )}

        </div>
    );
};
