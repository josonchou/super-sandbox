/*
 * @description: 
 * @author: 周金顺（云天河）
 */


import classNames from 'classnames';
import React, { FC, ReactNode, useMemo } from 'react'
import { render, unmountComponentAtNode } from 'react-dom';
import { Dialog, DialogBackdrop, useDialogState } from 'reakit/Dialog';
import Button from '../Button';
import Space from '../Space';
import styles from './index.less';

interface MessageDialogProps {
    title?: string;
    dialogType?: 'confirm'|'tips';
    onClose: () => void;
    onOk?: () => void;
}

export const useMatinaDialogState = () => useDialogState({ animated: true, visible: true, });

const MessageDialog: FC<MessageDialogProps> = ({ children, title, dialogType, onOk, onClose }) => {
    const dialog = useMatinaDialogState();
    const footer = useMemo(() => {
        if (dialogType === 'confirm') {
            return (
                <div className={styles.footer}>
                    <Space>
                        <Button type="small" onClick={() => {
                            dialog.hide();
                            onOk && onOk();
                            onClose();
                        }}>
                            确定
                        </Button>
                        <Button type="small" theme="danger" onClick={() => {
                            dialog.hide();
                            onClose();
                        }}>
                            取消
                        </Button>
                    </Space>
                </div>
            );
        }
        if (dialogType === 'tips') {
            return (
                <div className={styles.footer}>
                    <Space>
                        <Button type="small" onClick={() => {
                            dialog.hide();
                            onOk && onOk();
                            onClose();
                        }}>
                            知道啦
                        </Button>
                    </Space>
                </div>
            );
        }
    }, [dialogType, onClose, dialog]);

    return (
        <DialogBackdrop {...dialog} className={styles.backdrop}>
            <Dialog {...dialog} aria-label="Dialog" className={styles.dialog}>
                <div className={styles.title}>
                    {title}
                    <div className={classNames('fa-font', styles.close)} onClick={() => {
                        dialog.hide();
                        onClose();
                    }} />
                </div>
                <div className={styles.content}>
                    {children}
                    {footer}
                </div>
            </Dialog>
        </DialogBackdrop>
    );
};


export { MessageDialog };

const message = {
    confirm: (title: string, options?: { content?: ReactNode, onOk?: () => void }) => {
        const { content, onOk } = options ?? {};
        const div = document.createElement('div');
        document.body.appendChild(div);

        const destory = () => {
            setTimeout(() => {
                unmountComponentAtNode(div);
                document.body.removeChild(div);
            }, 300);
        };

        render(<MessageDialog title={title} dialogType="confirm" onOk={onOk} onClose={destory}>{content}</MessageDialog>, div);
        
    },
    tips: (title: string) => {
        const div = document.createElement('div');
        document.body.appendChild(div);

        const destory = () => {
            setTimeout(() => {
                unmountComponentAtNode(div);
                document.body.removeChild(div);
            }, 300);
        };

        render(<MessageDialog title={title} dialogType="tips" onClose={destory} />, div);
    },
};

export default message;


