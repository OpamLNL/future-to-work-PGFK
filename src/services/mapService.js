import { axiosInstance } from "../api/axiosConfig";

export const fetchCompaniesLocation = async () => {
    const url = "https://abbd-188-163-68-67.ngrok-free.app/api/companies/";

    try {
        const response = await axiosInstance.get(url, {
            headers: {
                Accept: "application/json",
                "ngrok-skip-browser-warning": "true",
            },
        });

        console.log("Server response:", response.data);

        if (response.data?.data) {
            return response.data.data;
        } else {
            throw new Error("Невірна структура відповіді від бекенду");
        }
    } catch (error) {
        console.error("Помилка при отриманні даних:", error.message);
        throw error;
    }
};
