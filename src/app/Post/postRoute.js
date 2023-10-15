const multer = require('multer');
const upload = multer();
const {imageUploader_board} = require("../../../config/imageUploader");
module.exports = function(app){
    const post = require('./postController');
    const jwtMiddleware = require("../../../config/jwtMiddleware");

    //food생성
    app.post('/app/foodcreate', jwtMiddleware, post.foodCreate);
    //food 카테고리별로 조회
    app.get('/app/getfood/:categoryid', jwtMiddleware, post.getFoodList);
    //특정 푸드 조회
    app.get('/app/getfood/:id', jwtMiddleware, post.getFood);
    //food 수정
    app.put('/app/foodupdate/:id', jwtMiddleware, post.foodUpdate);
    //food 삭제
    app.delete('/app/fooddelete/:id', jwtMiddleware, post.foodDelete);
}