const jwtMiddleware = require("../../../config/jwtMiddleware");
const postProvider = require("../Post/postProvider");
const postService = require("../Post/postService");
const userProvider = require("../User/userProvider")
const commentProvider = require("../Comment/commentProvider")
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const {deleteImageFromS3} = require("../../../config/s3Uploader");
const multer = require("multer");

exports.foodCreate = async function(req,res){
    
    const {title, content, price, sell, categoryid} = await req.body;
    const star = 0;

    //이미지 파일 경로 -> 변수에 담음
    var image;
    if (req.file) {
        image = req.file.location;
    } else {
        image = null;
    }


    // 사용자 user_id 로 id 가져오기 -> 변수에 저장
    const userIdx = req.verifiedToken.userId;
    if(!userIdx){
        return res.send(baseResponse.USER_USERID_NOT_EXIST); //"사용자가 없습니다."
    }

     //전문가 여부 확인 -> 전문가가 아니면 게시 불가.
    email = await userProvider.adminCheck(userIdx);
    if( email.email !=='admin@duksung.ac.kr'){
    return res.send(baseResponse.USER_IS_NOT_EXPERT);
    }

    // 필수 정보가 누락된 경우
    if(!image || !title || !categoryid || !content || !price || !sell){
        return res.send(baseResponse.FOOD_POST_REQUIRED_INFO_MISSING_ERROR); //"필수 정보가 누락 되었습니다. 제목과 내용을 모두 입력해 주세요."
    }


    const response = await postService.createFood(
        userIdx, title, content, image, price, star, sell, categoryid
    );

    return res.send(response);
};

exports.getFoodList  = async function (req, res){ 
    var categoryid = req.params.categoryid;
    
    const result = await postProvider.getFoodList(categoryid);
    return res.send(result);
};

exports.getFood = async function (req, res){ 
    var id = req.params.id; 

    const isExist = await postProvider.getFoodIsExist(id);
    if(isExist.length <=0){
        return res.send(baseResponse.POST_NOT_EXIST); //"해당 게시물이 없습니다."
    }//"해당 게시물이 없습니다."

    const result = await postProvider.getFood(id);
    return res.send(result);
};

exports.foodUpdate= async function (req, res) {
    var id = req.params.id;
    const {title, categoryid, content, price, sell} = await req.body;
    var star = await postProvider.getStarAvg(id);
    star = parseInt(star[0].avg_star);
    console.log(star);

    //이미지 파일 경로 
    var image;
    if (req.file) {
        image = req.file.location;
    } else {
        image = null;
    }

    // 사용자 user_id 로 id 가져오기 -> 변수에 저장
    const userIdx = req.verifiedToken.userId;
    if(!userIdx){
        return res.send(baseResponse.USER_USERID_NOT_EXIST); //"사용자가 없습니다."
    }

     //전문가 여부 확인 -> 전문가가 아니면 게시 불가.
    email = await userProvider.adminCheck(userIdx);
    if( email.email !=='admin@duksung.ac.kr'){
    return res.send(baseResponse.USER_IS_NOT_EXPERT);
    }

    // 필수 정보가 누락된 경우
    if(!title || !categoryid || !content || !price || !sell){
        return res.send(baseResponse.FOOD_POST_REQUIRED_INFO_MISSING_ERROR); //"필수 정보가 누락 되었습니다. 제목과 내용을 모두 입력해 주세요."
    }
    console.log(id, title, content, image, price, star, sell, categoryid);

    const response = await postService.updateFood(
        id, title, content, image, price, star, sell, categoryid
    );

    return res.send(response); 
}

exports.foodDelete = async function (req, res){ 
    var id = req.params.id;

    // 사용자 user_id 로 id 가져오기 -> 변수에 저장
    const userIdx = req.verifiedToken.userId;
    if(!userIdx){
        return res.send(baseResponse.USER_USERID_NOT_EXIST); //"사용자가 없습니다."
    }

     //전문가 여부 확인 -> 전문가가 아니면 게시 불가.
    email = await userProvider.adminCheck(userIdx);

    if( email.email !=='admin@duksung.ac.kr'){
    return res.send(baseResponse.USER_IS_NOT_EXPERT);
    }

    const response = await postService.deleteFood(id);

    return res.send(response);
}

