/*
 * @description: 
 * @author: 周金顺（云天河）
 */

import { PORT } from '@config/index';
import Button from '@renderer/components/Button';
import Input from '@renderer/components/Input';
import message from '@renderer/components/message';
import request, { getServerHost } from '@renderer/lib/request';
import UserInfoModel from '@renderer/models/userInfo.model';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styles from './index.less';


function addScript(src: string) {
    const s = document.createElement('script');
    s.setAttribute('src', src);
    document.body.appendChild(s);
}

const Welcome: FC = () => {
    const [ip, setIp] = useState();
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();
    const dispatch = UserInfoModel.useModel()[1];

    const doLogin = useCallback(() => {
        return new Promise((resolve) => {
            dispatch({
                type: 'userInfo@initLoginState',
                callback: (res: any) => {
                    if (res.needLogin) {
                        navigate('/login');
                    } else {
                        console.log('toHome');
                        navigate('/home');
                    }
                    resolve(true);
                }
            });
        });
    }, [dispatch]);

    const connect = useCallback(() => {
        const ip = localStorage.getItem('host');
        if (!ip) {
            return Promise.resolve(false);
        }
        return request<any>({
            url: `http://${ip}:${PORT}/guard/ping`,
            method: 'get',
        }).then(([ok, data]) => {
            if (ok && data.connect === 'pong') {
                return true;
            } else {
                return false;
            }
        }).catch(() => {
            return false;
        });
    }, []);

    
    const handleConnect = useCallback((isInit: boolean) => {
        const destory = message.toast('正在连接服务器', 0);
        connect().then((connected) => {
            if (!connected) {
                // First try connect error, then show form
                setShowForm(true);
                if (!isInit) {
                    message.error('连接失败, 请输入正确的地址');
                }
                
                return Promise.resolve(true);
            } else {
                setShowForm(false);
                addScript(`${getServerHost('9080')}/web-apps/apps/api/documents/api.js`);
                return doLogin();
            }
        }).then(() => {
            destory();
        });
    }, [connect, doLogin]);

    useEffect(() => {
        localStorage.setItem('host', '192.168.1.240');
        // localStorage.setItem('host', '59.110.154.171');
        handleConnect(true);
    }, [handleConnect]);

    return (
        <div className={styles.welcome}>
            {
                showForm ? (
                    <div className={styles.mask}>
                    <div className={styles.form}>
                        <h2>服务连接失败, 请稍后再试</h2>
                        {/* <div>
                            <Input placeholder="e.g. 127.0.0.1" theme="matina" value={ip} onChange={(e: any) => setIp(e?.target?.value)} />
                        </div>
                        <div style={{ width: '20rem', marginTop: '10rem' }}>
                            <Button
                                onClick={() => {
                                    if (!ip) {
                                        message.error('请输入正确的IP地址');
                                        return;
                                    }
                                    localStorage.setItem('host', ip ?? '');
                                    handleConnect(false);
                                }}
                            >
                                连接服务
                            </Button>
                        </div> */}
                        
                    </div>
                </div>
                ) : null
            }
        </div>
    );
}

export default Welcome;
