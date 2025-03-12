import React, { useContext, useState } from 'react';
import { FormControlLabel, FormGroup, styled, Switch } from '@mui/material';
import { ThemeContext } from '../../themes/theme-context';

const ThemeSwitcher = () => {
    const { setTheme } = useContext(ThemeContext);
    const [checked, setChecked] = useState(false);

    const handleChange = () => {
        setChecked(!checked);
        setTheme();
    };

    const MaterialUISwitch = styled(Switch)(({ theme }) => ({
        width: 62,
        height: 34,
        padding: 7,
        '& .MuiSwitch-switchBase': {
            margin: 1,
            padding: 0,
            transform: 'translateX(6px)',
            '&.Mui-checked': {
                color: '#fff',
                transform: 'translateX(22px)',
                '& .MuiSwitch-thumb:before': {
                    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                        '#fff',
                    )}" d="M10 2.5L5 7.5H7.5V12.5H12.5V7.5H15L10 2.5Z"/></svg>')`, // Меч іконка
                },
                '& + .MuiSwitch-track': {
                    opacity: 1,
                    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
                },
            },
        },
        '& .MuiSwitch-thumb': {
            backgroundColor: theme.palette.mode === 'dark' ? '#2E7D32' : '#1B5E20', // Темно-зелений
            width: 32,
            height: 32,
            '&:before': {
                content: "''",
                position: 'absolute',
                width: '100%',
                height: '100%',
                left: 0,
                top: 0,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff',
                )}" d="M10 12.5L5 17.5H7.5V12.5H12.5V17.5H15L10 12.5Z"/></svg>')`, // Щит іконка
            },
        },
        '& .MuiSwitch-track': {
            opacity: 1,
            backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            borderRadius: 20 / 2,
        },
    }));

    return (
        <FormGroup style={{ display: 'flex', justifyContent: 'center' }}>
            <FormControlLabel
                control={<MaterialUISwitch sx={{ m: 1 }} />}
                checked={!checked}
                onChange={handleChange}
            />
        </FormGroup>
    );
};

export { ThemeSwitcher };
