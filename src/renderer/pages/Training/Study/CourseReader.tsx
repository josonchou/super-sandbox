/*
 * @description: 
 * @author: 周金顺（云天河）
 */

import request, { getServerHost } from '@renderer/lib/request';
import { ReactSVG } from 'react-svg';
import fullscreenSvg from '@assets/svg/fullscreen.svg';
import fullscreenExitSVG from '@assets/svg/fullscreenexit.svg';
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import screenfull from 'screenfull';
import styles from './CourseReader.less';
import classNames from 'classnames';
import message from '@renderer/components/message';
import useMemoFn from '@renderer/lib/useMemoFn';

interface CourseReaderProps {
    title?: string;
    type?: string;
    src?: string;
    cover?: string;
    uuid: string;
}

const renderDoc = (conf: any) => {
    return request({
        url: '/files/reader/token',
        method: 'post',
        data: conf,
    }).then(([isOk, token]) => {
        if (isOk) {
            conf.token = token as string;
            const editor = new (window as any).DocsAPI.DocEditor("docReader", conf);
            return editor;
        }

        return null;
    }).catch(() => {
        return null;
    });
}

const getDocumentType = (fileExt: string) => {
    switch (fileExt) {
        case 'pdf':
            return 'pdf';
        case 'doc':
        case 'docx':
        case 'txt':
            return 'word';
        case 'xls':
        case 'xlsx':
            return 'cell';
        case 'ppt':
        case 'pptx':
            return 'slide';
        default:
            return 'other';
    }
}

const PDFReader: FC<any> = ({ src }) => {
    return (
        <object
            className={styles.pdf}
            type="application/pdf"
            data={`${src}#page=1&view=FitH,top`}
            width="100%"
            height="100%"
        />
        // <div />
    );
}

const OfficeReader: FC<any> = ({ title, uuid, type, src }) => {
    const editor = useRef<any>();
    const [isHide, setIsHide] = useState(true);

    const destory = useMemoFn(() => {
        setIsHide(true);
        try {
            if (editor.current && editor.current.destroyEditor) {
                editor.current.destroyEditor();
            }
        } catch (e) {

        }
    });

    useEffect(() => {
        
        if (!type || !src) {
            return () => {
                destory();
            };
        }

        // eslint-disable-next-line
        const config = {
            "width": "100%",
            "height": "100%",
            "token": "",
            // "type": "embedded",
            "document": {
                "fileType": "",
                "key": "Khirz6zTPdfd7",
                "title": "",
                "url": src,
                "info": {
                    "author": "SANDBOX",
                    "created": "NOW",
                },
                "permissions": {
                    "comment": false,
                    "download": false,
                    "edit": false,
                    "fillForms": false,
                    "modifyFilter": false,
                    "modifyContentControl": false,
                    "review": false
                },
            },
            // "documentType": getDocumentType(type),
            "editorConfig": {
                "actionLink": null,
                "mode": "view",
                "lang": 'zh-CN',
                "user": {
                    "id": "uid-1",
                    "name": "SANDBOX"
                },
                "callbackUrl": `${getServerHost()}/track`,
            },
            "customization": {
                "autosave": false,
                "about": false,
                "chat": true,
                "comments": false,
                "feedback": false,
                "forcesave": false,
                "goback": false,
                "help": false,
                "hideNotes": true,
                "hideRightMenu": true,
                "plugins": false,
                "toolbarHideFileName": false,
                "toolbarNoTabs": true,
                "compactHeader": false,
                "compactToolbar": false,
                "compatibleFeatures": false,
                "unit": "cm",
                "zoom": 100
            },
            "fileChoiceUrl": "",
            "plugins": {"pluginsData":[]},
        };

        if (['docx', 'pptx', 'doc', 'ppt', 'xlsx', 'xls'].includes(type)) {
            config.document.title = title ?? '文档';
            config.document.fileType = type;
            config.document.key = `${uuid}`;
            destory();
            renderDoc(config).then((ed) => {
                editor.current = ed;
                setIsHide(false);
            });
        }

        return () => {
            destory();
        };
    }, [type, src, title, uuid]);

    return (
        <div style={{ display: isHide ? 'none' : undefined, width: '100%', height: '100%' }}>
            <div id="docReader" />
        </div>
    );
};

const CourseReader: FC<CourseReaderProps> = ({ uuid, title, type, src, cover }) => {
    const [isHover, setIsHover] = useState(true);
    const [hideFullscreen, setHideFullscreen] = useState(false);

    const readerElem = useMemo(() => {
        if (!src) {
            return <div />;
        }
        if (type === 'video' || type === 'mp4') {
            return (
                <div className={styles.video}>
                    <div className={styles['video-container']}>
                        <video
                            preload="meta"
                            // poster="http://imgcdn.170hi.com/wmvpic/640/68/57/3075077292.jpg?imageView2/format/jpg/q/40"
                            poster={cover}
                            controls
                            autoPlay={false}
                            className={styles.video}
                            // onContextMenu="return false;"
                            // height="100%" width="100%"
                            // style="background-color: #333;"
                        >
                            <source
                                // src="http://antiserver.kuwo.cn/anti.s?rid=MUSIC_7154771&amp;response=res&amp;format=mp4|mkv&amp;type=convert_url"
                                src={src}
                                type="video/mp4"
                            />
                        </video>
                    </div>
                </div>
            );
        }

        if (type === 'pdf') {
            return (
                <PDFReader src={src} />
            );
        }

        return null;
    }, [type, src, title]);

    useEffect(() => {
        setTimeout(() => {
            setIsHover(false);
        }, 1000);
        if (screenfull.isEnabled) {
            screenfull.on('change', () => {
                setHideFullscreen(screenfull.isFullscreen);
            });
        }
    }, []);

    const tooltip = useMemo(() => {
        if (getDocumentType(type ?? '') === 'slide' || getDocumentType(type ?? '') === 'other') {
            return null;
        }
        return (
            <div
                className={classNames(styles.fullscreen, {
                    [styles.isActive]: isHover,
                })}
                onClick={() => {
                    if (!screenfull.isEnabled) {
                        return;
                    }
                    if (!screenfull.isFullscreen) {
                        const ele = document.querySelector('#courseReader');
                        if (ele) {
                            screenfull.request(ele, {
                                navigationUI: 'show',
                            });
                        }
                    } else {
                        screenfull.exit();
                    }
                }}
            >
                {
                    hideFullscreen ? (
                        <ReactSVG src={fullscreenExitSVG} />
                    ) : (
                        <ReactSVG src={fullscreenSvg} />
                    )
                }
                
            </div>
        );
    }, [isHover, hideFullscreen, type]);
    
    return (
        <div id="courseReader" className={styles['course-reader']}>
            <OfficeReader src={src} type={type} title={title} uuid={uuid} />
            {readerElem}
            {tooltip}
        </div>
    );
};

export default CourseReader;
