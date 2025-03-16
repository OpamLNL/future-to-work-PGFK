import {
    InfoWindow,
    Marker,
    useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import React, { useCallback, useState } from "react";

export const MarkerWithInfoWindow = ({ markerData }) => {
    const [markerRef, marker] = useAdvancedMarkerRef();

    const [infoWindowShown, setInfoWindowShown] = useState(false);

    const handleMarkerClick = useCallback(
        () => setInfoWindowShown((isShown) => !isShown),
        []
    );

    const handleClose = useCallback(() => setInfoWindowShown(false), []);

    return (
        <>
            <Marker
                ref={markerRef}
                position={markerData.position}
                onClick={handleMarkerClick}
            />

            {infoWindowShown && (
                <InfoWindow
                    anchor={marker}
                    onClose={handleClose}
                    style={{ color: "black" }}
                >
                    <h2>{markerData.title}</h2>
                    <p>{markerData.address}</p>
                </InfoWindow>
            )}
        </>
    );
};
