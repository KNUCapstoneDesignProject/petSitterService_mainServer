const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const serviceProvider = require("../Service/serviceProvider");
const userProvider = require("./userProvider");
const userDao = require("./userDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

// TODO: After 로그인 인증 방법 (JWT)
exports.postSignIn = async function (idStr, password) {
    try {
      // 아이디 여부 확인
        const userRows = await userProvider.idStrCheck(idStr);
        if (userRows.length < 1)
            return errResponse(baseResponse.SIGNIN_ID_STR_WRONG);

        const selectIdStr = userRows[0].idStr;

      // 비밀번호 확인
        const hashedPassword = await crypto
            .createHash("sha512")
            .update(password)
            .digest("hex");

        const selectUserPasswordParams = [selectIdStr, hashedPassword];
        const userInfoRows = await petSitterProvider.passwordCheck(
            selectUserPasswordParams
        );
        //todo 일치하는 유저가 없으면 유저없다고 에러줘야함.
        console.log("userInfoRows");
        console.log(userInfoRows);
        if (userInfoRows[0].password !== hashedPassword) {
            return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG);
        }



      console.log(userInfoRows[0].userId); // DB의 userId

      //토큰 생성 Service
    let token = await jwt.sign(
        {
            userId: userInfoRows[0].userId,
        }, // 토큰의 내용(payload)
            secret_config.jwtsecret, // 비밀키
        {
            expiresIn: "1d",
            subject: "userInfo",
        } // 유효 기간 365일
    );

    return response(baseResponse.SUCCESS, {
        userId: userInfoRows[0].userId,
        jwt: token,
        });
    } catch (err) {
        logger.error(
        `App - postSignIn Service error\n: ${err.message} \n${JSON.stringify(
            err
            )}`
        );
        return errResponse(baseResponse.DB_ERROR);
    }
};