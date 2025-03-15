import css from './Header.module.css';


import {
    MainMenuMini,
    ServiceBar
} from '../../components';



export const Header = () =>{

return(
    <div className={css.header}>
        <MainMenuMini/>

        <div>
            <ServiceBar/>
        </div>
    </div>
);
}

