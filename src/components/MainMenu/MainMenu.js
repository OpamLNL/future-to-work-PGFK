import css from './MainMenu.module.css';
import {Link} from "react-router-dom";
import { useContext } from 'react';

import menuItemsLinks  from './menuItemLinks';
import menuItemsLocales from './menuItemLocales';

import { Button, Icon } from '../../components';
import { LanguageContext } from "../../language/language-context";


const MainMenu = () => {

    const language = useContext(LanguageContext);

    return (
        <div>
            <div className={css.mainMenuContainer}>
                {menuItemsLinks.map(menuItem => (
                    <Link key={menuItem.id} to={menuItem.link} style={{ textDecoration: 'none', width: '100%' }}>
                        <Button
                            style={{
                                width: '200px',
                                height: '80px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '2px'
                            }}
                        >
                            <Icon name="inbox"/>
                            <span>{menuItemsLocales.find(item => item.id === menuItem.id)?.label[language.language]}</span>
                        </Button>
                    </Link>
                ))}
            </div>
        </div>

    );
}

export {MainMenu};