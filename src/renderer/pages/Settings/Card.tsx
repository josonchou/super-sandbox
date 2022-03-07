/*
 * @description: 
 * @author: 周金顺（云天河）
 */

import React, { FC } from 'react';
import classNames from 'classnames';
import styles from './Card.less';

interface CardProps {
    theme?: 'default'|'transparent';
}

const Card: FC<CardProps> = ({ children, theme }) => {
    return (
        <div className={classNames(styles.card, {
            [styles['theme-transparent']]: theme === 'transparent',
        })}>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
};

export default Card;
