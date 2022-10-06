const jwtMiddleware = require("../../../config/jwtMiddleware");
const petSitterProvider = require("./petSitterProvider");
const petSitterService = require("./petSitterService");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

const { emit } = require("nodemon");


/**
 * API No. 4
 * API Name : 로그인 API
 * [POST] /app/login
 * body : idStr, passsword
 */
exports.login = async function (req, res) {
    const { idStr, password } = req.body;

    console.log(password);
    // TODO: idStr, password 형식적 Validation

    const signInResponse = await petSitterService.postSignIn(idStr, password);

    return res.send(signInResponse);
};