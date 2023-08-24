import { getArticleRoute, getArticlesRoute } from '../../consts/backend';
import { Article } from '../../../src/entities/Article';
import { testArticle } from '../data/article';

export const createArticle = (article?: Article) =>
    cy
        .request({
            method: 'POST',
            url: getArticlesRoute(),
            headers: { Authorization: 'token' },
            body: article ?? testArticle,
        })
        .then((resp) => resp.body);

export const removeArticle = (articleId: string) =>
    cy.request({
        method: 'DELETE',
        url: getArticleRoute(articleId),
        headers: { Authorization: 'token' },
    });

declare global {
    namespace Cypress {
        interface Chainable {
            createArticle(article?: Article): Chainable<Article>;
            removeArticle(articleId: string): Chainable<void>;
        }
    }
}
