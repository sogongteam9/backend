const jwtMiddleware = require("../../../config/jwtMiddleware");
const accountController = require("../Account/accountController");
const userProvider = require("../User/userProvider")
const accountProvider = require("../Account/accountProvider")
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const {deleteImageFromS3} = require("../../../config/s3Uploader");
const multer = require("multer");

//account table만들기
exports.addAccount = async function(req,res){
    const cartid=req.params.id;
    const {totalprice} = await req.body;

    // 사용자 user_id 로 id 가져오기 -> 변수에 저장
    const userIdx = req.verifiedToken.userId;
    if(!userIdx){
       return res.send(baseResponse.FIND_USER_ERROR); //"사용자 정보를 가져오는데 에러가 발생 하였습니다. 다시 시도해주세요."
    }

    const response = await accountProvider.addAccount( cartid, userIdx, totalprice);

    return res.send(response);
}

// 주문 내역보기
exports.accountlist = async function (req, res) {
  // userid 가져오기
  const userIdx = req.verifiedToken.userId;
  if (!userIdx) {
    return res.send(baseResponse.FIND_USER_ERROR); //"사용자 정보를 가져오는데 에러가 발생 하였습니다. 다시 시도해주세요."
  }

  var foodid = await accountProvider.getFoodid(userIdx);
  
  foodid = parseInt(foodid[0].foodid);
  console.log(foodid);
  const result = await accountProvider.accountlist(userIdx, foodid);
  return res.send(response(baseResponse.SUCCESS, result));
};



  //주문 번호 반환하기
exports.returnNum = async function(req,res){
    const cartid=req.params.id;
  
    // 사용자 user_id 로 id 가져오기 -> 변수에 저장
    const userIdx = req.verifiedToken.userId;
    if(!userIdx){
       return res.send(baseResponse.FIND_USER_ERROR); //"사용자 정보를 가져오는데 에러가 발생 하였습니다. 다시 시도해주세요."
    }

    const response = await accountProvider.returnNum( cartid, userIdx);

    return res.send(response);
}

//장바구니 비우기 반환하기
exports.clearCart= async function(req,res){
  const cartid=req.params.id;

  const userIdx = req.verifiedToken.userId;
  if(!userIdx){
       return res.send(baseResponse.FIND_USER_ERROR); //"사용자 정보를 가져오는데 에러가 발생 하였습니다. 다시 시도해주세요."
  }

  const response = await accountProvider.clearCart(userIdx, cartid);

  return res.send(response);
}

// 마이페이지(admin) - 주문 목록 확인
exports.getOrderList  = async function (req, res){

  // 사용자 user_id 로 id 가져오기 -> 변수에 저장
  const userid=req.verifiedToken.userId;

  email = await userProvider.adminCheck(userid);

  if( email.email !=='admin@duksung.ac.kr'){
    return res.send(baseResponse.USER_IS_NOT_EXPERT);
  }

  const orderListResult = await accountProvider.orderList(email);
    return res.send(response(baseResponse.SUCCESS, orderListResult));
};