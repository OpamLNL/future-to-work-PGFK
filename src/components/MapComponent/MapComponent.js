import { makeStyles } from "@material-ui/core";
import { Map } from "@vis.gl/react-google-maps";
import React, { useEffect, useState } from "react";
import { getCoordinates } from "../../services/geocodeService";
import { fetchCompaniesLocation } from "../../services/mapService";
import MarkerDetails from "../MarkerDetails/MarkerDetails";
import { MarkerWithInfoWindow } from "../MarkerWithInfoWindow/MarkerWithInfoWindow";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: "row",
        gap: "20px",
        justifyContent: "center",
        alignItems: "flex-start",
    },
    detailsContainer: {
        width: "300px",
        padding: "20px",
        background: theme.palette.primary.light,
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        color: theme.palette.primary.contrastText,
        fontSize: 18,
        fontFamily: "Arial",
        wordBreak: "break-word",
        overflowWrap: "break-word",
        whiteSpace: "normal",
    },

    "@media (max-width: 1300px)": {
        container: {
            flexDirection: "column",
            alignItems: "center",
        },
        detailsContainer: {
            width: "100%",
            textAlign: "center",
        },
    },
}));

const startPosition = {
    lat: 48.6208,
    lng: 22.287883,
};

const MapComponent = ({ markers, apiKey }) => {
    const [companiesMarkers, setCompaniesMarkers] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [map, setMap] = useState(null);
    const classes = useStyles();

    useEffect(() => {
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
    }, [apiKey]);

    return (
        <div className={classes.container}>
            <Map
                style={{ width: "1000px", height: "800px" }}
                defaultCenter={startPosition}
                defaultZoom={13}
                gestureHandling="greedy"
                disableDefaultUI={true}
                language="uk"
                onLoad={(mapInstance) => setMap(mapInstance)}
            >
                {[...companiesMarkers, ...markers].map((marker, index) => (
                    <MarkerWithInfoWindow
                        key={index}
                        markerData={marker}
                        map={map}
                        isSelected={selectedMarker === marker}
                        onMarkerClick={() => setSelectedMarker(marker)}
                    />
                ))}
            </Map>

            <div className={classes.detailsContainer}>
                <MarkerDetails marker={selectedMarker} />
            </div>
        </div>
    );
};

export default MapComponent;
