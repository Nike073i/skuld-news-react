import { EditableProfileCard } from '@/features/editableProfileCard';
import { ComponentRenderOptions, TestProvider } from '@/shared/lib/tests/componentRender/componentRender';

const USER_ID = '1';

describe('EditableProfileCard.cy.tsx', () => {
    it('playground', () => {
        cy.intercept('GET', '**/profiles/*', { fixture: 'profile.json' });
        const options: ComponentRenderOptions = {
            initialState: {
                user: {
                    authData: {
                        id: USER_ID,
                    },
                },
            },
        };
        cy.mount(
            <TestProvider options={options}>
                <EditableProfileCard profileId={USER_ID} />
            </TestProvider>,
        );
    });
});
