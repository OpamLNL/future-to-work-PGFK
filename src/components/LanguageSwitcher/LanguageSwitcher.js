import React, { useContext, useState } from 'react';
import { Switch, FormControlLabel, FormGroup, styled } from '@mui/material';
import { LanguageContext } from '../../language/language-context';

const LanguageSwitcher = () => {
    const { toggleLanguage } = useContext(LanguageContext);
    const [checked, setChecked] = useState(false);

    const handleChange = () => {
        setChecked(!checked);
        toggleLanguage();
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
                    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="12" width="24" viewBox="0 0 24 12"><rect width="24" height="12" fill="%23FFD700"/><rect width="24" height="6" fill="%230056B4"/></svg>')`, // Прапор України
                },
                '& + .MuiSwitch-track': {
                    opacity: 1,
                    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
                },
            },
        },
        '& .MuiSwitch-thumb': {
            backgroundColor: theme.palette.mode === 'dark' ? '#97e09b' : '#3e5e40', // Темно-зелений
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
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="12" width="24" viewBox="0 0 24 12"><rect width="24" height="12" fill="%23B22234"/><path fill="%23fff" d="M0 1.5h24V3H0zm0 3h24v1.5H0zM0 6h24v1.5H0zM0 9h24v1.5H0z"/><rect width="10" height="6" fill="%23003A63"/></svg>')`, // Прапор США
            },
        },
        '& .MuiSwitch-track': {
            opacity: 1,
            backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            borderRadius: 20 / 2,
        },
    }));

    return (
        <FormGroup>
            <FormControlLabel
                control={<MaterialUISwitch sx={{ m: 1 }} checked={checked} onChange={handleChange} />}
                label=""
            />
        </FormGroup>
    );
};

export { LanguageSwitcher };
