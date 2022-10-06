module.exports = function (app) {
    const petSitter = require("./petSitterController");
    const jwtMiddleware = require("../../../config/jwtMiddleware");


    //로그인 API
    /** @swagger
    * paths:
    *  /consumer/login:
    *   post:
    *     tags: [Consumer/Users]
    *     summary: 로그인 API
    *     consumes:
    *       application/json
    *     requestBody:
    *       required: true
    *       content:
    *         application/json: 
    *           schema:
    *             type: object
    *             properties:
    *               idStr:
    *                 type: string
    *                 example: alsdnrdl01
    *               password:
    *                 type: string
    *                 example: Aa1234@
    *                 description: 대소문자숫자특수문자포함 8자이상, 암호화 안하고 평문으로 보냄
    *             
    *     responses:
    *       "2000":
    *         description: 로그인 성공!
    *         contnet:
    *           application:json
    *       "3003":
    *         description: 아이디가 잘못 되었습니다.
    *       "3004":
    *         description: 비밀번호가 잘못 되었습니다.
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
    * 
    * */
    app.post("/provider/login", petSitter.login);
    
    /**
    * @swagger
    * paths:
    *  /consumer/user:
    *   post:
    *     tags: [Consumer/Users]
    *     summary: 회원가입 API
    *     consumes:
    *       application/json
    *     requestBody:
    *       required: true
    *       content:
    *         application/json: 
    *           schema:
    *             type: object
    *             properties:
    *               idStr:
    *                 type: string
    *                 example: alsdnrdl01
    *               userName:
    *                 type: string
    *                 example: 정민욱
    *               password:
    *                 type: string
    *                 example: Aa1234@
    *                 description: 대소문자숫자특수문자포함 8자이상, 암호화 안하고 평문으로 보냄
    *               phoneNumber:
    *                 type: string
    *                 example: "01012341234"
    *                 description: string형태인거 주의!, '-'포함안함, 국가코드 포함안함.휴대폰번호만인정.
    *               address:
    *                 type: string
    *                 example: 내 주소가 궁금해?ㅎ
    *               dogs:
    *                 type: array 
    *                 items:
    *                   $ref: '#/definitions/Pets'
    *             
    *             
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
    //   // 2. POST 유저 생성 (회원가입) API
    app.post("/provider/user", petSitter.postUsers);


};
