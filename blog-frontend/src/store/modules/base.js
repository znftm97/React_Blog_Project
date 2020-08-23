// 단일 포스트 상태를 다루는 컴포넌트
import {createAction, handleActions} from 'redux-actions';
import {Map} from 'immutable';
import {pender} from 'redux-pender';

//initial state
const initialState = Map({});

//reducer
export default handleActions({

},initialState)