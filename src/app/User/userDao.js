// 모든 유저 조회
async function selectUser(connection) {
  const selectUserListQuery = `
                SELECT email, nickname 
                FROM user;
                `;
  const [userRows] = await connection.query(selectUserListQuery);
  return userRows;
}

// 이메일로 회원 조회
async function selectUserEmail(connection, email) {
  const selectUserEmailQuery = `
                SELECT email, nickname 
                FROM user
                WHERE email = ?;
                `;
  const [emailRows] = await connection.query(selectUserEmailQuery, email);
  return emailRows;
}

//닉네임으로 회원 조회
async function selectUserNickname(connection, nickname) {
  const selectUserNicknameQuery = `
                SELECT email, nickname 
                FROM user
                WHERE nickname = ?;
                `;
  const [nicknameRows] = await connection.query(selectUserNicknameQuery, nickname);
  return nicknameRows;
}

//현재 닉네임이면 오류 반환안되게 하기 위해 현재 user의 nickname반환하기
async function selectIdNickname(connection, userid) {
  const selectUserNicknameQuery = `
                SELECT nickname 
                FROM user
                WHERE id = ?;
                `;
  const [nicknameRows] = await connection.query(selectUserNicknameQuery, userid);
  return nicknameRows;
}

// 유저 생성
async function insertUserInfo(connection, insertUserInfoParams) {
  const insertUserInfoQuery = `
        INSERT INTO user(email,password,phonenum, nickname)
        VALUES (?, ?,?, ?);
    `;
  const insertUserInfoRow = await connection.query(
    insertUserInfoQuery,
    insertUserInfoParams
  );

  return insertUserInfoRow;
}



//패스워드 가져오기 + 있는지도 확인

async function loginCheck(connection, Param) {
  console.log(Param);
  const selectUserPasswordQuery = `
        SELECT id, email, password
        FROM user 
        WHERE email = ? AND password = ?;`;
  const selectUserPasswordRow = await connection.query(
    selectUserPasswordQuery, 
    Param 
  );
  
  return selectUserPasswordRow;
  
}

//정보 수정 전에 비밀번호 확인
async function editCheck(connection, id,hashedPassword) {
  console.log(id);
  const selectUserPasswordQuery = `
        SELECT id, password
        FROM user 
        WHERE id = ? AND password = ?;`;
  const selectUserPasswordRow = await connection.query(
    selectUserPasswordQuery, 
    [id,hashedPassword]
  );
  
  return selectUserPasswordRow;
}

//회원 정보 수정
async function updateUserInfo(connection, id, editUserInfoParams) {
  const updateUserQuery = `
  UPDATE user
  SET nickname = ?, phonenum = ?, password = ?
  WHERE id = ?;`;
  const updateUserRow = await connection.query(updateUserQuery, [...editUserInfoParams, id]);
  return updateUserRow[0];
}

async function selectUserAdmin(connection, id) {
  const expertQuery = `
  SELECT email
  FROM user 
  WHERE id = ${id}`;
  const updateUserRow = await connection.query(expertQuery);
  return updateUserRow[0];
}


module.exports = {
  selectUser,
  selectUserEmail,
  selectUserNickname,
  insertUserInfo,
  loginCheck,
  editCheck,
  updateUserInfo,
  selectUserAdmin,
  selectIdNickname
};
