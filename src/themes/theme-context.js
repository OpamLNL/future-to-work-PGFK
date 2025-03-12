import { createContext } from 'react';
import { lightTheme, darkTheme } from './theme';

export const ThemeContext = createContext({

    theme:  lightTheme ? darkTheme : lightTheme,
    setTheme: () => {},
});


