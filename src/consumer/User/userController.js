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

   * Body: 닉네임,프로필 사진,
   * 선택: 카카오계정(이메일),성별
   * 추가: 나이, 주소, 전화번호
   * status: default로 FIRST_STEP 저장
   */
  console.log("post Users 실행");
  const { nickName,profileImg,kakaoEmail,sex } = req.body;

  // 빈 값 체크
  if (!nickName) return errResponse(baseResponse.SIGNUP_NICKNAME_EMPTY);
  if (!profileImg) return errResponse(baseResponse.SIGNUP_PROFILE_IMG_EMPTY);
  

  // 길이 체크
  if (idStr.length > 30)
    return res.send(response(baseResponse.SIGNUP_ID_LENGTH));

  if (dogs.length<1)
    return res.send(response(baseResponse.SIGNUP_NAME_EMPTY));
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
