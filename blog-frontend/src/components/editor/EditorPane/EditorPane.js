import React, { Component } from 'react';
import styles from './EditorPane.scss';
import classNames from 'classnames/bind';
import CodeMirror from 'codemirror';
import 'codemirror/mode/markdown/markdown'; // 마크다운 문법 색상
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/css/css';
import 'codemirror/mode/shell/shell';

// CodeMirror를 위한 css 스타일
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import codemirror from 'codemirror';

const cx = classNames.bind(styles);

class EditorPane extends Component{

    eidtor = null;
    codeMirror=null;
    cursor = null; // 에디터의 커서 위치

    initializeEditor = () =>{
        this.codeMirror = CodeMirror(this.eidtor, {
            mode: 'markdown',
            theme: 'monokai',
            lineNumbers: true, // 왼쪽에 라인 숫자 표시
            lineWrapping: true // 내용이 길어지면 다음줄로
        });
        this.codeMirror.on('change', this.handleChangeMarkdown);
    }

    componentDidMount(){
        this.initializeEditor();
    }

    handleChange = (e) =>{
        const {onChangeInput} = this.props;
        const {name, value} = e.target;
        onChangeInput({name, value});
    }

    handleChangeMarkdown =(doc) =>{
        const {onChangeInput}= this.props;
        this.cursor = doc.getCursor(); // 커서 위치 저장
        onChangeInput({
            name: 'markdown',
            value: doc.getValue()
        })
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.markdown !== this.props.markdown){
            const {codeMirror, cursor} = this;
            if(!codeMirror) return; // 인스턴스를 아직 안 만들었을 때
            codeMirror.setValue(this.props.markdown);
            if(!cursor) return; // 커서가 없을때
            codeMirror.setCursor(cursor);
        }
    }

    render(){
        const {handleChange} = this;
        const {tags,title} = this.props;
        return(
            <div className={cx('editor-pane')}>
                <input 
                    className={cx('title')} 
                    placeholder="Title" 
                    name="title"
                    value={title}
                    onChange={handleChange}
                />
                <div className={cx('code-editor')} ref={ref => this.eidtor=ref}></div>
                <div className={cx('tags')}>
                    <div className={cx('description')}>Tag</div>
                    <input 
                        name="tags" 
                        placeholder="Tag Input(쉼표로 구분)"
                        value={tags}
                        onChange={handleChange}
                    />
                </div>
            </div>
        )
    }
}

export default EditorPane;