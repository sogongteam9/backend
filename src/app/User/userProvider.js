const { pool } = require("../../../config/database");

const userDao = require("./userDao");


exports.emailCheck = async function (email) {
  const connection = await pool.getConnection(async (conn) => conn);
  const emailCheckResult = await userDao.selectUserEmail(connection, email);
  connection.release();

  return emailCheckResult;
};

exports.nicknameCheck = async function (nickname) {
  const connection = await pool.getConnection(async (conn) => conn);
  const nicknameCheckResult = await userDao.selectUserNickname(connection, nickname);
  connection.release();

  return nicknameCheckResult;
};

exports.loginCheck = async function (selectUserPasswordParams) { //사용자아이디와 암호화된 비번 포함하는 배열
  const connection = await pool.getConnection(async (conn) => conn);
  const passwordCheckResult = await userDao.loginCheck(
    connection,
    selectUserPasswordParams
  );
  connection.release();

  return passwordCheckResult[0]; //로그인 정보 조회 결과 반환 -> 보통 로그인 정보 조회 결과는 하나의 사용자 정보 또는 'null' -> 배열의 첫 번째 요소만 반환
};

exports.editCheck = async function (id,hashedPassword) {
  const connection = await pool.getConnection(async (conn) => conn);
  const passwordCheckResult = await userDao.editCheck(
    connection,
    id,hashedPassword
  );
  connection.release();

  return passwordCheckResult[0]; //로그인 정보 조회 결과 반환 -> 보통 로그인 정보 조회 결과는 하나의 사용자 정보 또는 'null' -> 배열의 첫 번째 요소만 반환
};


// exports.accountCheck = async function (email) {
//   const connection = await pool.getConnection(async (conn) => conn);
//   const userAccountResult = await userDao.selectUserAccount(connection, email);
//   connection.release();

//   return userAccountResult;
// };