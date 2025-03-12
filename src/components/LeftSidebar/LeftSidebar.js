import {makeStyles} from "@material-ui/core/styles";
import {ListCharacters} from "../ListCharacters/ListCharacters";

const useStyles = makeStyles((theme) => ({
    sidebar: {
        padding: "2px 2px 2px 2px",
        width: "98%",

    },
}));

export const LeftSidebar = () => {

    const classes = useStyles();
    return (
        <div title="Персонажі" className={classes.sidebar}>
            <ListCharacters />

        </div>
    );
};

