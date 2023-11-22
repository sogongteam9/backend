const multer = require('multer');
const upload = multer();
const {imageUploader_post} = require("../../../config/s3Uploader");
module.exports = function(app){
    const post = require('./postController');
    const jwtMiddleware = require("../../../config/jwtMiddleware");

    //food생성
    app.post('/app/foodcreate', jwtMiddleware, imageUploader_post.single("image"),  post.foodCreate);
    //food 카테고리별로 조회
    app.get('/app/getcategoryfood/:categoryid', post.getFoodList);
    //특정 푸드 조회
    app.get('/app/getfood/:id', post.getFood);
    //food 수정
    app.put('/app/foodupdate/:id', jwtMiddleware,  imageUploader_post.single("image"), post.foodUpdate);
    //food 삭제
    app.delete('/app/fooddelete/:id', jwtMiddleware, post.foodDelete);
}