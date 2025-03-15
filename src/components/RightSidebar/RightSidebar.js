import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { SidebarMenu } from '../SidebarMenu/SidebarMenu';

const useStyles = makeStyles((theme) => ({
    sideMenu: {
        width: 240,
        position: "absolute",

        display: 'flex',
        flexDirection: 'column',

        // backgroundColor: theme.palette.primary.containerBackground,
        padding: theme.spacing(2),
        marginRight: theme.spacing(2),
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
    },
}));

const RightSidebar = () => {
    const classes = useStyles();

    return (
        <div className={classes.sideMenu}>

        </div>
    );
};

export { RightSidebar };
