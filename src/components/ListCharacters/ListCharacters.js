import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';


import levenshtein from 'fast-levenshtein';

import ListCharactersLocales from "./ListCharactersLocales.json";

import { apiBaseURL, charactersURL } from '../../configs/urls';
import {
    selectCharacters,
    selectCharactersLoading,
    selectCharactersError,
} from '../../store/reducers/characters/charactersSelectors';

import { fetchCharacters } from '../../store/reducers/characters/charactersActions';
import {parseTags} from "../../services/ParseTags";

const IMG_API = apiBaseURL + charactersURL;

const useStyles = makeStyles((theme) => ({
    drawer: {
        // width: '15%',
        padding: theme.spacing(4),
        margin: 'auto',
        color: theme.palette.text.primary,
        // borderRadius: theme.shape.borderRadius,
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'center',
        justifyItems: 'center',
        gap: theme.spacing(2),
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(3),
            width: '100%',
        },
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(2),
            width: '100%',
        },
    },
    listItem: {
        color: theme.palette.primary.contrastText,
        paddingLeft: theme.spacing(4),
    },
    listItemText: {
        color: theme.palette.primary.contrastText,
        paddingLeft: theme.spacing(4),
    },
    container: {
        backgroundColor: theme.palette.primary.containerBackground,
    },
    avatar: {
        marginRight: theme.spacing(2),
    },
}));


const parseImages = (images) => {
    if (typeof images === 'string') {
        try {
            return JSON.parse(images);
        } catch (e) {
            console.error('Error parsing images', e);
            return [];
        }
    }
    return images;
};

export const ListCharacters = ({ searchKey }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const characters = useSelector(selectCharacters);
    const loading = useSelector(selectCharactersLoading);
    const error = useSelector(selectCharactersError);

    useEffect(() => {
        dispatch(fetchCharacters());
    }, [dispatch]);


    const filteredCharacters = useMemo(() => {
// Максимальна відстань Левенштейна
        const threshold = 2;
        if (!searchKey) return characters;

        return characters.filter(character => {
            const nameLower = character.name ? character.name.toLowerCase() : '';
            const searchKeyLower = searchKey.toLowerCase();

            const tags = parseTags(character?.tags);
            const tagsLower = tags.map(tag => tag.toLowerCase());

            const summaryLower = character.summary ? character.summary.toLowerCase() : '';



            return levenshtein.get(nameLower, searchKeyLower) <= threshold || tagsLower.includes(searchKeyLower) || summaryLower.includes(searchKeyLower);
        });
    }, [characters, searchKey]);


    const handleItemClick = (characterId) => {
        navigate(`/character/${characterId}`);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;


    return (
        <div className={classes.drawer}>
            <List>
                {filteredCharacters.length > 0 ? (
                    filteredCharacters.map((character) => {

                        const images = parseImages(character.images);
                        return (
                            <ListItem
                                key={character.id}
                                className={classes.listItem}
                                button
                                onClick={() => handleItemClick(character.id)}
                            >
                                <ListItemAvatar>
                                    <Avatar
                                        src={images.length > 0 ? IMG_API + images[0] : undefined}
                                        className={classes.avatar}
                                    />
                                </ListItemAvatar>
                                <ListItemText className={classes.listItemText} primary={character.name} />
                            </ListItem>
                        );
                    })
                ) : (
                    <p>Немає персонажів, що відповідають ключу пошуку.</p>
                )}
            </List>
        </div>
    );
};
