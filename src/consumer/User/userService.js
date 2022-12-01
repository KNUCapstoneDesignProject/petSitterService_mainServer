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

// Service: Create, Update, Delete 비즈니스 로직 처리

exports.createUser = async function (
    userId,
    nickName,
    profileImg,
    kakaoEmail,
    sex,
    ) {
    connection = await pool.getConnection(async (conn) => conn);
    
    try {

        await connection.beginTransaction();
       
        const insertUserInfoParams = [userId,nickName,profileImg,kakaoEmail,sex];

        console.log("들어는 왔냐?");
        const userIdResult = await userDao.insertUserInfo(connection, insertUserInfoParams);
        
        
        await connection.commit();
        return response(baseResponse.SUCCESS_SIGNUP, { "userId": `${userIdResult[0].insertId}` });


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

exports.getStatus=async function(customerId){
    connection = await pool.getConnection(async (conn) => conn);

    try{

        const userStatus=await userDao.getStatus(connection,customerId);
        return response(baseResponse.SUCCESS,userStatus);

    }catch(err){
        return errResponse(baseResponse.DB_ERROR);
    }finally{
        connection.release();
    }

    
}

exports.patchUserInfo=async function(customerId,patchInfo,userStatus){
    connection = await pool.getConnection(async (conn) => conn);

    try{
        console.log("잠깐만");
        await userDao.patchUserInfo(connection,customerId,patchInfo,userStatus);
        console.log("잠깐만2");
        return response(baseResponse.SUCCESS);

    }catch(err){
        return errResponse(baseResponse.DB_ERROR);
    }finally{
        connection.release();
    }

    
}

exports.postUserPets=async function(customerId,newPet,userStatus,surveyArray,hospitalName,hospitalTel){
    connection = await pool.getConnection(async (conn) => conn);

    try{
        connection.beginTransaction()
        console.log("ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ");
        const postPetResponse = await userDao.postUserPets(connection, customerId, newPet,hospitalName, hospitalTel);
        console.log("ㅇㅇ");
        console.log(postPetResponse);
        const petId = postPetResponse[0].insertId;
        console.log(petId);
        console.log(surveyArray.length);
        for (let questionId = 1; questionId < surveyArray.length+1; questionId++){
            console.log("ㅇㅋ");
            await userDao.postSurvey(connection,petId,1,questionId,surveyArray[questionId-1])
            console.log("ㅇㅋ");
        }
        console.log("ㅇㅇ");
        console.log(userStatus);
        await userDao.patchUserInfo(connection,customerId,null,userStatus);
        console.log("여기");
        connection.commit();
        return response(baseResponse.SUCCESS);

    } catch (err) {
        connection.rollback();
        return errResponse(baseResponse.DB_ERROR);
    }finally{
        connection.release();
    }

    
}

exports.patchLike = async function (serviceId,customerId,isLike,content,imageUrl) {
    connection=await pool.getConnection(async (conn) => conn);

    try{
        await userDao.patchLike(connection,serviceId,customerId,isLike,content,imageUrl);

        return response(baseResponse.SUCCESS);
    }catch(err){
        return errResponse(baseResponse.DB_ERROR);
    }finally{
        connection.release();
    }
    
  
  }

  exports.postReservation = async function (reservationInfo) {
    connection=await pool.getConnection(async (conn) => conn);
    //services테이블 삽입
    //service-customer
    //service_customer_pet테이블 삽입

    try{
        await userDao.postReservationInfo(connection,serviceId,customerId,isLike);

        return response(baseResponse.SUCCESS);
    }catch(err){
        return errResponse(baseResponse.DB_ERROR);
    }finally{
        connection.release();
    }
    
  
  }

  exports.postBookMarks = async function (customerId,petSitterId) {
    connection=await pool.getConnection(async (conn) => conn);

    try{
        await userDao.postBookMarks(connection,customerId,petSitterId);

        return response(baseResponse.SUCCESS);
    }catch(err){
        return errResponse(baseResponse.DB_ERROR);
    }finally{
        connection.release();
    }
    
  
  }