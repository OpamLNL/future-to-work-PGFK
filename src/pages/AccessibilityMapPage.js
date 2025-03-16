import { APIProvider } from "@vis.gl/react-google-maps";
import React, { useState } from "react";
import FiltersPanel from "../components/FilterPanel/FilterPanel";
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

    const handleFiltersApplied = (companies) => {
        const newMarkers = companies.map((company) => ({
            position: company.location,
            title: company.name,
        }));

        console.log(newMarkers);
        setMarkers(newMarkers);
    };

    return (
        <div
            style={{
                display: "inline-flex",
                flexDirection: "column",
                gap: "20px",
            }}
        >
            <APIProvider apiKey={apiKey} language="uk">
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                    }}
                >
                    <SearchAddress onSearch={handleSearch} error={error} />
                    <FiltersPanel onFiltersApplied={handleFiltersApplied} />
                </div>
                <MapComponent markers={markers} apiKey={apiKey} />
            </APIProvider>
        </div>
    );
};

export default AccessibilityMapPage;
