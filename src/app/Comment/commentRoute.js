const { imageUploader_comment} = require("../../../config/s3Uploader");
const jwtMiddleware = require('../../../config/jwtMiddleware');
module.exports = function(app){
    const comment = require('./commentController');

    // 후기 댓글 작성
    app.post('/app/comments/:postId',jwtMiddleware,imageUploader_comment.single("image"),comment.createComment);

    // 후기 댓글 목록 출력
    // app.get('/app/comments/:postId',comment.getCommentList);
};