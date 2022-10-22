module.exports = function (app) {
  const user = require("./userController");
  const jwtMiddleware = require("../../../config/jwtMiddleware");


  // 0. 테스트 API
  app.get('/customers/test', user.getTest)

  app.get('/customers/:customerId/status',user.getStatus);

  app.get('/customers/:customerId/detail',user.userInfoDetail);

  app.get('/customer/:customerId/address',user.userAddress);

  app.get('/customer/:customerId/pets',user.userPets);

  app.get('/customer/:customerId/friends',user.getUserFriends);

  app.get('/customer/:customerId',user.userInfo);

  app.get('/customer/:customerId/bookmarks',user.getBookMark);
  //   // TODO: After 로그인 인증 방법 (JWT)
  //   // 1. 로그인 하기 API (JWT 생성)
  app.post("/consumer/login", user.login);
  
  /** @swagger
  * paths:
  *  /consumer/login:
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
  *               nickName:
  *                 type: string
  *                 example: 정민욱
  *                 description: 이름대신 가져오는 특성
  *               profileImg:
  *                 type: string
  *                 example: https://이미지url
  *               kakaoEmail:
  *                 type: string
  *                 example: email@naver.com
  *                 description: 카카오 아이디
  *               sex:
  *                 type: string
  *                 example: "M"
  *                 description: M or F
  *             
  *     responses:
  *       "1000":
  *         description: 회원가입 성공!
  *         contnet:
  *           application:json
  *       "2006":
  *         description: 닉네임을 입력해주세요
  *       "2012":
  *         description: 프로필이미지를 등록해주세요
  *       "2013":
  *         description: 이메일을 등록해주세요
  *       "2014":
  *         description: 성별을 등록해주세요
  *       "4000":
  *         description: 데이터 베이스 에러
  *     
  * 
  * 
  *      
  */
  //   // 2. POST 유저 생성 (회원가입) API
  app.post("/customer/user", user.postUsers);

  app.post("/customer/:customerId/pets",user.postUserPets);
  
  app.post("/customer/:customerId/friend",user.postUserFriend);

  app.patch('/customer/:customerId/userInfo',user.patchUserInfo);
};



// TODO: 자동로그인 API (JWT 검증 및 Payload 내뱉기)
// JWT 검증 API
// app.get('/app/auto-login', jwtMiddleware, user.check);

// TODO: 탈퇴하기 API
