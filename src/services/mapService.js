export const fetchCompaniesLocation = async () => {
    const url = "https://api.jsonbin.io/b/60e2b2d1a917050";
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Помилка при отриманні даних з бекенду");
        }

        const result = await response.json();

        if (result?.data) {
            return result.data;
        } else {
            throw new Error("Невірна структура відповіді від бекенду");
        }
    } catch (error) {
        console.error(error.message);
        throw error;
    }
};
