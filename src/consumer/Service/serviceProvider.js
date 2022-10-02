const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");
const {response} = require("../../../config/response");
const { errResponse } = require("../../../config/response");
const baseResponse = require("../../../config/baseResponseStatus");

const serviceDao = require("./serviceDao");

// Provider: Read 비즈니스 로직 처리
exports.getServiceDetail = async function (userId,serviceId) {
    const connection = await pool.getConnection(async (conn) => conn);
    
    try {
        const serviceDetail = await serviceDao.getServiceDetail(connection, serviceId);
        
        if (serviceDetail[0].userId != userId)
            return errResponse(baseResponse.USER_ID_NOT_MATCH);
        
        
        
        return serviceDetail[0];
        
    } catch (err) {
        logger.error(
            `App - evaluateService Provider error\n: ${err.message} \n${JSON.stringify(
                err
                )}`
            );
        return errResponse(baseResponse.DB_ERROR)

    } finally {
        connection.release();
    }
    
    

};

exports.getCurrentService = async function (serviceId,userId) {
    const connection = await pool.getConnection(async (conn) => conn);
    
    try {
        // 조회하려는 서비스가 로그인된 유저의 것이 맞는지 확인
        const isUserService = await serviceDao.userCheck(connection, serviceId);
        if (isUserService == undefined || isUserService.userId != userId)
            return errResponse(baseResponse.USER_ID_NOT_MATCH);


        const currentServiceInfo = await serviceDao.getCurrentService(connection, serviceId);
        
        for (i = 0; i < currentServiceInfo.length; i++)
        currentServiceInfo[i].pets = await serviceDao.getServicePets(connection, serviceId);
        
        return currentServiceInfo[0];
        
    } catch (err) {
        logger.error(
            `App - getCurrentService Provider error\n: ${err.message} \n${JSON.stringify(
                err
                )}`
            );
        return errResponse(baseResponse.DB_ERROR)

    } finally {
        connection.release();
    }
    
    

};
