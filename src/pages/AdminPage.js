import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import css from './AdminPage.module.css';
import {
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tooltip,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { makeStyles } from '@material-ui/core/styles';
import { fetchUsers, createUser, deleteUser, updateUser } from '../store/reducers/users/usersActions';
import { fetchCharacters, createCharacter, deleteCharacter, updateCharacter } from '../store/reducers/characters/charactersActions';
import { fetchEpicWorks, createEpicWork, deleteEpicWork, updateEpicWork } from '../store/reducers/epicWorks/epicWorksActions';
import { RoundButton, Button } from "../components";

const useStyles = makeStyles((theme) => ({
    container: {
        width: "99%",
        marginTop: theme.spacing(4),
        display: 'grid',

    },
    userFunction: {
        // width: '20%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent:' flex-start',
        alignContent: 'center',
    },

    userFunctionInRow: {
        // width: '20%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent:' flex-start',
        alignContent: 'center',
    },

    table: {
        minWidth: "97%",
    },
    tableHead: {
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
    },
    tableRow: {
        backgroundColor: theme.palette.primary.dark,
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.containerBackground,
        },
    },
    searchInput: {
        marginBottom: theme.spacing(2),
    },
    functionButton: {
        marginBottom: theme.spacing(2),
        //width: "60px",
        margin: "5 5 5 15",
    },
}));

export const AdminPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.users);
    const characters = useSelector(state => state.characters.characters);
    const epicWorks = useSelector(state => state.epicWorks.epicWorks);
    const [openDialog, setOpenDialog] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const [editCharacters, setEditCharacters] = useState(null);
    const [editEpicWork, setEditEpicWork] = useState(null);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [itemIdToDelete, setItemIdToDelete] = useState(null);
    const [itemTypeToDelete, setItemTypeToDelete] = useState(null);
    const [showUsers, setShowUsers] = useState(true);
    const [showCharacters, setShowCharacters] = useState(true);
    const [showEpicWorks, setShowEpicWorks] = useState(true);

    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchCharacters());
        dispatch(fetchEpicWorks());
    }, [dispatch]);

    const handleOpenDialog = (item = null) => {
        if (item.type === 'user') {
            setEditUser(item.item);
        } else if (item.type === 'characterss') {
            setEditCharacters(item.item);
        } else if (item.type === 'epicWork') {
            setEditEpicWork(item.item);
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditUser(null);
        setEditCharacters(null);
        setEditEpicWork(null);
    };

    const handleAddOrUpdateItem = async () => {
        if (editUser) {
            if (editUser.id) {
                await dispatch(updateUser(editUser.id, editUser));
            } else {
                await dispatch(createUser(editUser));
            }
            dispatch(fetchUsers());
        } else if (editCharacters) {
            if (editCharacters.id) {
                await dispatch(updateCharacter(editCharacters));
            } else {
                await dispatch(createCharacter(editCharacters));
            }
            dispatch(fetchCharacters());
        } else if (editEpicWork) {
            if (editEpicWork.id) {
                await dispatch(updateEpicWork(editEpicWork.id, editEpicWork));
            } else {
                await dispatch(createEpicWork(editEpicWork));
            }
            dispatch(fetchEpicWorks());
        }
        handleCloseDialog();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (editUser !== null) {
            setEditUser((prev) => ({ ...prev, [name]: value }));
        } else if (editCharacters !== null) {
            setEditCharacters((prev) => ({ ...prev, [name]: value }));
        } else if (editEpicWork !== null) {
            setEditEpicWork((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleDeleteItem = async (itemId, type) => {
        setItemIdToDelete(itemId);
        setItemTypeToDelete(type);
        setDeleteConfirmationOpen(true);
    };

    const confirmDelete = async () => {
        if (itemIdToDelete && itemTypeToDelete) {
            if (itemTypeToDelete === 'user') {
                await dispatch(deleteUser(itemIdToDelete));
                dispatch(fetchUsers());
            } else if (itemTypeToDelete === 'characters') {
                await dispatch(deleteCharacter(itemIdToDelete));
                dispatch(fetchCharacters());
            } else if (itemTypeToDelete === 'epicWork') {
                await dispatch(deleteEpicWork(itemIdToDelete));
                dispatch(fetchEpicWorks());
            }
        }
        setDeleteConfirmationOpen(false);
    };

    const cancelDelete = () => {
        setItemIdToDelete(null);
        setItemTypeToDelete(null);
        setDeleteConfirmationOpen(false);
    };

    const toggleShowUsers = () => {
        setShowUsers(!showUsers);
    };

    const toggleShowCharacters = () => {
        setShowCharacters(!showCharacters);
    };

    const toggleShowEpicWorks = () => {
        setShowEpicWorks(!showEpicWorks);
    };

    return (
        <Container className={classes.container}>
            <div className={classes.userFunction}>
                <div>
                    <h1>Адміністративна панель</h1>
                </div>

                <div className={classes.userFunction}>
                    <Button onClick={toggleShowUsers} >
                        {showUsers ? 'Сховати користувачів' : 'Показати користувачів'}
                    </Button>
                    <Button onClick={toggleShowCharacters}>
                        {showCharacters ? 'Сховати персонажів' : 'Показати персонажів'}
                    </Button>
                    <Button onClick={toggleShowEpicWorks}>
                        {showEpicWorks ? 'Сховати епос' : 'Показати епос'}
                    </Button>

                    <div className={classes.userFunctionInRow}>
                        <Tooltip title="Додати користувача" className={classes.functionButton}>
                            <RoundButton onClick={() => handleOpenDialog({ type: 'user' })}>
                                Користувачі <AddCircleTwoToneIcon />
                            </RoundButton>
                        </Tooltip>
                        <Tooltip title="Додати персонажа" className={classes.functionButton}>
                            <RoundButton onClick={() => handleOpenDialog({ type: 'chatacters' })}>
                                Персонажі <AddCircleTwoToneIcon />
                            </RoundButton>
                        </Tooltip>
                        <Tooltip title="Додати epic work" className={classes.functionButton}>
                            <RoundButton onClick={() => handleOpenDialog({ type: 'epicWork' })}>
                                Epic Works <AddCircleTwoToneIcon />
                            </RoundButton>
                        </Tooltip>
                    </div>
                </div>
            </div>

            <Paper className={classes.container}>
                <TextField
                    className={classes.searchInput}
                    label="Швидкий пошук"
                    variant="outlined"
                    size="small"
                    fullWidth
                />
                {showUsers && (
                    <Table className={classes.table} aria-label="table of users">
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.tableHead}>ID</TableCell>
                                <TableCell className={classes.tableHead}>Ім'я користувача</TableCell>
                                <TableCell className={classes.tableHead}>Email</TableCell>
                                <TableCell className={classes.tableHead}>Дії</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id} className={classes.tableRow}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <div className={css.userFunction}>
                                            <Tooltip title="Редагувати користувача">
                                                <RoundButton color="primary" onClick={() => handleOpenDialog({ type: 'user', item: user })}> <EditNoteRoundedIcon /></RoundButton>
                                            </Tooltip>
                                            <Tooltip title="Видалити користувача">
                                                <RoundButton color="secondary" onClick={() => handleDeleteItem(user.id, 'user')}> <DeleteForeverRoundedIcon /> </RoundButton>
                                            </Tooltip>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
                {showCharacters && (
                    <Table className={classes.table} aria-label="table of characters">
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.tableHead}>ID</TableCell>
                                <TableCell className={classes.tableHead}>Заголовок</TableCell>
                                <TableCell className={classes.tableHead}>Зміст</TableCell>
                                <TableCell className={classes.tableHead}>Дії</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {characters.map((charactersItem) => (
                                <TableRow key={charactersItem.id} className={classes.tableRow}>
                                    <TableCell>{charactersItem.id}</TableCell>
                                    <TableCell>{charactersItem.name}</TableCell>
                                    <TableCell>{charactersItem.description}</TableCell>
                                    <TableCell>
                                        <div className={classes.userFunction}>
                                            <Tooltip title="Редагувати новину">
                                                <RoundButton color="primary" onClick={() => handleOpenDialog({ type: 'characters', item: charactersItem })}> <EditNoteRoundedIcon /></RoundButton>
                                            </Tooltip>
                                            <Tooltip title="Видалити новину">
                                                <RoundButton color="secondary" onClick={() => handleDeleteItem(charactersItem.id, 'characters')}> <DeleteForeverRoundedIcon /> </RoundButton>
                                            </Tooltip>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
                {showEpicWorks && (
                    <Table className={classes.table} aria-label="table of epic works">
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.tableHead}>ID</TableCell>
                                <TableCell className={classes.tableHead}>Заголовок</TableCell>
                                <TableCell className={classes.tableHead}>Опис</TableCell>
                                <TableCell className={classes.tableHead}>Дії</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {epicWorks.map((epicWork) => (
                                <TableRow key={epicWork.id}>
                                    <TableCell>{epicWork.id}</TableCell>
                                    <TableCell>{epicWork.title}</TableCell>
                                    <TableCell>{epicWork.description}</TableCell>
                                    <TableCell>
                                        <div className={css.userFunction}>
                                            <Tooltip title="Редагувати epic work">
                                                <RoundButton color="primary" onClick={() => handleOpenDialog({ type: 'epicWork', item: epicWork })}> <EditNoteRoundedIcon /></RoundButton>
                                            </Tooltip>
                                            <Tooltip title="Видалити epic work">
                                                <RoundButton color="secondary" onClick={() => handleDeleteItem(epicWork.id, 'epicWork')}> <DeleteForeverRoundedIcon /> </RoundButton>
                                            </Tooltip>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </Paper>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{editUser?.id ? 'Редагувати користувача' : editCharacters?.id ? 'Редагувати новину' : editEpicWork?.id ? 'Редагувати epic work' : 'Додати'}</DialogTitle>
                <DialogContent>
                    {editUser !== null ? (
                        <>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="username"
                                label="Ім'я користувача"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={editUser?.username || ''}
                                onChange={handleChange}
                            />
                            <TextField
                                margin="dense"
                                name="email"
                                label="Email"
                                type="email"
                                fullWidth
                                variant="outlined"
                                value={editUser?.email || ''}
                                onChange={handleChange}
                            />
                        </>
                    ) : editCharacters !== null ? (
                        <>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="title"
                                label="Заголовок"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={editCharacters?.title || ''}
                                onChange={handleChange}
                            />
                            <TextField
                                margin="dense"
                                name="content"
                                label="Зміст"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={editCharacters?.content || ''}
                                onChange={handleChange}
                            />
                        </>
                    ) : (
                        <>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="title"
                                label="Заголовок"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={editEpicWork?.title || ''}
                                onChange={handleChange}
                            />
                            <TextField
                                margin="dense"
                                name="description"
                                label="Опис"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={editEpicWork?.description || ''}
                                onChange={handleChange}
                            />
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Скасувати
                    </Button>
                    <Button onClick={handleAddOrUpdateItem} color="primary">
                        Зберегти
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={deleteConfirmationOpen}
                onClose={cancelDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Підтвердження видалення"}</DialogTitle>
                <DialogContent>
                    <DialogContent id="alert-dialog-description">
                        Ви впевнені, що хочете видалити цей елемент?
                    </DialogContent>
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancelDelete} color="primary">
                        Ні
                    </Button>
                    <Button onClick={confirmDelete} color="primary" autoFocus>
                        Так
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};
