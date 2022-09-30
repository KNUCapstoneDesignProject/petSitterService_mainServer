const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

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