import Button from '@renderer/components/Button';
import Input from '@renderer/components/Input';
import MatinaDialog, { useMatinaDialogState } from '@renderer/components/MatinaDialog';
import message from '@renderer/components/message';
import Space from '@renderer/components/Space';
import TreeList from '@renderer/components/TreeList';
import CourseModel from '@renderer/models/course.model';
import { editCategory } from '@renderer/service/course';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import Card from './Card';
import Header from './Header';
import styles from './index.less';

const ContentManager: FC = () => {

    // 1: 能力总表 2: 培训项目总表
    const [selectedType, setSelectedType] = useState(1);

    const dialog = useMatinaDialogState();

    const [form, setForm] = useState({
        key: undefined,
        name: '',
        code: '',
    });

    const [courseState, dispatch] = CourseModel.useModel();

    useEffect(() => {
        dispatch({
            type: 'course@refreshAllSecondCategory',
            payload: '',
        });
        dispatch({
            type: 'course@refreshAllAbility',
        });
    }, [dispatch]);

    const handleEditOne = useCallback((item) => {
        setForm({
            key: item.key,
            name: item.name,
            code: item.code,
        });
        dialog.show();
    }, []);

    const handleSubmit = useCallback(() => {
        console.log('dlog ==> submit');
        const { code, name } = form;

        if (!code) {
            message.error('编号不能为空');
            return;
        }

        if (!name) {
            message.error('名称不能为空');
            return;
        }

        if (name.length >= 30) {
            message.error('名称最多30个字');
            return;
        }

        if (code.length >= 30) {
            message.error('编号最多30个字');
            return;
        }

        editCategory({
            cid: +(form.key || 0),
            name: form.name,
            code: form.code,
            cateType: selectedType === 1 ? 'ability' : 'training',
        }).then((result) => {
            if (result) {
                message.success('保存成功');
                dispatch({
                    type: selectedType === 1 ? 'course@refreshAllAbility' : 'course@refreshAllSecondCategory',
                    payload: '',
                });
                dialog.hide();
            } else {
                message.success('网络异常，请稍后再试');
            }
        })
    }, [form, selectedType]);

    const treeData = useMemo(() => {
        if (selectedType === 1) {
            return courseState.ability ?? [];
        }

        if (selectedType === 2) {
            return courseState.category ?? [];
        }

        return [];
    }, [selectedType, courseState.category, courseState.ability]);

    return (
        <div className={styles['content-manager']}>
            <div className={styles.content}>
                {/* <Header
                    title="内容管理"
                    className={styles['section-header']}
                /> */}
                <div className={styles.tabWrapper}>
                    <div className={styles['tabs']}>
                        <div
                            className={`${styles.tabItem} ${selectedType === 1 ? styles['is-select'] : ''}`}
                            onClick={() => setSelectedType(1)}
                        >
                            能力总表
                        </div>
                        <div
                            className={`${styles.tabItem} ${selectedType === 2 ? styles['is-select'] : ''}`}
                            onClick={() => setSelectedType(2)}
                        >
                            培训项目总表
                        </div>
                    </div>
                </div>
                <Card
                    style={{
                        height: 'calc(100% - 10rem)'
                    }}
                >
                    <div
                        style={{
                            padding: '2rem',
                            height: '100%'
                        }}
                    >
                        <TreeList
                            defaultExpendedAll
                            disableExpend
                            treeData={treeData as any}
                            showEdit
                            onEdit={handleEditOne}
                        />
                    </div>
                </Card>
            </div>
            <MatinaDialog dialog={dialog} title="编辑">
                <div className={styles.form}>
                    <div className={styles['form-item']}>
                        <div className={styles.label}>
                            名称
                        </div>
                        <div className={styles.wrapper}>
                            <Input
                                placeholder="请输入名称"
                                value={form.name}
                                theme="matina"
                                onChange={(e) => {
                                    const target = (e?.target ?? {}) as any;
                                    setForm((last) => {
                                        return {
                                            ...last,
                                            name: (target.value ?? ''),
                                        }
                                    });
                                }}
                            />
                        </div>
                    </div>
                    <div className={styles['form-item']}>
                        <div className={styles.label}>
                            编号
                        </div>
                        <div className={styles.wrapper}>
                            <Input
                                placeholder="请输入编号"
                                value={form.code}
                                theme="matina"
                                onChange={(e) => {
                                    const target = (e?.target ?? {}) as any;
                                    setForm((last) => {
                                        return {
                                            ...last,
                                            code: (target.value ?? ''),
                                        }
                                    });
                                }}
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
    );
};

export default ContentManager;
