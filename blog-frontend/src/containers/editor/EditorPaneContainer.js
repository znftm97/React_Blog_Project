import React, { Component } from 'react';
import EditorPane from 'components/editor/EditorPane/EditorPane'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as editorActions from 'store/modules/editor'; // 모든 액션함수 불러옴

class EditorPaneContainer extends Component{
    handleChangeInput = ({name, value}) =>{
        const {EditorActions} = this.props;
        EditorActions.changeInput({name, value});
    }

    render(){
        const {title, tags, markdown} = this.props;
        const {handleChangeInput} = this;

        return(
            <EditorPane
                title = {title}
                markdown = {markdown}
                tags = {tags}
                onChangeInput={handleChangeInput}
            />
        )
    }
}

// 클래스형 컴포넌트에서는 connect함수 사용하지만 함수형 컴포넌트에서는
// Hooks을 사용하기 떄문에 connect함수는 쓸일이 많지않을 것 같음
// useSelector, useDispatch가 대신할 것
export default connect(
    // 액션생성 함수들이 들어있는 객체
    (state) => ({
        title: state.editor.get('title'),
        markdown : state.editor.get('markdown'),
        tags: state.editor.get('tags')
    }),
    (dispatch) => ({
        EditorActions : bindActionCreators(editorActions, dispatch)
    })
)(EditorPaneContainer);