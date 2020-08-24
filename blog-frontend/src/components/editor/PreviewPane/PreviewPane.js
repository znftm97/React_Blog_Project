import React, { Component } from 'react';
import styles from './PreviewPane.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const PreviewPane = ({markdown, title}) =>(
    <div className={cx('preview-pane')}>
        <h1 className={cx('title')}>
            Title
        </h1>
        <div>
            Text
        </div>
    </div>
)

export default PreviewPane;