import { makeStyles } from '@material-ui/core/styles';
import React, { useContext } from 'react';
import { LanguageContext } from '../language/language-context';
import aboutUsPageLocales from './Locales/aboutUsPageLocales.json';
import { Container, Typography } from '@mui/material';



const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'start',
    minHeight: '100vh',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(3),
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(4),
    },

    overflow: 'hidden',
  },

  list: {
    width: '100%',
    padding: theme.spacing(1),
    margin: 'auto',
    marginLeft: '1rem',/////////////////////////////////
    color: theme.palette.text.primary,
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
      gap: theme.spacing(2),
    },
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    width: '100%',
  },
  title: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem',
    },
  },
  subtitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.25rem',
    },
  },
  subsubtitle: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },
  text: {
    fontSize: '1.5rem',
    lineHeight: 1.6,
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem',
    },
  },
}));

export const AboutUsPage = () => {
  const classes = useStyles();
  const { language } = useContext(LanguageContext);


  const getText = (key) => aboutUsPageLocales[key][language] || aboutUsPageLocales[key]['en-US'];

  return (
      <Container className={classes.container}>
      <div className={classes.list}>
        <div className={classes.section}>
          <h1 className={classes.title}>{getText('welcomeTitle')}</h1>
          <p className={classes.text}>{getText('welcomeText')}</p>
        </div>

        <div className={classes.section}>
          <h2 className={classes.subtitle}>{getText('whyHereTitle')}</h2>
          <p className={classes.text}>{getText('whyHereText')}</p>
        </div>

        <div className={classes.section}>
          <h2 className={classes.subtitle}>{getText('whatWeDoTitle')}</h2>
          <ul className={classes.text}>
            <li>{getText('whatWeDoSupport')}</li>
            <li>{getText('whatWeDoBarriers')}</li>
            <li>{getText('whatWeDoTalent')}</li>
          </ul>
        </div>

        <div className={classes.section}>
          <h2 className={classes.subtitle}>{getText('whyFairViewTitle')}</h2>
          <p className={classes.text}>{getText('whyFairViewText')}</p>
          <ul className={classes.text}>
            <li>{getText('whyFairViewAdaptability')}</li>
            <li>{getText('whyFairViewSupport')}</li>
            <li>{getText('whyFairViewInclusivity')}</li>
          </ul>
        </div>

        <div className={classes.section}>
          <h2 className={classes.subtitle}>{getText('whoWeWorkForTitle')}</h2>

          <h3 className={classes.subsubtitle}>{getText('candidatesTitle')}</h3>
          <p className={classes.text}>{getText('candidatesText')}</p>
          <ul className={classes.text}>
            <li>{getText('candidatesHeroes')}</li>
            <li>{getText('candidatesSpecialNeeds')}</li>
            <li>{getText('candidatesPressure')}</li>
          </ul>

          <h3 className={classes.subsubtitle}>{getText('employersTitle')}</h3>
          <p className={classes.text}>{getText('employersText')}</p>
          <ul className={classes.text}>
            <li>{getText('employersDiversity')}</li>
            <li>{getText('employersEfficiency')}</li>
            <li>{getText('employersResponsibility')}</li>
            <li>{getText('employersInnovation')}</li>
          </ul>

          <h3 className={classes.subsubtitle}>{getText('societyTitle')}</h3>
          <p className={classes.text}>{getText('societyText')}</p>
        </div>

        <div className={classes.section}>
          <p className={classes.text} style={{ textAlign: 'center' }}>{getText('closingText')}</p>
          <p className={classes.text} style={{ textAlign: 'center' }}>{getText('joinUsText')}</p>
        </div>
      </div>
      </Container>
  );
};
