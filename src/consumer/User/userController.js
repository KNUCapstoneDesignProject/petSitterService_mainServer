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

/**
 * API No. 1
 * API Name : 유저 생성 (회원가입) API
 * [POST] /app/users
 */
exports.postUsers = async function (req, res) {
  /**
   * Body: idStr,password,phoneNumber,address,dogs
   * dogs: profileImgUrl,petName, petCategory,petBreed,petSize,petSex,petAge
   */
  console.log("post Users 실행");
  const { idStr, userName, password, phoneNumber, address, dogs } = req.body;

  // 빈 값 체크
  if (!idStr) return res.send(response(baseResponse.SIGNUP_ID_EMPTY));
  if (!password) return res.send(response(baseResponse.SIGNUP_PASSWORD_EMPTY));
  if (!phoneNumber) return res.send(response(baseResponse.SIGNUP_TEL_EMPTY));
  if (!address) return res.send(response(baseResponse.SIGNUP_ADDRESS_EMPTY));
  if (!userName) return res.send(response(baseResponse.SIGNUP_NAME_EMPTY));

  // 길이 체크
  if (idStr.length > 30)
    return res.send(response(baseResponse.SIGNUP_ID_LENGTH));

  // 형식 체크 (by 정규표현식)
  //TODO 아이디에는 영어,숫자를 제외하고 불가능하게 한다.
  // if (!regexidStr.test(idStr))
  //   return res.send(response(baseResponse.SIGNUP_ID_ERROR_TYPE));

  //TODO password는 영어 소,대문자,숫자,특수문자 필수포함에 8자 이상으로 한다.
  //TODO 주소는 실제 존재하는 주소인지를 확인한다.
  //TODO 강아지는 최소 한마리이상 포함시킨다.
  //TODO 휴대폰번호는 010-0000-0000형식을 지켰는지 확인한다.
  //

  const signUpResponse = await userService.createUser(
    idStr,
    userName,
    password,
    phoneNumber,
    address,
    dogs
  );

  return res.send(signUpResponse);
};

/**
 * API No. 2
 * API Name : 유저 조회 API (+ 이메일로 검색 조회)
 * [GET] /app/users
 */
exports.getUserName = async function (req, res) {
  /**
   * Query String: email
   */
  let userId;
  if (req.verifiedToken.userId == req.params.userId) {
    userId=req.verifiedToken.userId
  } else {//TODO test필요.
    return res.send(errResponse(baseResponse.USER_ID_NOT_MATCH))
  }

  const userName = await userProvider.retrieveUserName(userId);
  return res.send(response(baseResponse.SUCCESS, userName[0]));
  
};

exports.getLocationsForUser = async function (req, res) {
  /**
   * Query String: email
   */
  let userId;
  if (req.verifiedToken.userId == req.params.userId) {
    userId=req.verifiedToken.userId
  } else {//TODO test필요.
    return res.send(errResponse(baseResponse.USER_ID_NOT_MATCH))
  }

  const userLocationList = await userProvider.retrieveUserLocations(userId);
  return res.send(response(baseResponse.SUCCESS, userLocationList));
  
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

exports.checkLoginId = async function (req, res) {
  const { loginId} = req.params;

  console.log(loginId);
  // TODO: idStr, password 형식적 Validation

  const userRows = await userProvider.idStrCheck(loginId);
  if (userRows.length > 0)
    return res.send(errResponse(baseResponse.SIGNUP_REDUNDANT_ID));
  else {
    return res.send(baseResponse.NO_REDUNDANT_ID);
  }

};

exports.postNewLocation = async function (req, res) {
  const { location } = req.body;
  let userId;
  console.log("post Location");
  console.log(req.params.userId);
  console.log(req.verifiedToken.userId);

  if (!req.params.userId) 
    return res.send(errResponse(baseResponse.USER_USERID_EMPTY));
  if (!location)
    return res.send(errResponse(baseResponse.LOCATION_EMPTY));

  console.log("여기는?")
  if (req.verifiedToken.userId == req.params.userId) {
    userId=req.verifiedToken.userId
  } else {
    return res.send(errResponse(baseResponse.USER_ID_NOT_MATCH))
  }
  
  const postResult = await userService.postNewLocation(userId,location);

  return postResult;

};


exports.getUserPets = async function (req, res) {
  let userId;
  console.log("여기!");
  if (!req.params.userId) 
    return res.send(errResponse(baseResponse.USER_USERID_EMPTY));
  
  /* header token과 path variable userId가 서로 일치하는지 확인 */
  if (req.verifiedToken.userId == req.params.userId) {
    userId=req.verifiedToken.userId
  } else {
    return res.send(errResponse(baseResponse.USER_ID_NOT_MATCH))
  }
  
  const petLists = await userService.getUserPets(userId);

  console.log(petLists);
  return res.send(petLists);

};

exports.reserveService = async function (req, res) {
  const petSitterId=req.params.petSitterId;
  const userId = req.verifiedToken.userId;
  const {startTime,endTime,requestComment,hasWalk,hasBath,totalPrice,status,petLists } = req.body;
  const serviceInfo = [startTime,endTime,requestComment,hasWalk,hasBath,totalPrice,status];


  if (!req.params.petSitterId) 
    return res.send(errResponse(baseResponse.USER_USERID_EMPTY));
  
  const reserveResult = await userService.reserveService(userId,petSitterId,serviceInfo,petLists);

  return res.send(reserveResult);

};

exports.getPetSitterDetail = async function (req, res) {
  const petSitterId=req.params.petSitterId;


  if (!req.params.petSitterId) 
    return res.send(errResponse(baseResponse.PET_SITTER_ID_EMPTY));
  
  const petSitterInfo = await userProvider.getPetSitterDetail(petSitterId);

  return res.send(petSitterInfo);

};

exports.getPrevServices = async function (req, res) {
  let userId;


  if (!req.params.userId) 
    return res.send(errResponse(baseResponse.USER_USERID_EMPTY));
  
  /* header token과 path variable userId가 서로 일치하는지 확인 */
  if (req.verifiedToken.userId == req.params.userId) {
    userId=req.verifiedToken.userId
  } else {
    return res.send(errResponse(baseResponse.USER_ID_NOT_MATCH))
  }
  

  const serviceHistoriesList = await userProvider.getPrevServices(userId);

  return res.send(serviceHistoriesList);

};



/** JWT 토큰 검증 API
 * [GET] /app/auto-login
 */
exports.check = async function (req, res) {
  const userIdResult = req.verifiedToken.userId;
  console.log(userIdResult);
  return res.send(response(baseResponse.TOKEN_VERIFICATION_SUCCESS));
};
