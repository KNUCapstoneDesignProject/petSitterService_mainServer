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

// Service: Create, Update, Delete 비즈니스 로직 처리

exports.createUser = async function (idStr,userName,password,phoneNumber,address,dogs) {
    connection = await pool.getConnection(async (conn) => conn);
    
    try {

        await connection.beginTransaction();
        //아이디 중복 확인
        const userRows = await userProvider.idStrCheck(idStr);
        if (userRows.length > 0)
            return errResponse(baseResponse.SIGNUP_REDUNDANT_ID);

        // // 비밀번호 암호화
        const hashedPassword = await crypto
            .createHash("sha512")
            .update(password)
            .digest("hex");

        const insertUserInfoParams = [idStr,userName,hashedPassword,phoneNumber];

        const userIdResult = await userDao.insertUserInfo(connection, insertUserInfoParams);
        const insertAddressResult = await userDao.insertAddress(connection, userIdResult[0].insertId, address, "DEFAULT");
        const petRegisterResult = await userDao.registerPets(connection, dogs, userIdResult[0].insertId);

        console.log(`추가된 회원 : ${userIdResult[0].insertId}`)
        await connection.commit();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        await connection.rollback();
        logger.error(`App - createUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    } finally {
        connection.release();
        
    }
};

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
        const userInfoRows = await userProvider.passwordCheck(
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

exports.postNewLocation = async function (userId, location) {
    console.log(userId, location);
    connection = await pool.getConnection(async (conn) => conn);
    try {
        await connection.beginTransaction();

        const postNewLocationResult = await userDao.insertAddress(connection, userId, location, "NORMAL");
        await connection.commit();
        return response(baseResponse.SUCCESS);
    } catch (e) {
        await connection.rollback();
        logger.error(
            `App - postNewLocation Service error\n: ${err.message} \n${JSON.stringify(
                err
                )}`
            );
            return errResponse(baseResponse.DB_ERROR);
    } finally {
        await connection.release();
    }
};

exports.getUserPets = async function (userId) {
    console.log(userId);
    connection = await pool.getConnection(async (conn) => conn);
    try {
        await connection.beginTransaction();

        const petLists = await userDao.retrievePets(connection, userId);
        await connection.commit();
        return response(baseResponse.SUCCESS,petLists);
    } catch (e) {
        await connection.rollback();
        logger.error(
            `App - postNewLocation Service error\n: ${err.message} \n${JSON.stringify(
                err
                )}`
            );
            return errResponse(baseResponse.DB_ERROR);
    } finally {
        await connection.release();
    }
};

exports.reserveService = async function (userId,petSitterId,serviceInfo,petLists) {
    connection = await pool.getConnection(async (conn) => conn);
    
    try {
        await connection.beginTransaction();

        const reserveServiceResult = await userDao.reserveService(connection, userId, petSitterId, serviceInfo);

        for (i = 0; i < petLists.length; i++){
            await userDao.mappingPets(connection, reserveServiceResult.insertId,petLists[i]);
        }
        
        await connection.commit();
        return response(baseResponse.SUCCESS);
    } catch (err) {
        await connection.rollback();
        logger.error(
            `App - reserveService Service error\n: ${err.message} \n${JSON.stringify(
                err
                )}`
            );
        return errResponse(baseResponse.DB_ERROR);
    } finally {
        await connection.release();
    }
};


exports.evaluateService = async function (userId,serviceId) {
    connection = await pool.getConnection(async (conn) => conn);
    
    try {
        await connection.beginTransaction();
        // Validation
        // userId->serviceId 일치하는지 확인 이것의 status가 ONGOING인지 확인 completeRequest가 1상태인지 확인
        const ServiceDetail = await serviceProvider.getServiceDetail(serviceId);

        if (!ServiceDetail.serviceId)   //ServiceDetail에 ErrResponse가 담겨있는지 확인.
            return ServiceDetail

        




        await connection.commit();
        return response(baseResponse.SUCCESS);
    } catch (err) {
        await connection.rollback();
        logger.error(
            `App - evaluateService Service error\n: ${err.message} \n${JSON.stringify(
                err
                )}`
            );
        return errResponse(baseResponse.DB_ERROR);
    } finally {
        await connection.release();
    }
};


