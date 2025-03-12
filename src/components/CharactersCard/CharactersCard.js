import { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";

import {CardContent, CircularProgress, Container, Typography} from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import VolumeUpIcon from "@material-ui/icons/VolumeUp";

import { FavoriteBadge } from "../FavoriteBadge/FavoriteBadge";
import { RoundButton} from "../Buttons";
import { TagBadge } from "../TagBadge/TagBadge";
import { parseImages } from "../../services/ParseImages";
import { speakText } from "../../services/SpeakText";

import { apiBaseURL, charactersURL, urls} from '../../configs/urls';
import { parseTags } from "../../services/ParseTags";

import {fetchCharacterById} from "../../store/reducers/characters/charactersActions";

const IMG_API = apiBaseURL + charactersURL;

const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: theme.palette.primary.containerBackground,
        display: 'grid',
        gridTemplateColumns: '50px 60px',
        // gap: theme.spacing(1),
        padding: theme.spacing(1),
        borderRadius: theme.shape.borderRadius,
        // boxShadow: theme.shadows[5],
        textAlign: 'center',
        justifyItems: 'center',
        width: '300px',
        margin: theme.spacing(2),
        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: '1fr 1fr',
            width: '50%',
        },
    },
    image: {
        width: '260px',
        gridColumn: '1 / 4',
        gridRow: '1 / 3',
        [theme.breakpoints.down('md')]: {
            width: '80px',
            gridRow: '1 / 2',
            gridColumn: '1 / 2',
        },
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gridColumn: '1 / 4',
        [theme.breakpoints.down('md')]: {
            gridRow: '1 / 3',
            gridColumn: '2 / 3',
        },
    },
    tagsAndButton: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            gridColumn: '1 / 3',
        },
    }
}))




export const CharactersCard = ({ character }) => {
    const navigate = useNavigate();
    const classes = useStyles();
    //const [characterData, setCharacterData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSpeaking, setIsSpeaking] = useState(false);

    const characterData = character;

    /*useEffect(() => {
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


    if (loading) {
        return (
            <Container>
                <CircularProgress color="secondary" />
            </Container>
        );
    }*/

    const handleItemClick = () => {
        navigate(`/character/${characterData.id}`);
    };

   const images = parseImages(characterData.images);

    const tags = parseTags(characterData?.tags);

    return (
        <div className={classes.card}>
            <img src={images.length > 0 ? IMG_API + images[0] : undefined} alt={characterData.name} className={classes.image} />
            <div className={classes.details} >
                <CardContent onClick={() => handleItemClick(characterData.id)} >
                    <Typography variant="h5">{characterData.name}</Typography>
                    <RoundButton onClick={() => speakText(characterData.name, 'uk-UA')} disabled={isSpeaking}>
                        <VolumeUpIcon />
                    </RoundButton>
                    <FavoriteBadge objectId={characterData.id} type='character'/>

                    <Typography variant="body2">{characterData.description}</Typography>
                </CardContent>
                <div className={classes.tagsAndButton}>
                    {tags && tags.map((tag, index) => (
                        <TagBadge key={index}>{tag}</TagBadge>
                    ))}

                </div>
            </div>
        </div>
    );
};
