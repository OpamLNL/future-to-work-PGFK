import { combineReducers } from 'redux';

// Import additional reducers
import { tagsReducer } from './tags/tagsReducer';
import { usersReducer } from "./users/usersReducer";
import { charactersReducer } from "./characters/charactersReducer";
import { epicWorkTypesReducer } from "./epicWorkTypes/epicWorkTypesReducer";
import { newsReducer } from "./news/newsReducer";
import { likeByNewsReducer } from "./likeByNews/likeByNewsReducer";
import { commentsReducer } from "./comments/commentsReducer";
import { epicWorkTypeRelationsReducer } from "./epicWorkTypeRelations/epicWorkTypeRelationsReducer";
import {epicWorksReducer} from "./epicWorks/epicWorksReducer";

const rootReducer = combineReducers({
    characters: charactersReducer,
    epicWorkTypes: epicWorkTypesReducer,
    epicWorks: epicWorksReducer,
    epicWorkTypeRelations: epicWorkTypeRelationsReducer,
    news: newsReducer,
    likeByNews: likeByNewsReducer,
    tags: tagsReducer,
    users: usersReducer,
    comments: commentsReducer
});

export { rootReducer };
