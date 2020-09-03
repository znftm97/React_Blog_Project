import React from 'react';
import PageTemplate from '../components/common/PageTemplate/PageTemplate';
import ListWrapper from '../components/list/ListWrapper/ListWrapper';
import PostList from '../components/list/PostList/PostList';
import Pagination from '../components/list/Pagination/Pagination';
import ListContainer from '../containers/list/ListContainer';

const ListPage = ({match}) => {
    // page의 기본값을 1로 설정합니다.
    const { page = 1, tag } = match.params;
    
    
    return (
      <PageTemplate>
        <ListWrapper>
          <ListContainer
            page={parseInt(page, 10)}
            tag={tag}
          />
        </ListWrapper>
      </PageTemplate>
    );
  };
  
  export default ListPage;