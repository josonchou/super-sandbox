import React, { FC, Suspense, useMemo, lazy } from 'react';
import { IndexRouteProps, LayoutRouteProps, PathRouteProps, Route, Routes } from 'react-router';

export type RouteConfig = PathRouteProps | LayoutRouteProps | IndexRouteProps;

interface ChildrenOfRoutes {
    asyncComponent?: ReturnType<typeof lazy>;
    childs?: Array<RouteConfig&ChildrenOfRoutes>;
}

export type RoutesConfig = Array<RouteConfig & ChildrenOfRoutes>;

export interface AppRouterProps {
    routes?: RoutesConfig;
}

export function genRoutes(routes: RoutesConfig): JSX.Element {
    return (
        <>
            {
                routes.map((routeConfig, index) => {
                    const { childs, element, asyncComponent: AsyncComp, ...restConfig } = routeConfig;
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
                            key={`${(restConfig as any)?.path}${index}`}
                        >
                            {childs && childs.length ? genRoutes(childs as RoutesConfig) : null}
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
            {routesElement}
            <Route path="*" element={<div>404</div>} />
        </Routes>
    );
}