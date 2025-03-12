import EditIcon from '@mui/icons-material/Edit';
import { makeStyles } from '@material-ui/core/styles';
import {Button} from "../Button/Button";

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
        border: "2px",
        width: "15px",
        height: "20px",
        padding: 0,
        backgroundColor: theme.palette.secondary.dark,
        color: 'white',
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
        },
    },
}));

export const EditButton = ({ onClick }) => {
    const classes = useStyles();

    return (
        <Button
            className={classes.button}
            onClick={onClick}
        >
            <EditIcon />
        </Button>
    );
};

