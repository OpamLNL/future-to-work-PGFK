import { InfoWindow, Map, Marker } from "@vis.gl/react-google-maps";
import React from "react";

const MapComponent = ({ markers }) => {
    return (
        <Map
            style={{ width: "1000px", height: "800px" }}
            defaultCenter={{ lat: 22.54992, lng: 0 }}
            defaultZoom={3}
            gestureHandling="greedy"
            disableDefaultUI={true}
        >
            {markers.map((marker, index) => (
                <Marker key={index} position={marker.position}>
                    <InfoWindow position={marker.position}>
                        <div>
                            <h3>{marker.title}</h3>
                        </div>
                    </InfoWindow>
                </Marker>
            ))}
        </Map>
    );
};

export default MapComponent;
