const { imageUploader_comment} = require("../../../config/s3Uploader");
const jwtMiddleware = require('../../../config/jwtMiddleware');
module.exports = function(app){
    const comment = require('./commentController');

    // 후기 댓글 작성
    app.post('/app/comments/:postId',jwtMiddleware,imageUploader_comment.single("image"),comment.createComment);

    // 후기 댓글 목록 출력
    app.get('/app/comments/:postId',comment.getCommentList);

    // 수정, 삭제에서 굳이 postId 넘겨줄필요없을것같긴한데.....보류
    // 후기 댓글 수정
    app.patch('/app/comments/:postId/:commentId', jwtMiddleware, comment.patchComment);

    // 후기 댓글 삭제
    app.get("/app/comments/:postId/:commentId",jwtMiddleware, comment.deleteComment);

    // 별점 평균 반환
};