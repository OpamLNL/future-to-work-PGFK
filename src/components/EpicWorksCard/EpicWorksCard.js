import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import {CardContent, CircularProgress, Container, Typography} from '@mui/material';
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import { makeStyles } from '@material-ui/core/styles';

import { parseImages } from "../../services/ParseImages";
import { speakText } from "../../services/SpeakText";

import { TagBadge } from "../TagBadge/TagBadge";
import { RoundButton } from "../Buttons";
import { FavoriteBadge } from "../FavoriteBadge/FavoriteBadge";

import {apiBaseURL, epicWorksURL, urls} from '../../configs/urls';
import {parseTags} from "../../services/ParseTags";


const IMG_API = apiBaseURL + epicWorksURL;

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


const fetchEpicWorkById = async (epicWorkId) => {
    try {
        const response = await fetch(`${apiBaseURL}${urls.epicWorks.getById.replace(':id', epicWorkId)}`);
        if (!response.ok) {
            throw new Error(`Error fetching work data: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching epic work data:', error);
        throw error;
    }
};




export const EpicWorksCard = ({ epicWorkId }) => {

    const classes = useStyles();

    const navigate = useNavigate();
    const [workData, setWorkData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSpeaking, setIsSpeaking] = useState(false);

    useEffect(() => {
        if (epicWorkId) {
            fetchEpicWorkById(epicWorkId)
                .then((data) => {
                    setWorkData(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching epic work data:', error);
                    setLoading(false);
                });
        }
    }, [epicWorkId]);


    if (loading) {
        return (
            <Container>
                <CircularProgress color="secondary" />
            </Container>
        );
    }

    const images = parseImages(workData.images);

    const tags = parseTags(workData?.tags);
    const handleItemClick = () => {
        navigate(`/epicWork/${workData.id}`);
    };

    return (
        <div className={classes.card}>
            <img src={IMG_API + images[0]} alt={workData.name} className={classes.image} />
            <div className={classes.details} >
                <CardContent onClick={() => handleItemClick(workData.id)} >
                    <Typography variant="h5">{workData.title}</Typography>

                    <Typography variant="body2">{workData.summary}</Typography>
                </CardContent>
                <RoundButton onClick={() => speakText(workData.title, 'uk-UA')} disabled={isSpeaking}>
                    <VolumeUpIcon />
                </RoundButton>
                <FavoriteBadge objectId={workData.id} type='epicWork'/>
                <div className={classes.tagsAndButton}>
                    {tags && tags.map((tag, index) => (
                        <TagBadge key={index}>{tag}</TagBadge>
                    ))}

                </div>
            </div>
        </div>
    );
};
