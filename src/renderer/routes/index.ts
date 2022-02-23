import { lazy } from 'react';
import { RoutesConfig } from '@lib/router';

const routes: RoutesConfig = [
    {
        path: '/',
        asyncComponent: lazy(() => import('@renderer/components/Layout')),
        children: [
            {
                index: true,
                path: '/login',
                asyncComponent: lazy(() => import('@renderer/pages/Login')),
            }
        ]
    },
];

export default routes;
