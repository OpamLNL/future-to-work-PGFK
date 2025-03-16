import {
    InfoWindow,
    Marker,
    useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import React from "react";

export const MarkerWithInfoWindow = ({
    markerData,
    isSelected,
    onMarkerClick,
}) => {
    const [markerRef, marker] = useAdvancedMarkerRef();

    return (
        <>
            <Marker
                ref={markerRef}
                position={markerData.position}
                onClick={onMarkerClick}
            />

            {isSelected && (
                <InfoWindow
                    style={{ color: "black" }}
                    anchor={marker}
                    onClose={() => onMarkerClick(null)}
                >
                    <h2>{markerData.title}</h2>
                    <p>{markerData.address}</p>
                </InfoWindow>
            )}
        </>
    );
};
