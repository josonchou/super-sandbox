/*
 * @description: 
 * @author: 周金顺（云天河）
 */

import React, { FC } from 'react';
import { Outlet } from 'react-router';

const Blank: FC = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default Blank;
