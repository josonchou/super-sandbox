import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header';
import styles from './index.less';

const Layout: FC = () => {
    return (
        <div className={styles.layout}>
            <Header />
            <div className={styles.content}>
                <div className={styles.borderLeftBottom} />
                <div className={styles.borderLeftTop} />
                <div className={styles.borderRightTop} />
                <div className={styles.borderRightBottom} />
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;
