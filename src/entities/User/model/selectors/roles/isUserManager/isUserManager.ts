import { createSelector } from '@reduxjs/toolkit';
import { UserRole } from '../../../types/user';
import { getUserRoles } from '../getUserRoles/getUserRoles';

export const isUserManager = createSelector(
    getUserRoles,
    (roles?: UserRole[]) => Boolean(roles?.includes(UserRole.MANAGER)),
);
