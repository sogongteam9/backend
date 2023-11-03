const jwtMiddleware = require("../../../config/jwtMiddleware");
const postController = require("../Post/postController");
const postProvider = require("../Post/postProvider");
const userProvider = require("../User/userProvider")
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const {deleteImageFromS3} = require("../../../config/s3Uploader");
const multer = require("multer");
const baseResponse = require("../../../config/baseResponseStatus");


  //장바구니 추가하기
exports.addCart = async function(req,res){
    const foodid=req.params.id;
    const count = await postController.countFood(id);
    if(!count){
        return res.send(baseResponse.COUNT_NOT_EXIST); //"수량을 입력해 주세요"
    }

    // food 있는지 확인
    const isExist = await postProvider.getFoodIsExist(foodid);
    if(isExist.length <=0){
        return res.send(baseResponse.FOOD_NOT_EXIST); //"음식 제고가 없습니다.""
    }

    // 사용자 user_id 로 id 가져오기 -> 변수에 저장
    const userIdx = await userProvider.check(req.verifiedToken.userId);
    if(!userIdx){
       return res.send(baseResponse.FIND_USER_ERROR); //"사용자 정보를 가져오는데 에러가 발생 하였습니다. 다시 시도해주세요."
    }


    const response = await cartProvider.addCart( foodid, userIdx);
}

// 장바구니 내역보기
exports.cartList = async function (req, res) {
    const userIdx = await userProvider.check(
        req.verifiedToken.userId
    );
    if (!userIdx) {
      return res.send(baseResponse.FIND_USER_ERROR); //"사용자 정보를 가져오는데 에러가 발생 하였습니다. 다시 시도해주세요."
    }

    const result = await cartProvider.cart(userIdx);
    return res.send(response(baseResponse.SUCCESS, result));
};