const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const userDao = require("./userDao");

// Provider: Read 비즈니스 로직 처리
exports.idStrCheck = async function (idStr) {
    console.log("여기로 들어오는거 맞지2");
    const connection = await pool.getConnection(async (conn) => conn);
    const idStrCheckResult = await userDao.selectUserIdStr(connection, idStr);
    console.log(idStrCheckResult);
    connection.release();
  
    return idStrCheckResult;
  };