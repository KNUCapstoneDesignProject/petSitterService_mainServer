const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");
const {response} = require("../../../config/response");
const { errResponse } = require("../../../config/response");
const baseResponse = require("../../../config/baseResponseStatus");

const serviceDao = require("./serviceDao");

// Provider: Read 비즈니스 로직 처리
exports.getServiceDetail = async function (serviceId) {
    const connection = await pool.getConnection(async (conn) => conn);
    
    try {
        const serviceDetail = await serviceDao.getServiceDetail(connection, serviceId);
        console.log("여기까지?");
        
        
        return serviceDetail;
        
    } catch (err) {
        return errResponse(baseResponse.DB_ERROR)

    } finally {
        connection.release();
    }
    
    

};
