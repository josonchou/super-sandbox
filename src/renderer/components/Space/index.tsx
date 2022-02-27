import React, { FC, useMemo } from 'react';
import classNames from 'classnames';
import './index.less';

export interface SpaceProps {
    gap?: number;
    gapUnit?: 'rem'|'px'|'em';
    layout?: 'horizontal'|'vertical';
    className?: string;
}

const Space: FC<SpaceProps> = (props) => {
    // eslint-disable-next-line
    const { children, gap = 8, gapUnit = 'px', layout = 'horizontal', ...restProps } = props;
    const rewriteChildren = useMemo(() => {
        const gapStyle = layout === 'horizontal' ? {
            marginRight: `${gap}${gapUnit}`,
        } : {
            marginBottom: `${gap}${gapUnit}`,
        };
        const lenOfChildren = React.Children.count(children);
        return React.Children.map(children, (child, index) => {
            const { style } = (child as any)?.props;
            return (
                <div className="dy-space-item" style={index !== lenOfChildren - 1 ? gapStyle : undefined}>
                    {React.cloneElement(child as any, {
                        style: {
                            ...style,
                            margin: 0,
                        },
                    })}
                </div>
            );
        });
    }, [children, layout, gap, gapUnit]);

    const layoutClassName = useMemo(() => {
        return layout === 'horizontal' ? 'dy-space-h' : 'dy-space-v';
    }, [layout]);

    return (
        <div {...restProps} className={classNames(restProps.className, 'dy-space', layoutClassName)}>
            {rewriteChildren}
        </div>
    );
};

export default Space;
