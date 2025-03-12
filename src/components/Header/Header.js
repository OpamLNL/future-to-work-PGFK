import css from './Header.module.css';


import {
    MainMenu,
    ServiceBar
} from '../../components';


export const Header = () =>{

return(
            <div className={css.header}>
                <div>
                    <MainMenu />
                </div>
                <div>
                    <ServiceBar />
                </div>
            </div>
);
}

