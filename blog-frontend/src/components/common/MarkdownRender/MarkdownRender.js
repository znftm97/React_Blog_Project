import React, { Component } from 'react';
import styles from './MarkdownRender.scss';
import classNames from 'classnames/bind';
import marked from 'marked';
//prismjs 라이브러리
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css'
// 지원할 코드 형식 불러옴
// https://prismjs.com/#languages-list
import 'prismjs/components/prism-bash.min.js';
import 'prismjs/components/prism-javascript.min.js'
import 'prismjs/components/prism-jsx.min.js';
import 'prismjs/components/prism-css.min.js';

const cx = classNames.bind(styles);

class MarkdownRender extends Component{
    state = {
        html: ''
    }

    renderMarkdown =()=>{
        const {markdown} = this.props;
        
        // 마크다운이 존재하지않으면 공백 처리
        if(!markdown){
            this.setState({html:''})
            return;
        }
        this.setState({
            html: marked(markdown, {
                breaks: true, // 엔터로 새줄 입력
                sanitize: true // 마크다운 내부 html 무시
            })
        })
    }

    constructor(props){
        super(props);
        const {markdown} = props;

        // 서버사이드 렌더링에서 마크다운 처리되도록 생성자쪽에서도 구현
        this.state={
            html: markdown? marked(props.markdown, {breaks: true, sanitize: true}) : ''
        }
    }

    componentDidUpdate(prevProps, prevState){
        // markdown값이 변경되면 renderMarkdown을 호출
        if(prevProps.markdown !== this.props.markdown){
            this.renderMarkdown();
        }
        // state값 변경되면 코드 하이라이팅
        if(prevState.html !== this.state.html){
            Prism.highlightAll();
        }
    }

    render(){
        const {html} = this.state;
        //React에서 html을 렌더링하려면 객체를 생성해 내부에 __html값을 설정해야함
        const markup={
            __html: html
        }

        // 생성한 객체를 dangerouslySetInnerHTML값에 넣어주면 됨
        return(
            <div className={cx('markdown-render')} dangerouslySetInnerHTML={markup}/>
        )
    }
}

export default MarkdownRender;