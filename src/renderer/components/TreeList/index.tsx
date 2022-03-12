/*
 * @description: 
 * @author: 周金顺（云天河）
 */

import classNames from 'classnames';
import React, { FC, useCallback, useMemo, useState } from 'react';
import styles from './index.less';

interface TreeData {
    name: string;
    key: string|number;
    code?: string;
    children?: Array<TreeData>;
}

export interface TreeListProps {
    treeData?: Array<TreeData>;
    onSelected?: (args: { key: string|number, label: string }) => void;
}

const TreeList: FC<TreeListProps> = ({ treeData = [], onSelected = () => null }) => {
    const [expendedMenus, setExpendedMenus] = useState<Array<string|number>>([]);
    const [selectedMenu, setSelectedMenu] = useState<string|number>();

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
                                    setExpendedMenus((prev) => {
                                        if (prev.includes(currentkey)) {
                                            return prev.filter((key) => key !== currentkey);
                                        }
                                        return [
                                            ...prev,
                                            currentkey,
                                        ];
                                    });
                                    if (isLeaf) {
                                        setSelectedMenu(currentkey);
                                        onSelected({
                                            key: currentkey,
                                            label: `${item.name}(${item.code})`,
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
                                </div>
                                {childs}
                            </li>
                        )
                    })
                }
            </ul>
        )
    }, [expendedMenus, selectedMenu, onSelected]);

    const treeDom = useMemo(() => {
        return (
            <ul className={styles['tree-master']}>
                {
                    treeData?.map((item) => {
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
