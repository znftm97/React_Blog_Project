import React, { Component } from 'react';
import EditorHeader from 'components/editor/EditorHeader/EditorHeader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';


import * as editorActions from 'store/modules/editor';

class EditorHeaderContainer extends Component {
  componentDidMount() {
    const { EditorActions, location } = this.props;
    EditorActions.initialize(); // 에디터 초기화
  }

  handleGoBack = () => {
    const { history } = this.props;
    history.goBack();
  }

  handleSubmit = async () => {
    const { title, markdown, tags, EditorActions, history, location } = this.props;
    const post = {
      title,
      body: markdown,
      // 태그 텍스트를 ,로 분리시키고 앞뒤 공백을 지운 후 중복되는 값을 제거
      tags: tags === "" ? [] : [...new Set(tags.split(',').map(tag => tag.trim()))]
    };
    try {
      await EditorActions.writePost(post);
      // 페이지 이동, 주의: postId는 상단에서 레퍼런스를 만들지 말고
      // 이 자리에서 this.props.postId를 조회해야함(현재 값을 불러오기 위함).
      history.push(`/post/${this.props.postId}`);
    } catch (e) {
      console.log(e);
    }
  }
    
  render() {
    const { handleGoBack, handleSubmit } = this;
    
    return (
      <EditorHeader
        onGoBack={handleGoBack}
        onSubmit={handleSubmit}
      />
    );
  }
}

export default connect(
  (state) => ({
    title: state.editor.get('title'),
    markdown: state.editor.get('markdown'),
    tags: state.editor.get('tags'),
    postId: state.editor.get('postId')
  }),
  (dispatch) => ({
    EditorActions: bindActionCreators(editorActions, dispatch)
  })
)(withRouter(EditorHeaderContainer));
