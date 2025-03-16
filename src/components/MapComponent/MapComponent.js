import { Map } from "@vis.gl/react-google-maps";
import React, { useEffect, useRef, useState } from "react";
import { getCoordinates } from "../../services/geocodeService";
import { fetchCompaniesLocation } from "../../services/mapService";
import { MarkerWithInfoWindow } from "../MarkerWithInfoWindow/MarkerWithInfoWindow";

const MapComponent = ({ markers, apiKey }) => {
    const [companiesMarkers, setCompaniesMarkers] = useState([]);
    const isFetched = useRef(false);

    const mapRef = useRef(null);

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
                                email: company.email,
                                accessibility_criteria:
                                    company.accessibility_criteria,
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
            ref={mapRef}
        >
            {[...companiesMarkers, ...markers].map((marker, index) => (
                <MarkerWithInfoWindow key={index} markerData={marker} />
            ))}
        </Map>
    );
};

export default MapComponent;
