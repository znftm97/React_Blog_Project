import React, { Component } from 'react';
import styles from './PreviewPane.scss';
import classNames from 'classnames/bind';
import MarkdwonRender from 'components/common/MarkdownRender/MarkdownRender';
const cx = classNames.bind(styles);

const PreviewPane = ({markdown, title}) =>(
    <div className={cx('preview-pane')}>
        <h1 className={cx('title')}>
            {title}
        </h1>
        <div>
            <MarkdwonRender markdown={markdown}/>
        </div>
    </div>
)

export default PreviewPane;