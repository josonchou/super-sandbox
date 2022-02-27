/*
 * @description: 
 * @author: 周金顺（云天河）
 */

import React, { FC, useMemo } from 'react';
import classNames from 'classnames';
import './index.less';

interface ButtonProps {
    children: React.ReactNode;
    className?: HTMLButtonElement['className'];
    style?: HTMLButtonElement['style'];
    type?: 'big'|'default';
    onClick?: HTMLButtonElement['onclick'];
}

const Button: FC<ButtonProps> = (props) => {
    const { type = 'big', children, className, ...restProps } = props;
    const classNameByType = useMemo(() => {
        if (type === 'big' || type === 'default') {
            return classNames('btn-big-text');
        }

        return '';
    }, [type]);

    const bg = useMemo(() => {
        if (type === 'big' || type === 'default') {
            return (
                <div className="bg-wrapper">
                    <div className="btn-big-bg" />
                </div>
            );
        }
        return null;
    }, [type]);
    

    return (
        <button {...restProps as any} className={classNames('sandbox-button', classNameByType, className)}>
            {bg}
            {children}
        </button>
    );
}

export default Button;
