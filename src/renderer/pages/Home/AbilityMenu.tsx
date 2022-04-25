import { AbilityTable } from '@renderer/models/abilityTable.model';
import React, { FC, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import styles from './AbilityMenu.less';

interface AbilityMenuProps {
    data?: AbilityTable['abilityTree'];
    onChange?: (selected: number) => void;
    activeKey?: number;
}

const positions = [
    [17.96, 5.03],
    [3.16, 10.52],
    [32.50, 10.52],
    [-1.6, 16.95],
    [37.3, 16.95],
    [-1.6, 24.1],
    [37.3, 24.1],
    [3.16, 31.9],
    [32.5, 31.9],
    [17.96, 36.8],
];

const offsetX = -10.333;
const offsetY = -8.2222;

const AbilityMenu: FC<AbilityMenuProps> = ({ data = [], activeKey, onChange }) => {
    const [selected, setSelected] = useState<number>();

    const selectedItem = useMemo(() => {
        return (data ?? []).find(item => item.id === selected);
    }, [selected, data]);

    console.log(selectedItem, 'selectedItem');
    

    const element = useMemo(() => {
        return (
            <>
                {data.map((item, index) => {
                    const pos = positions[index] ?? [];
                    return (
                        <div
                            style={{
                                left: `${(pos[0] ?? 0) + offsetX}rem`,
                                top: `${(pos[1] ?? 0) + offsetY}rem`,
                            }}
                            key={item.id}
                            className={classNames(styles['menu-item'], {
                                [styles.selected]: selected === item.id,
                            })}
                            onClick={() => {
                                setSelected(item.id);
                                onChange && onChange(item.id);
                            }}
                        >
                            {item.name}({item.code})
                        </div>
                    )
                })}
            </>
        )
    }, [data, selected, onChange]);
    
    useEffect(() => {
        setSelected((prev) => {
            if (prev !== activeKey) {
                return activeKey;
            }

            return prev;
        });
    }, [activeKey]);

    return (
        <div className={styles.menu}>
            <div className={styles['menu-wrapper']}>
                <div className={styles['menu-title']}>
                    {selectedItem?.name}
                </div>
                
                {element}
            </div>
        </div>
    );
};

export default AbilityMenu;
