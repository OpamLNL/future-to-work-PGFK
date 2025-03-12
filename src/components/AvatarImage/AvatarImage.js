import css from './AvatarImage.module.css';


const AvatarImage = ({avatarUrl}) => {

    return (
            <img src={avatarUrl} alt="Avatar" className={css.avatarImage}/>
    );
};

export {AvatarImage};