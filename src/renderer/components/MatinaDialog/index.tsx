/*
 * @description: 
 * @author: 周金顺（云天河）
 */

import classNames from 'classnames';
import React, { FC } from 'react'
import { Dialog, DialogBackdrop, useDialogState } from 'reakit/Dialog';
import styles from './index.less';

interface MatinaDialogProps {
    dialog: any;
    title?: string;
}

const MatinaDialog: FC<MatinaDialogProps> = ({ children, title, dialog }) => {
    return (
        <DialogBackdrop {...dialog} className={styles.backdrop}>
            <Dialog {...dialog} aria-label="Dialog" className={styles.dialog}>
                <div className={styles.title}>
                    {title}
                    <div className={classNames('fa-font', styles.close)} onClick={() => {
                        dialog.hide();
                    }} />
                </div>
                <div className={styles.content}>
                    {children}
                </div>
            </Dialog>
        </DialogBackdrop>
    );
};

export const useMatinaDialogState = () => useDialogState({ animated: true });

export default MatinaDialog;
