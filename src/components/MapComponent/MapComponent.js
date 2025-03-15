import { InfoWindow, Map, Marker } from "@vis.gl/react-google-maps";
import React, { useEffect, useRef, useState } from "react";
import { getCoordinates } from "../../services/geocodeService";
import { fetchCompaniesLocation } from "../../services/mapService";

const MapComponent = ({ markers, apiKey }) => {
    const [companiesMarkers, setCompaniesMarkers] = useState([]);
    const isFetched = useRef(false);

    useEffect(() => {
        if (isFetched.current) return;
        isFetched.current = true;

        const fetchCompanies = async () => {
            try {
                const companies = await fetchCompaniesLocation();
                if (Array.isArray(companies)) {
                    const markersData = await Promise.all(
                        companies.map(async (company) => {
                            const location = await getCoordinates(
                                company.address,
                                apiKey
                            );
                            return {
                                position: location,
                                title: company.name,
                                address: company.address,
                            };
                        })
                    );
                    setCompaniesMarkers(markersData);
                }
            } catch (error) {
                console.error("Помилка при отриманні компаній:", error);
            }
        };

        fetchCompanies();
    }, []);

    return (
        <Map
            style={{ width: "1000px", height: "800px" }}
            defaultCenter={{ lat: 22.54992, lng: 0 }}
            defaultZoom={3}
            gestureHandling="greedy"
            disableDefaultUI={true}
            language="uk"
        >
            {[...companiesMarkers, ...markers].map((marker, index) => (
                <Marker key={index} position={marker.position}>
                    <InfoWindow position={marker.position}>
                        <div>
                            <h3>{marker.title}</h3>
                            <p>{marker.address}</p>
                        </div>
                    </InfoWindow>
                </Marker>
            ))}
        </Map>
    );
};

export default MapComponent;
