import css from './MainMenuMini.module.css';
import {Link} from "react-router-dom";
import { useContext } from 'react';

import menuItemsLinks  from './menuItemLinks';
import menuItemsLocales from './menuItemLocales';

import { LanguageContext } from "../../language/language-context";
import {makeStyles} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    mainMenuMini: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        position: 'fixed',
        top: 0,
        right: 0,
        backgroundColor: 'transparent',
        padding: '10px',
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.2)',


        [theme.breakpoints.up('sm')]: {
            display: 'none',
        }
    }
}));


const MainMenuMini = () => {

    const language = useContext(LanguageContext);
    const classes = useStyles();

    return (
        <div>
            <div className={classes.mainMenuMini}>
                {menuItemsLinks.map(menuItem => (
                    <Link key={menuItem.id} to={menuItem.link} style={{fontSize: 'large', textDecoration: 'none', width: '100%' }}>

                            {menuItemsLocales.find(item => item.id === menuItem.id)?.label[language.language]}

                    </Link>
                ))}
            </div>
        </div>

    );
}

export {MainMenuMini};