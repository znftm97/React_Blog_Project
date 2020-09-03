import axios from 'axios';
import queryString from 'query-string';

export const writePost = ({title, body, tags}) => axios.post('/api/posts', { title, body, tags });
export const getPost = (id) => axios.get(`/api/posts/${id}`);
export const getPostList = ({ tag, page }) => axios.get(`/api/posts/?${queryString.stringify({ tag, page })}`); // 객체를 URL 쿼리 문자열로 변환하는 함수 stringify