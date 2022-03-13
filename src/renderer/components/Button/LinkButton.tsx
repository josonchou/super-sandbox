import React, { CSSProperties, FC, MouseEventHandler, useMemo } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import './index.less';

interface LinkButtonProps {
    icon?: string;
    onClick?: MouseEventHandler<HTMLDivElement>;
    active?: boolean;
    theme?: 'default'|'danger';
    fontSize?: string;
    className?: HTMLDivElement['className'];
}

const LinkButton: FC<LinkButtonProps> = ({ active, fontSize, className, theme = 'default', onClick, icon, children }) => {

    const fontSizeStyle: CSSProperties = useMemo(() => {
        if (!fontSize) {
            return {};
        }
        return {
            fontSize,
        };
    }, [fontSize]);

    return (
        <div
            className={classNames('sandbox-link-button', {
                active,
                'theme-danger': theme === 'danger',
            }, className)}
            onClick={onClick}
        >
            {icon ? <Icon type={icon} /> : null}
            <span className="btn-text" style={fontSizeStyle}>
                {children}
            </span>
        </div>
    );
}

export default LinkButton;
