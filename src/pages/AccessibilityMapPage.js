import { APIProvider } from "@vis.gl/react-google-maps";
import React, { useState } from "react";
import MapComponent from "../components/MapComponent/MapComponent";
import SearchAddress from "../components/SearchAddress/SearchAddress";
import { getCoordinates } from "../services/geocodeService";

export const AccessibilityMapPage = () => {
    const [markers, setMarkers] = useState([]);
    const [error, setError] = useState(null);

    const handleSearch = async (address) => {
        const apiKey = "AIzaSyA9CUYQU5m1Gip5ZepcFS0dSTspiQZ6lgg";
        try {
            const location = await getCoordinates(address, apiKey);
            if (location) {
                setMarkers([
                    ...markers,
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
        <APIProvider apiKey="AIzaSyA9CUYQU5m1Gip5ZepcFS0dSTspiQZ6lgg">
            <SearchAddress onSearch={handleSearch} error={error} />
            <MapComponent markers={markers} />
        </APIProvider>
    );
};

export default AccessibilityMapPage;
