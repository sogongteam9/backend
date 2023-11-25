const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");


// 회원가입 API
// [PATCH] /app/users
exports.postUsers = async function (req, res) {

    /**
     * Body: email, password, nickname
     */
    const {email, password, phonenum, nickname} = req.body;
    
    // 이메일
    // 이메일 빈 값 체크
    if (!email)
        return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));
    // 길이 체크
    if (email.length > 30)
        return res.send(response(baseResponse.SIGNUP_EMAIL_LENGTH));
    // 형식 체크 (by 정규표현식)
    if (!regexEmail.test(email))
        return res.send(response(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));

    // 비밀번호
    // 비밀번호 빈 값 체크
    if (!password)
        return res.send(response(baseResponse.SIGNUP_PASSWORD_EMPTY));
    // 길이 체크
    if (password.length < 6)
        return res.send(response(baseResponse.SIGNUP_PASSWORD_LENGTH));

    // 휴대폰 번호
    // 휴대폰 번호 빈 값 체크
    if (!phonenum)
        return res.send(response(baseResponse.SIGNUP_PHONENUM_EMPTY));
    // 길이 체크
    if (phonenum.length != 11)
        return res.send(response(baseResponse.SIGNUP_PHONENUM_LENGTH));


    const signUpResponse = await userService.createUser(
        email,
        password,
        phonenum,
        nickname
    );

    return res.send(signUpResponse);
};


// TODO: After 로그인 인증 방법 (JWT)
/**
 * 로그인 API
 * [POST] /app/login
 */
exports.login = async function (req, res) {

    const {email, password} = req.body;

    // TODO: email, password 형식적 Validation

    const signInResponse = await userService.postSignIn(email, password);

    return res.send(signInResponse);
};


/**
 * 회원 정보 수정 API + JWT + Validation
 * [PATCH] /app/users/:userId
 * path variable : userId
 */
exports.patchUsers = async function (req, res) {

    // jwt - userId, path variable :userId

    const userId = req.verifiedToken.userId

    const {nickname, phonenum, currentpassword, newpassword} = req.body;

    
        if (!nickname) return res.send(errResponse(baseResponse.USER_NICKNAME_EMPTY));
        if (!phonenum) return res.send(errResponse(baseResponse.USER_PHONENUM_EMPTY));
        if (!currentpassword) return res.send(errResponse(baseResponse.USER_PASSWORD_EMPTY));
        if (!newpassword) return res.send(errResponse(baseResponse.USER_NEWPASSWORD_EMPTY));

        const editUserInfo = await userService.editUser(userId, nickname, phonenum, currentpassword, newpassword)
        return res.send(editUserInfo);
};



/** TODO : JWT 토큰 검증 API
 * [GET] /app/auto-login
 */
exports.check = async function (req, res) {
    const userIdResult = req.verifiedToken.userId;
    console.log(userIdResult);
    return res.send(response(baseResponse.TOKEN_VERIFICATION_SUCCESS));
};
