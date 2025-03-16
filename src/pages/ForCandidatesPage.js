import { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Container, Modal, Box, FormControl, FormControlLabel, Checkbox, Radio, RadioGroup, TextField, Button as MuiButton } from '@mui/material';
import { RoundButton } from '../components';
import { speakText } from '../services/SpeakText';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { Button } from '../components';
import { LanguageContext } from "../language/language-context";
import candidatesPageLocales from './Locales/candidatesPageLocales.json';

const useStyles = makeStyles((theme) => ({
    pageContainer: {
        padding: theme.spacing(4),
        margin: 'auto',
        color: theme.palette.text.primary,
        borderRadius: theme.shape.borderRadius,
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(3),
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(1),
    },
    title: {
        fontSize: '3rem',
        fontFamily: theme.typography.fontFamily,
        marginBottom: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.primary, // Темний текст у світлому режимі, білий у темному
        display: 'block',
        [theme.breakpoints.up('sm')]: {
            fontSize: '2rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '2.5rem',
        },
    },
    description: {
        fontSize: '1.5rem',
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.secondary,
        display: 'block',
        [theme.breakpoints.up('sm')]: {
            fontSize: '1.2rem',
            marginTop: theme.spacing(4),
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '1.5rem',
            marginTop: theme.spacing(6),
        },
    },
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: 600,
        backgroundColor: theme.palette.mode === 'dark' ? '#1e2a1e' : '#f5f5f5', // Темно-зелений у темному режимі, світло-сірий у світлому
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        padding: theme.spacing(4),
        overflowY: 'auto',
        maxHeight: '90vh',
        border: `2px solid ${theme.palette.mode === 'dark' ? '#2E7D32' : '#1B5E20'}`, // Темно-зелена рамка відповідно до режиму
        borderRadius: theme.shape.borderRadius,
        color: theme.palette.mode === 'dark' ? '#ffffff' : '#212121', // Білий текст у темному, темний у світлому
    },
}));

export const ForCandidatesPage = () => {
    const language = useContext(LanguageContext);
    const classes = useStyles();
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        position: '',
        experience: '',
        interviewFormats: [],
        englishComfort: '',
        languageNeeds: '',
        specialNeeds: [],
        neurodiversity: '',
        preferredTime: '',
        breaks: '',
        additionalRequests: '',
    });

    const content = {
        title: candidatesPageLocales.find(item => item.hasOwnProperty('title'))?.title[language.language] || '',
        intro: candidatesPageLocales.find(item => item.hasOwnProperty('intro'))?.intro[language.language] || '',
        whyTitle: candidatesPageLocales.find(item => item.hasOwnProperty('whyTitle'))?.whyTitle[language.language] || '',
        whyItems: candidatesPageLocales.find(item => item.hasOwnProperty('whyItems'))?.whyItems[language.language] || [],
        solutionTitle: candidatesPageLocales.find(item => item.hasOwnProperty('solutionTitle'))?.solutionTitle[language.language] || '',
        solutionDescription: candidatesPageLocales.find(item => item.hasOwnProperty('solutionDescription'))?.solutionDescription[language.language] || '',
        callToAction: candidatesPageLocales.find(item => item.hasOwnProperty('callToAction'))?.callToAction[language.language] || '',
        button: candidatesPageLocales.find(item => item.hasOwnProperty('button'))?.button[language.language] || '',
        formTitle: candidatesPageLocales.find(item => item.hasOwnProperty('formTitle'))?.formTitle[language.language] || '',
        formSubtitle: candidatesPageLocales.find(item => item.hasOwnProperty('formSubtitle'))?.formSubtitle[language.language] || '',
        generalInfo: candidatesPageLocales.find(item => item.hasOwnProperty('generalInfo'))?.generalInfo[language.language] || '',
        nameLabel: candidatesPageLocales.find(item => item.hasOwnProperty('nameLabel'))?.nameLabel[language.language] || '',
        positionLabel: candidatesPageLocales.find(item => item.hasOwnProperty('positionLabel'))?.positionLabel[language.language] || '',
        experienceLabel: candidatesPageLocales.find(item => item.hasOwnProperty('experienceLabel'))?.experienceLabel[language.language] || '',
        experienceOptions: candidatesPageLocales.find(item => item.hasOwnProperty('experienceOptions'))?.experienceOptions[language.language] || [],
        interviewFormatTitle: candidatesPageLocales.find(item => item.hasOwnProperty('interviewFormatTitle'))?.interviewFormatTitle[language.language] || '',
        interviewFormatLabel: candidatesPageLocales.find(item => item.hasOwnProperty('interviewFormatLabel'))?.interviewFormatLabel[language.language] || '',
        interviewFormatOptions: candidatesPageLocales.find(item => item.hasOwnProperty('interviewFormatOptions'))?.interviewFormatOptions[language.language] || [],
        englishComfortLabel: candidatesPageLocales.find(item => item.hasOwnProperty('englishComfortLabel'))?.englishComfortLabel[language.language] || '',
        englishComfortOptions: candidatesPageLocales.find(item => item.hasOwnProperty('englishComfortOptions'))?.englishComfortOptions[language.language] || [],
        languageNeedsLabel: candidatesPageLocales.find(item => item.hasOwnProperty('languageNeedsLabel'))?.languageNeedsLabel[language.language] || '',
        accessibilityTitle: candidatesPageLocales.find(item => item.hasOwnProperty('accessibilityTitle'))?.accessibilityTitle[language.language] || '',
        specialNeedsLabel: candidatesPageLocales.find(item => item.hasOwnProperty('specialNeedsLabel'))?.specialNeedsLabel[language.language] || '',
        specialNeedsOptions: candidatesPageLocales.find(item => item.hasOwnProperty('specialNeedsOptions'))?.specialNeedsOptions[language.language] || [],
        neurodiversityLabel: candidatesPageLocales.find(item => item.hasOwnProperty('neurodiversityLabel'))?.neurodiversityLabel[language.language] || '',
        timingTitle: candidatesPageLocales.find(item => item.hasOwnProperty('timingTitle'))?.timingTitle[language.language] || '',
        preferredTimeLabel: candidatesPageLocales.find(item => item.hasOwnProperty('preferredTimeLabel'))?.preferredTimeLabel[language.language] || '',
        preferredTimeOptions: candidatesPageLocales.find(item => item.hasOwnProperty('preferredTimeOptions'))?.preferredTimeOptions[language.language] || [],
        otherTimeLabel: candidatesPageLocales.find(item => item.hasOwnProperty('otherTimeLabel'))?.otherTimeLabel[language.language] || '',
        breaksLabel: candidatesPageLocales.find(item => item.hasOwnProperty('breaksLabel'))?.breaksLabel[language.language] || '',
        breaksOptions: candidatesPageLocales.find(item => item.hasOwnProperty('breaksOptions'))?.breaksOptions[language.language] || [],
        additionalRequestsTitle: candidatesPageLocales.find(item => item.hasOwnProperty('additionalRequestsTitle'))?.additionalRequestsTitle[language.language] || '',
        additionalRequestsLabel: candidatesPageLocales.find(item => item.hasOwnProperty('additionalRequestsLabel'))?.additionalRequestsLabel[language.language] || '',
        submitButton: candidatesPageLocales.find(item => item.hasOwnProperty('submitButton'))?.submitButton[language.language] || '',
    };

    const fullText = [
        content.title,
        content.intro,
        content.whyTitle,
        ...content.whyItems,
        content.solutionTitle,
        content.solutionDescription,
        content.callToAction,
    ].join(' ');

    const handleSpeak = () => {
        setIsSpeaking(true);
        speakText(fullText, [language.language], () => setIsSpeaking(false));
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData((prev) => ({
                ...prev,
                [name]: checked
                    ? [...prev[name], value]
                    : prev[name].filter((item) => item !== value),
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        handleClose();
    };

    return (
        <Container className={classes.pageContainer}>
            <div className={classes.header}>
                <Typography variant="h4" className={classes.title}>
                    {content.title}
                </Typography>
                <RoundButton onClick={handleSpeak} disabled={isSpeaking}>
                    <VolumeUpIcon />
                </RoundButton>
            </div>
            <Typography variant="body1" className={classes.description}>
                {content.intro}
            </Typography>
            <Typography variant="h5" className={classes.title}>
                {content.whyTitle}
            </Typography>
            {content.whyItems.map((item, index) => (
                <Typography key={index} variant="body1" className={classes.description}>
                    • {item}
                </Typography>
            ))}
            <Typography variant="h5" className={classes.title}>
                {content.solutionTitle}
            </Typography>
            <Typography variant="body1" className={classes.description}>
                {content.solutionDescription}
            </Typography>
            <Typography variant="body1" className={classes.description}>
                {content.callToAction}
            </Typography>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                {content.button}
            </Button>

            <Modal open={open} onClose={handleClose}>
                <Box className={classes.modal} component="form" onSubmit={handleSubmit}>
                    <Typography variant="h6">{content.formTitle}</Typography>
                    <Typography variant="body2">{content.formSubtitle}</Typography>

                    <Typography variant="subtitle1" mt={2}>{content.generalInfo}</Typography>
                    <TextField
                        label={content.nameLabel}
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label={content.positionLabel}
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <FormControl component="fieldset" margin="normal">
                        <Typography variant="body1">{content.experienceLabel}</Typography>
                        <RadioGroup name="experience" value={formData.experience} onChange={handleChange}>
                            {content.experienceOptions.map((option, index) => (
                                <FormControlLabel key={index} value={option.value} control={<Radio />} label={option.label} />
                            ))}
                        </RadioGroup>
                    </FormControl>

                    <Typography variant="subtitle1" mt={2}>{content.interviewFormatTitle}</Typography>
                    <FormControl component="fieldset" margin="normal">
                        <Typography variant="body1">{content.interviewFormatLabel}</Typography>
                        {content.interviewFormatOptions.map((option, index) => (
                            <FormControlLabel
                                key={index}
                                control={
                                    <Checkbox
                                        checked={formData.interviewFormats.includes(option.value)}
                                        onChange={handleChange}
                                        name="interviewFormats"
                                        value={option.value}
                                    />
                                }
                                label={option.label}
                            />
                        ))}
                    </FormControl>
                    <FormControl component="fieldset" margin="normal">
                        <Typography variant="body1">{content.englishComfortLabel}</Typography>
                        <RadioGroup name="englishComfort" value={formData.englishComfort} onChange={handleChange}>
                            {content.englishComfortOptions.map((option, index) => (
                                <FormControlLabel key={index} value={option.value} control={<Radio />} label={option.label} />
                            ))}
                        </RadioGroup>
                    </FormControl>
                    <TextField
                        label={content.languageNeedsLabel}
                        name="languageNeeds"
                        value={formData.languageNeeds}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />

                    <Typography variant="subtitle1" mt={2}>{content.accessibilityTitle}</Typography>
                    <FormControl component="fieldset" margin="normal">
                        <Typography variant="body1">{content.specialNeedsLabel}</Typography>
                        {content.specialNeedsOptions.map((option, index) => (
                            <FormControlLabel
                                key={index}
                                control={
                                    <Checkbox
                                        checked={formData.specialNeeds.includes(option.value)}
                                        onChange={handleChange}
                                        name="specialNeeds"
                                        value={option.value}
                                    />
                                }
                                label={option.label}
                            />
                        ))}
                    </FormControl>
                    <TextField
                        label={content.neurodiversityLabel}
                        name="neurodiversity"
                        value={formData.neurodiversity}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />

                    <Typography variant="subtitle1" mt={2}>{content.timingTitle}</Typography>
                    <FormControl component="fieldset" margin="normal">
                        <Typography variant="body1">{content.preferredTimeLabel}</Typography>
                        <RadioGroup name="preferredTime" value={formData.preferredTime} onChange={handleChange}>
                            {content.preferredTimeOptions.map((option, index) => (
                                <FormControlLabel key={index} value={option.value} control={<Radio />} label={option.label} />
                            ))}
                        </RadioGroup>
                        <TextField
                            label={content.otherTimeLabel}
                            name="preferredTime"
                            value={formData.preferredTime === 'other' ? formData.preferredTime : ''}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                    </FormControl>
                    <FormControl component="fieldset" margin="normal">
                        <Typography variant="body1">{content.breaksLabel}</Typography>
                        <RadioGroup name="breaks" value={formData.breaks} onChange={handleChange}>
                            {content.breaksOptions.map((option, index) => (
                                <FormControlLabel key={index} value={option.value} control={<Radio />} label={option.label} />
                            ))}
                        </RadioGroup>
                    </FormControl>

                    <Typography variant="subtitle1" mt={2}>{content.additionalRequestsTitle}</Typography>
                    <TextField
                        label={content.additionalRequestsLabel}
                        name="additionalRequests"
                        value={formData.additionalRequests}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={3}
                        margin="normal"
                    />

                    <MuiButton type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                        {content.submitButton}
                    </MuiButton>
                </Box>
            </Modal>
        </Container>
    );
};

export default ForCandidatesPage;