/*
 * @description: 课程管理
 * @author: 周金顺（云天河）
 */

import Button from '@renderer/components/Button';
import Input from '@renderer/components/Input';
import MatinaDialog, { useMatinaDialogState } from '@renderer/components/MatinaDialog';
import message from '@renderer/components/message';
import Space from '@renderer/components/Space';
import Table from '@renderer/components/Table';
import TreeList from '@renderer/components/TreeList';
import Upload from '@renderer/components/Upload';
import CourseModel from '@renderer/models/course.model';
import { useLoading } from '@renderer/store';
import  React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import Card from './Card';
import styles from './CourseManager.less';
import Header from './Header';
import { Account } from './models';

const CourseManager: FC = () => {
    const [courseState, dispatch] = CourseModel.useModel();
    const [selectedKey, setSelectedKey] = useState<any>();
    const keywords = useRef();
    const dialog = useMatinaDialogState();
    const loading = useLoading();
    const selectRows = useRef([]);
    const { records, total, currentPage } = courseState;

    console.log(selectedKey, 'courseState==>');

    useEffect(() => {
        dispatch({
            type: 'course@fetchCourseList',
            payload: {
                page: 1,
                pageSize: 3,
            },
        });
    }, [dispatch]);

    const handleSearch = useCallback((page?: number) => {
        const keyArr = String(selectedKey?.key ?? '').split('-');
        dispatch({
            type: 'course@fetchCourseList',
            payload: {
                page: page ?? 1,
                pageSize: 3,
                courseName: keywords.current,
                categoryKey: (keyArr || [])[(keyArr.length ?? 1) - 1],
            }
        });
    }, [selectedKey, dispatch]);
    
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
                        onSelected={(currKey) => {
                            setSelectedKey(currKey);
                            setTimeout(() => {
                                handleSearch(1);
                            }, 60);
                        }}
                    />
                </div>
            </div>
            <div className={styles.content}>
                <Header
                    title="课件管理"
                    className={styles['section-header']}
                    extra={() => {
                        return (
                            <Space gap={1.56} gapUnit="rem">
                                {/* <DialogDisclosure {...dialog}> */}
                                <Button type="small" onClick={() => {
                                    if (!selectedKey) {
                                        message.tips('请先选择所属培训项目，再进行新增');
                                        return null;
                                    }
                                    dialog.show();
                                }}>
                                    新增
                                </Button>
                                {/* </DialogDisclosure> */}
                                
                                <Button type="small" theme="danger" onClick={() => {
                                    if (!selectRows.current.length) {
                                        message.tips(
                                            '请至少选择一行数据',
                                        );
                                        return;
                                    }
                                    message.confirm(
                                        '是否要删除已经选中的课程？',
                                        {
                                            onOk: () => {
                                                dispatch({
                                                    type: 'course@removeCourse',
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
                    <div
                        className={styles.filter}
                        onKeyUp={(e) => {
                            if (e.nativeEvent.keyCode === 13) {
                                handleSearch(1);
                            }
                        }}
                    >
                        <div className={styles['form-item']}>
                            <div className={styles.label}>
                                课件名称
                            </div>
                            <div className={styles.wrapper}>
                                <Input
                                    placeholder="请输入课件名称"
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
                                onClick={() => handleSearch(1)}
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
                            loading={loading['course@fetchCourseList']}
                            columns={[
                                {
                                    Header: '课件名称',
                                    accessor: 'courseName',
                                },
                                {
                                    Header: '所属培训项目',
                                    accessor: 'categoryName',
                                }
                            ]}
                            dataSource={records}
                            pageSize={3}
                            currentPage={currentPage}
                            rowSelection={{
                                rowKey: 'id',
                                onSelectedChange: (rowsMap) => {
                                    selectRows.current = (Object.keys(rowsMap)) as any;
                                },
                            }}
                            pageCount={Math.ceil(total / 3)}
                            onPageChange={handleSearch}
                        />
                    </Card>
                </div>
            </div>
            <MatinaDialog dialog={dialog} title="新增课件">
                <div className={styles.form}>
                    <div className={styles['form-item']}>
                        <div className={styles.label}>
                            所属培训项目
                        </div>
                        <div className={styles.wrapper}>
                            <div style={{ height: '3.18rem', lineHeight: '3.18rem', fontSize: '1.25rem' }}>
                                {(selectedKey ?? {}).label}
                            </div>
                        </div>
                    </div>
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
                            <p style={{ paddingTop: 5 }}>课件仅支持MP4、PDF、PPT、WORD、EXCEL</p>
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
