import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Container, CircularProgress } from '@mui/material';
import { CharactersCard } from '../components';
import { fetchCharacters } from '../store/reducers/characters/charactersActions';

import {
    selectCharacters,
    selectCharactersError,
    selectCharactersLoading
} from "../store/reducers/characters/charactersSelectors";

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

export const ForCandidatesPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const characters = useSelector(selectCharacters);
    const loading = useSelector(selectCharactersLoading);
    const error = useSelector(selectCharactersError);

    useEffect(() => {
        dispatch(fetchCharacters());
    }, [dispatch]);



    useEffect(() => {
        dispatch(fetchCharacters());
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
            {characters.length > 0 ? characters.map(character => (
                <CharactersCard key={character.id} character={character} />
            )) : (
                <Typography variant="h6">No characters found</Typography>
            )}

        </div>
    );
};
