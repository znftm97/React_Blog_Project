// 단일 포스트 상태를 다루는 컴포넌트
import {createAction, handleActions} from 'redux-actions';
import {Map, fromJS} from 'immutable';
import {pender} from 'redux-pender';
import * as api from 'lib/api';

// 액션 타입 정의
const GET_POST = 'post/GET_POST';

// 액션 생성
export const getPost = createAction(GET_POST, api.getPost);

//initial state
const initialState = Map({
    post: Map({})
});

//reducer
export default handleActions({
    ...pender({
        type: GET_POST,
        onSuccess: (state, action) => {
            const { data: post } = action.payload;
            return state.set('post', fromJS(post));
        }
    })
},initialState)