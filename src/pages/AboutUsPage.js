import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {EpicWorksCard, CharactersCard, FavoriteBadge} from "../components";

const useStyles = makeStyles((theme) => ({
    list: {
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

export const AboutUsPage = () => {
    const classes = useStyles();


    return (
        <div>
            <div className={classes.list}>

            </div>
        </div>
    );
}
