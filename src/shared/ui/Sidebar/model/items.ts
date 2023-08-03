import { RoutePath } from 'app/providers/router';
import React from 'react';
import AboutIcon from 'shared/assets/icons/about-20-20.svg';
import MainIcon from 'shared/assets/icons/main-20-20.svg';
import ProfileIcon from 'shared/assets/icons/profile-20-20.svg';
import ArticleIcon from 'shared/assets/icons/article-20-20.svg';

export interface SidebarItemType {
    path: string;
    textKey: string;
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
    authOnly?: boolean
}

export const SidebarItemsList: SidebarItemType[] = [
    {
        path: RoutePath.main,
        textKey: 'MainLink',
        Icon: MainIcon,
    },
    {
        path: RoutePath.about,
        textKey: 'AboutLink',
        Icon: AboutIcon,
    },
    {
        path: RoutePath.profile,
        textKey: 'ProfileLink',
        Icon: ProfileIcon,
        authOnly: true,
    },
    {
        path: RoutePath.articles,
        textKey: 'ArticleLink',
        Icon: ArticleIcon,
        authOnly: true,
    },
];
