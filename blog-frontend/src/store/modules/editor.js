// 단일 포스트 상태를 다루는 컴포넌트
import {createAction, handleActions} from 'redux-actions';
import {Map} from 'immutable';
import {pender} from 'redux-pender';
import * as api from 'lib/api';

/*
Ducks 구조의 redux
Ducks 구조란 ActionTypes, Reducer, Actions 파일을 분리하지 않고
하나의 파일에 작성 하는 것

주의사항
reducer를 메인으로 내보내야함
액션 생성(action creators)함수를 내보내야함
*/

// 액션타입 정의 액션이름 SET_INPUT , 액션타입 정의 시 앞부분에 리듀서 이름을 적어주면
// 액션 타입이름이 다른 리듀서끼리 중복되어도 문제 없음
const INITIALIZE = 'editor/INITIALIZE';
const CHANGE_INPUT = 'editor/CHANGE_INPUT';
const WRITE_POST =  'editor/WRITE_POST';

//action creators
export const initialize = createAction(INITIALIZE);
export const changeInput = createAction(CHANGE_INPUT);
export const writePost = createAction(WRITE_POST);

//initial state
//리듀서 초기상태 정의
const initialState = Map({
    title: '',
    markdown:'',
    tags:'',
    postId:''
});

// handleActions 를 이용하여 리듀서 정의(생성)
export default handleActions({
    // 액션을 []로 감싸는 이유는 위 액션타입에 접두사가 있기 때문임
    //immutable의 Map의 set 함수, js의 Map과는 다름
    //value에 action.payload 값으로 세팅
    //createAction으로 액션을 만들면 액션에 필요한 추가 데이터는 payload라는 이름을 사용함
    [INITIALIZE]: (state,action) => initialState,
    [CHANGE_INPUT]: (state,action) => {
        const {name, value} = action.payload;
        return state.set(name,value);
    },
    ...pender({
        type: WRITE_POST,
        onSuccess: (state, action) =>{
            const { _id } = action.payload.data;
            return state.set('postId', _id);
        }
    })
},initialState)