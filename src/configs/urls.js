//змінити на іншому хостінгу
// const apiBaseURL = 'http://localhost:5000';
const apiBaseURL = 'https://epic-saga-server.vercel.app';
const epicWorksURL = '/images/epicWorks-repository/';
const charactersURL = '/images/characters-repository/';
const avatarsURL = '/images/avatars/';
const newsImagesURL = '/images/newsImages/';

const urls = {
    users: {
        getAll: '/api/users/getAll',
        getById: '/api/users/getUserById',
        getByUsername: '/api/users/getUserByUsername',
        getByEmail: '/api/users/getUserByEmail',
        create: '/api/users/create',
        update: '/api/users/update',
        delete: '/api/users/delete/:id',
    },

    news: {
        getAll: '/api/news/getAll',
        getById: '/api/news/getNewsById/:id',
        create: '/api/news/create',
        update: '/api/news/update/:id',
        delete: '/api/news/delete/:id',
    },
    newsLikes: {
        getLikesByNewsId: '/api/newsLikes/getLikesByNewsId/:newsId',
        addLike: '/api/newsLikes/addLike',
        removeLike: '/api/newsLikes/removeLike/:id',
    },
    tags: {
        getAll: '/api/tags/getAll',
        getById: '/api/tags/getById/:id',
        create: '/api/tags/create',
        update: '/api/tags/update/:id',
        delete: '/api/tags/delete/:id',
    },
    comments: {
        create: '/admin/comments/create',
        update: '/admin/comments/update/:id',
        delete: '/admin/comments/delete/:id',
    },
    epicWorks: {
        getAll: '/api/epicWorks/getAll',
        getById: '/api/epicWorks/getEpicWorkById/:id',
        create: '/api/epicWorks/create',
        update: '/api/epicWorks/update/:id',
        delete: '/api/epicWorks/delete/:id',
    },
    epicWorkTypes: {
        getAll: '/api/epicWorkTypes/getAll',
        getById: '/api/epicWorkTypes/getEpicWorkById/:id',
        create: '/api/epicWorkTypes/create',
        update: '/api/epicWorkTypes/update/:id',
        delete: '/api/epicWorkTypes/delete/:id',
    },
    epicWorkTypeRelations: {
        getAll: '/api/epicWorkTypeRelations/getAll',
        getById: '/api/epicWorkTypeRelations/getEpicWorkRelationsById/:id',
        create: '/api/epicWorkTypeRelations/create',
        update: '/api/epicWorkTypeRelations/update/:id',
        delete: '/api/epicWorkTypeRelations/delete/:id',
    },
    characters: {
        getAll: '/api/characters/getAll',
        getById: '/api/characters/getCharacterById/:id',
        create: '/api/characters/create',
        update: '/api/characters/update/:id',
        delete: '/api/characters/delete/:id',
    }
};

export {
    apiBaseURL,
    epicWorksURL,
    charactersURL,
    avatarsURL,
    newsImagesURL,
    urls
};
