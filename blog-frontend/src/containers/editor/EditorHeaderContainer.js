import React, { Component } from 'react';
import EditorHeader from 'components/editor/EditorHeader/EditorHeader'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as editorActions from 'store/modules/editor';

class EditorHeaderContainer extends Component{

    componentDidMount(){
        const {editorActions} = this.props;
        editorActions.initialize();
    }

    handleGoBack = () =>{
        const {history} = this.props;
        history.goBack();
    }

    handleSubmit = async () => {
        const {title, markdown, tags, editorActions, history} = this.props;
        const post = {
            title,
            body: markdown,
            tags: tags === "" ? [] : [...new Set(tags.split(',').map(tag=> tag.trim()))]
        };
        try{
            await editorActions.writePost(post);
            history.push(`/post/${this.props.postId}`);
        } catch (e){
            console.log(e);
        }
    }

    render(){
        const { handleGoBack, handleSubmit } = this;
        return(
            <EditorHeader
                onGoBack={handleGoBack}
                onSubmit={handleSubmit}
            />
        )
    }
}

export default connect(
    (state) => ({
        title : state.editor.get('title'),
        markdown: state.editor.get('markdown'),
        tags: state.editor.get('tags'),
        postId : state.editor.get('postId')
    }),
    (dispatch) => ({
        editorActions: bindActionCreators(editorActions, dispatch)
    })
)(withRouter(EditorHeaderContainer));

