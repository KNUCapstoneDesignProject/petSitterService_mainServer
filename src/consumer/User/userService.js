const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
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

        const insertUserInfoParams = [idStr,userName,hashedPassword,phoneNumber,address];


        const userIdResult = await userDao.insertUserInfo(connection, insertUserInfoParams);
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

