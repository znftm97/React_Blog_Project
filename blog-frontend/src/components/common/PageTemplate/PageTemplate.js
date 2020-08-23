import React, { Children } from 'react';
import styles from './PageTemplate.scss';
import classNames from 'classnames/bind';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';


const cx = classNames.bind(styles);

/*
함수형 컴포넌트, children은 ListPage.js에서 PageTmplate 컴포넌트 안에
컴포넌트들을 의미
*/
const PageTemplate = ({children}) => (
    <div className={cx('page-template')}>
        <Header/>
            <main>
                {children}
            </main>
        <Footer/>
    </div>
    
);

export default PageTemplate;