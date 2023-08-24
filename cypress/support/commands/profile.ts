import { getProfileRoute } from '../../consts/backend';
import { defaultProfileData } from '../data/profile';

export const updateProfile = (firstname: string, lastname: string) => {
    cy.getByTestId('EditableProfileCardHeader.EditButton').click();
    cy.getByTestId('ProfileCard.FirstName').clear().type(firstname);
    cy.getByTestId('ProfileCard.LastName').clear().type(lastname);
    cy.getByTestId('EditableProfileCardHeader.SaveButton').click();
};

export const resetProfile = (profileId: string) =>
    cy.request({
        method: 'PUT',
        url: getProfileRoute(profileId),
        headers: {
            Authorization: 'token',
        },
        body: defaultProfileData,
    });

declare global {
    namespace Cypress {
        interface Chainable {
            updateProfile(firstname: string, lastname: string): Chainable<void>;
            resetProfile(profileId: string): Chainable<void>;
        }
    }
}
