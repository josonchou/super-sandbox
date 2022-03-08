import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import classNames from 'classnames';
import Header from '../Header';
import styles from './index.less';
import { dispatch, useGlobalState } from '@renderer/store';
import UserInfoModel from '@renderer/models/userInfo.model';

const Layout: FC = () => {
    const { hideGlobalBg, showBgIII } = useGlobalState();
    const [userInfo] = UserInfoModel.useModel();

    return (
        <div className="bg">
            {
                showBgIII ? (
                    <div className={styles['bg-wrapper']}>
                        <div className={styles.bg03} />
                    </div>
                ) : null
            }
            <div className="bg-grid" />
            <div className="container">
                <div className={styles.layout}>
                    
                    <div className={styles.wrapper}>
                        <div className={styles['top-blank']} />
                        <Header isLogin={!!userInfo.uid} />
                        <div className={styles.content}>
                            <div className={classNames(styles.borderLeftBottom, styles['border-slide-bottom'])} />
                            <div className={classNames(styles.borderLeftTop, styles['border-slide-top'])} />
                            <div className={classNames(styles.borderRightTop, styles['border-slide-top'])} />
                            <div className={classNames(styles.borderRightBottom, styles['border-slide-bottom'])} />
                            
                            {
                                !hideGlobalBg ? (
                                    <div className={styles['bg-wrapper']}>
                                        <div className={styles.bg} />
                                    </div>
                                ) : null
                            }
                            <div className={styles['content-wrapper']}>
                                <Outlet />
                            </div>
                        </div>
                        <div className={styles['footer-blank']} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export const showBgIII = () => {
    dispatch({
        type: 'global@apply',
        payload: {
            showBgIII: true,
        },
    });
}

export const hideGlobalBg = () => {
    dispatch({
        type: 'global@apply',
        payload: {
            hideGlobalBg: true,
            showBgIII: false,
        },
    });
};

export const showGlobalBg = () => {
    dispatch({
        type: 'global@apply',
        payload: {
            hideGlobalBg: false,
        },
    });
};

export default Layout;
