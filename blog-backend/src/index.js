require('dotenv').config();
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const api=require('./api');
const mongoose = require('mongoose');

const{
    PORT: port=4000, // 값이 존재하지 않으면 4000을 디폴트 값으로 사용
    MONGO_URI: mongoURI // .env 파일의 MONGO_URI 값
} = process.env;

const app =new Koa();
const router = new Router();

mongoose.Promise = global.Promise;
mongoose.connect(mongoURI).then(()=>{
    console.log('connected to mongodb');
}).catch((e) => {
    console.error(e);
});

router.use('/api', api.routes());

app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());


app.listen(port, () =>{
    console.log('4000 ok', port);
});