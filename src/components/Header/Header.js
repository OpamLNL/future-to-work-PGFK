import css from './Header.module.css';


import {
    MainMenu,
    ServiceBar
} from '../../components';


export const Header = () =>{

return(
            <div className={css.header}>

                <div>
                    <ServiceBar />
                </div>
            </div>
);
}

