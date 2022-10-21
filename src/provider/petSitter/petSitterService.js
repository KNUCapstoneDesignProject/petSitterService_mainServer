const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const petSitterProvider = require("./petSitterProvider");
const petSitterDao = require("./petSitterDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");


exports.postUsers = async function (
    petSitterName,sex 
    ) {
    connection = await pool.getConnection(async (conn) => conn);
    
    try {

        await connection.beginTransaction();
       
        const insertUserInfoParams = [petSitterName,sex];

        const userIdResult = await petSitterDao.insertUserInfo(connection, insertUserInfoParams);
        
        console.log(`추가된 회원 : ${userIdResult[0].insertId}`)
        
        await connection.commit();
        return response(baseResponse.SUCCESS_SIGNUP);


    } catch (err) {
        await connection.rollback();
        logger.error(`App - createUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    } finally {
        connection.release();
        
    }
};