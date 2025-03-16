import { axiosInstance } from "../api/axiosConfig";
import { apiBaseURL } from "../configs/urls";

export const fetchCompaniesLocation = async () => {
    const url = `${apiBaseURL}api/companies/`;

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

export const fetchFilters = async () => {
    try {
        const response = await axiosInstance.get(`${apiBaseURL}api/filters`, {
            headers: {
                Accept: "application/json",
                "ngrok-skip-browser-warning": "true",
            },
        });

        if (response.data?.filters) {
            return response.data.filters;
        } else {
            throw new Error("Невірна структура відповіді від бекенду");
        }
    } catch (error) {
        throw new Error("Помилка при завантаженні фільтрів");
    }
};

export const fetchCompaniesByFilters = async (filters) => {
    try {
        const filterParams = filters
            .map(
                (filter) =>
                    `accessibility_criteria[]=${encodeURIComponent(filter)}`
            )
            .join("&");

        console.log(`${apiBaseURL}?${filterParams}`);

        const response = await axiosInstance.get(
            `${apiBaseURL}api/companies?${filterParams}`,
            {
                headers: {
                    Accept: "application/json",
                    "ngrok-skip-browser-warning": "true",
                },
            }
        );

        if (response.data?.data) {
            return response.data.data;
        } else {
            throw new Error("Невірна структура відповіді від бекенду");
        }
    } catch (error) {
        console.error("Помилка при отриманні компаній за фільтрами", error);
        throw error;
    }
};
