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
   * Body: idStr,password,phoneNumber,address,dog
   */
  const { idStr,userName,password,phoneNumber,address,dogs} = req.body;

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
exports.getUsers = async function (req, res) {
  /**
   * Query String: email
   */
  const email = req.query.email;

  if (!email) {
    // 유저 전체 조회
    const userListResult = await userProvider.retrieveUserList();
    return res.send(response(baseResponse.SUCCESS, userListResult));
  } else {
    // 유저 검색 조회
    const userListByEmail = await userProvider.retrieveUserList(email);
    return res.send(response(baseResponse.SUCCESS, userListByEmail));
  }
};

/**
 * API No. 3
 * API Name : 특정 유저 조회 API
 * [GET] /app/users/{userId}
 */
exports.getUserById = async function (req, res) {
  /**
   * Path Variable: userId
   */
  const userId = req.params.userId;

  if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

  const userByUserId = await userProvider.retrieveUser(userId);
  return res.send(response(baseResponse.SUCCESS, userByUserId));
};

// TODO: After 로그인 인증 방법 (JWT)
/**
 * API No. 4
 * API Name : 로그인 API
 * [POST] /app/login
 * body : email, passsword
 */
exports.login = async function (req, res) {
  const { idStr, password } = req.body;

  // TODO: email, password 형식적 Validation

  const signInResponse = await userService.postSignIn(idStr, password);

  return res.send(signInResponse);
};

/**
 * API No. 5
 * API Name : 회원 정보 수정 API + JWT + Validation
 * [PATCH] /app/users/:userId
 * path variable : userId
 * body : nickname
 */
exports.patchUsers = async function (req, res) {
  // jwt - userId, path variable :userId

  const userIdFromJWT = req.verifiedToken.userId;

  const userId = req.params.userId;
  const nickname = req.body.nickname;

  if (userIdFromJWT != userId) {
    res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
  } else {
    if (!nickname)
      return res.send(errResponse(baseResponse.USER_NICKNAME_EMPTY));

    const editUserInfo = await userService.editUser(userId, nickname);
    return res.send(editUserInfo);
  }
};

/** JWT 토큰 검증 API
 * [GET] /app/auto-login
 */
exports.check = async function (req, res) {
  const userIdResult = req.verifiedToken.userId;
  console.log(userIdResult);
  return res.send(response(baseResponse.TOKEN_VERIFICATION_SUCCESS));
};
