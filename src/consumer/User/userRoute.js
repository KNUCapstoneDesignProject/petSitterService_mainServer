module.exports = function (app) {
  const user = require("./userController");
  const jwtMiddleware = require("../../../config/jwtMiddleware");


  // 0. 테스트 API
  app.get('/app/test', user.getTest)

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
  app.post("/consumer/user", user.postUsers);

/** 
 * @swagger
  * paths:
  *  /consumer/users/{userId}/name:
  *   get:
  *     tags: [Consumer/Users]
  *     summary: 로그인 되어있는 유저의 이름을 받아오는 API
  *     consumes:
  *       application/json
  *     parameters:
  *       - in: path
  *         name: userId
  *         type: integer
  *         required: true
  *         description: unsigned integer, header를 통해서 보내주는 token과 path를 통해 들어오는 userId가 일치해야한다. userId 6으로 테스트 권장
  *       - in: header
  *         name: x-access-token
  *         type: string
  *         required: true
  *         description: 로그인 api를 통해 발급받은 token을 넣어준다. token의 유효기간은 현재 1day로 설정되어있다.
  *     responses:
  *       "1000":
  *         description: 로그인 성공!
  *         contnet:
  *           application:json
  *       "2000":
  *         description: JWT 토큰을 입력해주세요.
  *       "2016":
  *         description: 유저 아이디 값을 확인해주세요.
  *       "3000":
  *         description: JWT 토큰 검증 실패
  *       "4000":
  *         description: 데이터 베이스 에러 
  *     
  * 
  * 
  *      
  * 
  * */
  //   // 3. GET 로그인된 유저의 이름
  app.get("/consumer/users/:userId/name", jwtMiddleware,user.getUserName);

  //   // 4. 지역에 따른 펫시터 검색
  //   app.get("/consumer/location/pet-sitters", user.getPetSitterByLocation);

  /** 
 * @swagger
  * paths:
  *  /consumer/users/{userId}/locations:
  *   get:
  *     tags: [Consumer/Users]
  *     summary: 로그인 되어있는 유저의 등록된 주소들을 받아오는 API, esult의 첫 인덱스에 무조껀  DEFAULT설정이 되어있는 주소로 보내진다.
  *     consumes:
  *       application/json
  *     parameters:
  *       - in: path
  *         name: userId
  *         type: integer
  *         required: true
  *         description: unsigned integer, header를 통해서 보내주는 token과 path를 통해 들어오는 userId가 일치해야한다. userId 6으로 테스트 권장
  *       - in: header
  *         name: x-access-token
  *         type: string
  *         required: true
  *         description: 로그인 api를 통해 발급받은 token을 넣어준다. token의 유효기간은 현재 1day로 설정되어있다.
  *     responses:
  *       "1000":
  *         description: 로그인 성공!
  *         contnet:
  *           application:json
  *       "2000":
  *         description: JWT 토큰을 입력해주세요.
  *       "2016":
  *         description: 유저 아이디 값을 확인해주세요.
  *       "3000":
  *         description: JWT 토큰 검증 실패
  *       "4000":
  *         description: 데이터 베이스 에러 
  *     
  * 
  * 
  *      
  * 
  * */
  //   // 5. GET 유저의 등록된 주소
    app.get("/consumer/users/:userId/locations",jwtMiddleware,user.getLocationsForUser);

  /** 
 * @swagger
  * paths:
  *  /consumer/pet-sitter/{petSitterId}/detail:
  *   get:
  *     tags: [Consumer/Users]
  *     summary: Pet Sitter 상세정보 조회 API
  *     consumes:
  *       application/json
  *     parameters:
  *       - in: path
  *         name: petSitterId
  *         type: integer
  *         required: true
  *         description: 조회하고자 하는 petSitter의 Id넣어서 호출
  *       - in: header
  *         name: x-access-token
  *         type: string
  *         required: true
  *         description: 로그인 api를 통해 발급받은 token을 넣어준다. token의 유효기간은 현재 1day로 설정되어있다.
  *     responses:
  *       "1000":
  *         description: 로그인 성공!
  *         contnet:
  *           application:json
  *       "2000":
  *         description: JWT 토큰을 입력해주세요.
  *       "2016":
  *         description: 유저 아이디 값을 확인해주세요.
  *       "3000":
  *         description: JWT 토큰 검증 실패
  *       "4000":
  *         description: 데이터 베이스 에러 
  *     
  * 
  * 
  *      
  * 
  * */
  //   // 6. GET petSitter의 상세 정보
    app.get("/consumer/pet-sitter/:petSitterId/detail", user.getPetSitterDetail);

      
  /** 
 * @swagger
  * paths:
  *  /consumer/users/{userId}/pets:
  *   get:
  *     tags: [Consumer/Users]
  *     summary: 유저의 등록된 펫들을 리스트로 불러오는 API.
  *     consumes:
  *       application/json
  *     parameters:
  *       - in: path
  *         name: userId
  *         type: integer
  *         required: true
  *         description: unsigned integer, header를 통해서 보내주는 token과 path를 통해 들어오는 userId가 일치해야한다. userId 6으로 테스트 권장
  *       - in: header
  *         name: x-access-token
  *         type: string
  *         required: true
  *         description: 로그인 api를 통해 발급받은 token을 넣어준다. token의 유효기간은 현재 1day로 설정되어있다.
  *     responses:
  *       "1000":
  *         description: 로그인 성공!
  *         contnet:
  *           application:json
  *       "2000":
  *         description: JWT 토큰을 입력해주세요.
  *       "2012":
  *         description: userId를 입력해주세요.
  *       "2016":
  *         description: 유저 아이디 값을 확인해주세요.
  *       "3000":
  *         description: JWT 토큰 검증 실패
  *       "4000":
  *         description: 데이터 베이스 에러 
  *     
  * 
  * 
  *      
  * 
  * */
  //   // 7. GET 유저의 등록된 펫들의 정보
    app.get("/consumer/users/:userId/pets", jwtMiddleware,user.getUserPets);

  //  // 8. 서비스 완료와 함께 평가(Good or Bad)
    app.patch("/consumer/reservation/histories", user.evaluateService);
  
  /**
 * @swagger
  * paths:
  *  /consumer/users/{userId}/reservation/histories:
  *   get:
  *     tags: [Consumer/Users]
  *     summary: 이전 서비스 기록 조회 API
  *     consumes:
  *       application/json
  *     parameters:
  *       - in: path
  *         name: userId
  *         type: integer
  *         required: true
  *         description: unsigned integer, header를 통해서 보내주는 token과 path를 통해 들어오는 userId가 일치해야한다. userId 6으로 테스트 권장
  *       - in: header
  *         name: x-access-token
  *         type: string
  *         required: true
  *         description: 로그인 api를 통해 발급받은 token을 넣어준다. token의 유효기간은 현재 1day로 설정되어있다.
  *     responses:
  *       "1000":
  *         description: 로그인 성공!
  *         contnet:
  *           application:json
  *       "2000":
  *         description: JWT 토큰을 입력해주세요.
  *       "2012":
  *         description: userId를 입력해주세요.
  *       "2016":
  *         description: 유저 아이디 값을 확인해주세요.
  *       "2019":
  *         description: 장소를 입력해주세요
  *       "3000":
  *         description: JWT 토큰 검증 실패
  *       "4000":
  *         description: 데이터 베이스 에러   
  * 
  * */
  
  // // 9. 이전 서비스 기록들 조회
    app.get("/consumer/users/:userId/reservation/histories",jwtMiddleware,user.getPrevServices);
  /** 
 * @swagger
  * paths:
  *  /consumer/users/{userId}/location:
  *   post:
  *     tags: [Consumer/Users]
  *     summary: 유저 주소 등록 API
  *     consumes:
  *       application/json
  *     parameters:
  *       - in: path
  *         name: userId
  *         type: integer
  *         required: true
  *         description: unsigned integer, header를 통해서 보내주는 token과 path를 통해 들어오는 userId가 일치해야한다. userId 6으로 테스트 권장
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
  *               location:
  *                 type: string
  *                 example: 대구 북구 칠곡중앙대로 111
  *     responses:
  *       "1000":
  *         description: 로그인 성공!
  *         contnet:
  *           application:json
  *       "2000":
  *         description: JWT 토큰을 입력해주세요.
  *       "2012":
  *         description: userId를 입력해주세요.
  *       "2016":
  *         description: 유저 아이디 값을 확인해주세요.
  *       "2019":
  *         description: 장소를 입력해주세요
  *       "3000":
  *         description: JWT 토큰 검증 실패
  *       "4000":
  *         description: 데이터 베이스 에러   
  * 
  * */
  //   // 10. POST 유저 주소 등록
    app.post("/consumer/users/:userId/location", jwtMiddleware,user.postNewLocation);

  
  /** 
 * @swagger
  * paths:
  *  /join/check-login-id/{loginId}:
  *   get:
  *     tags: [Consumer/Users]
  *     summary: 회원가입할때 아이디 중복 체크 API
  *     consumes:
  *       application/json
  *     parameters:
  *       - in: path
  *         name: loginId
  *         type: string
  *         required: true
  *         description: 회원가입 할 때 중복체크할 아이디 문자열
  *     responses:
  *       "1001":
  *         description: 아이디 중복 체크 성공
  *         contnet:
  *           application:json
  *       "3001":
  *         description: 중복된 아이디 입니다.
  *       "4000":
  *         description: 데이터 베이스 에러 
  *     
  * 
  * 
  *      
  * 
  * */
      // 11. 아이디 중복 체크 API
  app.get("/join/check-login-id/:loginId", user.checkLoginId);
  

  /** 
 * @swagger
  * paths:
  *  /consumer/pet-sitter/{petSitterId}/service:
  *   post:
  *     tags: [Consumer/Users]
  *     summary: 서비스 예약 요청 API
  *     consumes:
  *       application/json
  *     parameters:
  *       - in: path
  *         name: petSitterId
  *         type: integer
  *         required: true
  *         description: unsigned integer, header를 통해서 보내주는 token과 path를 통해 들어오는 userId가 일치해야한다. userId 6으로 테스트 권장
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
  *               startTime:
  *                 type: string
  *                 example: 2022-10-01 09:00
  *               endTime:
  *                 type: string
  *                 example: 2022-10-01 11:00
  *               requestComment:
  *                 type: string
  *                 example: 저희집에 오셔가지고 설거지 좀 해주시고 ^^ 쓰레기 도 버려주시구!~~~
  *               hasWalk:
  *                 type: integer
  *                 example: 0
  *               hasBath:
  *                 type: integer
  *                 example: 0
  *               totalPrice:
  *                 type: integer
  *                 example: 100
  *               status:
  *                 type: string
  *                 example: RESERVATION
  *               petLists:
  *                 type: array
  *                 example: [9,10]
  *     responses:
  *       "1000":
  *         description: 로그인 성공!
  *         contnet:
  *           application:json
  *       "2000":
  *         description: JWT 토큰을 입력해주세요.
  *       "2012":
  *         description: userId를 입력해주세요.
  *       "2016":
  *         description: 유저 아이디 값을 확인해주세요.
  *       "2019":
  *         description: 장소를 입력해주세요
  *       "3000":
  *         description: JWT 토큰 검증 실패
  *       "4000":
  *         description: 데이터 베이스 에러   
  * 
  * */
  // 12. 서비스 예약 요청 API
  app.post("/consumer/pet-sitter/:petSitterId/service",jwtMiddleware,user.reserveService)
};



// TODO: 자동로그인 API (JWT 검증 및 Payload 내뱉기)
// JWT 검증 API
// app.get('/app/auto-login', jwtMiddleware, user.check);

// TODO: 탈퇴하기 API
