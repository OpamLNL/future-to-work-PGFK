// Overlay.js
import { useContext } from 'react';
import { ThemeContext } from '../../themes/theme-context';
import css from './Overlay.module.css?v=1.0';

export const Overlay = () => {
    const { theme } = useContext(ThemeContext);

    const overlayClass = `${css.darkOverlay} ${theme.palette.type === 'dark' ? css.dark : css.light}`;

    return <div className={overlayClass}></div>;
};

