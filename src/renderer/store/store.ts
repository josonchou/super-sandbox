/*
 * @description: 
 * @author: 周金顺（云天河）
 */

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { watchEffect } from './effects';
import { DispatchAction, GlobalState } from './interface';

const defaultGlobalState: GlobalState = {
    INITED: true,
    loading: {},
};

export function globalReducers(state: GlobalState = defaultGlobalState, action: DispatchAction) {
    const { loading } = state;
    const { type, payload } = action;
    switch (type) {
        case 'global@apply': 
            return {
                ...state,
                ...payload,
            };
        case 'global@INIT':
            return {
                ...state,
                INITED: true,
                loading: {},
            };
        case 'global@LOADING':
            return {
                ...state,
                loading: {
                    ...loading,
                    [payload]: true,
                },
            };
        case 'global@LOADING_END':
            return {
                ...state,
                loading: {
                    ...loading,
                    [payload]: false,
                },
            };
        default:
            return state;
    }
}

export const saga = createSagaMiddleware();

export const store = createStore(
    combineReducers({
        global: globalReducers,
    }),
    composeWithDevTools(
        applyMiddleware(saga),
    ),
);

saga.run(
    watchEffect,
);
