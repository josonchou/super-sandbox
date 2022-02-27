/*
 * @description: 
 * @author: 周金顺（云天河）
 */

import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

const StoreProvider: FC = ({ children }) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
};

export default StoreProvider;
