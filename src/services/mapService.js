import { axiosInstance } from "../api/axiosConfig";
import { apiBaseURL } from "../configs/urls";

export const fetchCompaniesLocation = async () => {
    const url = `${apiBaseURL}/api/companies/`;

    try {
        const response = await axiosInstance.get(url, {
            headers: {
                Accept: "application/json",
                "ngrok-skip-browser-warning": "true",
            },
        });

        if (response.data?.data) {
            return response.data.data;
        } else {
            throw new Error("Невірна структура відповіді від бекенду");
        }
    } catch (error) {
        throw error;
    }
};
