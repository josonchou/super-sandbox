import Input from '@renderer/components/Input';
import { APP_NAME, generatePageName } from '@renderer/constanst';
import React from 'react';
import DocumentTitle from 'react-document-title';
import styles from './index.less';

const Login = () => {
    return (
        <DocumentTitle title={generatePageName('登录')}>
            <div className={styles['login-wrapper']}>
                <div className={styles['login-box']}>
                    <div className={styles.bg} />
                    <div className={styles['bg-card']} />
                    <div className={styles.content}>
                        <h3 className={styles.title}>
                            登录系统
                        </h3>
                        <div className={styles.form}>
                            {/* <div style={{ height: 0, width: 0 }}>
                                <input type="text" name="hiddenI" />
                                <input type="password" name="hiddenII" />
                            </div> */}
                            <Input autoComplete="off" placeholder="请输入账号" />
                            <Input autoComplete="new-password" type="password" style={{ marginTop: '5.6rem' } as any} placeholder="请输入密码" />
                        </div>
                    </div>
                </div>
            </div>
        </DocumentTitle>
    );
};

export default Login;
