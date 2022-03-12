/*
 * @description: 
 * @author: 周金顺（云天河）
 */

import React, { FC } from 'react';
import styles from './SubMenu.less';

export interface SubMenuProps {
    menuList: Array<{
        key: number|string;
        name: string;
        code?: string;
    }>;
    onSelect: (selectKey: number|string) => void;
}

const SubMenu: FC<SubMenuProps> = (props) => {
    const { onSelect, menuList = [] } = props;
    return (
        <div className={styles['sub-menu']}>
            {
                menuList.map((item) => {
                    return (
                        <div key={item.key} onClick={() => onSelect(item.key)} className={styles['menu-item']}>
                            <div className={styles['menu-item-bg']} />
                            <span>{item.name} <br />({item.code ?? '--'})</span>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default SubMenu;
