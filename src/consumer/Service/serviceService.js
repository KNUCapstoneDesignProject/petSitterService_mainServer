const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const serviceProvider = require("./serviceProvider");
const serviceDao = require("./serviceDao");

const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");
const { SERVICE_SERVICEID_EMPTY } = require('../../../config/baseResponseStatus');



exports.evaluateService = async function (userId,serviceId,evaluation) {
    const connection = await pool.getConnection(async (conn) => conn);
    let status = "ONGOING";

    try {
        await connection.beginTransaction();
        // Validation
        // userId->serviceId 일치하는지 확인 이것의 status가 ONGOING인지 확인 completeRequest가 1상태인지 확인
        const ServiceDetail = await serviceProvider.getServiceDetail(userId,serviceId);

        console.log(ServiceDetail);
        if (!ServiceDetail.serviceId)   //ServiceDetail에 ErrResponse가 담겨있는지 확인.
            return ServiceDetail

        console.log(ServiceDetail.completeRequestCount);
        console.log(ServiceDetail.completeRequestCount == 1);

        if (ServiceDetail.completeRequestCount == 1)
            status = "COMPLETED";
        
        const requestResult = await serviceDao.requestCompleteService(connection,serviceId,evaluation,status);
        console.log(requestResult);

        
            


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
