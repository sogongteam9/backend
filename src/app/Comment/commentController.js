const jwtMiddleware = require("../../../config/jwtMiddleware");
const commentService = require("../../app/Comment/commentService");
const commentProvider = require("../../app/Comment/commentProvider");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
const moment = require("moment");
const regexEmail = require("regex-email");
const {emit} = require("nodemon");

// 댓글 작성
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
    return res.send("내용 혹은 별점을 작성하지 않았습니다."); 
  }

  // 현재 날짜와 시간을 DATETIME 형식의 문자열로 생성 -> 변수에 담음
  const date = await moment().format('YYYY-MM-DD HH:mm:ss');
  
  const response = await commentService.createComment(
    content,star,imageURL,date,userid,postid
  );

  return res.send(response);
};

// 전체 댓글 출력 
exports.getCommentList  = async function (req, res){
  const postid = req.params.postId;

  if (!postid) return res.send(errResponse(baseResponse.COMMENT_POSTID_EMPTY));

  const commentListResult = await commentProvider.getCommentList(postid);
    return res.send(response(baseResponse.SUCCESS, commentListResult));
};

// 댓글 수정
exports.patchComment = async function (req, res) {

  // jwt - userId, path variable :userId

  const userid = req.verifiedToken.userId
  const {content,star} = await req.body;
 
  const commentid=req.params.commentId; // 댓글 id
  
  // 이미지
  var imageURL;
    if (req.file) {
        imageURL = req.file.location;
    } else {
        imageURL = null;
    }

   // 현재 날짜와 시간을 DATETIME 형식의 문자열로 생성 -> 변수에 담음
  const date = await moment().format('YYYY-MM-DD HH:mm:ss');

  // 필수 정보가 누락된 경우
  if(!content || !star){
    return res.send("내용 혹은 별점을 작성하지 않았습니다."); 
  }

      const editCommentInfo = await commentService.editComment(content,star,imageURL,date,userid,commentid)
      return res.send(editCommentInfo);
};


// 댓글 삭제
exports.deleteComment= async function(req,res){
  
  const user_id = req.verifiedToken.userId
  const commentid=req.params.commentId; // 댓글 id
  
  // 이미지
  var imageURL;
    if (req.file) {
        imageURL = req.file.location;
    } else {
        imageURL = null;
    }

  // 댓글이 있는지 확인 
  const isCommentExist = await commentProvider.getCommentIsExists(commentid);
  if(isCommentExist.length <=0){
      return res.send(baseResponse.COMMENT_NOT_EXIST);
  }

  //내가 쓴 댓글인지 확인
  const writer = await commentProvider.getCommentWriter(commentid);
  console.log(writer[0].userid);
  if(writer[0].userid!=user_id){
    return res.send(baseResponse.COMMENT_DELETE_ERROR);
  }

  //삭제
  const result = await commentService.deleteComment(commentid);
  return res.send(result);
};

// 마이페이지 - 자신이 작성한 댓글 확인
exports.myComment  = async function (req, res){

  // 사용자 user_id 로 id 가져오기 -> 변수에 저장
  const userid=req.verifiedToken.userId;

  const commentListResult = await commentProvider.getMyComment(userid);
    return res.send(response(baseResponse.SUCCESS, commentListResult));
};