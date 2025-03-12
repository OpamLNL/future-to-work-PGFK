// src/store/reducers/characters/characterSelectors.js

export const selectCharacters = (state) => state.characters.characters;
export const selectCharactersLoading = (state) => state.characters.loading;
export const selectCharactersError = (state) => state.characters.error;
