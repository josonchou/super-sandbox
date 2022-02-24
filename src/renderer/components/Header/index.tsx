import React, { FC } from 'react';
import styles from './index.less';

const Header: FC = () => {
    return (
        <div className={styles.header} style={{ visibility: 'hidden' }}>
            <div className={styles.icon}>
                中国华能
            </div>
            <div className={styles.title}>
                应急课程教学数字沙盘系统
            </div>
            <div className={styles.action} />
        </div>
    )
}

export default Header;
