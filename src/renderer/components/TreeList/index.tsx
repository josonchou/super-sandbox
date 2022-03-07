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
}

const TreeList: FC<TreeListProps> = ({ treeData = [] }) => {
    const [expendedMenus, setExpendedMenus] = useState<Array<string|number>>([]);

    const genChildDom = useCallback((list: TreeData[], parentKey: string|number) => {
        if (!list.length) {
            return null;
        }
        return (
            <ul className={styles['tree-sub']}>
                {
                    list.map((item) => {
                        const childs = item.children && item.children.length ? genChildDom(item.children, `${parentKey}-${item.key}`) : null;
                        return (
                            <li key={`${parentKey}-${item.key}`} className={classNames(styles['tree-sub-item'], {
                                [styles.expended]: expendedMenus.includes(`${parentKey}-${item.key}`),
                            })}>
                                <div className={styles['tree-item']} onClick={() => {
                                    setExpendedMenus((prev) => {
                                        if (prev.includes(item.key)) {
                                            return prev.filter((key) => key !== `${parentKey}-${item.key}`);
                                        }
                                        return [
                                            ...prev,
                                            `${parentKey}-${item.key}`,
                                        ];
                                    });
                                }}>
                                    {/* <div className={styles.icon} /> */}
                                    <div className={styles.label}>
                                        {item.name}
                                        {item.code ? ` (${item.code})` : null}
                                    </div>
                                </div>
                                {childs}
                            </li>
                        )
                    })
                }
            </ul>
        )
    }, [expendedMenus]);

    const treeDom = useMemo(() => {
        return (
            <ul className={styles['tree-master']}>
                {
                    treeData?.map((item) => {
                        return (
                            <li key={item.key} className={classNames(styles['tree-master-item'], {
                                [styles.expended]: expendedMenus.includes(item.key),
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
                                        {item.code ? ` (${item.code})` : null}
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
