const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");
const {response} = require("../../../config/response");
const { errResponse } = require("../../../config/response");
const baseResponse = require("../../../config/baseResponseStatus");
const userDao = require("./userDao");

// Provider: Read 비즈니스 로직 처리
exports.idStrCheck = async function (idStr) {
    const connection = await pool.getConnection(async (conn) => conn);
    const idStrCheckResult = await userDao.selectUserIdStr(connection, idStr);
    console.log("여기까지?");
    connection.release();
  
    return idStrCheckResult;
};
  
exports.passwordCheck = async function (selectUserPasswordParams) {
  const connection = await pool.getConnection(async (conn) => conn);
  const passwordCheckResult = await userDao.selectUserPassword(
      connection,
      selectUserPasswordParams
  );
  connection.release();
  return passwordCheckResult[0];
};

exports.retrieveUserName = async function (userId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const retrieveUserNameResult = await userDao.retrieveUserName(
      connection,
      userId
  );
  connection.release();
  return retrieveUserNameResult[0];
};

exports.retrieveUserLocations = async function (userId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const retrieveUserLocationsResult = await userDao.retrieveUserLocations(
      connection,
      userId
  );
  connection.release();
  return retrieveUserLocationsResult[0];
};

exports.checkLoginId = async function (loginId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const checkLoginIdResult = await userDao.checkLoginId(
      connection,
      loginId
  );
  connection.release();
  return checkLoginIdResult[0];
};

exports.getPetSitterDetail = async function (petSitterId) {
  connection = await pool.getConnection(async (conn) => conn);
  const petSitterInfo = {};

  /*
      가져와야 하는 정보:
      1. petSitterProfileImgUrl, petSitterName,만족도, 
      2.certificationLists,
      3.experienceLists,
      4.priceLists,
  */
  try {
      await connection.beginTransaction();
      //1 .Dao: petSitterProfileImgUrl, petSitterName,만족도, 
      
      const petSitterProfile = await userDao.getPetSitterProfileInfo(connection, petSitterId);
      petSitterInfo.profile = petSitterProfile;
      //2. Dao: certificationLists,
      const certificationLists = await userDao.getPetSitterCertificationLists(connection, petSitterId);
      petSitterInfo.certificationLists = certificationLists;
      //3. Dao: experienceLists,
      const experienceLists = await userDao.getPetSitterExperienceLists(connection, petSitterId);
      petSitterInfo.experienceLists = experienceLists;
      //4. Dao: priceLists
      const priceLists = await userDao.getPetSitterPriceLists(connection, petSitterId);
      petSitterInfo.priceLists = priceLists;
    
      console.log(petSitterInfo);
      await connection.commit();
      return response(baseResponse.SUCCESS,petSitterInfo);
  } catch (err) {
      await connection.rollback();
      logger.error(
          `App - getPetSitterDetail Service error\n: ${err.message} \n${JSON.stringify(
              err
              )}`
          );
      return errResponse(baseResponse.DB_ERROR);
  } finally {
      await connection.release();
  }
};
