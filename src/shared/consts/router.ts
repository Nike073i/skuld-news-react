export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    PROFILE = 'profile',
    ARTICLES = 'articles',
    ARTICLE = 'article',
    ARTICLE_CREATE = 'article_create',
    ARTICLE_EDIT = 'article_edit',
    ADMIN_PANEL = 'admin_panel',
    FORBIDDEN_PAGE = 'forbidden_page',
    SETTINGS_PAGE = 'settings_page',
    NOT_FOUND = 'not_found',
}

export const getRouteMain = () => '/';
export const getRouteAbout = () => '/about';
export const getRouteProfile = (profileId: string) => `/profiles/${profileId}`;
export const getRouteArticles = () => '/articles';
export const getRouteArticle = (articleId: string) => `/articles/${articleId}`;
export const getRouteArticleCreate = () => '/articles/new';
export const getRouteArticleEdit = (articleId: string) =>
    `/articles/${articleId}/edit`;
export const getRouteAdmin = () => '/admin';
export const getRouteForbidden = () => '/forbidden';
export const getRouteSettings = () => '/settings';
