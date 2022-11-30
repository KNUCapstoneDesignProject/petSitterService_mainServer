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

exports.hasId = async function (req, res) {
  const customerId=req.params.customerId;

  const getStatusResponse=await userProvider.getUserInfo(customerId);
  console.log(getStatusResponse.result.length);
  console.log(getStatusResponse.result);
  if (getStatusResponse.result.length > 0) {
    console.log("for cookie");
    console.log(getStatusResponse.result[0].customerId)
    res.cookie('userId',getStatusResponse.result[0].customerId);
    return res.send(response(baseResponse.SUCCESS));
  }
  else
    return res.send(response(baseResponse.HAS_NO_ID))

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
  const newPet=req.body.dog;
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

  console.log("get Friend Controller");
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
  const { userId,nickName,profileImg,kakaoEmail,sex } = req.body;
  console.log("뭔데이거");
  // 빈 값 
  console.log(userId);
  console.log(!nickName);
  console.log(profileImg);
  console.log(kakaoEmail);
  console.log(sex);
  if(!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));
  if (!nickName)   return res.send(errResponse(baseResponse.SIGNUP_NICKNAME_EMPTY));
  if (!profileImg) return res.send( errResponse(baseResponse.SIGNUP_PROFILE_IMG_EMPTY));
  if (!kakaoEmail)  return res.send( errResponse(baseResponse.SIGNUP_EMAIL_EMPTY));
  if (!sex)  return res.send(errResponse(baseResponse.SIGNUP_SEX_EMPTY));

  // 길이 체크
  
  // 형식 체크 (by 정규표현식)
  
  const signUpResponse = await userService.createUser(
    userId,
    nickName,
    profileImg,
    kakaoEmail,
    sex,
  );
  console.log("사실 여까지 오는것도 이상하긴함");
  const cookieUser = signUpResponse.result.userId
  console.log(cookieUser);
  
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
  console.log("cookie 출력");
  console.log(req.cookies);
  console.log(userId);
  const getCurrentServiceResponse = await userProvider.getCurrentService(userId);
  return res.send(getCurrentServiceResponse);
}

exports.retrievePetsittersSameLocation = async function (req, res) {
  const userId=req.params.userId;
  const filter=req.query;

  const retrievePetSittersResponse = await userProvider.retrievePetsittersSameLocation(userId,filter);

  return res.send(retrievePetSittersResponse);
}

exports.postReservation = async function (req, res) {
  //강아지 선택(다중선택 가능), 돌봄 날짜, 돌봄 시간, 픽업유무,요청사항,돌봄종류(강아지,고양이,함께)
  //함께돌봄의 경우: 함께하는 친구,반려견 (친구꺼까지)
  /*
    {
      bookerId:4,
      petSitterId:1,
      bookType:Consignment,
      petType:dog,
      pets:[dog,dog],
      reservationDate:"2022-10-31",
      reservationStartTime:"13:00",
      reservationEndTime:"13:30",
      hasPickUp:Y,
      hasWalk:Y,
      hasBath:Y,
      requestComment:"애기 밥은 식탁위에",
    }
  */
  const reservationInfo=req.body;

  const postReservationResponse = await userProvider.postReservation(reservationInfo);

  return res.send(postReservationResponse);
};

exports.postBookMarks = async function (req, res) {
  /*userId,petSitterId */
  const customerId=req.body.customerId;
  const petSitterId=req.body.petSitterId;

  const postBookMarksResponse = await userService.postBookMarks(customerId,petSitterId);

  return res.send(postBookMarksResponse);
};