module.exports = function(app){
    const post = require('./postController');

    //food생성
    app.post('/app/foodcreate', post.foodCreate);
    //food 조회
    app.get('/app/getfood', post.getFoodList);
    //특정 푸드 조회
    app.get('/app/getfood/:id', post.getFood);
    //food 수정
    app.put('/app/foodupdate/:id', post.foodUpdate);
    //food 삭제
    app.delete('/app/fooddelete/:id', post.foodDelete);
}