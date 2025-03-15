import { makeStyles } from "@material-ui/core/styles";
import { Divider, Paper, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { LanguageContext } from '../language/language-context';
import contactPageLocales from './Locales/contactPageLocales.json';

import logo from '../assets/fairview-logo.png';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: "auto",
    padding: theme.spacing(4),
    width: "90%",
    maxWidth: 600,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
      maxWidth: 400,
    },
    [theme.breakpoints.down('xs')]: {
      maxWidth: 300,
    },
  },
  logo: {
    width: 120,
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      width: 100,
    },
    [theme.breakpoints.down('xs')]: {
      width: 80,
    },
  },
  contactInfo: {
    margin: theme.spacing(1.5),
    textAlign: 'center',
    width: '80%',
    maxWidth: '80%',
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    color: theme.palette.primary.main,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },
  divider: {
    width: '80%',
    margin: theme.spacing(3, 0),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

export const ContactPage = () => {
  const classes = useStyles();
  const { language } = useContext(LanguageContext);

  const getText = (key) => contactPageLocales[key][language] || contactPageLocales[key]['en-US'];

  return (
    <Paper className={classes.paper}>
      <img src={logo} alt="FairView Logo" className={classes.logo} />
      <Typography variant="h5" gutterBottom>{getText('title')}</Typography>

      <Typography variant="body1" className={classes.contactInfo}>
        <strong>{getText('generalName')}</strong>
      </Typography>
      <Typography variant="body1" className={classes.contactInfo}>
        {getText('generalOfficeLabel')}: 19 Soborna St, Uzhhorod, Ukraine, 88000
      </Typography>
      <Typography variant="body1" className={classes.contactInfo}>
        {getText('generalEmailLabel')}: <a href="mailto:info@fairview.org" className={classes.link}>info@fairview.org</a>
      </Typography>
      <Typography variant="body1" className={classes.contactInfo}>
        {getText('generalPhoneLabel')}: +380 98 765 4321 (Mon-Fri, 9:00-18:00 GMT+2)
      </Typography>

      <Divider className={classes.divider} />

      <Typography variant="h6" className={classes.sectionTitle}>
        {getText('candidateSupportTitle')}
      </Typography>
      <Typography variant="body1" className={classes.contactInfo}>
        {getText('candidateEmailLabel')}: <a href="mailto:support@fairview.org" className={classes.link}>support@fairview.org</a>
      </Typography>
      <Typography variant="body1" className={classes.contactInfo}>
        {getText('candidatePhoneLabel')}: +380 67 123 4567
      </Typography>
      <Typography variant="body1" className={classes.contactInfo}>
        {getText('candidateHotlineLabel')}: Call our hotline at +380 800 505 101 (toll-free in Ukraine)
      </Typography>

      <Divider className={classes.divider} />

      <Typography variant="h6" className={classes.sectionTitle}>
        {getText('employerPartnershipsTitle')}
      </Typography>
      <Typography variant="body1" className={classes.contactInfo}>
        {getText('employerEmailLabel')}: <a href="mailto:partners@fairview.org" className={classes.link}>partners@fairview.org</a>
      </Typography>
      <Typography variant="body1" className={classes.contactInfo}>
        {getText('employerPhoneLabel')}: +380 50 987 6543
      </Typography>
      <Typography variant="body1" className={classes.contactInfo}>
        {getText('employerOfficeLabel')}: 19 Soborna St, Uzhhorod, Ukraine, 88000
      </Typography>

      <Divider className={classes.divider} />

      <Typography variant="h6" className={classes.sectionTitle}>
        {getText('followUsTitle')}
      </Typography>
      <Typography variant="body1" className={classes.contactInfo}>
        {getText('socialFacebookLabel')}: <a href="https://facebook.com/fairviewua" target="_blank" className={classes.link}>facebook.com/fairviewua</a>
      </Typography>
      <Typography variant="body1" className={classes.contactInfo}>
        {getText('socialLinkedInLabel')}: <a href="https://linkedin.com/company/fairview" target="_blank" className={classes.link}>linkedin.com/company/fairview</a>
      </Typography>
      <Typography variant="body1" className={classes.contactInfo}>
        {getText('socialTelegramLabel')}: <a href="https://t.me/fairview_support" target="_blank" className={classes.link}>@FairViewSupport</a>
      </Typography>
      <Typography variant="body1" className={classes.contactInfo}>
        {getText('socialTwitterLabel')}: <a href="https://twitter.com/FairViewUA" target="_blank" className={classes.link}>@FairViewUA</a>
      </Typography>

      <Divider className={classes.divider} />

      <Typography variant="body2" className={classes.contactInfo}>
        {getText('mediaInquiriesLabel')}: <a href="mailto:press@fairview.org" className={classes.link}>press@fairview.org</a>
      </Typography>
      <Typography variant="body2" className={classes.contactInfo}>
        {getText('partnershipProposalsLabel')}: <a href="mailto:collaboration@fairview.org" className={classes.link}>collaboration@fairview.org</a>
      </Typography>
    </Paper>
  );
};
