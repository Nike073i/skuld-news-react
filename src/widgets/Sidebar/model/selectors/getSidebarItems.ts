import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import AboutIconDeprecated from '@/shared/assets/icons/about-20-20.svg';
import MainIconDeprecated from '@/shared/assets/icons/main-20-20.svg';
import ProfileIconDeprecated from '@/shared/assets/icons/profile-20-20.svg';
import ArticleIconDeprecated from '@/shared/assets/icons/article-20-20.svg';

import AboutIcon from '@/shared/assets/icons/Info.svg';
import MainIcon from '@/shared/assets/icons/home.svg';
import ProfileIcon from '@/shared/assets/icons/avatar.svg';
import ArticleIcon from '@/shared/assets/icons/article.svg';

import { SidebarItemType } from '../types/sidebarItem';
import {
    getRouteAbout,
    getRouteArticles,
    getRouteMain,
    getRouteProfile,
} from '@/shared/consts/router';
import { toggleFeatures } from '@/shared/lib/features';

export const getSidebarItems = createSelector(
    getUserAuthData,
    (userAuthData) => {
        const sidebarItemsList: SidebarItemType[] = [
            {
                path: getRouteMain(),
                textKey: 'MainLink',
                Icon: toggleFeatures({
                    name: 'isAppRedesigned',
                    off: () => MainIconDeprecated,
                    on: () => MainIcon,
                }),
            },
            {
                path: getRouteAbout(),
                textKey: 'AboutLink',
                Icon: toggleFeatures({
                    name: 'isAppRedesigned',
                    off: () => AboutIconDeprecated,
                    on: () => AboutIcon,
                }),
            },
        ];

        if (userAuthData) {
            sidebarItemsList.push(
                {
                    path: getRouteProfile(userAuthData.id),
                    textKey: 'ProfileLink',
                    Icon: toggleFeatures({
                        name: 'isAppRedesigned',
                        off: () => ProfileIconDeprecated,
                        on: () => ProfileIcon,
                    }),
                    authOnly: true,
                },
                {
                    path: getRouteArticles(),
                    textKey: 'ArticleLink',
                    Icon: toggleFeatures({
                        name: 'isAppRedesigned',
                        off: () => ArticleIconDeprecated,
                        on: () => ArticleIcon,
                    }),
                    authOnly: true,
                },
            );
        }

        return sidebarItemsList;
    },
);
