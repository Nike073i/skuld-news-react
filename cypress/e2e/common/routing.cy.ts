import { selectByTestId } from '../../helpers/selectByTestId';

describe('Роутинг', () => {
    describe('Неавторизованный пользователь', () => {
        it('Переход на главную страницу', () => {
            cy.visit('/');
            cy.get(selectByTestId('MainPage')).should('exist');
        });
        it('Переход на страницу профиля', () => {
            cy.visit('/profiles/1');
            cy.get(selectByTestId('MainPage')).should('exist');
        });
        it('Переход на несуществующий маршрут ', () => {
            cy.visit('/fasfasfasf');
            cy.get(selectByTestId('NotFoundPage')).should('exist');
        });
    });
    describe('Авторизованный пользователь', () => {
        beforeEach(() => {
            cy.login();
        });
        it('Переход открывает страницу профиля', () => {
            cy.visit('/profiles/1');
            cy.get(selectByTestId('ProfilePage')).should('exist');
        });

        it('Переход открывает страницу со списком статей', () => {
            cy.visit('/articles');
            cy.get(selectByTestId('ArticlePage')).should('exist');
        });
    });
});
