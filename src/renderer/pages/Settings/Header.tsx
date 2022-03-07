/*
 * @description: 
 * @author: 周金顺（云天河）
 */

import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './index.less';
import Button from '@renderer/components/Button';

interface HeaderProps {
    title: string;
    className?: HTMLDivElement['className'];
    extra?: () => ReactNode;
}

const Header: FC<HeaderProps> = (props) => {
    const { title, className, extra = () => null } = props;
    return (
        <div className={classNames(styles.header, className)}>
            <div className={styles.title}>
                {title}
            </div>
            <div className={styles.extra}>
                {extra()}
            </div>
        </div>
    )
};

export default Header;
