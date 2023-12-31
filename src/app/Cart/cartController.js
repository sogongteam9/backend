const jwtMiddleware = require("../../../config/jwtMiddleware");
const cartProvider = require("../Cart/cartProvider");
const cartService = require("../Cart/cartService");
const userProvider = require("../User/userProvider")
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const multer = require("multer");


  //장바구니 추가하기
exports.addCart = async function(req,res){
    const foodid= req.params.id;
    const {count} = await req.body;
    
    
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
    return res.send(response);
}

// 장바구니 내역보기
exports.getcartList = async function (req, res) {
    // userid 가져오기
    const userIdx = req.verifiedToken.userId;
    if (!userIdx) {
      return res.send(baseResponse.FIND_USER_ERROR); //"사용자 정보를 가져오는데 에러가 발생 하였습니다. 다시 시도해주세요."
    }

    var foodid = await cartProvider.getFoodid(userIdx);
    console.log(foodid);
    if (foodid && foodid.length > 0) {
      foodid = parseInt(foodid[0].foodid);
    } else {
      return res.send(response(baseResponse.SUCCESS, []));
    }
    
    const result = await cartProvider.cartList(userIdx, foodid);
    return res.send(response(baseResponse.SUCCESS, result));
};

// 장바구니 삭제하기
exports.cartDelete = async function (req, res) {
    var id = req.params.id;

    // userid 가져오기
    const userIdx = req.verifiedToken.userId;
    if (!userIdx) {
      return res.send(baseResponse.FIND_USER_ERROR); //"사용자 정보를 가져오는데 에러가 발생 하였습니다. 다시 시도해주세요."
    }

    const result = await cartService.deleteCart(id);
    return res.send(result);
};

// 장바구니 가격 계산하기
exports.getcalcCart = async function (req, res) {
    // userid 가져오기
    const userIdx = req.verifiedToken.userId;
    if (!userIdx) {
      return res.send(baseResponse.FIND_USER_ERROR); //"사용자 정보를 가져오는데 에러가 발생 하였습니다. 다시 시도해주세요."
    }

    const result = await cartProvider.calcCart(userIdx);
    return res.send(result);
};