import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
    list: {
        paddingLeft: "20px",
        wordBreak: "break-word",
        overflowWrap: "break-word",
    },
}));

const MarkerDetails = ({ marker }) => {
    const classes = useStyles();

    if (!marker) return <p>Оберіть маркер на карті</p>;

    return (
        <div>
            <h3>{marker.title}</h3>
            <p>
                <strong>Адреса:</strong> {marker.address}
            </p>
            <p>
                <strong>Email:</strong> {marker.email}
            </p>

            {marker.accessibility_criteria?.length > 0 ? (
                <div>
                    <strong>Критерії доступності:</strong>
                    <ul className={classes.list}>
                        {marker.accessibility_criteria.map(
                            (criteria, index) => (
                                <li key={index}>{criteria}</li>
                            )
                        )}
                    </ul>
                </div>
            ) : (
                <p>Критерії доступності не вказані</p>
            )}
        </div>
    );
};

export default MarkerDetails;
