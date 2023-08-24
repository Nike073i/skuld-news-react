import { newProfileData } from 'cypress/support/data/profile';
import { testUserData } from 'cypress/support/data/user';

let profileId: string;

describe('Страница профиля пользователя', () => {
    beforeEach(() => {
        cy.login().then((data) => {
            profileId = data.id;
            cy.visit(`profiles/${data.id}`);
        });
    });
    afterEach(() => {
        cy.resetProfile(profileId);
    });
    it('Профиль успешно загружается', () => {
        cy.getByTestId('ProfilePage').should('exist');
        cy.getByTestId('ProfileCard.FirstName').should(
            'have.value',
            testUserData.firstname,
        );
        cy.getByTestId('ProfileCard.LastName').should(
            'have.value',
            testUserData.lastname,
        );
    });
    it('Редактируем пользователя', () => {
        cy.updateProfile(newProfileData.firstname, newProfileData.lastname);
        cy.getByTestId('ProfileCard.FirstName').should(
            'have.value',
            newProfileData.firstname,
        );
        cy.getByTestId('ProfileCard.LastName').should(
            'have.value',
            newProfileData.lastname,
        );
    });
});
