import { lazy } from 'react';
import { RoutesConfig } from '@lib/router';

const routes: RoutesConfig = [
    // {
    //     path: '/',
    //     asyncComponent: lazy(() => import('@renderer/components/Layout/Blank')),
    //     childs: [
    //         {
    //             path: '/',
    //             asyncComponent: lazy(() => import('@renderer/pages/Demo')),
    //         },
    //     ]
    // },
    {
        path: '/',
        asyncComponent: lazy(() => import('@renderer/components/Layout')),
        childs: [
            {
                home: true,
                path: '/',
                asyncComponent: lazy(() => import('@renderer/pages/Welcome')),
            },
            {
                path: '/home',
                asyncComponent: lazy(() => import('@renderer/pages/Home')),
            },
            {
                path: '/training',
                asyncComponent: lazy(() => import('@renderer/pages/Training')),
            },
            {
                path: '/settings',
                asyncComponent: lazy(() => import('@renderer/pages/Settings')),
            },
            {
                path: '/training/:secCate',
                asyncComponent: lazy(() => import('@renderer/pages/Training/SubCategory')),
            },
            {
                path: '/training/study/:secCate/:thirdCate',
                asyncComponent: lazy(() => import('@renderer/pages/Training/Study')),
            },
            {
                path: '/login',
                asyncComponent: lazy(() => import('@renderer/pages/Login')),
            }
        ]
    },
];

export default routes;
