/*
 * @description: 
 * @author: 周金顺（云天河）
 */

import React, { FC } from 'react';
import './index.less';

interface IconProps {
    type?: string;
}

const Icon: FC<IconProps> = (props) => {
    return (
        <div className={`super-icon super-icon-${props.type}`}>
            <i className={`icon icon-${props.type}`} />
        </div>
    );
};

export default Icon;
