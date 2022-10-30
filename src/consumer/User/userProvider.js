const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");
const {response} = require("../../../config/response");
const { errResponse } = require("../../../config/response");
const baseResponse = require("../../../config/baseResponseStatus");
const userDao = require("./userDao");

// Provider: Read 비즈니스 로직 처리

exports.passwordCheck = async function (selectUserPasswordParams) {
const connection = await pool.getConnection(async (conn) => conn);
    const passwordCheckResult = await userDao.selectUserPassword(
        connection,
        selectUserPasswordParams
    );
    connection.release();
    return passwordCheckResult[0];
};

exports.getUserInfoDetail=async function(customerId){
    const connection=await pool.getConnection(async (conn) => conn);

    try{
        const userInfo=await userDao.getUserInfoDetail(connection,customerId);

        return response(baseResponse.SUCCESS,userInfo);
    }catch(err){
        return errResponse(baseResponse.DB_ERROR);
    }finally{
        connection.release();   
    }
}

exports.getUserInfo=async function(customerId){
    const connection=await pool.getConnection(async (conn) => conn);

    try{
        const userInfo=await userDao.getUserInfo(connection,customerId);

        return response(baseResponse.SUCCESS,userInfo);
    }catch(err){
        return errResponse(baseResponse.DB_ERROR);
    }finally{
        connection.release();   
    }
}

exports.getUserAddress=async function(customerId){
    const connection=await pool.getConnection(async (conn) => conn);

    try{
        const userAddress=await userDao.getUserAddress(connection,customerId);

        return response(baseResponse.SUCCESS,userAddress);
    }catch(err){
        return errResponse(baseResponse.DB_ERROR);
    }finally{
        connection.release();   
    }
}

exports.getUserPets=async function(customerId){
    const connection=await pool.getConnection(async (conn) => conn);

    try{
        const UserPets=await userDao.getUserPets(connection,customerId);

        return response(baseResponse.SUCCESS,UserPets);
    }catch(err){
        return errResponse(baseResponse.DB_ERROR);
    }finally{
        connection.release();   
    }
}

exports.getUserFriends=async function(customerId){
    const connection=await pool.getConnection(async (conn) => conn);

    try{
        const userFriends=await userDao.getUserFriends(connection,customerId);

        return response(baseResponse.SUCCESS,userFriends);
    }catch(err){
        return errResponse(baseResponse.DB_ERROR);
    }finally{
        connection.release();   
    }
}

exports.getBookMark=async function(customerId){
    const connection=await pool.getConnection(async (conn) => conn);

    try{
        const userBookMarks=await userDao.getBookMark(connection,customerId);

        return response(baseResponse.SUCCESS,userBookMarks);
    }catch(err){
        return errResponse(baseResponse.DB_ERROR);
    }finally{
        connection.release();   
    }
}

exports.postUserFriend=async function(myId,friendId){
    const connection=await pool.getConnection(async (conn) => conn);
    let firstId=myId;
    let secondId=friendId;

    console.log(firstId);
    console.log(secondId);
    console.log(myId<friendId);
    if(myId>friendId){
        firstId=friendId;
        secondId=myId;
    }

    try{
        await userDao.postUserFriend(connection,firstId,secondId);

        return response(baseResponse.SUCCESS);
    }catch(err){
        return errResponse(baseResponse.DB_ERROR);
    }finally{
        connection.release();   
    }
}

exports.getReviews=async function(){
    const connection=await pool.getConnection(async (conn) => conn);

    try{
        const retrieveReviewsResult=await userDao.getReviews(connection);
        return response(baseResponse.SUCCESS,retrieveReviewsResult);
    }catch(err){
        return errResponse(baseResponse.DB_ERROR);
    }finally{
        connection.release();   
    }
}

exports.getReviewsDetail=async function(){
    const connection=await pool.getConnection(async (conn) => conn);

    try{
        const retrieveReviewsResult=await userDao.getReviewsDetail(connection);
        return response(baseResponse.SUCCESS,retrieveReviewsResult);
    }catch(err){
        return errResponse(baseResponse.DB_ERROR);
    }finally{
        connection.release();   
    }
}

exports.getCurrentService=async function(userId){
    const connection=await pool.getConnection(async (conn) => conn);

    try{
        connection.beginTransaction();
        const ServiceInfo=await userDao.getCurrentServiceInfo(connection);
        const ServicePets=await userDao.getCurrentServicePets(connection,ServiceInfo.serviceId);
        ServiceInfo.pets=ServicePets;
        delete ServiceInfo.serviceId;


        connection.commit();
        return response(baseResponse.SUCCESS,ServiceInfo);
    }catch(err){
        return errResponse(baseResponse.DB_ERROR);
    }finally{
        connection.release();   
    }
}

exports.retrievePetsittersSameLocation=async function(userId,filter){
    const connection=await pool.getConnection(async (conn) => conn);

    try{
        connection.beginTransaction();
        const customerCity=await userDao.getUserCity(connection,userId);
        console.log(customerCity.city);
        const petSitterList=await userDao.retrievePetsittersSameLocation(connection,userId,customerCity.city,filter);

        connection.commit();
        return response(baseResponse.SUCCESS,petSitterList);
    }catch(err){
        return errResponse(baseResponse.DB_ERROR);
    }finally{
        connection.release();   
    }
}