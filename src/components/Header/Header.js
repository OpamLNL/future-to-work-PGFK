import css from './Header.module.css';


import {
    MainMenu,
    ServiceBar
} from '../../components';
import serviceBarLocales from "../ServiceBar/serviceBarLocales.json";


export const Header = () =>{

return(
    <div className={css.header}>

        <div>
            <ServiceBar/>
        </div>
    </div>
);
}

