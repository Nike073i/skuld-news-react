import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import AboutIcon from '@/shared/assets/icons/about-20-20.svg';
import MainIcon from '@/shared/assets/icons/main-20-20.svg';
import ProfileIcon from '@/shared/assets/icons/profile-20-20.svg';
import ArticleIcon from '@/shared/assets/icons/article-20-20.svg';
import { SidebarItemType } from '../types/sidebarItem';
import {
    getRouteAbout,
    getRouteArticles,
    getRouteMain,
    getRouteProfile,
} from '@/shared/consts/router';

export const getSidebarItems = createSelector(
    getUserAuthData,
    (userAuthData) => {
        const sidebarItemsList: SidebarItemType[] = [
            {
                path: getRouteMain(),
                textKey: 'MainLink',
                Icon: MainIcon,
            },
            {
                path: getRouteAbout(),
                textKey: 'AboutLink',
                Icon: AboutIcon,
            },
        ];

        if (userAuthData) {
            sidebarItemsList.push(
                {
                    path: getRouteProfile(userAuthData.id),
                    textKey: 'ProfileLink',
                    Icon: ProfileIcon,
                    authOnly: true,
                },
                {
                    path: getRouteArticles(),
                    textKey: 'ArticleLink',
                    Icon: ArticleIcon,
                    authOnly: true,
                },
            );
        }

        return sidebarItemsList;
    },
);
