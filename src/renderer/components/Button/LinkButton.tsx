import React, { FC, MouseEventHandler } from 'react';
import Icon from '../Icon';
import './index.less';

interface LinkButtonProps {
    icon?: string;
    onClick?: MouseEventHandler<HTMLDivElement>;
    active?: boolean;
}

const LinkButton: FC<LinkButtonProps> = ({ active, onClick, icon, children }) => {
    return (
        <div className={`sandbox-link-button ${active ? 'active' : ''}`} onClick={onClick}>
            {icon ? <Icon type={icon} /> : null}
            <span className="btn-text">
                {children}
            </span>
        </div>
    );
}

export default LinkButton;
