/*
 * @description: 
 * @author: 周金顺（云天河）
 */

import Button from '@renderer/components/Button';
import LinkButton from '@renderer/components/Button/LinkButton';
import Input from '@renderer/components/Input';
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

    console.log(account, 'account==>');
    

    return (
        <div className={styles['account-manager']}>
            <div className={styles.content}>
                <Header
                    title="账号管理"
                    className={styles['section-header']}
                    extra={() => {
                        return (
                            <Space gap={1.56} gapUnit="rem">
                                <Button type="small">
                                    新增
                                </Button>
                                <LinkButton theme="danger" fontSize="1.09rem">
                                    删除
                                </LinkButton>
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
                                    Header: '备注',
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
        </div>
    )
};

export default AccountManager;
