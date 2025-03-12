import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const useStyles = makeStyles((theme) => ({
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid transparent',
        borderRadius: '12%',
        margin: '2px',
        cursor: 'pointer',
        color: '#FF69B4',
        '&:hover': {
            boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.3)',
            transform: 'translateY(-2px)',
            background: '#FF69B4',
            color: '#FFFFFF'
        },
    }
}));

export const FavoriteBadge = React.forwardRef(({ objectId, type }, ref) => {
    const classes = useStyles();

    const handleFavorite = () => {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || {};
        let typeFavorites = favorites[type] || [];
        console.log(type);
        if (!typeFavorites.includes(objectId) && type !== undefined) {
            typeFavorites.push(objectId);
            favorites[type] = typeFavorites;
            localStorage.setItem('favorites', JSON.stringify(favorites));
            alert('Додано до обраного!');
        } else {
            alert('Вже у обраному.');
        }
    };

    const isFavorite = () => {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || {};
        let typeFavorites = favorites[type] || [];
        return typeFavorites.includes(objectId);
    };

    return (
        <IconButton
            ref={ref}
            onClick={handleFavorite}
            className={classes.button}
        >
            {isFavorite() ? <FavoriteIcon  className={classes.button}/> : <FavoriteBorderIcon  className={classes.button}/>}
        </IconButton>
    );
});
