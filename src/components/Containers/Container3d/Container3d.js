import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        // maxWidth: '600px',
        margin: 'auto',
        padding: '20px',
        // background: theme.palette.primary.light,
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '10px',
    },
    buttonsContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        marginTop: '20px',
    }
}));

export const Container3d = ({ children }) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            {children}
        </div>
    );
};