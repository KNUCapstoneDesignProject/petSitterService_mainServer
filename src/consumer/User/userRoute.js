module.exports = function (app) {
  const user = require("./userController");
  const jwtMiddleware = require("../../../config/jwtMiddleware");


  // 0. 테스트 API
  app.get('/customers/test', user.getTest)

  app.get('/customers/:customerId/status',user.getStatus);

  app.get('/customers/:customerId/hasid',user.hasId)
  
  app.get('/customers/:customerId/detail',user.userInfoDetail);

  app.get('/customer/:customerId/address',user.userAddress);

  app.get('/customer/:customerId/pets',user.userPets);

  app.get('/customer/:customerId/friends',user.getUserFriends);

  app.get('/customer/:customerId',user.userInfo);

  app.get('/customer/:customerId/bookmarks',user.getBookMark);
  //   // TODO: After 로그인 인증 방법 (JWT)
  //   // 1. 로그인 하기 API (JWT 생성)
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
  app.post("/consumer/login", user.login);  
  
  /** @swagger
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
  *         petCategory:
  *             type: string
  *             description: DOG | CAT
  *             example: DOG
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
  app.post("/customer/user", user.postUsers);

  app.post("/customer/:customerId/pets",user.postUserPets); // todo 버그있음
  
  app.post("/customer/:customerId/friend",user.postUserFriend);

  app.patch('/customer/:customerId/userInfo',user.patchUserInfo);

  app.get("/reviews/detail",user.getReviewsDetail);

  app.get("/reviews",user.getReviews);

  app.get("/users/:userId/petsitters/same-location",user.retrievePetsittersSameLocation);
  
  app.patch("/service/is-like",user.patchLike);

  app.get('/users/:userId/current-service', user.getCurrentService);
  
  app.post("/service/reservation", user.postReservation); //postman에 등록해야함.

  app.post("/bookmarks",user.postBookMarks);
};



// TODO: 자동로그인 API (JWT 검증 및 Payload 내뱉기)
// JWT 검증 API
// app.get('/app/auto-login', jwtMiddleware, user.check);

// TODO: 탈퇴하기 API
