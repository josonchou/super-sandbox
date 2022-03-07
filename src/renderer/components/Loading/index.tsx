/*
 * @description: 
 * @author: 周金顺（云天河）
 */

import React, { FC } from 'react';
import './index.less';

interface LoadingProps {
    loading?: boolean;
}

const Loading: FC<LoadingProps> = ({ loading, children }) => {
    return (
        <div className="loading-wrapper">
            {children}
            {
                loading ? (
                    <div className="loading">
                        <div className="dots-bars" />
                    </div>
                ) : null
            }
        </div>
    )
};

export default Loading;
