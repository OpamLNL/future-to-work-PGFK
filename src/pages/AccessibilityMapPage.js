import { APIProvider } from "@vis.gl/react-google-maps";
import React, { useState } from "react";
import MapComponent from "../components/MapComponent/MapComponent";
import SearchAddress from "../components/SearchAddress/SearchAddress";
import { getCoordinates } from "../services/geocodeService";

export const AccessibilityMapPage = () => {
    const [markers, setMarkers] = useState([]);
    const [error, setError] = useState(null);

    const apiKey = "AIzaSyA9CUYQU5m1Gip5ZepcFS0dSTspiQZ6lgg";

    const handleSearch = async (address) => {
        try {
            const location = await getCoordinates(address, apiKey);
            if (location) {
                setMarkers((prevMarkers) => [
                    ...prevMarkers,
                    {
                        position: location,
                        title: address,
                    },
                ]);
                setError(null);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <APIProvider apiKey={apiKey}>
                <SearchAddress onSearch={handleSearch} error={error} />
                <MapComponent markers={markers} apiKey={apiKey} />
            </APIProvider>
        </div>
    );
};

export default AccessibilityMapPage;
