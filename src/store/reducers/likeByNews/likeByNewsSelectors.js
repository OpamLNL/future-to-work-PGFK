
export const selectLikes = (state) => state.likes.likes;
export const selectLikesLoading = (state) => state.likes.loading;
export const selectLikesError = (state) => state.likes.error;
export const selectIsNewsLikedByUser = (state, newsId, userId) =>
    state.likes.likes.some(like => like.newsId === newsId && like.userId === userId);
export const selectLikesCountForNews = (state, newsId) =>
    state.likes.likes.filter(like => like.newsId === newsId).length;

