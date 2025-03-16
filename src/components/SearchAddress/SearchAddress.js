import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: "25px 20px",
        maxWidth: "1000px",
        minWidth: "auto",
        minHeight: "auto",
        borderRadius: "10px",
        alignItems: "center",
        justifyContent: "center",
        display: "inline-flex",

        backgroundColor: theme.palette.primary.containerBackground,
    },
    input: {
        border: "1px solid gray",
        borderRadius: "5px",
        backgroundColor: theme.palette.primary.light,
        padding: "10px",
        marginRight: "5px",
        fontSize: "24px",
        color: theme.palette.primary.contrastText,
        "&::placeholder": {
            color: theme.palette.primary.contrastText,
        },
    },
    button: {
        border: "none",
        borderRadius: "5px",
        fontSize: "24px",
        padding: "7px 10px 7px 10px",
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.light,
        transition: "background-color 0.3s, box-shadow 0.3s, transform 0.3s",
        "&:hover": {
            backgroundColor: theme.palette.primary.dark,
            boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.3)",
            transform: "translateY(-2px)",
        },
        "&[disabled]": {
            backgroundColor: "#CCCCCC",
            color: "#666666",
            cursor: "not-allowed",
            boxShadow: "none",
        },
        "&.active": {
            backgroundColor: "#FF4081",
            boxShadow: "0px 4px 10px rgba(255, 64, 129, 0.5)",
        },
    },
}));

const SearchAddress = ({ onSearch, error }) => {
    const [address, setAddress] = useState("");
    const classes = useStyles();

    const handleSearch = () => {
        onSearch(address);
    };

    return (
        <span className={classes.container}>
            <input
                type="text"
                placeholder="Введіть адресу..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={classes.input}
            />
            <button onClick={handleSearch} className={classes.button}>
                🔍 Пошук
            </button>
            {error && (
                <p style={{ color: "red", margin: "5px 0 0" }}>{error}</p>
            )}
        </span>
    );
};

export default SearchAddress;
