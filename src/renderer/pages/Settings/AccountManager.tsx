/*
 * @description: 
 * @author: 周金顺（云天河）
 */

import Button from '@renderer/components/Button';
import Checkbox from '@renderer/components/Checkbox';
import Input from '@renderer/components/Input';
import MatinaDialog, { useMatinaDialogState } from '@renderer/components/MatinaDialog';
import message from '@renderer/components/message';
import Space from '@renderer/components/Space';
import Table from '@renderer/components/Table';
import AccountModel from '@renderer/models/account.model';
import { useLoading } from '@renderer/store';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import Card from './Card';
import Header from './Header';
import styles from './index.less';
import { Account } from './models';

const AccountManager: FC = () => {
    const [account, dispatch] = AccountModel.useModel();
    const keywords = useRef();
    const selectRows = useRef();
    const dialog = useMatinaDialogState();
    const { records, total, currentPage } = account;
    const [checkedRoles, setCheckedRoles] = useState();
    const [username, setUsername] = useState();
    
    const laoding = useLoading();

    useEffect(() => {
        dispatch({
            type: 'account@fetchAccountList',
            payload: {
                page: 1,
                pageSize: 3,
            },
        });
    }, [dispatch]);

    const handleSearch = useCallback(() => {
        dispatch({
            type: 'account@fetchAccountList',
            payload: {
                page: 1,
                pageSize: 3,
                username: keywords.current,
            }
        });
    }, []);

    const afterClose = useCallback(() => {
        setUsername(undefined);
        setCheckedRoles(undefined);
    }, []);

    const handleSubmit = useCallback(() => {
        
        dispatch({
            type: 'account@createOne',
            payload: {
                username,
                role: Number((checkedRoles ?? [])[0] ?? 2),
            },
            callback: () => {
                afterClose();
            }
        });
        dialog.hide();
    }, [afterClose, username, checkedRoles, dialog.hide]);
    

    return (
        <div className={styles['account-manager']}>
            <div className={styles.content}>
                <Header
                    title="账号管理"
                    className={styles['section-header']}
                    extra={() => {
                        return (
                            <Space gap={1.56} gapUnit="rem">
                                <Button type="small" onClick={() => {
                                    dialog.show();
                                }}>
                                    新增
                                </Button>
                                <Button theme="danger" type="small" onClick={() => {
                                    message.confirm(
                                        '是否要删除已经选中的账号？',
                                        {
                                            onOk: () => {
                                                dispatch({
                                                    type: 'account@removeUsers',
                                                    payload: selectRows.current,
                                                });
                                            }
                                        }
                                    );
                                }}>
                                    删除
                                </Button>
                            </Space>
                        )
                    }}
                />
                <Card>
                    <div className={styles.filter} onKeyUp={(e) => {
                        if (e.nativeEvent.keyCode === 13) {
                            handleSearch();
                        }
                    }}>
                        <div className={styles['form-item']}>
                            <div className={styles.label}>
                                账号
                            </div>
                            <div className={styles.wrapper}>
                                <Input
                                    placeholder="请输入账号"
                                    theme="matina"
                                    onChange={(e) => {
                                        const target = (e?.target ?? {}) as any;
                                        keywords.current = (target.value ?? '');
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <Button
                                type="small"
                                onClick={handleSearch}
                            >
                                查询
                            </Button>
                        </div>
                    </div>
                </Card>
                <div className={styles.list}>
                    <Header title="列表" />
                    <Card>
                        <Table<Account>
                            rowKey="id"
                            loading={laoding['account@fetchAccountList']}
                            columns={[
                                {
                                    Header: '账号',
                                    accessor: 'username',
                                },
                                {
                                    Header: '角色',
                                    accessor: 'role',
                                }
                            ]}
                            dataSource={records.map((item: Account) => {
                                return {
                                    ...item,
                                    role: item.role === 1 ? '管理员' : '讲师',
                                }
                            })}
                            currentPage={currentPage}
                            pageSize={3}
                            rowSelection={{
                                rowKey: 'id',
                                onSelectedChange: (rowsMap) => {
                                    selectRows.current = (Object.keys(rowsMap)) as any;
                                },
                            }}
                            pageCount={Math.ceil(total / 3)}
                            onPageChange={(page: number) => {
                                dispatch({
                                    type: 'account@fetchAccountList',
                                    payload: {
                                        page,
                                        pageSize: 3,
                                        username: keywords.current,
                                    }
                                });
                            }}
                        />
                    </Card>
                </div>
            </div>
            <MatinaDialog dialog={dialog} title="新增账号" onClose={afterClose}>
                <div className={styles.form}>
                    <div className={styles['form-item']}>
                        <div className={styles.label}>
                            账号
                        </div>
                        <div className={styles.wrapper}>
                            <Input
                                placeholder="请输入账号"
                                theme="matina"
                                value={username}
                                onChange={(e) => {
                                    const target = (e?.target ?? {}) as any;
                                    setUsername(target.value ?? '');
                                }}
                            />
                        </div>
                    </div>
                    <div className={styles['form-item']}>
                        <div className={styles.label}>
                            角色
                        </div>
                        <div className={styles.wrapper}>
                            <Checkbox
                                value={checkedRoles}
                                onChange={setCheckedRoles as any}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.footer}>
                    <Space>
                        <Button type="small" onClick={handleSubmit}>
                            保存
                        </Button>
                    </Space>
                </div>
            </MatinaDialog>
        </div>
    )
};

export default AccountManager;
