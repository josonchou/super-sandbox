
import React from 'react';
import ReactDOM from 'react-dom';
import routes from './routes';
import './global.less';
import { AppRouter } from './lib/router';
import { HashRouter } from 'react-router-dom';

const App = () => (
    <div className="bg">
        <div className="bg-grid" />
        <div className="container">
            <AppRouter routes={routes} />
        </div>
    </div>
);

ReactDOM.render(
    <React.StrictMode>
        <HashRouter>
            <App />
        </HashRouter>
    </React.StrictMode>,
    document.getElementById("root")
);