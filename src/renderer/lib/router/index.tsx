import React, { FC, Suspense, useMemo, lazy } from 'react';
import { IndexRouteProps, LayoutRouteProps, Outlet, PathRouteProps, Route, Routes } from 'react-router';

export type RouteConfig = (PathRouteProps | LayoutRouteProps | IndexRouteProps) & { path?: string };

interface ChildrenOfRoutes {
    home?: boolean;
    asyncComponent?: ReturnType<typeof lazy>;
    childs?: Array<RouteConfig&ChildrenOfRoutes>;
}

export type RoutesConfig = Array<RouteConfig & ChildrenOfRoutes>;

export interface AppRouterProps {
    routes?: RoutesConfig;
}

export function genRoutes(routes: RoutesConfig, parentRoute?: RouteConfig): JSX.Element {
    const { path: parentPath = '/' } = (parentRoute as any) ?? {};
    return (
        <>
            {
                routes.map((routeConfig, index) => {
                    const { path, childs, element, home, asyncComponent: AsyncComp, ...restConfig } = routeConfig;
                    const currentPath = `${parentPath}/${path}`;
                    let comp: React.ReactNode = element;
                    if (AsyncComp) {
                        comp = (
                            <Suspense fallback={<div>Loading...</div>}>
                                <AsyncComp />
                            </Suspense>
                        )
                    }
                    return (
                        <Route
                            {...restConfig as any}
                            element={comp}
                            index={home}
                            key={`${currentPath}${index}`}
                            path={currentPath}
                        >
                            {childs && childs.length ? genRoutes(childs as RoutesConfig, routeConfig) : null}
                        </Route>
                    )
                })
            }
        </>
    );
}

export const AppRouter: FC<AppRouterProps> = (props) => {
    const { routes } = props;

    const routesElement = useMemo(() => genRoutes(routes ?? []), [routes]);

    return (
        <Routes>
            <Route path="/" element={<><Outlet /></>}>
                {routesElement}
                <Route path="*" element={<div>404</div>} />
            </Route>
            <Route path="*" element={<div>404</div>} />
        </Routes>
    );
}