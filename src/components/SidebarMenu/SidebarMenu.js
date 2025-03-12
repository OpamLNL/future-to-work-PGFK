import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    List,
    ListItem,
    ListItemText,
    Collapse,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { makeStyles } from '@material-ui/core/styles';
import { fetchEpicWorkTypes } from '../../store/reducers/epicWorkTypes/epicWorkTypesActions';
import {
    selectEpicWorkTypes,
    selectEpicWorkTypesLoading,
    selectEpicWorkTypesError,
} from '../../store/reducers/epicWorkTypes/epicWorkTypesSelectors';
import { ListEpicWorksOfTypes } from '../ListEpicWorksOfTypes/ListEpicWorksOfTypes';

const useStyles = makeStyles((theme) => ({
    drawer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: theme.spacing(1),
        color: theme.palette.primary.contrastText,
        fontSize: 12,
    },
    listItem: {
        color: theme.palette.primary.contrastText,
        paddingLeft: theme.spacing(2),
        width: '100%',
    },
    container: {
        width: '100%',
    },
}));

export const SidebarMenu = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const epicWorkTypes = useSelector(selectEpicWorkTypes);
    const loading = useSelector(selectEpicWorkTypesLoading);
    const error = useSelector(selectEpicWorkTypesError);
    const [openSections, setOpenSections] = useState({});

    useEffect(() => {
        if (!epicWorkTypes.length) {
            dispatch(fetchEpicWorkTypes());
        }
    }, [dispatch, epicWorkTypes.length]);

    const handleToggle = (sectionId) => {
        setOpenSections((prevOpenSections) => ({
            ...prevOpenSections,
            [sectionId]: !prevOpenSections[sectionId],
        }));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className={classes.drawer}>
            <List className={classes.container}>
                {epicWorkTypes && epicWorkTypes.length > 0 ? (
                    epicWorkTypes.map((type) => (
                        <div key={type.id}>
                            <ListItem button onClick={() => handleToggle(type.id)} className={classes.listItem}>
                                <ListItemText primary={type.type_name} />
                                {openSections[type.id] ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={openSections[type.id]} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {openSections[type.id] && (
                                        <ListEpicWorksOfTypes workType={type.id} />
                                    )}
                                </List>
                            </Collapse>
                        </div>
                    ))
                ) : (
                    <p>No epic work types available.</p>
                )}
            </List>
        </div>
    );
};
