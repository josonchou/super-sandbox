
import React from 'react';
import ReactDOM from 'react-dom';
import routes from './routes';
import './global.less';
import { AppRouter } from './lib/router';
import { HashRouter } from 'react-router-dom';
import { StoreProvider } from './store';

ReactDOM.render(
    <React.StrictMode>
        <HashRouter>
            <StoreProvider>
                <AppRouter routes={routes} />
            </StoreProvider>
        </HashRouter>
    </React.StrictMode>,
    document.getElementById("root")
);