const jwtMiddleware = require("../../../config/jwtMiddleware");
const petSitterProvider = require("./petSitterProvider");
const petSitterService = require("./petSitterService");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

const { emit } = require("nodemon");


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
    const { petSitterName,sex } = req.body;
    
    if (!petSitterName)   return res.send(errResponse(baseResponse.SIGNUP_NICKNAME_EMPTY));
    if (!sex)  return res.send(errResponse(baseResponse.SIGNUP_SEX_EMPTY));
  
    // 길이 체크
    
    // 형식 체크 (by 정규표현식)
    const signUpResponse = await petSitterService.postUsers(
        petSitterName,sex 
    );
  
    return res.send(signUpResponse);
  };