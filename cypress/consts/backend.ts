export const BaseUrl = 'http://localhost:8000';

const enum Endpoints {
    ARTICLES = 'ARTICLES',
    PROFILES = 'PROFILES',
    LOGIN = 'LOGIN',
}

const ApiRoutes: Record<Endpoints, string> = {
    [Endpoints.ARTICLES]: '/articles',
    [Endpoints.PROFILES]: '/profiles',
    [Endpoints.LOGIN]: '/login',
};

export const getArticlesRoute = () => `${BaseUrl}${ApiRoutes.ARTICLES}`;
export const getArticleRoute = (articleId: string) => `${BaseUrl}${ApiRoutes.ARTICLES}/${articleId}`;
export const getProfilesRoute = () => `${BaseUrl}${ApiRoutes.PROFILES}`;
export const getProfileRoute = (profileId: string) => `${BaseUrl}${ApiRoutes.PROFILES}/${profileId}`;
export const getLoginRoute = () => `${BaseUrl}${ApiRoutes.LOGIN}`;
