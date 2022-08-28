/*
 * @description: 
 * @author: 周金顺（云天河）
 */

import React, { FC } from 'react';
import classNames from 'classnames';
import styles from './Card.less';

interface CardProps {
    theme?: 'default'|'transparent';
    style?: any;
}

const Card: FC<CardProps> = ({ children, theme, style }) => {
    return (
        <div className={classNames(styles.card, {
            [styles['theme-transparent']]: theme === 'transparent',
        })} style={style}>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
};

export default Card;
