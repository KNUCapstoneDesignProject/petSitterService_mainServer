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