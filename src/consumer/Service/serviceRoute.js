module.exports = function (app) {
  const service = require("./serviceController");
  const jwtMiddleware = require("../../../config/jwtMiddleware");

  /**
  * @swagger
  * paths:
  *  /consumer/reservation/histories:
  *   patch:
  *     tags: [Consumer/Services]
  *     summary: 서비스 종료와 함께 서비스 평가.
  *     consumes:
  *       application/json
  *     parameters:
  *       - in: header
  *         name: x-access-token
  *         type: string
  *         required: true
  *         description: 로그인 api를 통해 발급받은 token을 넣어준다. token의 유효기간은 현재 1day로 설정되어있다.
  *     requestBody:
  *       required: true
  *       content:
  *         application/json: 
  *           schema:
  *             type: object
  *             properties:
  *               userId:
  *                 type: integer
  *                 example: 6
  *               serviceId:
  *                 type: integer
  *                 example: 1
  *               evaluation:
  *                 type: integer
  *                 example: 1
  *                 description: Good(1),Bad(0)
  *     responses:
  *       "1000":
  *         description: 회원가입 성공!
  *         contnet:
  *           application:json
  *       "2001":
  *         description: 아이디를 입력해주세요
  *       "2004":
  *         description: 비밀번호를 입력 해주세요.
  *       "2008":
  *         description: 전화번호를 입력해주세요.
  *       "2009":
  *         description: 주소를 입력해주세요
  *       "2010":
  *         description: 이름을 입력해주세요.
  *       "3001":
  *         description: 중복된 아이디 입니다.
  *       "4000":
  *         description: 데이터 베이스 에러
  *     
  * definitions:
  *   Pets:
  *     type: object
  *     properties:
  *         petName:
  *             type: string
  *         petBreed:
  *             type: string
  *         petAge:
  *             type: integer
  *         petSex:
  *             type: string
  *             description: MALE or FEMALE
  *         petSize:
  *             type: string
  *             description: SMALL,MEDIUM,LARGE
  *         profileImgUrl:
  *             type: string
  * 
  * 
  *      
  */
  // // 1. 서비스 완료와함께 평가(Good or Bad)

  app.patch("/consumer/reservation/histories", jwtMiddleware,service.evaluateService);
  

  // // 2. 이전 서비스 기록들 조회
  // app.get("/provider/reservation/histories",reservation.retrieveServiceHistories);

  /**
  * @swagger
  * paths:
  *  /service/{serviceId}:
  *   get:
  *     tags: [Consumer/Services]
  *     summary: 서비스 상세 조회 API.
  *     consumes:
  *       application/json
  *     parameters:
  *       - in: path
  *         name: serviceId
  *         type: integer
  *         required: true
  *         description: 조회하고자 하는 페이지의 serviceId를 넘겨주면 된다.
  *         example: 1 or 11 or 12
  *       - in: header
  *         name: x-access-token
  *         type: string
  *         required: true
  *         description: 로그인 api를 통해 발급받은 token을 넣어준다. token의 유효기간은 현재 1day로 설정되어있다.
  *     responses:
  *       "1000":
  *         description: 회원가입 성공!
  *         contnet:
  *           application:json
  *       "2016":
  *         description: 로그인된 유저의 Service가 아닙니다.
  *       "2021":
  *         description: service의 ID를 입력해주세요
  *       "4000":
  *         description: 데이터 베이스 에러
  *     
  * 
  *      
  */
// // 2. 이전 서비스 기록들 조회
  app.get("/service/:serviceId",jwtMiddleware,service.getCurrentService);

};

// TODO: 자동로그인 API (JWT 검증 및 Payload 내뱉기)
// JWT 검증 API
// app.get('/app/auto-login', jwtMiddleware, user.check);

// TODO: 탈퇴하기 API
