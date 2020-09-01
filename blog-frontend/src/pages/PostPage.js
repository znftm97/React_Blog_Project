import React from 'react';
import PageTemplate from '../components/common/PageTemplate/PageTemplate';
import PostInfo from '../components/post/PostInfo/PostInfo';
import PostBody from '../components/post/PostBody/PostBody';
import Post from '../containers/post/Post';

const PostPage = ({match}) =>{
    const {id} = match.params;
    return(
        <PageTemplate>
            <Post id={id}/>
        </PageTemplate>
    )
}

export default PostPage;