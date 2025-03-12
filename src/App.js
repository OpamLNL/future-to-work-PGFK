import React, {useEffect, useState} from 'react';
import { CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core';
import {BrowserRouter as Router, Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import {Provider, useDispatch} from 'react-redux';
import { store } from './store/store';
import { Header, LeftSidebar, Overlay, RightSidebar } from './components';
import {
    AdminLayout,
    CharacterLayout,
    CharactersLayout,
    ContactLayout,
    EditProfileLayout,
    EpicWorkLayout,
    EpicWorksLayout,
    FavoriteLayout,
    LinksLayout,
    MainLayout,
    ProfileLayout,
    SearchResultLayout,
    SignInLayout,
    SignUpLayout,
    UserProfileLayout
} from './layouts';
import {ThemeContext} from './themes/theme-context';
import {darkTheme, lightTheme} from './themes/theme';
import {LanguageProvider} from './language/language-context';
import {apiBaseURL} from "./configs/urls";

const useStyles = makeStyles(theme => ({
    mainContainer: {
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        gridTemplateColumns: '15% 1fr 15%',
        gridTemplateAreas: `
            'header header header'
            'left main right'
        `,
        minHeight: '100vh',
        position: 'relative',
        [theme.breakpoints.down('sm')]: {
            width: '400px',
            top: '160px',
        }

    },
    mainContainerLeft: {
        gridArea: 'left',
        left: 0,
        top: 0,
        bottom: 0,
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        }
    },
    mainContainerRight: {
        gridArea: 'right',
        right: 0,
        top: 0,
        bottom: 0,
        [theme.breakpoints.down('md')]: {

        }
    },
    mainContainerCenter: {
        gridArea: 'main',
        padding: '16px',
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
            marginRight: 0,
        },
        [theme.breakpoints.down('md')]: {
            marginRight: '25%',
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
            marginRight: 0,
        }
    },
    header: {
        gridArea: 'header',
        minWidth: '100%',
        zIndex: 1000,
    },
}));



export const App = () => {
    const [theme, setTheme] = useState(darkTheme);
    const classes = useStyles();
    // const dispatch = useDispatch();
    // const navigate = useNavigate();

    const toggleTheme = () => {
        setTheme(theme === lightTheme ? darkTheme : lightTheme);
    };

    const logout = () => {
        localStorage.removeItem('jwtAccessToken');
        localStorage.removeItem('jwtRefreshToken');
        localStorage.removeItem('user');
        localStorage.removeItem('favorites');

    };



    // useEffect(() => {
    //     const user = JSON.parse(localStorage.getItem('user'));
    //     if (user && user.username) {
    //         const url = `${apiBaseURL}/api/users/getUserByUsername/${encodeURIComponent(user.username)}`;
    //
    //         fetch(url)
    //             .then(response => response.json())
    //             .then(data => {
    //                 if (!data || data.error) {
    //                     console.error('User not found or error occurred:', data.error);
    //                     logout();
    //                 } else {
    //                     console.log('User is valid:', data);
    //                 }
    //             })
    //             .catch(error => {
    //                 console.error('Error verifying user:', error);
    //                 logout();
    //             });
    //     } else {
    //         logout();
    //     }
    // }, []);



    // localStorage.removeItem('favorites');
    return (
        <Provider store={store}>
            <LanguageProvider>
                <ThemeContext.Provider value={{ theme, setTheme: toggleTheme }}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline/>
                        <Router>
                            <Overlay/>
                            <div className={classes.header}>
                                <Header />
                            </div>
                            <div className={classes.mainContainer}>
                                <div className={classes.mainContainerLeft}>
                                    <LeftSidebar />
                                </div>
                                <div className={classes.mainContainerCenter}>
                                    <Routes>
                                        <Route index element={<Navigate to={'home'}/>} />
                                        <Route path={'home'} element={<MainLayout />} />
                                        <Route path={'sign-up'} element={<SignUpLayout />} />
                                        <Route path={'sign-in'} element={<SignInLayout />} />
                                        <Route path={'admin-page'} element={<AdminLayout />} />
                                        <Route path={'edit-profile'} element={<EditProfileLayout />} />
                                        <Route path={'profile/:username'} element={<ProfileLayout />} />
                                        <Route path={'epicWork/:epicWorkId'} element={<EpicWorkLayout />} />
                                        <Route path={'epicWorks'} element={<EpicWorksLayout />} />
                                        <Route path={'character/:characterId'} element={<CharacterLayout />} />
                                        


                                        <Route path={'characters'} element={<CharactersLayout />} />



                                        <Route path={'favorites'} element={<FavoriteLayout />} />
                                        <Route path={'search-result/:searchKey'} element={<SearchResultLayout />} />
                                        <Route path={'user-profile/:username'} element={<UserProfileLayout />} />
                                        <Route path={'links'} element={<LinksLayout />} />
                                        <Route path={'contacts'} element={<ContactLayout />} />
                                    </Routes>
                                </div>
                                <div className={classes.mainContainerRight}>
                                    <RightSidebar />
                                </div>
                            </div>
                        </Router>
                    </ThemeProvider>
                </ThemeContext.Provider>
            </LanguageProvider>
        </Provider>
    );
};
