export const selectNews = (state) => state.news.news;
export const selectNewsLoading = (state) => state.news.loading;
export const selectNewsError = (state) => state.news.error;

export const selectNewsById = (state, newsId) =>
    state.news.news.find(news => news.id === newsId);

export const selectNewsByCategory = (state, category) =>
    state.news.news.filter(news => news.category === category);

export const searchNews = (state, searchTerm) =>
    state.news.news.filter(news =>
        news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        news.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

export const selectUserLikeStatus = (state, newsId, userId) =>
    state.news.likes.some(like => like.newsId === newsId && like.userId === userId);
