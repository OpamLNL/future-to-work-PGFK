import {useState, useEffect, useContext} from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Container, Box, CircularProgress } from '@mui/material';
import { ListEpicWorks, ListCharacters} from '../components';
import searchResultPageLocales from './Locales/SearchResultPageLocales.json';

import {LanguageContext} from "../language/language-context";

const useStyles = makeStyles((theme) => ({
    searchResultContainer: {
        maxWidth: '800px',
        padding: theme.spacing(4),
        margin: 'auto',
        backgroundColor: theme.palette.primary.containerBackground,
        color: theme.palette.text.primary,
        borderRadius: theme.shape.borderRadius,
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2),
        alignItems: 'center',
    },
}));

export const SearchResultPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { searchKey } = useParams();
    const [loading, setLoading] = useState(true);
    const language = useContext(LanguageContext);


    useEffect(() => {
        setLoading(false);
    }, [dispatch]);

    if (loading) {
        return (
            <Container>
                <CircularProgress color="secondary" />
            </Container>
        );
    }

    return (
        <div className={classes.searchResultContainer}>
            <Typography variant="h5" gutterBottom>
                { searchKey + ': ' + `${searchResultPageLocales.find(item => item.hasOwnProperty('searchWelcome'))?.searchWelcome[language.language] || ''}`}
            </Typography>

            <Box display="flex" flexDirection="column" alignItems="center" marginBottom={2}>
                <ListEpicWorks searchKey={searchKey} />
                <ListCharacters searchKey={searchKey} />
            </Box>
        </div>
    );
};
