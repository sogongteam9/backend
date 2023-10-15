const jwtMiddleware = require("../../../config/jwtMiddleware");
const commentService = require("../../app/Comment/commentService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
const moment = require("moment");
const regexEmail = require("regex-email");
const {emit} = require("nodemon");

exports.createComment = async function (req, res){
  const {
    content,star
  } = await req.body;

  // 이미지
  var imageURL;
    if (req.file) {
        imageURL = req.file.location;
    } else {
        imageURL = null;
    }

  // 게시글 id
  const postid=req.params.postId;

  // 사용자 user_id 로 id 가져오기 -> 변수에 저장
  const userid=req.verifiedToken.userId
  
  // 필수 정보가 누락된 경우
  if(!content || !star){
    return res.send("필수정보 누락"); 
  }

  // 현재 날짜와 시간을 DATETIME 형식의 문자열로 생성 -> 변수에 담음
  const date = await moment().format('YYYY-MM-DD HH:mm:ss');
  
  const response = await commentService.createComment(
    content,star,imageURL,date,userid,postid
  );

  return res.send(response);
};