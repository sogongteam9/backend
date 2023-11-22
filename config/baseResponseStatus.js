module.exports = {

    // Success
    SUCCESS : { "isSuccess": true, "code": 200, "message":"성공" },

    // Common
    TOKEN_EMPTY : { "isSuccess": false, "code": 400, "message":"JWT 토큰을 입력해주세요." },
    TOKEN_VERIFICATION_FAILURE : { "isSuccess": false, "code": 401, "message":"JWT 토큰 검증 실패" },

    //Request error
    CATEGORY_NOT_EXIST:{ "isSuccess": false, "code": 400, "message":"카테고리가 없습니다" },
    FOOD_POST_REQUIRED_INFO_MISSING_ERROR:{ "isSuccess": false, "code": 400, "message":"필수 정보가 누락 되었습니다. 제목과 내용을 모두 입력해 주세요." },

    SIGNUP_EMAIL_EMPTY : { "isSuccess": false, "code": 400, "message":"이메일을 입력해주세요" },
    SIGNUP_EMAIL_LENGTH : { "isSuccess": false, "code": 400, "message":"이메일은 30자리 미만으로 입력해주세요." },
    SIGNUP_EMAIL_ERROR_TYPE : { "isSuccess": false, "code": 400, "message":"이메일을 형식을 정확하게 입력해주세요." },
    SIGNUP_PASSWORD_EMPTY : { "isSuccess": false, "code": 400, "message": "비밀번호를 입력 해주세요." },
    SIGNUP_PASSWORD_LENGTH : { "isSuccess": false, "code": 400, "message":"비밀번호는 6자리 이상으로 입력해주세요." },
    SIGNUP_PHONENUM_EMPTY : { "isSuccess": false, "code": 400, "message":"휴대폰 번호를 입력 해주세요." },
    SIGNUP_PHONENUM_LENGTH : { "isSuccess": false,"code": 400,"message":"휴대폰 번호는 11자리를 입력해주세요." },
    SIGNUP_NICKNAME_EMPTY : { "isSuccess": false, "code": 400, "message":"닉네임을 입력 해주세요." },
    SIGNUP_NICKNAME_LENGTH : { "isSuccess": false,"code": 400,"message":"닉네임은 최대 20자리를 입력해주세요." },

    SIGNIN_EMAIL_EMPTY : { "isSuccess": false, "code": 400, "message":"이메일을 입력해주세요" },
    SIGNIN_EMAIL_LENGTH : { "isSuccess": false, "code": 400, "message":"이메일은 30자리 미만으로 입력해주세요." },
    SIGNIN_EMAIL_ERROR_TYPE : { "isSuccess": false, "code": 400, "message":"이메일을 형식을 정확하게 입력해주세요." },
    SIGNIN_PASSWORD_EMPTY : { "isSuccess": false, "code": 400, "message": "비밀번호를 입력 해주세요." },

    USER_IS_NOT_EXPERT: { "isSuccess": false, "code": 400, "message": "전문가가 아니기 때문에 포스트를 올릴 수 없습니다." },
    USER_USERID_EMPTY : { "isSuccess": false, "code": 400, "message": "userId를 입력해주세요." },
    USER_USERID_NOT_EXIST : { "isSuccess": false, "code": 404, "message": "해당 회원이 존재하지 않습니다." },

    USER_USEREMAIL_EMPTY : { "isSuccess": false, "code": 400, "message": "이메일을 입력해주세요." },
    USER_USEREMAIL_NOT_EXIST : { "isSuccess": false, "code": 404, "message": "해당 이메일을 가진 회원이 존재하지 않습니다." },
    USER_ID_NOT_MATCH : { "isSuccess": false, "code": 401, "message": "유저 아이디 값을 확인해주세요" },
    USER_NICKNAME_EMPTY : { "isSuccess": false, "code": 400, "message": "변경할 닉네임 값을 입력해주세요" },
    USER_PHONENUM_EMPTY : { "isSuccess": false, "code": 400, "message": "변경할 휴대폰 번호 값을 입력해주세요" },
    USER_PASSWORD_EMPTY : { "isSuccess": false, "code": 400, "message": "현재 비밀번호 값을 입력해주세요" },
    USER_NEWPASSWORD_EMPTY : { "isSuccess": false, "code": 400, "message": "변경할 비밀번호 값을 입력해주세요" },

    USER_STATUS_EMPTY : { "isSuccess": false, "code": 400, "message": "회원 상태값을 입력해주세요" },

    COMMENT_POSTID_EMPTY : { "isSuccess": false, "code": 400, "message": "게시글 id값을 입력해주세요" },
    COMMENT_NOT_EXIST : { "isSuccess": false, "code": 400, "message": "댓글이 존재하지 않습니다" },
    COMMENT_DELETE_ERROR : { "isSuccess": false, "code": 400, "message": "댓글 작성자가 아닙니다." },


    // Response error
    FIND_USER_ERROR : { "isSuccess": false, "code": 400, "message":"사용자 정보를 가져오는데 에러가 발생 하였습니다. 다시 시도해주세요." },
    POST_NOT_EXIST : { "isSuccess": false, "code": 400, "message":"해당 게시물이 없습니다." },
    FOOD_NOT_EXIST : { "isSuccess": false, "code": 400, "message":"음식 제고가 없습니다." },
    COUNT_NOT_EXIST : { "isSuccess": false, "code": 400, "message":"수량을 입력해 주세요." },
    CART_ALREADY_EXIST : { "isSuccess": false, "code": 400, "message":"이미 음식이 카트에 담겨있습니다." },

    SIGNUP_REDUNDANT_EMAIL : { "isSuccess": false, "code": 400, "message":"중복된 이메일입니다." },
    SIGNUP_REDUNDANT_NICKNAME : { "isSuccess": false, "code": 400, "message":"중복된 닉네임입니다." },

    SIGNIN_EMAIL_WRONG : { "isSuccess": false, "code": 404, "message": "아이디가 잘못 되었습니다." },
    SIGNIN_PASSWORD_WRONG : { "isSuccess": false, "code": 404, "message": "비밀번호가 잘못 되었습니다." },
    SIGNIN_INACTIVE_ACCOUNT : { "isSuccess": false, "code": 400, "message": "비활성화 된 계정입니다. 고객센터에 문의해주세요." },
    SIGNIN_WITHDRAWAL_ACCOUNT : { "isSuccess": false, "code": 400, "message": "탈퇴 된 계정입니다. 고객센터에 문의해주세요." },

    //Connection, Transaction 등의 서버 오류
    DB_ERROR : { "isSuccess": false, "code": 500, "message": "데이터 베이스 에러"},
    SERVER_ERROR : { "isSuccess": false, "code": 500, "message": "서버 에러"},

}
