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
                SELECT u.nickname, c.content, c.star, c.image, DATE_FORMAT(c.date, '%Y-%m-%d %H:%i:%s') AS date
                FROM comment c
                INNER JOIN user u ON c.userid = u.id
                WHERE c.foodid = ?;
                `;
  const [commentRows] = await connection.query(selectCommentListQuery,postid);
  return commentRows;
}

//댓글 수정
async function updateCommentInfo(connection, content,star,imageURL,date,userid,commentid) {
  const updateCommentQuery = `
  UPDATE comment
  SET content = ?, star = ?, image = ?, date = ?
  WHERE userid = ? AND id = ?;`;
  const updateCommentRow = await connection.query(updateCommentQuery, [content,star,imageURL,date,userid,commentid]);
  return updateCommentRow[0];
}

// 댓글 있는지 확인
async function getCommentIsExists(connection,commentid){
  const result = await connection.query(
    `SELECT * FROM comment WHERE id = ?`,
    [commentid]
  );
  return result[0];
}

//댓글 작성자인지 확인
async function getCommentWriter(connection,commentid){
  const result = await connection.query(
    `SELECT userid FROM comment WHERE id = ?`,[commentid]
  )
  return result[0];
}

//댓글 삭제
async function deleteComment(connection,commentid){
  const result = await connection.query(
    `DELETE FROM comment WHERE id = ?`,
    [commentid]
  )
  return result;
}



//별점 개수 반환
async function getStarCount(connection,postid){
  const result = await connection.query(
    `SELECT star, COUNT(*) AS starCount
    FROM comment
    WHERE foodid = ?
    GROUP BY star
    ORDER BY star;
    `,[postid]
  )
  return result[0];
}

//별점 평균 반환
async function getStarAvg(connection, foodid){
  try {
      const result = await connection.query(
          `SELECT AVG(star) AS avg_star FROM comment WHERE foodid = ?`, foodid
      );
      
      
      if (result[0]) {
          return result[0];
      } else {
          console.log("No comments found for foodid:", foodid);
          return 0;
      }
  } catch (error) {
      console.error(error);
      // throw error; // 에러를 던지지 않고 그냥 반환
      return 0;
  }
};

// 마이페이지 - 내가 쓴 댓글 확인
async function selectMyComment(connection, userid) {
  const selectCommentListQuery = `
                SELECT u.nickname, c.content, c.star, c.image, DATE_FORMAT(c.date, '%Y-%m-%d %H:%i:%s') AS date
                FROM comment c
                INNER JOIN user u ON c.userid = u.id
                WHERE c.userid = ${userid};
                `;
  const [commentRows] = await connection.query(selectCommentListQuery);
  return commentRows;
};

// 게시글 별점 평균 update
async function updateFoodstar(connection,id,star) { 
  console.log("쿼리문 star:"+star)
  const updateFoodQuery = `
      UPDATE food
          SET
          star = ?
      WHERE id = ${id};
  `;
  const updateFoodRow = await connection.query( 
      updateFoodQuery,
      [star] 
  );

  return updateFoodRow; 
};


module.exports = {
  createComment, selectComment, updateCommentInfo, getCommentIsExists, getCommentWriter, deleteComment, getStarCount, selectMyComment, getStarAvg, updateFoodstar
}