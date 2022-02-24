import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import classNames from 'classnames';
import Header from '../Header';
import styles from './index.less';

const Layout: FC = () => {
    return (
        <div className={styles.layout}>
            <Header />
            <div className={styles.content}>
                <div className={classNames(styles.borderLeftBottom, styles['border-slide'])} />
                <div className={classNames(styles.borderLeftTop, styles['border-slide'])} />
                <div className={classNames(styles.borderRightTop, styles['border-slide'])} />
                <div className={classNames(styles.borderRightBottom, styles['border-slide'])} />
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;
