export const parseImages = (images) => {
    if (typeof images === 'string') {
        try {
            return JSON.parse(images);
        } catch (e) {
            console.error('Error parsing images', e);
            return [];
        }
    }
    return images;
};