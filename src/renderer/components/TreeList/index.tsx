/*
 * @description: 
 * @author: 周金顺（云天河）
 */

import useControlState from '@renderer/lib/useControlState';
import classNames from 'classnames';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import styles from './index.less';

interface TreeData {
    name: string;
    key: string|number;
    code?: string;
    children?: Array<TreeData>;
}

export interface TreeListProps {
    showEdit?: boolean;
    disableExpend?: boolean;
    defaultExpendedAll?: boolean;
    expendedKeys?: Array<string|number>;
    onExpended?: (keys: Array<string|number>) => void;
    selectedkey?: string|number;
    onSelect?: (val: string|number) => void;
    treeData?: Array<TreeData>;
    onEdit?: (item: TreeData) => void;
    onSelected?: (args: { key: string|number, label: string }) => void;
}

const getAllKeys = (treeData: Array<TreeData>, parentKey?: string) => {
    const list: Array<string> = [];
    treeData.forEach((item) => {
        let currentKey = `${item.key}`;
        if (parentKey) {
            currentKey = `${parentKey}-${item.key}`;
        }

        if (item.children && item.children.length) {
            getAllKeys(item.children, currentKey).forEach((child) => {
                list.push(child);
            });
        }
        list.push(currentKey);
    });

    return list;
}

const TreeList: FC<TreeListProps> = ({ onEdit = () => {}, showEdit, disableExpend, defaultExpendedAll, expendedKeys, selectedkey, onSelect, onExpended, treeData = [], onSelected = () => null }) => {
    const [expendedMenus, setExpendedMenusOrigin] = useControlState<Array<string|number>>({
        value: expendedKeys,
        onChange: onExpended,
        defaultValue: [],
    });
    // eslint-disable-next-line
    const [_, update] = useState([]);

    const setExpendedMenus = useMemo(() => {
        if (disableExpend) {
            return update as typeof setExpendedMenusOrigin;
        }
        return setExpendedMenusOrigin;
    }, [disableExpend]);
    
    const [selectedMenu, setSelectedMenu] = useControlState<string|number>({
        value: selectedkey,
        onChange: onSelect,
    });

    const genChildDom = useCallback((list: TreeData[], parentKey: string|number) => {
        if (!list.length) {
            return null;
        }
        return (
            <ul className={styles['tree-sub']}>
                {
                    list.map((item) => {
                        const currentkey = `${parentKey}-${item.key}`;
                        const childs = item.children && item.children.length ? genChildDom(item.children, `${parentKey}-${item.key}`) : null;
                        const isLeaf = childs === null;
                        return (
                            <li key={`${parentKey}-${item.key}`} className={classNames(styles['tree-sub-item'], {
                                [styles.expended]: expendedMenus.includes(`${parentKey}-${item.key}`),
                                [styles.notExpended]: !expendedMenus.includes(`${parentKey}-${item.key}`),
                                [styles.selected]: currentkey === selectedMenu,
                            })}>
                                <div className={styles['tree-item']} onClick={() => {
                                    if (isLeaf) {
                                        setSelectedMenu(currentkey);
                                        onSelected({
                                            key: currentkey,
                                            label: `${item.name}(${item.code})`,
                                        });
                                    } else {
                                        setExpendedMenus((prev) => {
                                            if (prev.includes(currentkey)) {
                                                return prev.filter((key) => key !== currentkey);
                                            }
                                            return [
                                                ...prev,
                                                currentkey,
                                            ];
                                        });
                                    }
                                }}>
                                    {
                                        !isLeaf ? (
                                            <div className={classNames(styles.icon, {
                                                [styles['right-arrow']]: !expendedMenus.includes(currentkey),
                                                [styles['bottom-arrow']]: expendedMenus.includes(currentkey)
                                            })} />
                                        ) : null
                                    }
                                    {/* <div className={styles.icon} /> */}
                                    <div className={styles.label}>
                                        {item.name}
                                        {item.code ? <span style={{ display: 'inline-block' }}>({item.code})</span> : null}
                                    </div>
                                    {
                                        showEdit ? (
                                            <div className={styles.operation}>
                                                <a
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        onEdit(item);
                                                    }}
                                                >编辑</a>
                                            </div>       
                                        ) : null
                                    }
                                </div>
                                {childs}
                            </li>
                        )
                    })
                }
            </ul>
        )
    }, [expendedMenus, selectedMenu, onSelected]);

    useEffect(() => {
        // 默认展开所有
        if (defaultExpendedAll && treeData.length) {
            const keys = getAllKeys(treeData);
            setExpendedMenusOrigin(keys);
        }
    }, [defaultExpendedAll, treeData]);

    const treeDom = useMemo(() => {
        return (
            <ul className={styles['tree-master']}>
                {
                    treeData?.map((oldItem) => {
                        const item = {
                            ...oldItem,
                            key: `${oldItem.key}`,
                        };
                        return (
                            <li key={item.key} className={classNames(styles['tree-master-item'], {
                                [styles.expended]: expendedMenus.includes(item.key),
                                [styles.notExpended]: !expendedMenus.includes(item.key),
                            })}>
                                <div className={styles['tree-item']} onClick={() => {
                                    setExpendedMenus((prev) => {
                                        if (prev.includes(item.key)) {
                                            return prev.filter((key) => key !== (item.key as any));
                                        }
                                        return [
                                            ...prev,
                                            item.key,
                                        ];
                                    });
                                }}>
                                    <div className={classNames(styles.icon, {
                                        [styles['right-arrow']]: !expendedMenus.includes(item.key),
                                        [styles['bottom-arrow']]: expendedMenus.includes(item.key)
                                    })} />
                                    <div className={styles.label}>
                                        {item.name}
                                        {item.code ? <span style={{ display: 'inline-block' }}>({item.code})</span> : null}
                                    </div>
                                    {
                                        showEdit ? (
                                            <div className={styles.operation}>
                                                <a
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        onEdit(item);
                                                    }}
                                                >编辑</a>
                                            </div>
                                        ) : null
                                    }
                                </div>
                                {genChildDom(item.children ?? [], item.key)}
                            </li>
                        )
                    })
                }
            </ul>
        )
    }, [treeData, genChildDom, expendedMenus]);

    return (
        <div className={styles['tree-list']}>
            {treeDom}
        </div>
    );
};

export default TreeList;
