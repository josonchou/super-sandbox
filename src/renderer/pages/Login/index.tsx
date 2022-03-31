import Button from '@renderer/components/Button';
import Input from '@renderer/components/Input';
import { showBgIII, showGlobalBg, showLoginBg } from '@renderer/components/Layout';
import { generatePageName } from '@renderer/constanst';
import UserInfoModel from '@renderer/models/userInfo.model';
import { useLoading } from '@renderer/store';
import React, { useCallback, useEffect, useState } from 'react';
import DocumentTitle from 'react-document-title';
import { useNavigate } from 'react-router';
import styles from './index.less';

const Login = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [loginError, setLoginError] = useState(false);
    
    const navigate = useNavigate();
    const loading = useLoading();
    useEffect(() => {
        showLoginBg();
    }, []);
    const submitLogin = useCallback(() => {
        UserInfoModel.dispatch({
            type: 'userInfo@login',
            payload: {
                username,
                password,
                navigate,
            },
            callback: (isError: boolean) => {
                setLoginError(isError);
            },
        });
    }, [navigate, username, password]);
    
    return (
        <DocumentTitle title={generatePageName('登录')}>
            <div className={styles['login-wrapper']}>
                <div className={styles['login-box']}>
                    <div className={styles.bg} />
                    <div className={styles['bg-card']} />
                    <div className={styles['box-bg']} />
                    <div className={styles.content}>
                        <h3 className={styles.title}>
                            登录系统
                        </h3>
                        <div className={styles.form}>
                            <Input onChange={(e) => {
                                const target = (e?.target ?? {}) as any;
                                setUsername(target.value ?? '');
                            }} iconType="user" autoComplete="off" placeholder="请输入账号" />
                            <Input
                                iconType="lock"
                                autoComplete="new-password"
                                type="password"
                                style={{ marginTop: '2.92rem' } as any}
                                placeholder="请输入密码"
                                onChange={(e) => {
                                    const target = (e?.target ?? {}) as any;
                                    setPassword(target.value ?? '');
                                }}
                            />

                            <Button className={styles.submit} onClick={submitLogin}>
                                {loading['userInfo@login'] ? '登录中...' : '登录'}
                            </Button>
                            {
                                loginError ? (
                                    <div className={styles['error-info']}>
                                        账号或密码错误，请重新输入
                                    </div>
                                ) : null
                            }
                        </div>
                    </div>
                </div>
                <div className={styles.map} />
            </div>
        </DocumentTitle>
    );
};

export default Login;
