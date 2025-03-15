import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, CircularProgress, Container } from '@mui/material';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { apiBaseURL, epicWorksURL, urls } from '../configs/urls';
import { SectionContainer } from "../components/Containers";
import {FavoriteBadge, RoundButton, TagBadge} from "../components";
import {parseImages} from "../services/ParseImages";
import {speakText} from "../services/SpeakText";
import {parseTags} from "../services/ParseTags";

const IMG_API = apiBaseURL + epicWorksURL;

const useStyles = makeStyles((theme) => ({
    workContainer: {
        width: '800px',
        padding: theme.spacing(4),
        margin: 'auto',
        color: theme.palette.text.primary,
        borderRadius: theme.shape.borderRadius,
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        display: 'grid',
        justifyContent: 'center',
        justifyItems: 'center',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: 'auto',
        gap: theme.spacing(2),
        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: '1fr',
            padding: theme.spacing(3),
            width: '100%',
        },
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(2),
            width: '100%',
        },
    },
    headerContainer: {
        gridColumn: '1 / 3',
        textAlign: 'center',
        [theme.breakpoints.down('md')]: {
            gridColumn: '1 / 2',
            gridRow: "1 / 1",
        },
    },
    textContainer: {
        gridColumn: '2 / 3',
        gridRow: '2 / 3',
        padding: theme.spacing(2),
        color: theme.palette.text.primary,
        borderRadius: theme.shape.borderRadius,
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2),
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            gridColumn: '1 / 2',
            gridRow: "3 / 3",
        },
    },
    workImageBorder: {
        gridColumn: '1 / 1',
        gridRow: '2 / 4',
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        [theme.breakpoints.down('md')]: {
            gridColumn: '1 / 2',
            gridRow: '4 / 4',
            flexDirection: 'row',
            marginBottom: theme.spacing(8),
        },
    },
    workImage: {
        width: '100%',
        borderRadius: theme.shape.borderRadius,
        objectFit: 'cover',
        border: '4px solid white',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
            transform: 'scale(1.1)',
        },
        [theme.breakpoints.down('sm')]: {
            width: '50%',
        },
    },
    tagsContainer: {
        gridColumn: '2 / 3',
        gridRow: '3 / 4',
        padding: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        flexWrap: "wrap",
        gap: theme.spacing(1),
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            gridColumn: '1 / 1',
            gridRow: "2 / 2",
        },
    },
    linksContainer: {
        gridColumn: '1 / 3',
        gridRow: '4 / 5',
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2),
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            gridColumn: '1 / 2',
            gridRow: "5 / 5",
        },
    },
    workLabel: {
        fontWeight: theme.typography.fontWeightMedium,
        color: theme.palette.text.secondary,
    },
    workValue: {
        fontWeight: theme.typography.fontWeightBold,
        color: theme.palette.text.primary,
    },
    titleAndSpeaker: {
        display: "flex",
        flexDirection: "row",
    },
}));




export const StatisticPage = ({ epicWorkId }) => {
    const classes = useStyles();

    const [workData, setWorkData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSpeaking, setIsSpeaking] = useState(false);



    if (loading) {
        return (
            <Container>
                <CircularProgress color="secondary" />
            </Container>
        );
    }

    const images = parseImages(workData.images);
    const tags = parseTags(workData?.tags);

    return (
        <div className={classes.workContainer}>
            <div className={classes.headerContainer}>
                <Typography variant="h4" gutterBottom>{workData?.title}</Typography>
            </div>
            <SectionContainer className={classes.workImageBorder}>
                {workData?.images && workData.images.length > 0 && (
                    <>
                        <img src={IMG_API + images[0]} alt={workData?.title} className={classes.workImage} />
                        <img src={IMG_API + images[1]} alt={workData?.title} className={classes.workImage} />
                    </>
                )}
            </SectionContainer>

            <SectionContainer className={classes.textContainer}>
                <div className={classes.titleAndSpeaker}>
                    <div>
                        <Typography className={classes.workLabel}>Title (Original):</Typography>
                        <Typography>{workData?.title_original}</Typography>
                    </div>
                    <div>
                        <RoundButton onClick={() => speakText(workData?.title_original)} disabled={isSpeaking}>
                            <VolumeUpIcon />
                        </RoundButton>
                        <FavoriteBadge objectId={workData.id} type='epicWork'/>
                    </div>
                </div>

                <div className={classes.titleAndSpeaker}>
                    <div>
                        <Typography className={classes.workLabel}>Title (English):</Typography>
                        <Typography>{workData?.title_english}</Typography>
                    </div>
                    <div>
                        <RoundButton onClick={() => speakText(workData?.title_english)} disabled={isSpeaking}>
                            <VolumeUpIcon />
                        </RoundButton>
                    </div>
                </div>

                <div className={classes.titleAndSpeaker}>
                    <div>
                        <Typography>{workData?.summary}</Typography>
                    </div>
                    <div>
                        <RoundButton onClick={() => speakText(workData?.summary)} disabled={isSpeaking}>
                            <VolumeUpIcon />
                        </RoundButton>
                    </div>
                </div>
            </SectionContainer>

            <SectionContainer className={classes.tagsContainer}>
                {tags.map((tag, index) => (
                    <TagBadge key={index}>
                        {tag}
                    </TagBadge>
                ))}
            </SectionContainer>

            <SectionContainer className={classes.linksContainer}>
                <Typography className={classes.workLabel}>Full Text Link (English):</Typography>
                <Typography>
                    <a href={workData?.full_text_link_english} target="_blank" rel="noopener noreferrer">
                        {workData?.full_text_link_english}
                    </a>
                </Typography>
                <Typography className={classes.workLabel}>Full Text Link (Ukrainian):</Typography>
                <Typography>
                    <a href={workData?.full_text_link_ukrainian} target="_blank" rel="noopener noreferrer">
                        {workData?.full_text_link_ukrainian}
                    </a>
                </Typography>
                <Typography className={classes.workLabel}>Full Text Link (Original):</Typography>
                <Typography>
                    <a href={workData?.full_text_link_original} target="_blank" rel="noopener noreferrer">
                        {workData?.full_text_link_original}
                    </a>
                </Typography>
            </SectionContainer>
        </div>
    );
};

