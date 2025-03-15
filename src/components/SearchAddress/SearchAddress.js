import React, { useState } from "react";

const SearchAddress = ({ onSearch, error }) => {
    const [address, setAddress] = useState("");

    const handleSearch = () => {
        onSearch(address);
    };

    return (
        <div
            style={{
                padding: "10px",
                backgroundColor: "#fff",
                position: "absolute",
                top: 10,
                left: 10,
                zIndex: 1000,
            }}
        >
            <input
                type="text"
                placeholder="Введіть адресу..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{
                    padding: "5px",
                    width: "200px",
                    marginRight: "5px",
                }}
            />
            <button onClick={handleSearch}>🔍 Пошук</button>
            {error && (
                <p style={{ color: "red", margin: "5px 0 0" }}>{error}</p>
            )}
        </div>
    );
};

export default SearchAddress;
