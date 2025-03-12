// src/store/reducers/epicWorks/epicWorksSelectors.js
export const selectEpicWorks = (state) => state.epicWorks.epicWorks;
export const selectEpicWorksLoading = (state) => state.epicWorks.loading;
export const selectEpicWorksError = (state) => state.epicWorks.error;
