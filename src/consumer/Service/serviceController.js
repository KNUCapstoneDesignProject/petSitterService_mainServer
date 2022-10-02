const jwtMiddleware = require("../../../config/jwtMiddleware");
const serviceProvider = require("./serviceProvider");
const serviceService = require("./serviceService");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

const { emit } = require("nodemon");

exports.evaluateService = async function (req, res) {
    let userId;
    let serviceId;
    let evaluation=req.body.evaluation;

    if (!req.body.userId) 
        return res.send(errResponse(baseResponse.USER_USERID_EMPTY));
    
    if (!req.body.serviceId)
        return res.send(errResponse(baseResponse.SERVICE_SERVICEID_EMPTY));
    
    if (!req.body.evaluation)
        return res.send(errResponse(baseResponse.EVALUATION_EMPTY));
    
    serviceId = req.body.serviceId;
    /* header token과 path variable userId가 서로 일치하는지 확인 */
    if (req.verifiedToken.userId == req.body.userId) {
        userId=req.verifiedToken.userId
    } else {
        return res.send(errResponse(baseResponse.USER_ID_NOT_MATCH))
    }
    

    const evaluateServiceResult = await serviceService.evaluateService(userId,serviceId,evaluation);

    return res.send(evaluateServiceResult);

};

exports.getCurrentService = async function (req, res) {
    let serviceId;
    let userId = req.verifiedToken.userId;

    if (!req.params.serviceId) 
        return res.send(errResponse(baseResponse.SERVICE_SERVICEID_EMPTY));
    
    serviceId = req.params.serviceId;


    const getCurrentServiceResult = await serviceProvider.getCurrentService(serviceId,userId);

    return res.send(getCurrentServiceResult);

};