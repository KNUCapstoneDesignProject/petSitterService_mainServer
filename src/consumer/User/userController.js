const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("./userProvider");
const userService = require("./userService");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

const { emit } = require("nodemon");

/**
 * API No. 0
 * API Name : 테스트 API
 * [GET] /app/test
 */
exports.getTest = async function (req, res) {
    return res.send(response(baseResponse.SUCCESS))
}

exports.getStatus = async function (req, res) {
  const customerId=req.params.customerId;

  const getStatusResponse=await userService.getStatus(customerId);
  return res.send(getStatusResponse);
}

exports.patchUserInfo=async function(req,res){
  const patchInfo=req.body;
  const customerId=req.params.customerId;

  const getStatusResponse=await userService.getStatus(customerId);
  
  let userStatus=getStatusResponse.result.status;
  if(userStatus==="STEP1")
    userStatus="STEP2";
  
  const patchUserInfoResponse=await userService.patchUserInfo(customerId,patchInfo,userStatus);

  return res.send(patchUserInfoResponse);
}


exports.postUserPets=async function(req,res){
  const newPets=req.body.dogs;
  const customerId=req.params.customerId;

  const getStatusResponse=await userService.getStatus(customerId);

  let userStatus=getStatusResponse.result.status;
  if(userStatus==="STEP2")
    userStatus="COMPLETED";

  const postUserPetsResponse=await userService.postUserPets(customerId,newPets,userStatus);

  return res.send(postUserPetsResponse);
}

exports.userInfoDetail=async function(req,res){
  const customerId=req.params.customerId;


  const getUserInfoDetailResponse=await userProvider.getUserInfoDetail(customerId);

  return res.send(getUserInfoDetailResponse);
}

exports.userInfo=async function(req,res){
  const customerId=req.params.customerId;


  const getUserInfoResponse=await userProvider.getUserInfo(customerId);

  return res.send(getUserInfoResponse);
}

exports.userAddress=async function(req,res){
  const customerId=req.params.customerId;


  const getUserAddressResponse=await userProvider.getUserAddress(customerId);

  return res.send(getUserAddressResponse);
}

exports.userPets=async function(req,res){
  const customerId=req.params.customerId;


  const getUserPetsResponse=await userProvider.getUserPets(customerId);

  return res.send(getUserPetsResponse);
}

exports.getUserFriends=async function(req,res){
  const customerId=req.params.customerId;


  const getUserFriendsResponse=await userProvider.getUserFriends(customerId);

  return res.send(getUserFriendsResponse);
}
/**
 * API No. 1
 * API Name : 유저 생성 (회원가입) API
 * [POST] /app/users
 */
exports.postUsers = async function (req, res) {
  /**

   * Body: 닉네임,프로필 사진,
   * 선택: 카카오계정(이메일),성별
   * 추가: 나이, 주소, 전화번호
   * status: default로 FIRST_STEP 저장
   */
  console.log("post Users 실행");
  const { nickName,profileImg,kakaoEmail,sex } = req.body;
  console.log("뭔데이거");
  // 빈 값 
  console.log(!nickName);
  console.log(profileImg);
  console.log(kakaoEmail);
  console.log(sex);
  if (!nickName)   return res.send(errResponse(baseResponse.SIGNUP_NICKNAME_EMPTY));
  if (!profileImg) return res.send( errResponse(baseResponse.SIGNUP_PROFILE_IMG_EMPTY));
  if (!kakaoEmail)  return res.send( errResponse(baseResponse.SIGNUP_EMAIL_EMPTY));
  if (!sex)  return res.send(errResponse(baseResponse.SIGNUP_SEX_EMPTY));

  // 길이 체크
  
  // 형식 체크 (by 정규표현식)
  console.log("사실 여까지 오는것도 이상하긴함");
  const signUpResponse = await userService.createUser(
    nickName,
    profileImg,
    kakaoEmail,
    sex
  );

  return res.send(signUpResponse);
};


exports.postUserFriend = async function (req, res) {
  const newFriendId = req.body.friendId;
  const myId=req.params.customerId;
 

  const postUserFriendResponse = await userProvider.postUserFriend(myId,newFriendId);

  return res.send(postUserFriendResponse);
};

exports.getBookMark = async function (req, res) {
  const customerId=req.params.customerId;
 

  const getBookMarkResponse = await userProvider.getBookMark(customerId);

  return res.send(getBookMarkResponse);
};

// TODO: After 로그인 인증 방법 (JWT)
/**
 * API No. 4
 * API Name : 로그인 API
 * [POST] /app/login
 * body : idStr, passsword
 */
exports.login = async function (req, res) {
  const { idStr, password } = req.body;

  console.log(password);
  // TODO: idStr, password 형식적 Validation

  const signInResponse = await userService.postSignIn(idStr, password);

  return res.send(signInResponse);
};


/** JWT 토큰 검증 API
 * [GET] /app/auto-login
 */
exports.check = async function (req, res) {
  const userIdResult = req.verifiedToken.userId;
  console.log(userIdResult);
  return res.send(response(baseResponse.TOKEN_VERIFICATION_SUCCESS));
};

exports.getReviews = async function (req, res) {
  
  const retrieveReviewsResult = await userProvider.getReviews();

  return res.send(retrieveReviewsResult);
}

exports.getReviewsDetail = async function (req, res) {
  
  const retrieveReviewsResult = await userProvider.getReviewsDetail();

  return res.send(retrieveReviewsResult);
}


exports.patchLike = async function (req, res) {
  const {serviceId,customerId,isLike}=req.body;

  const patchLikeResponse = await userService.patchLike(serviceId,customerId,isLike);

  return res.send(patchLikeResponse);
}

exports.getCurrentService = async function (req, res) {
  const userId=req.params.userId;

  const getCurrentServiceResponse = await userProvider.getCurrentService(userId);

  return res.send(getCurrentServiceResponse);
}

exports.retrievePetsittersSameLocation = async function (req, res) {
  const userId=req.params.userId;
  const filter=req.query;

  const retrievePetSittersResponse = await userProvider.retrievePetsittersSameLocation(userId,filter);

  return res.send(retrievePetSittersResponse);
}