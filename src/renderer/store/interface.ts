/*
 * @description: 
 * @author: 周金顺（云天河）
 */

import { call, select, delay, put, take, PutEffect } from '@redux-saga/core/effects';
import { Action } from 'redux';
import { Saga } from 'redux-saga';

export interface State {
    [key: string]: any;
}

export interface GlobalState extends State {
    loading?: {
        [key: string]: boolean;
    };
    INITED?: boolean;
}

export interface ReducerAction {
    [key: string]: any;
    payload?: any;
}

export interface DispatchAction extends ReducerAction {
    type: string;
}

export interface SagaContext {
    put: <A extends Action>(action: A) => PutEffect<A>;
    call: typeof call;
    select: typeof select;
    take: typeof take;
    delay: typeof delay;
}

export type Reducer<T extends State> = (state: T, action: ReducerAction, ctx?: any) => T;

export type EffectFunction = Saga<[action: ReducerAction, ctx: SagaContext]>

export interface Model<M> {
    name: string;
    initialState?: M;
    reducers?: {
        [key: string]: Reducer<M>;
    };
    effects?: {
        [key: string]: EffectFunction;
    };
    // TODO
    // watcher
}
