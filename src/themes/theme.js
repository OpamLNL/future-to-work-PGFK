import { createTheme } from '@material-ui/core/styles';

const epicFont = 'Cinzel, serif';

export const lightTheme = createTheme({
    palette: {
        type: 'light',
        background: {
            default: 'rgba(245, 222, 179, 0.4)',
        },
        primary: {
            contrastText: "#241b10",
            main: "#6d8279",
            light: "#e2f5cc",
            dark: "#abcd59",
            containerBackground: 'rgba(133,143,123,0.9)',
        },
        secondary: {
            main: '#deb887',
        },
    },
    typography: {
        fontFamily: epicFont,
    },
    components: {
        MuiTypography: {
            defaultProps: {
                variantMapping: {
                    h1: 'h1',
                    h2: 'h2',
                    h3: 'h3',
                    h4: 'h4',
                    h5: 'h5',
                    h6: 'h6',
                    subtitle1: 'h3',
                    subtitle2: 'h3',
                    body1: 'span',
                    body2: 'span',
                },
            },
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
    spacing: 8,
    overrides: {
        MuiContainer: {
            root: {
                padding: 8,
                [createTheme().breakpoints.up('sm')]: {
                    padding: 24,
                },
                [createTheme().breakpoints.up('md')]: {
                    padding: 32,
                },
            },
        },
    },
});

export const darkTheme = createTheme({
    palette: {
        type: 'dark',
        background: {
            default: 'rgba(22, 56, 50, 0.8)',
        },
        primary: {
            contrastText: '#f0bd77',
            main: "#83baaf",
            dark: '#dbf0a8',
            light: "#6e8b78",
            containerBackground: 'rgba(110, 139, 120, 0.8)',
        },
        secondary: {
            main: '#086934',
        },
    },
    typography: {
        fontFamily: epicFont,
    },
    components: {
        MuiTypography: {
            defaultProps: {
                variantMapping: {
                    h1: 'h1',
                    h2: 'h2',
                    h3: 'h3',
                    h4: 'h4',
                    h5: 'h5',
                    h6: 'h6',
                    subtitle1: 'h3',
                    subtitle2: 'h6',
                    body1: 'span',
                    body2: 'span',
                },
            },
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
    spacing: 8,
    overrides: {
        MuiContainer: {
            root: {
                padding: 8,
                [createTheme().breakpoints.up('sm')]: {
                    padding: 24,
                },
                [createTheme().breakpoints.up('md')]: {
                    padding: 32,
                },
            },
        },
    },
});
