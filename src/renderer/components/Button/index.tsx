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
    type?: 'big'|'default'|'small';
    onClick?: HTMLButtonElement['onclick'];
    theme?: 'primary'|'danger';
}

const Button: FC<ButtonProps> = (props) => {
    const { type = 'big', children, className, theme = 'primary', ...restProps } = props;
    const classNameByType = useMemo(() => {
        if (type === 'big' || type === 'default') {
            return classNames('btn-text', 'size-big',  `theme-${theme}`);
        }

        if (type === 'small') {
            return classNames('btn-text', 'size-small', `theme-${theme}`);
        }

        return '';
    }, [type, theme]);

    const bg = useMemo(() => {
        return (
            <div className="bg-wrapper">
                <div
                    className={classNames('btn-border', {
                        'size-big': type === 'big' || type === 'default',
                        'size-small': type === 'small',
                    })}
                />
                <div
                    className={classNames('btn-bg', {
                        'size-big': type === 'big' || type === 'default',
                        'size-small': type === 'small',
                    })}
                />
            </div>
        );
    }, [type]);
    

    return (
        <button {...restProps as any} className={classNames('sandbox-button', classNameByType, className)}>
            {bg}
            {children}
        </button>
    );
}

export default Button;
