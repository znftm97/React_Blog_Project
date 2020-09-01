import React, { Component } from 'react';
import PostInfo from 'components/post/PostInfo/PostInfo';
import PostBody from 'components/post/PostBody/PostBody';
import * as postActions from 'store/modules/post';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Post extends Component{

    initialize = async () =>{
        const {postActions, id} = this.props;
        try{
            await postActions.getPost(id);
        }catch(e){
            console.log(e);
        }
    }

    componentDidMount(){
        this.initialize();
    }

    render(){
        const {loading, post} = this.props;
        if(loading) return null; // 로딩중일때는 아무것도 보여주지 않음
        const {title, body, publishedDate, tags} = post.toJS();
        return(
            <div>
                <PostInfo title={title} publishedDate={publishedDate} tags={tags}/>
                <PostBody body={body}/>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        post: state.post.get('post'),
        loading: state.pender.pending['post/GET_POST'] // 로딩 상태
    }),
    (dispatch) => ({
        postActions: bindActionCreators(postActions, dispatch)
    })
)(Post);