import { useSelector, useDispatch } from 'react-redux';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import levenshtein from "fast-levenshtein";


import ListEpicWorksLocales from "./ListEpicWorksLocales.json";

import { apiBaseURL, epicWorksURL } from '../../configs/urls';
import {
    selectEpicWorks,
    selectEpicWorksLoading,
    selectEpicWorksError,
} from '../../store/reducers/epicWorks/epicWorksSelectors';

import { fetchEpicWorks } from '../../store/reducers/epicWorks/epicWorksActions';
import { parseTags } from "../../services/ParseTags";
import { parseImages } from "../../services/ParseImages";



const IMG_API = apiBaseURL + epicWorksURL;

const useStyles = makeStyles((theme) => ({
    drawer: {
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
    container: {
        backgroundColor: theme.palette.primary.containerBackground,
    },
    avatar: {
        marginRight: theme.spacing(2),
    },
}));

export const ListEpicWorks = ({ searchKey }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const epicWorks = useSelector(selectEpicWorks);
    const loading = useSelector(selectEpicWorksLoading);
    const error = useSelector(selectEpicWorksError);

    useEffect(() => {
        dispatch(fetchEpicWorks());
    }, [dispatch]);

    const filteredEpicWorks = useMemo(() => {
// Максимальна відстань Левенштейна
        const threshold = 3;
        if (!searchKey) return epicWorks;

        return epicWorks.filter(epicWork => {
            const titleLower = epicWork.title ? epicWork.title.toLowerCase() : '';


            const tags = parseTags(epicWork?.tags);
            const tagsLower = tags.map(tag => tag.toLowerCase());

            // const tagsLower = epicWork.tags ? epicWork.tags.toLowerCase() : '';
            const summaryLower = epicWork.summary ? epicWork.summary.toLowerCase() : '';
            const searchKeyLower = searchKey.toLowerCase();


            return titleLower.includes(searchKeyLower) || tagsLower.includes(searchKeyLower) || summaryLower.includes(searchKeyLower);
        });

    }, [epicWorks, searchKey]);


    const handleItemClick = (itemId) => {
        navigate(`/epicWork/${itemId}`);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className={classes.drawer}>
            <List>
                {filteredEpicWorks.length > 0 ? (
                    filteredEpicWorks.map((epicWork) => {
                        const images = parseImages(epicWork.images);

                        return (
                            <ListItem
                                key={epicWork.id}
                                className={classes.listItem}
                                button
                                onClick={() => handleItemClick(epicWork.id)}
                            >
                                <ListItemAvatar>
                                    <Avatar
                                        src={images.length > 0 ? IMG_API + images[0] : undefined}
                                        className={classes.avatar}
                                    />
                                </ListItemAvatar>
                                <ListItemText primary={epicWork.title} />
                            </ListItem>
                        );
                    })
                ) : (
                    <p>Немає епічних творів, що відповідають ключу пошуку.</p>
                )}
            </List>
        </div>
    );
};
