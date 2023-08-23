import * as commonCommands from './commands/common';
import * as profileCommands from './commands/profile';
import * as articleCommands from './commands/article';
import * as ratingCommands from './commands/rating';
import * as commentCommands from './commands/comments';

Cypress.Commands.addAll(commonCommands);
Cypress.Commands.addAll(profileCommands);
Cypress.Commands.addAll(articleCommands);
Cypress.Commands.addAll(ratingCommands);
Cypress.Commands.addAll(commentCommands);
