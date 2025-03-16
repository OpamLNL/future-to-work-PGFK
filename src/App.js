import React, { useEffect, useState } from 'react';
import { CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Header, LeftSidebar, MainMenuMini, Overlay } from './components';
import {
    AdminLayout,
    AboutUsLayout,
    AccessibilityMapLayout,
    CandidateFormLayout,
    ContactLayout,
    ForCandidatesLayout,
    ForEmployersLayout,
    HowItWorksLayout,
    StatisticLayout,
    MainLayout,
    ProfileLayout,
    SearchResultLayout,
    SignInLayout,
    SignUpLayout,
    UserProfileLayout
} from './layouts';
import { ThemeContext } from './themes/theme-context';
import { darkTheme, lightTheme } from './themes/theme';
import { LanguageProvider } from './language/language-context';

const useStyles = makeStyles(theme => ({
    mainContainer: {
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        gridTemplateColumns: '15% 1fr 15%',
        gridTemplateAreas: `
            'header header header'
            'left main main'
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
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        }
    },
    mainContainerCenter: {
        gridArea: 'main',
        padding: '2px',
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

    localStorage.clear();


    //  запис тестового користувача
    const mockUser = {
        id: 1,
        username: "petro_k",
        name: "Петро Кращий",
        email: "ipetro@email.com",
        phone: "+380501234567",
        avatar: require("../src/assets/avatar.png"),
        age: 30,
        gender: "male",
        country: "Україна",
        city: "Київ",
        role: "candidate",
        isActive: true,
    };
    localStorage.setItem('user', JSON.stringify(mockUser));

    useEffect(() => {
        // Записуємо користувача в localStorage, якщо його там немає
        if (!localStorage.getItem('user')) {
            localStorage.setItem('user', JSON.stringify(mockUser));
            localStorage.setItem('jwtAccessToken', 'mockedAccessToken');
            localStorage.setItem('jwtRefreshToken', 'mockedRefreshToken');
        }
    }, []);

    const toggleTheme = () => {
        setTheme(theme === lightTheme ? darkTheme : lightTheme);
    };

    return (
        <Provider store={store}>
            <LanguageProvider>
                <ThemeContext.Provider value={{ theme, setTheme: toggleTheme }}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <Router>
                            <Overlay />
                            <div className={classes.header}>
                                <MainMenuMini />
                                <Header />
                            </div>
                            <div className={classes.mainContainer}>
                                <div className={classes.mainContainerLeft}>
                                    <LeftSidebar />
                                </div>
                                <div className={classes.mainContainerCenter}>
                                    <Routes>
                                        <Route index element={<Navigate to={'home'} />} />
                                        <Route path={'home'} element={<MainLayout />} />
                                        <Route path={'sign-up'} element={<SignUpLayout />} />
                                        <Route path={'sign-in'} element={<SignInLayout />} />
                                        <Route path={'admin-page'} element={<AdminLayout />} />
                                        {/*<Route path={'edit-profile'} element={<EditProfileLayout />} />*/}
                                        <Route path={'profile/:username'} element={<ProfileLayout />} />
                                        <Route path={'for-employers'} element={<ForEmployersLayout />} />
                                        <Route path={'for-candidates'} element={<ForCandidatesLayout />} />
                                        <Route path={'about-us'} element={<AboutUsLayout />} />
                                        <Route path={'accessibility-map'} element={<AccessibilityMapLayout />} />
                                        <Route path={'how-it-works'} element={<HowItWorksLayout />} />
                                        <Route path={'candidate-form'} element={<CandidateFormLayout />} />
                                        <Route path={'statistic'} element={<StatisticLayout />} />
                                        <Route path={'search-result/:searchKey'} element={<SearchResultLayout />} />
                                        <Route path={'user-profile/:username'} element={<UserProfileLayout />} />
                                        <Route path={'contacts'} element={<ContactLayout />} />
                                    </Routes>
                                </div>
                            </div>
                        </Router>
                    </ThemeProvider>
                </ThemeContext.Provider>
            </LanguageProvider>
        </Provider>
    );
};
