const jwtMiddleware = require("../../../config/jwtMiddleware");
const postController = require("../Post/postController");
const postProvider = require("../Post/postProvider");
const cartProvider = require("../Cart/cartProvider");
const cartService = require("../Cart/cartService");
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
    
    // 사용자 user_id 로 id 가져오기 -> 변수에 저장
    const userIdx = req.verifiedToken.userId;
    if(!userIdx){
       return res.send(baseResponse.FIND_USER_ERROR); //"사용자 정보를 가져오는데 에러가 발생 하였습니다. 다시 시도해주세요."
    }

    // cart에 있는지 확인
    const isExistInCart = await cartProvider.getCartIsExist(userIdx, foodid);
    if(isExistInCart.length > 0){
        return res.send(baseResponse.CART_ALREADY_EXIST); //"이미 음식이 카트에 담겨있습니다."
    }

    const response = await cartService.addCart( foodid, userIdx, count);
}

// 장바구니 내역보기
exports.cartList = async function (req, res) {
    // userid 가져오기
    const userIdx = req.verifiedToken.userId;
    if (!userIdx) {
      return res.send(baseResponse.FIND_USER_ERROR); //"사용자 정보를 가져오는데 에러가 발생 하였습니다. 다시 시도해주세요."
    }

    const result = await cartProvider.cartList(userIdx);
    return res.send(response(baseResponse.SUCCESS, result));
};

// 장바구니 삭제하기
exports.deleteCart = async function (req, res) {
    var id = req.params.id;

    // userid 가져오기
    const userIdx = req.verifiedToken.userId;
    if (!userIdx) {
      return res.send(baseResponse.FIND_USER_ERROR); //"사용자 정보를 가져오는데 에러가 발생 하였습니다. 다시 시도해주세요."
    }

    const result = await cartService.deleteCart(id);
    return res.send(response(baseResponse.SUCCESS, result));
};

// 장바구니 가격 계산하기
exports.calcCart = async function (req, res) {
    // userid 가져오기
    const userIdx = req.verifiedToken.userId;
    if (!userIdx) {
      return res.send(baseResponse.FIND_USER_ERROR); //"사용자 정보를 가져오는데 에러가 발생 하였습니다. 다시 시도해주세요."
    }

    const result = await cartProvider.calcCart(userIdx);
    return res.send(response(baseResponse.SUCCESS, result));
};
