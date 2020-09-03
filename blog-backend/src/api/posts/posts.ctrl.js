const Post = require('models/post');
const Joi = require('joi');
const { ObjectId } = require('mongoose').Types;

exports.checkObjectId = (ctx, next) => {
  const { id } = ctx.params;

  // 검증 실패
  if (!ObjectId.isValid(id)) {
    ctx.status = 400; // 400 Bad Request
    return null;
  }

  return next(); // next를 리턴해주어야 ctx.body가 제대로 설정됨
};

// 데이터 생성
exports.write = async (ctx) => {
    // 객체가 지닌 값들을 검증
    const schema = Joi.object().keys({
      title: Joi.string().required(), // 뒤에 required를 붙여주면 필수 항목이라는 의미
      body: Joi.string().required(),
      tags: Joi.array().items(Joi.string()).required() // 문자열 배열
    });
  
    // Joi.validate는 삭제된듯 문법 바뀜
    const result = schema.validate(ctx.request.body);
    
  
    // 오류 발생 시 오류 내용 응답
    if (result.error) {
      ctx.status = 400;
      ctx.body = result.error;
      return;
    }
  
    const { title, body, tags } = ctx.request.body;
  
    // 새 Post 인스턴스를 생성
    // 생성자 함수의 파라미터에 객체(title,body,tags) 넣음
    const post = new Post({
      title, body, tags
    });
  
    try {
      await post.save(); // 데이터베이스에 등록
      ctx.body = post; // 저장된 결과를 반환
    } catch (e) {
      // 데이터베이스의 오류 발생
      ctx.throw(e, 500);
    }
  };

//데이터 조회
// GET /api/posts
exports.list = async (ctx) =>{
    //page가 없으면 1로 간주
    // query는 문자열 형태로 받아오므로 int형으로 변환
    const page = parseInt(ctx.query.page || 1,10);

    //잘못된 페이지가 오면 오류
    if(page<1){
        ctx.status = 400;
         return;
    }

    try{
        // 포스트를 역순으로 보이기 위한 sort함수
        // sort함수 파라미터값이 1이면 오름차순 , -1은 내림차순
        // limit 함수는 한번에 보이는 페이지 개수 제한
        const posts = await Post.find()
            .sort({_id: -1})
            .limit(10)
            .skip((page-1)*10)
            .lean()
            .exec();
        
        const postCount = await Post.countDocuments().exec();
        const limitBodyLength = post => ({
            ...post,
            body: post.body.length < 200 ? post.body : `${post.body.slice(0,200)}...`
        });
        ctx.body=posts.map(limitBodyLength);

        // 마지막 페이지 알려줌
        // ctx.set은 response header를 결정
        ctx.set('Last-Page', Math.ceil(postCount/10));
    }catch(e){
        ctx.throw(e, 500);
    }
};

// 특정 데이터 조회
// GET /api/posts/id
exports.read = async (ctx) => {
    const { id } = ctx.params;
    try {
      const post = await Post.findById(id).exec();
      // 포스트가 존재하지 않음
      if (!post) {
        ctx.status = 404;
        return;
      }
      ctx.body = post;
    } catch (e) {
      ctx.throw(e, 500);
    }
  };

// 데이터 삭제
// DELETE /api/posts/id
exports.remove = async (ctx) =>{
    const {id} = ctx.params;
    try{
        await Post.findByIdAndRemove(id).exec();
        ctx.status = 204;
    } catch(e){
        ctx.throw(e, 500);
    }
};

// 데이터 수정
// PATCH /api/posts/id
// {title, body, tags}
exports.update = async (ctx) =>{
    const {id} = ctx.params;
    try{
        const post = await Post.findByIdAndUpdate(id, ctx.request.body,{
            new: true
            // 이 값 설정해야 업데이트된 객체를 반환함
            // 설정하지 않으면 업데이트되기 전의 객체를 반환함
        }).exec();
        // 포스트 존재 하지 않을 때
        if(!post){
            ctx.status = 404;
            return;
        }
        ctx.body=post;
    } catch(e){
        ctx.throw(e, 500);
    }
};
