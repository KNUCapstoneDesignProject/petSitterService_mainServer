const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const userDao = require("./userDao");

// Provider: Read 비즈니스 로직 처리
exports.idStrCheck = async function (idStr) {
    const connection = await pool.getConnection(async (conn) => conn);
    const idStrCheckResult = await userDao.selectUserIdStr(connection, idStr);
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
