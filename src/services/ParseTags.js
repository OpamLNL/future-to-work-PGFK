export const parseTags = (tags) => {
    if (typeof tags === 'string') {
        try {
            return JSON.parse(tags);
        } catch (e) {
            console.error('Error parsing tags', e);
            return [];
        }
    }
    return Array.isArray(tags) ? tags : [];
};


