const { pool } = require("../../../config/database");

const commentDao = require("./commentDao");

exports.getCommentList = async function (postid) {
  const connection = await pool.getConnection(async (conn) => conn);
  const commentListResult = await commentDao.selectComment(connection,postid);
  connection.release();

  return commentListResult;
};
