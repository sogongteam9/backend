const { imageUploader_comment} = require("../../../config/s3Uploader");
const jwtMiddleware = require('../../../config/jwtMiddleware');
module.exports = function(app){
    const comment = require('./commentController');

    // 후기 댓글 작성
    app.post('/app/comments/:postId',jwtMiddleware,imageUploader_comment.single("image"),comment.createComment);

    // 후기 댓글 목록 출력
    app.get('/app/comments/:postId',comment.getCommentList);

    // 후기 댓글 수정
    app.patch('/app/comments/:commentId', jwtMiddleware,imageUploader_comment.single("image"), comment.patchComment);

    // 후기 댓글 삭제
    app.get("/app/deletecomment/:commentId",jwtMiddleware, comment.deleteComment);

    // 마이페이지 - 자신이 작성한 댓글 목록 확인
    app.get("/app/mypage/:userId",jwtMiddleware, comment.myComment)

    
};