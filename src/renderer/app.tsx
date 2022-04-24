
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { ipcRenderer } from 'electron';
import routes from './routes';
import './global.less';
import { AppRouter } from './lib/router';
import { HashRouter } from 'react-router-dom';
import { StoreProvider } from './store';
import classNames from 'classnames';

const Window: FC = ({ children }) => {
    const $titlebar = useRef<HTMLDivElement>();
    const $toggleMaximize = useRef<any>();
    const [windowState, setWindowState] = useState({
        isMaximize: false,
        isFullscreen: false,
    });

    const maximize = useCallback(() => {
        const resp = ipcRenderer.sendSync('window-control', 'maximize');
        if (resp === 'successed') {
            setWindowState((prev) => {
                return {
                    ...prev,
                    isMaximize: true,
                }
            });
        }
    }, []);

    const unmaximize = useCallback(() => {
        const resp = ipcRenderer.sendSync('window-control', 'unmaximize');
        if (resp === 'successed') {
            setWindowState((prev) => {
                return {
                    ...prev,
                    isMaximize: false,
                }
            });
        }
    }, []);

    const minimize = useCallback(() => {
        ipcRenderer.send('window-control', 'minimize');
    }, []);

    const close = useCallback(() => {
        ipcRenderer.send('window-control', 'close');
    }, []);

    const fullscreen = useCallback(() => {
        const resp = ipcRenderer.sendSync('window-control', 'fullscreen');
        if (resp === 'successed') {
            setWindowState((prev) => {
                return {
                    ...prev,
                    isFullscreen: true,
                };
            });
        }
    }, []);

    const restore = useCallback(() => {
        const resp = ipcRenderer.sendSync('window-control', 'restore');
        if (resp === 'successed') {
            setWindowState((prev) => {
                return {
                    ...prev,
                    isFullscreen: false,
                    isMaximize: false,
                };
            });
        }
    }, []);

    const toggleMaximize = useCallback(() => {
        if (windowState.isFullscreen) {
            return;
        }
        if (windowState.isMaximize) {
            unmaximize();
        } else {
            maximize();
        }
    }, [maximize, unmaximize, windowState.isMaximize, windowState.isFullscreen]);

    const toggleFullscreen = useCallback(() => {
        if (windowState.isFullscreen) {
            restore();
        } else {
            fullscreen();
        }
    }, [fullscreen, restore, windowState.isFullscreen]);

    $toggleMaximize.current = useMemo(() => toggleMaximize, [toggleMaximize]);

    useEffect(() => {
        const handleDbClick = () => {
            if (typeof $toggleMaximize.current === 'function') {
                $toggleMaximize.current();
            }
        };
        const target = $titlebar.current;

        target?.addEventListener('dblclick', handleDbClick);

        return () => {
            target?.removeEventListener('dblclick', handleDbClick);
        };
    }, []);
    
    return (
        <div className="window">
            <div className={classNames('titlebar', { win: process.platform === 'win32' })} ref={$titlebar as any}>
                {
                    process.platform !== 'darwin' ? (
                        <div className="tooltip-box">
                            <a href="#" onClick={() => window.location.reload()}>刷新</a>
                            <div
                                className={classNames('light_btn fa-icon blue', {
                                    fullscreen: !windowState.isFullscreen,
                                    unfullscreen: windowState.isFullscreen,
                                })}
                                onClick={toggleFullscreen}
                            />
                            <div className="light_btn fa-icon minimize" onClick={minimize} />
                            <div
                                className={classNames('light_btn fa-icon', {
                                    maximize: !windowState.isMaximize,
                                    unmaximize: windowState.isMaximize,
                                })}
                                onClick={toggleMaximize}
                            />
                            <div className="light_btn fa-icon close" onClick={close} />
                        </div>
                    ) : null
                }
            </div>
            {children}
        </div>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <HashRouter>
            <StoreProvider>
                <Window>
                    <AppRouter routes={routes} />
                </Window>
            </StoreProvider>
        </HashRouter>
    </React.StrictMode>,
    document.getElementById("root")
);