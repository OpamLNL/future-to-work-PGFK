import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, CircularProgress, Container, Card, CardContent } from '@mui/material';
import VolumeUpIcon from "@material-ui/icons/VolumeUp";

import { apiBaseURL, urls, charactersURL } from '../configs/urls';
import { SectionContainer } from "../components/Containers";
import {EditButton, FavoriteBadge, RoundButton, TagBadge} from "../components";


import { parseImages } from "../services/ParseImages";
import {speakText} from "../services/SpeakText";
import {parseTags} from "../services/ParseTags";

const IMG_API = apiBaseURL + charactersURL;

const useStyles = makeStyles((theme) => ({
    characterContainer: {
        maxWidth: '800px',
        padding: theme.spacing(4),
        margin: 'auto',
        borderRadius: theme.shape.borderRadius,
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: 'auto',
        gap: theme.spacing(2),
        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: '1fr',
        },
    },
    headerContainer: {
        gridColumn: '1 / 3',
        gridRow: '1 / 1',
        textAlign: 'center',
        [theme.breakpoints.down('md')]: {
            gridColumn: '1 / 2',
            gridRow: '1 / 1',
        },
    },
    image1Container: {
        width: 300,
        overflow: "visible",
        gridColumn: '1 / 1',
        gridRow: '4 / 4',
        backgroundColor: theme.palette.primary.containerBackground,
        backgroundSize: 'auto',
        [theme.breakpoints.down('md')]: {
            gridColumn: '1 / 2',
            gridRow: '3 / 3',
        },
    },

    detailsContainer: {
        gridColumn: '2 / 3',
        gridRow: '4 / 4',
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2),
        [theme.breakpoints.down('md')]: {
            gridColumn: '1 / 2',
            gridRow: '2 / 2',
        },
    },
    tagsContainer: {
        gridColumn: '1 / 3',
        gridRow: '3 /4',
        display: 'flex',
        flexWrap: 'wrap',
        gap: theme.spacing(1),
        [theme.breakpoints.down('md')]: {
            gridColumn: '1 / 2',
        },
    },
        media: {
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
    card: {
        boxShadow: 'none',
        background: 'transparent',
    },
    typography: {
        fontWeight: theme.typography.fontWeightBold,
    },
}));

const fetchCharacterById = async (characterId) => {
    try {
        const response = await fetch(`${apiBaseURL}${urls.characters.getById.replace(':id', characterId)}`);
        if (!response.ok) {
            throw new Error(`Error fetching character data: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching character data:', error);
        throw error;
    }
};

export const ForEmployersPage = ({ characterId }) => {
    const classes = useStyles();
    const [characterData, setCharacterData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSpeaking, setIsSpeaking] = useState(false);

    useEffect(() => {
        fetchCharacterById(characterId)
            .then(data => {
                setCharacterData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching character data:', error);
                setLoading(false);
            });
    }, [characterId]);

    if (loading) {
        return (
            <Container>
                <CircularProgress color="secondary" />
            </Container>
        );
    }


    const images = parseImages(characterData.images);
    const tags = parseTags(characterData?.tags);
    const user = JSON.parse(localStorage.getItem('user'));


    return (
        <div className={classes.characterContainer}>
            <div className={classes.headerContainer}>
                <Typography variant="h4">{characterData?.name}</Typography>
                <div>
                    <RoundButton onClick={() => speakText(characterData?.name, 'uk-UA')} disabled={isSpeaking}>
                        <VolumeUpIcon />
                    </RoundButton>
                    <FavoriteBadge objectId={characterData.id} type='character'/>
                    
                    {
                        (user?.role === 'admin' ||  user?.role === 'editor') &&
                        <EditButton />
                    }

                </div>
            </div>
            <SectionContainer className={classes.tagsContainer}>
                {tags.map((tag, index) => (
                    <TagBadge key={index}>{tag}</TagBadge>
                ))}
            </SectionContainer>
            <Card className={classes.image1Container}>
                <img src={IMG_API + images[0]} alt={characterData?.name} className={classes.media} />
                <img src={IMG_API + images[1]} alt={characterData?.name} className={classes.media} />
            </Card>

            <CardContent className={classes.detailsContainer}>
                <Typography variant="subtitle1" className={classes.typography}>Original Name: {characterData?.name_original}</Typography>
                <div>
                    <RoundButton onClick={() => speakText(characterData?.name_original, 'nb-NO')} disabled={isSpeaking}>
                        <VolumeUpIcon />
                    </RoundButton>
                </div>
                <Typography variant="subtitle1" className={classes.typography}>English Name: {characterData?.name_english}</Typography>
                <div>
                    <RoundButton onClick={() => speakText(characterData?.name_english, 'en-US')} disabled={isSpeaking}>
                        <VolumeUpIcon />
                    </RoundButton>
                </div>
                <Typography>{characterData?.description}</Typography>
            </CardContent>

        </div>
    );
};

