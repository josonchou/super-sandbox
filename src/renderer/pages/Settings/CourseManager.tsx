/*
 * @description: 课程管理
 * @author: 周金顺（云天河）
 */

import Button from '@renderer/components/Button';
import LinkButton from '@renderer/components/Button/LinkButton';
import Input from '@renderer/components/Input';
import MatinaDialog, { useMatinaDialogState } from '@renderer/components/MatinaDialog';
import Space from '@renderer/components/Space';
import Table from '@renderer/components/Table';
import TreeList from '@renderer/components/TreeList';
import Upload from '@renderer/components/Upload';
import CourseModel from '@renderer/models/course.model';
import  React, { FC } from 'react';
import Card from './Card';
import styles from './CourseManager.less';
import Header from './Header';
import { Account } from './models';

const CourseManager: FC = () => {
    const [courseState] = CourseModel.useModel();
    const dialog = useMatinaDialogState();
    
    return (
        <div className={styles['course-manager']}>
            <div className={styles.tree}>
                <div className={styles['search-area']}>
                    <Input
                        placeholder="请输入"
                        theme="matina"
                    />
                </div>
                <div className={styles['tree-area']}>
                    <TreeList
                        treeData={(courseState.category ?? []) as any}
                    />
                </div>
            </div>
            <div className={styles.content}>
                <Header
                    title="账号管理"
                    className={styles['section-header']}
                    extra={() => {
                        return (
                            <Space gap={1.56} gapUnit="rem">
                                {/* <DialogDisclosure {...dialog}> */}
                                <Button type="small" onClick={() => {
                                    dialog.show();
                                }}>
                                    新增
                                </Button>
                                {/* </DialogDisclosure> */}
                                
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
                                课件名称
                            </div>
                            <div className={styles.wrapper}>
                                <Input
                                    placeholder="请输入课件名称"
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
                            loading={false}
                            columns={[
                                {
                                    Header: '课件名称',
                                    accessor: 'courseName',
                                },
                                {
                                    Header: '所属课程类别',
                                    accessor: 'category',
                                }
                            ]}
                            dataSource={[]}
                            pageSize={3}
                            rowSelection={{
                                rowKey: 'id',
                            }}
                            pageCount={0}
                            onPageChange={(page: number) => {
                                console.log(page);  
                            }}
                        />
                    </Card>
                </div>
            </div>
            <MatinaDialog dialog={dialog} title="新增课件">
                <div className={styles.form}>
                    <div className={styles['form-item']}>
                        <div className={styles.label}>
                            课件名称
                        </div>
                        <div className={styles.wrapper}>
                            <Input
                                placeholder="请输入课件名称"
                                theme="matina"
                            />
                        </div>
                    </div>
                    <div className={styles['form-item']}>
                        <div className={styles.label}>
                            选择课件
                        </div>
                        <div className={styles.wrapper}>
                            <Upload />
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
    );
}

export default CourseManager;