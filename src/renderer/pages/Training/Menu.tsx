/*
 * @description: 
 * @author: 周金顺（云天河）
 */

import { getUnitWidth } from '@renderer/lib/util';
import classNames from 'classnames';
import React, { FC, useCallback, useEffect, useRef } from 'react';
import styles from './Menu.less';

export interface MenuProps {
    menu?: Array<{
        key: string|number;
        name: string;
    }>;
    active?: string|number;
    onSelectChange?: (active: string|number) => void;
}

const Menu: FC<MenuProps> = (props) => {
    const $menu = useRef<HTMLDivElement>();
    const $selectedBox = useRef<HTMLDivElement>();
    const { menu, active, onSelectChange } = props;

    const handleSelect = useCallback((selectedKey: string|number) => {
        if (onSelectChange) {
            onSelectChange(selectedKey);
        }
    }, [onSelectChange]);

    useEffect(() => {
        const $activeLi = $menu.current?.querySelector(`.${styles['menu-item']}.${styles.active}`);
        if ($activeLi) {
            const { x, y } = $activeLi?.getBoundingClientRect() ?? { x: 0, y: 0 };
            
            const { x: boxOffsetX, y: boxOffsetY } = $menu.current?.getBoundingClientRect() ?? { x: 0, y : 0 };
            const unitWidth = getUnitWidth();
            const offsetX = (x - boxOffsetX) / unitWidth - 2.6;
            const offsetY = (y - boxOffsetY) / unitWidth - 2.9;
            if ($selectedBox.current) {
                if ($selectedBox.current.style) {
                    $selectedBox.current.style.top = `${offsetY}rem`;
                    $selectedBox.current.style.left = `${offsetX}rem`;
                }
            }

        }
    }, [active]);

    return (
        <div ref={$menu as any} className={styles.menu}>
            <div ref={$selectedBox as any} className={styles['selected-box']} />
            <ul>
                {
                    (menu ?? []).map((item) => {
                        return (
                            <li key={item.key} onClick={() => handleSelect(item.key)} className={classNames(styles['menu-item'], {
                                [styles.active]: active === item.key,
                            })}>
                                {item.name}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
};

export default Menu;
