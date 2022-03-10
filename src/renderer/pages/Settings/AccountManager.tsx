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
import React, { FC, useEffect } from 'react';
import Card from './Card';
import Header from './Header';
import styles from './index.less';
import { Account } from './models';

const AccountManager: FC = () => {
    const [account, dispatch] = AccountModel.useModel();
    const dialog = useMatinaDialogState();
    const { records, total } = account;
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
                                        '是否要删除已经选中的角色？',
                                    );
                                }}>
                                    删除
                                </Button>
                            </Space>
                        )
                    }}
                />
                <Card>
                    <div className={styles.filter}>
                        <div className={styles['form-item']}>
                            <div className={styles.label}>
                                账号
                            </div>
                            <div className={styles.wrapper}>
                                <Input
                                    placeholder="请输入账号"
                                    theme="matina"
                                />
                            </div>
                        </div>
                        <div>
                            <Button
                                type="small"
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
                            rowKey="rowId"
                            loading={laoding['account@fetchAccountList']}
                            columns={[
                                {
                                    Header: '账号',
                                    accessor: 'username',
                                },
                                {
                                    Header: '角色',
                                    accessor: 'remark',
                                }
                            ]}
                            dataSource={records}
                            pageSize={3}
                            rowSelection={{
                                rowKey: 'id',
                            }}
                            pageCount={Math.ceil(total / 3)}
                            onPageChange={(page: number) => {
                                console.log(page, 'page==>');
                                
                                dispatch({
                                    type: 'account@fetchAccountList',
                                    payload: {
                                        page,
                                        pageSize: 3,
                                    }
                                });
                            }}
                        />
                    </Card>
                </div>
            </div>
            <MatinaDialog dialog={dialog} title="新增账号">
                <div className={styles.form}>
                    <div className={styles['form-item']}>
                        <div className={styles.label}>
                            账号
                        </div>
                        <div className={styles.wrapper}>
                            <Input
                                placeholder="请输入账号"
                                theme="matina"
                            />
                        </div>
                    </div>
                    <div className={styles['form-item']}>
                        <div className={styles.label}>
                            角色
                        </div>
                        <div className={styles.wrapper}>
                            <Checkbox />
                        </div>
                    </div>
                </div>
                <div className={styles.footer}>
                    <Space>
                        <Button type="small" onClick={() => {
                            dialog.hide();
                        }}>
                            保存
                        </Button>
                    </Space>
                </div>
            </MatinaDialog>
        </div>
    )
};

export default AccountManager;
