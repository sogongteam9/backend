const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const userProvider = require("./userProvider");
const userDao = require("./userDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

// TODO : 덕성 이메일 인증 기능
// 회원가입 
exports.createUser = async function (email, password, phonenum, nickname) {
    try {
        
        // 이메일 중복 확인
        const emailRows = await userProvider.emailCheck(email);
        if (emailRows.length > 0)
            return errResponse(baseResponse.SIGNUP_REDUNDANT_EMAIL);

        // 닉네임 중복 확인
        const nicknameRows = await userProvider.nicknameCheck(nickname);
        if (nicknameRows.length > 0)
            return errResponse(baseResponse.SIGNUP_REDUNDANT_NICKNAME);

        // 비밀번호 암호화
        const hashedPassword = await crypto
            .createHash("sha512")
            .update(password)
            .digest("hex");

        const insertUserInfoParams = [email, hashedPassword, phonenum, nickname];

        const connection = await pool.getConnection(async (conn) => conn);

        const userIdResult = await userDao.insertUserInfo(connection, insertUserInfoParams);
        // console.log(`추가된 회원 : ${userIdResult[0].insertId}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        return errResponse(baseResponse.DB_ERROR);
    }
};

// 로그인 TODO : jtw토큰 생성하는거 하기
exports.postSignIn = async function (email, password) {

    try {
        // 비밀번호 확인
        const hashedPassword = await crypto
        .createHash("sha512")
        .update(password)
        .digest("hex");
        
        const selectUserPasswordParams = [email, hashedPassword];
        
        const Rows = await userProvider.loginCheck( //사용자 정보 조회
            selectUserPasswordParams
        );
        console.log(Rows[0]);
  
        if (!Rows[0] || Rows[0].password !== hashedPassword) { //사용자 정보가 없거나 비밀번호가 일치하지 않으면 에러 반환
            return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG);
        }
        
        //토큰 생성 Service
        let token = await jwt.sign(
        {
          userId: Rows[0].id,
        }, // 토큰의 내용(payload)
        secret_config.jwtsecret, // 비밀키
        {
          expiresIn: "365d",
          subject: "userInfo", //토큰 주제
        } // 유효 기간 365일
      );
  
      return response(baseResponse.SUCCESS, { //로그인 성공 시 성공상태코드, 사용자 아이디, JWT토큰 반환
        userId: Rows[0].userid,
        jwt: token,
      });
    } catch (err) {
      return errResponse(baseResponse.DB_ERROR);
    }
  };

// 회원 정보 수정
exports.editUser = async function (id, nickname, phonenum, currentpassword, newpassword) {
    try {
        console.log(id)

        const hashedPassword = await crypto
        .createHash("sha512")
        .update(currentpassword)
        .digest("hex");

        const Rows = await userProvider.editCheck( //현재 비밀번호 확인
          id,hashedPassword
        );
        console.log(Rows[0]);
  
        if (!Rows[0] || Rows[0].password !== hashedPassword) { //사용자 정보가 없거나 비밀번호가 일치하지 않으면 에러 반환
          return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG);
      }

      // 정보 수정
      const newhashedPassword = await crypto
            .createHash("sha512")
            .update(newpassword)
            .digest("hex");
        const editUserInfoParams = [nickname, phonenum, newhashedPassword];
        const connection = await pool.getConnection(async (conn) => conn);
        const editUserResult = await userDao.updateUserInfo(connection, id, editUserInfoParams)
        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        return errResponse(baseResponse.DB_ERROR);
    }
}