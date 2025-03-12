import { useSelector, useDispatch } from 'react-redux';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';

import { apiBaseURL, epicWorksURL } from '../../configs/urls';

import {
    selectEpicWorks,
    selectEpicWorksLoading,
    selectEpicWorksError,
} from '../../store/reducers/epicWorks/epicWorksSelectors';
import {
    selectEpicWorkTypeRelations,
    selectEpicWorkTypeRelationsLoading,
    selectEpicWorkTypeRelationsError,
} from '../../store/reducers/epicWorkTypeRelations/epicWorkTypeRelationsSelectors';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchEpicWorkTypeRelations } from '../../store/reducers/epicWorkTypeRelations/epicWorkTypeRelationsActions';
import { fetchEpicWorks } from '../../store/reducers/epicWorks/epicWorksActions';


const IMG_API = apiBaseURL + epicWorksURL;

const useStyles = makeStyles((theme) => ({
    drawer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'left',
        marginLeft: 'auto',
        padding: theme.spacing(2),
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

export const ListEpicWorksOfTypes = ({ workType }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const epicWorks = useSelector(selectEpicWorks);
    const loading = useSelector(selectEpicWorksLoading);
    const error = useSelector(selectEpicWorksError);

    const relations = useSelector(selectEpicWorkTypeRelations);
    const relationsLoading = useSelector(selectEpicWorkTypeRelationsLoading);
    const relationsError = useSelector(selectEpicWorkTypeRelationsError);

    const [filteredWorks, setFilteredWorks] = useState([]);

    useEffect(() => {
        dispatch(fetchEpicWorkTypeRelations());
        dispatch(fetchEpicWorks());
    }, [dispatch]);

    useEffect(() => {
        if (relations && workType && epicWorks) {
            const filteredRelations = relations.filter(relation => relation.epic_work_type_id === workType);
            const filteredWorks = epicWorks.filter(work =>
                filteredRelations.some(relation => relation.epic_work_id === work.id)
            );
            setFilteredWorks(filteredWorks);
        }
    }, [relations, workType, epicWorks]);

    const handleItemClick = (itemId) => {
        navigate(`/epicWork/${itemId}`);
    };

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

    if (loading || relationsLoading) return <div>Loading...</div>;
    if (error || relationsError) return <div>Error: {error || relationsError}</div>;

    return (
        <div className={classes.drawer}>
            <List>
                {filteredWorks && filteredWorks.length > 0 ? (
                    filteredWorks.map((work) => {
                        const images = parseImages(work.images);
                        return (
                            <ListItem
                                key={work.id}
                                className={classes.listItem}
                                button
                                onClick={() => handleItemClick(work.id)}
                            >
                                <ListItemAvatar>
                                    {images.length > 0 && typeof images[0] === 'string' ? (
                                        <Avatar src={IMG_API + images[0]} className={classes.avatar} />
                                    ) : (
                                        <Avatar className={classes.avatar} />
                                    )}
                                </ListItemAvatar>
                                <ListItemText primary={work.title} />
                            </ListItem>
                        );
                    })
                ) : (
                    <p>No epic works available for this type.</p>
                )}
            </List>
        </div>
    );
};
