export const getCoordinates = async (address, apiKey) => {
    if (!address.trim()) return null;

    console.log("Address:", address);

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
    )}&key=${apiKey}`;

    try {
        const response = await fetch(url);

        console.log("Server response:", await response);
        const data = await response.json();
        console.log("Data:", data);

        if (data.status === "OK") {
            console.log("Gooooooood");
            return data.results[0].geometry.location;
        } else {
            throw new Error("Адресу не знайдено");
        }
    } catch (err) {
        console.error("Error:", err.message);
        throw new Error("Помилка при отриманні координат");
    }
};
