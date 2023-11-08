const { pool } = require("../../../config/database");

const commentDao = require("./commentDao");

//댓글 출력
exports.getCommentList = async function (postid) {
  const connection = await pool.getConnection(async (conn) => conn);
  const commentListResult = await commentDao.selectComment(connection,postid);
  connection.release();

  return commentListResult;
};

// 댓글 있는지 확인
exports.getCommentIsExists = async function(commentid){
  const connection = await pool.getConnection(async (conn) => conn);
  const result = await commentDao.getCommentIsExists(connection, commentid);
  connection.release();
  return result;
}

// 댓글 작성자인지 확인
exports.getCommentWriter = async function(commentid){
  const connection = await pool.getConnection(async (conn) => conn);
  const result = await commentDao.getCommentWriter(connection,commentid);
  connection.release();
  return result;
}

// 별점 평균 반환
exports.getStarAvg = async function(postid){
  const connection = await pool.getConnection(async (conn) => conn);
  const result = await commentDao.getStarAvg(connection,postid);
  connection.release();
  return result;
}

// 별점 개수 반환
exports.getStarAvg = async function(postid){
  const connection = await pool.getConnection(async (conn) => conn);
  const result = await commentDao.getStarCount(connection,postid);
  connection.release();
  return result;
}
