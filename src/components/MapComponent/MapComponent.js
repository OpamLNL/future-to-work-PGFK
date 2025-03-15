import { InfoWindow, Map, Marker } from "@vis.gl/react-google-maps";
import React, { useState } from "react";

const MapComponent = ({ data, apiKey, language = "uk" }) => {
    const [markers, setMarkers] = useState([]);

    // useEffect(() => {
    //     const fetchCoordinates = async () => {
    //         const markersData = await Promise.all(
    //             data.map(async (item) => {
    //                 const coordinates = await fetchCompaniesLocation(
    //                     item.address,
    //                     apiKey
    //                 );
    //                 return {
    //                     ...item,
    //                     coordinates,
    //                 };
    //             })
    //         );
    //         setMarkers(markersData);
    //     };

    //     fetchCoordinates();
    // }, [data, apiKey]);

    return (
        <Map
            style={{ width: "1000px", height: "800px" }}
            defaultCenter={{ lat: 22.54992, lng: 0 }}
            defaultZoom={3}
            gestureHandling="greedy"
            disableDefaultUI={true}
            language={language}
        >
            {markers.map((marker, index) => (
                <Marker key={index} position={marker.coordinates}>
                    <InfoWindow position={marker.coordinates}>
                        <div>
                            <h3>{marker.name}</h3>
                            <p>{marker.address}</p>
                        </div>
                    </InfoWindow>
                </Marker>
            ))}
        </Map>
    );
};

export default MapComponent;
