import { lazy } from 'react';
import { RoutesConfig } from '@lib/router';

const routes: RoutesConfig = [
    {
        path: '/',
        asyncComponent: lazy(() => import('@renderer/components/Layout')),
        childs: [
            {
                home: true,
                path: '/',
                asyncComponent: lazy(() => import('@renderer/pages/Login')),
            }
        ]
    },
];

export default routes;
