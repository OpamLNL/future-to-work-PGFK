import { makeStyles } from "@material-ui/core/styles";
import { Link, Typography, Grid } from '@mui/material';

import links from '../assets/links.json';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(3),
        width: '100%',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    link: {
        margin: theme.spacing(1),
    }
}));

export const LinksPage = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                {links.map((link, index) => (
                    <Grid item xs={12} sm={6} md={6} key={index}>
                        <div className={classes.paper}>
                            <Typography variant="h6">
                                <Link href={link.url} color="inherit" className={classes.link} target="_blank" rel="noopener noreferrer">
                                    {link.name}
                                </Link>
                            </Typography>
                        </div>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};
