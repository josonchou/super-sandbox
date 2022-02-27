import Button from '@renderer/components/Button';
import Input from '@renderer/components/Input';
import { showGlobalBg } from '@renderer/components/Layout';
import { generatePageName } from '@renderer/constanst';
import UserInfoModel from '@renderer/models/userInfo.model';
import { useLoading } from '@renderer/store';
import React, { useCallback, useEffect } from 'react';
import DocumentTitle from 'react-document-title';
import { useNavigate } from 'react-router';
import styles from './index.less';

const Login = () => {
    const navigate = useNavigate();
    const loading = useLoading();
    useEffect(() => {
        showGlobalBg();
    }, []);
    const submitLogin = useCallback(() => {
        UserInfoModel.dispatch({
            type: 'userInfo@login',
            payload: {
                username: 'root',
                password: '123',
                navigate,
            }
        });
    }, [navigate]);
    
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
                            <Input iconType="user" autoComplete="off" placeholder="请输入账号" />
                            <Input
                                iconType="lock"
                                autoComplete="new-password"
                                type="password"
                                style={{ marginTop: '2.92rem' } as any}
                                placeholder="请输入密码"
                            />

                            <Button className={styles.submit} onClick={submitLogin}>
                                {loading['userInfo@login'] ? '登录中...' : '登录'}
                            </Button>

                            <div className={styles['error-info']}>
                                账号或密码错误，请重新输入
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DocumentTitle>
    );
};

export default Login;
