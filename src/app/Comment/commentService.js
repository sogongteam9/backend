const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const commentDao = require("./commentDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

//댓글 작성
exports.createComment = async function (
  content,star,imageURL,date,userid,postid
) {
  try{
    const connection = await pool.getConnection(async (conn) => conn);
    var commentId= await commentDao.createComment(connection,content,star,imageURL,date,userid,postid);
    commentId = commentId[0][0].id;

    connection.release();

    return response(baseResponse.SUCCESS);

  }catch(err){
    return errResponse(baseResponse.DB_ERROR);
  }
};

//댓글 수정
exports.editComment = async function (content,star,imageURL,date,userid,commentid) {
  try {
      console.log(commentid)

      const connection = await pool.getConnection(async (conn) => conn);
      const editUserResult = await commentDao.updateCommentInfo(connection, content,star,imageURL,date,userid,commentid)
      connection.release();

      return response(baseResponse.SUCCESS);

  } catch (err) {
      return errResponse(baseResponse.DB_ERROR);
  }
};

// 댓글 삭제
exports.deleteComment = async function (commentid){
  try{
    const connection = await pool.getConnection(async (conn) => conn);
    const result = await commentDao.deleteComment(connection,commentid);
    connection.release();
    return response(baseResponse.SUCCESS);
  }catch(err){
    return errResponse(baseResponse.DB_ERROR);
  }
};