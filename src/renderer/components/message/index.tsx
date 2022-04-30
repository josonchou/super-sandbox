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

const info = (type: 'success'|'error', content: string, duration?: number) => {
    const div = document.createElement('div');
    div.id = `message_${Date.now()}_${Math.random()}`;
    div.classList.add(styles.message);
    if (type === 'error') {
        div.classList.add(styles.error)
    }
    div.innerHTML = content;
    document.body.appendChild(div);
    const { offsetWidth } = div;
    div.style.marginLeft = `-${(offsetWidth/2)}px`;
    div.classList.add(styles.visible);
    

    setTimeout(() => {
        div.classList.remove(styles.visible);
        setTimeout(() => {
            document.body.removeChild(div);
        }, 60);
    }, duration ?? 1500);
}

const toast = () => {
    let div: HTMLDivElement|null;
    let contentDiv: HTMLDivElement;
    let timer: any = 0;
    const destory = (delay?: number) => {
        if (timer) {
            clearTimeout(timer);
        }
        if (delay) {
            setTimeout(() => {
                if (contentDiv && div) {
                    div.removeChild(contentDiv);
                }
                if (div) {
                    document.body.removeChild(div);
                }
                div = null;
            }, delay);
            return;
        }
        if (contentDiv && div) {
            div.removeChild(contentDiv);
        }
        if (div) {
            document.body.removeChild(div);
        }
        div = null;
    };
    return (content: string, duration?: number) => {
        const timeout = duration || 3000;
        if (timer) {
            clearTimeout(timer);
        }
        const delayClose = () => {
            if (timer) {
                clearTimeout(timer);
            }
            if (duration !== 0) {
                timer = setTimeout(() => {
                    destory();
                }, timeout);
            }
        };
        
        if (div) {
            contentDiv.innerHTML = content;
            delayClose();
            return destory;
        }
        div = document.createElement('div');
        contentDiv = document.createElement('div');
        div.id = `toast_${Date.now()}_${Math.random()}`;
        div.classList.add(styles.toast);
        contentDiv.classList.add(styles.toastContent);
        contentDiv.innerHTML = content;
        div.appendChild(contentDiv);
        document.body.appendChild(div);
        
        delayClose();

        return destory;
    };
}

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
    success: (content: string, duration?: number) => info('success', content, duration),
    error: (content: string, duration?: number) => info('error', content, duration),
    toast: toast(),
};

export default message;


