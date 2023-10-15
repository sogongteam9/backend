const jwtMiddleware = require("../../../config/jwtMiddleware");
const postProvider = require("../Post/postProvider");
const postService = require("../Post/postService");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const {deleteImageFromS3} = require("../../../config/imageUploader");
const multer = require("multer");

exports.foodCreate = async function(req,res){
    
    const {title, category, content, price, sell} = await req.body;
    const star = 3;
    //이미지 파일 경로 -> 변수에 담음
    var image;
    images=req.files.location

    //카테고리 타이틀을 아이디로 변경
    const getCategoryId = await postProvider.changeTitle2Id(category);
    if(!getCategoryId){
        return res.send(baseResponse.CATEGORY_NOT_EXIST); 
    }

    // 사용자 user_id 로 id 가져오기 -> 변수에 저장
    const userIdx = await userProvider.getIdx_by_user_id(req.verifiedToken.userId);
    if(!userIdx){
        await deleteImages(req.files);
        return res.send(baseResponse.FIND_USER_ERROR); //"사용자 정보를 가져오는데 에러가 발생 하였습니다. 다시 시도해주세요."
    }

     //전문가 여부 확인 -> 전문가가 아니면 게시 불가.
    const userIsExpert = await userProvider.getIsExpert(userIdx);
    if(!userIsExpert){
        await deleteImages(req.files);
        return res.send(baseResponse.USER_IS_NOT_EXPERT); // "전문가가 아니기 때문에 클래스를 올릴 수 없습니다.",
    }

    // 필수 정보가 누락된 경우
    if(!title || !category || !content || !price || !sell){
        await deleteImages(req.files);
        return res.send(baseResponse.CLASS_POST_REQUIRED_INFO_MISSING_ERROR); //"필수 정보가 누락 되었습니다. 제목과 내용을 모두 입력해 주세요."
    }

    // 현재 날짜와 시간을 DATETIME 형식의 문자열로 생성 -> 변수에 담음
    const date = await moment().format('YYYY-MM-DD HH:mm:ss');

    const response = await postService.createFood(
        date, title, getCategoryId, content, price, star, sell
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

    // 사용자 user_id 로 id 가져오기 -> 변수에 저장
    const userIdx = await userProvider.getIdx_by_user_id(req.verifiedToken.userId);

    if(!userIdx){
        return res.send(baseResponse.FIND_USER_ERROR); //"사용자 정보를 가져오는데 에러가 발생 하였습니다. 다시 시도해주세요."
    }

    const isExist = await postProvider.getFoodIsExist(id);
    if(isExist.length <=0){
        return res.send(baseResponse.CLASS_NOT_EXIST); //"해당 게시물이 없습니다."
    }//"해당 게시물이 없습니다."

    const result = await postProvider.getFood(id);
    return res.send(result);
};

exports.foodUpdate= async function (req, res) {
    var id = req.params.id;
    const {title, category, content, price, sell} = await req.body;
    
    //이미지 파일 경로 -> 변수에 담음
    var image;
    images=req.files.location

    // 사용자 user_id 로 id 가져오기 -> 변수에 저장
    const userIdx = await userProvider.getIdx_by_user_id(req.verifiedToken.userId);
    if(!userIdx){
        await deleteImages(req.files);
        return res.send(baseResponse.FIND_USER_ERROR); //"사용자 정보를 가져오는데 에러가 발생 하였습니다. 다시 시도해주세요."
    }

    //전문가 여부 확인 -> 전문가가 아니면 게시 불가.
    const userIsExpert = await userProvider.getIsExpert(userIdx);
    if(!userIsExpert){
        await deleteImages(req.files);
        return res.send(baseResponse.USER_IS_NOT_EXPERT); // "전문가가 아니기 때문에 클래스를 올릴 수 없습니다.",
    }

    // 필수 정보가 누락된 경우
    if(!title || !category || !content || !price || !sell){
        await deleteImages(req.files);
        return res.send(baseResponse.CLASS_POST_REQUIRED_INFO_MISSING_ERROR); //"필수 정보가 누락 되었습니다. 제목과 내용을 모두 입력해 주세요."
    }

    // 현재 날짜와 시간을 DATETIME 형식의 문자열로 생성 -> 변수에 담음
    const date = await moment().format('YYYY-MM-DD HH:mm:ss');


    const response = await postService.updateFood(
        id, date, title, content, price, star, sell
    );

    return res.send(response); 
}

exports.foodDelete = async function (req, res){ 
    var id = req.params.id;
    // 사용자 user_id 로 id 가져오기 -> 변수에 저장
    const userIdx = await userProvider.getIdx_by_user_id(req.verifiedToken.userId);
    if(!userIdx){
        await deleteImages(req.files);
        return res.send(baseResponse.FIND_USER_ERROR); //"사용자 정보를 가져오는데 에러가 발생 하였습니다. 다시 시도해주세요."
    }

    //전문가 여부 확인 -> 전문가가 아니면 게시 불가.
    const userIsExpert = await userProvider.getIsExpert(userIdx);
    if(!userIsExpert){
        await deleteImages(req.files);
        return res.send(baseResponse.USER_IS_NOT_EXPERT); // "전문가가 아니기 때문에 클래스를 올릴 수 없습니다.",
    }

    const response = await postService.deleteFood(id);

    return res.send(response);
}