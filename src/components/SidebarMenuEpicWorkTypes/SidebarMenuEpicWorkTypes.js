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

    },
}));

export const SidebarMenuEpicWorkTypes = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const epicWorkTypes = useSelector(selectEpicWorkTypes);
    const loading = useSelector(selectEpicWorkTypesLoading);
    const error = useSelector(selectEpicWorkTypesError);
    const [openSections, setOpenSections] = useState({});

    useEffect(() => {
        dispatch(fetchEpicWorkTypes());
    }, [dispatch]);

    useEffect(() => {

    }, [epicWorkTypes]);

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
            <List>
                {epicWorkTypes && epicWorkTypes.length > 0 ? (
                    epicWorkTypes.map((section) => (
                        <div key={section.id}>
                            <ListItem button onClick={() => handleToggle(section.id)}>
                                <ListItemText primary={section.type_name} />
                                {openSections[section.id] ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={openSections[section.id]} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {section.content ? (
                                        section.content.map((item) => (
                                            <ListItem key={item.id} className={classes.listItem}>
                                                <ListItemText primary={item.title} />
                                            </ListItem>
                                        ))
                                    ) : (
                                        <ListItem className={classes.listItem}>
                                            <ListItemText primary="No content available" />
                                        </ListItem>
                                    )}
                                </List>
                            </Collapse>
                        </div>
                    ))
                ) : (
                    <p>No epic works types available.</p>
                )}
            </List>
        </div>
    );
};
