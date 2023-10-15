// 클래스 생성 -> 간단하게 작성하기 위해 그냥 바로 class id 반환하게 작성
async function createComment(connection,content,star,imageURL,date,userid,postid) {
  console.log(content,star,imageURL,date,userid,postid);
  const Query = `
        INSERT INTO comment(content,star,image,date,userid,foodid)
        VALUES (?, ?, ?, ?,?,?);
    `;
  await connection.query(Query, [content,star,imageURL,date,userid,postid]);
  const id = await connection.query(
    `SELECT id FROM comment WHERE content = ? AND userid = ? AND date = ?`,
    [content, userid, date]
  );
  return id;
}

// 게시글 별 모든 댓글 조회
async function selectComment(connection,postid) {
  const selectCommentListQuery = `
                SELECT content,star,image,date
                FROM comment
                WHERE foodid = ?;
                `;
  const [commentRows] = await connection.query(selectCommentListQuery,postid);
  return commentRows;
}



module.exports = {
  createComment, selectComment
}