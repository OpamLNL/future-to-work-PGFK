import { makeStyles } from '@material-ui/core/styles';
import React, { useContext } from 'react';
import { LanguageContext } from '../language/language-context';
import howItWorksPageLocales from './Locales/howItWorksPageLocales.json';

import howItWorksEN from '../assets/howItWorksEN.png';
import howItWorksUA from '../assets/howItWorksUA.png';
import questionnaire1EN from '../assets/questionnaire1EN.png';
import questionnaire1UA from '../assets/questionnaire1UA.png';
import questionnaire2EN from '../assets/questionnaire2EN.png';
import questionnaire2UA from '../assets/questionnaire2UA.png';
import recommendationsEN from '../assets/recommendationsEN.png';
import recommendationsUA from '../assets/recommendationsUA.png';

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
    alignItems: 'start',
    maxWidth: '1200px',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
      gap: theme.spacing(2),
    },
  },
  section: {
    width: '100%',
  },
  title: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem',
    },
  },
  stepTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.25rem',
    },
  },
  text: {
    fontSize: '1.5rem',
    lineHeight: 1.6,
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem',
    },
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    margin: `${theme.spacing(2)}px auto`,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
      gap: theme.spacing(1),
    },
  },
  image: {
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
    },
  },
}));

export const HowItWorksPage = () => {
  const classes = useStyles();
  const { language } = useContext(LanguageContext);

  const getText = (key) => howItWorksPageLocales[key][language] || howItWorksPageLocales[key]['en-US'];


  const howItWorks = () => {
    switch (language) {
      case 'uk-UA':
        return howItWorksUA;
      case 'en-US':
      default:
        return howItWorksEN;
    }
  };


  const questionnaire1 = () => {
    switch (language) {
      case 'uk-UA':
        return questionnaire1UA;
      case 'en-US':
      default:
        return questionnaire1EN;
    }
  };

  const questionnaire2 = () => {
    switch (language) {
      case 'uk-UA':
        return questionnaire2UA;
      case 'en-US':
      default:
        return questionnaire2EN;
    }
  };

  const recommendations = () => {
    switch (language) {
      case 'uk-UA':
        return recommendationsUA;
      case 'en-US':
      default:
        return recommendationsEN;
    }
  };


  return (
    <div className={classes.pageContainer}>
      <div className={classes.section}>
        <h1 className={classes.title}>{getText('title')}</h1>
        <p className={classes.text}>{getText('intro')}</p>
        <div className={classes.imageContainer}>
          <img
            src={howItWorks()}
            alt={language === 'uk-UA' ? 'Як це працює?' : 'How it works?'}
            className={classes.image}
          />
        </div>
      </div>

      <div className={classes.section}>
        <h2 className={classes.stepTitle}>{getText('step1Title')}</h2>
        <p className={classes.text}>{getText('step1Text')}</p>
        <p className={classes.text}>{getText('step1Candidates')}</p>
        <p className={classes.text}>{getText('step1Employers')}</p>
      </div>

      <div className={classes.section}>
        <h2 className={classes.stepTitle}>{getText('step2Title')}</h2>
        <p className={classes.text}>{getText('step2Text')}</p>
        <div className={classes.imageContainer}>
          <img style={{ maxWidth: '500px' }}
            src={questionnaire1()}
            alt={language === 'uk-UA' ? 'Заповнення анкети' : 'Filling out the questionnaire'}
            className={classes.image}
          />
          <img style={{ maxWidth: '500px' }}
            src={questionnaire2()}
            alt={language === 'uk-UA' ? 'Заповнення анкети' : 'Filling out the questionnaire'}
            className={classes.image}
          />
        </div>
      </div>

      <div className={classes.section}>
        <h2 className={classes.stepTitle}>{getText('step3Title')}</h2>
        <p className={classes.text}>{getText('step3Text')}</p>
      </div>

      <div className={classes.section}>
        <h2 className={classes.stepTitle}>{getText('step4Title')}</h2>
        <p className={classes.text}>{getText('step4Text')}</p>
        <div className={classes.imageContainer}>
          <img
            src={recommendations()}
            alt={language === 'uk-UA' ? 'Приклад рекомендацій' : 'Example of recommendations'}
            className={classes.image}
          />
        </div>
      </div>

      <div className={classes.section}>
        <h2 className={classes.stepTitle}>{getText('step5Title')}</h2>
        <p className={classes.text}>{getText('step5Text')}</p>
      </div>

      <div className={classes.section}>
        <p className={classes.text} style={{ textAlign: 'center' }}>{getText('closing')}</p>
      </div>
    </div>
  );
};
