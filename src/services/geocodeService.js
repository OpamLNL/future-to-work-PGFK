import { mapSearchURL } from "../configs/urls";

export const getCoordinates = async (address, apiKey) => {
    if (!address.trim()) return null;

    const url = `${mapSearchURL}${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "OK") {
            return data.results[0].geometry.location;
        } else {
            throw new Error("Адресу не знайдено");
        }
    } catch (err) {
        throw new Error("Помилка при отриманні координат");
    }
};
