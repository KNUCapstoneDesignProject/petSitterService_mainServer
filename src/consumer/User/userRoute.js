module.exports = function (app) {
  const user = require("./userController");
  const jwtMiddleware = require("../../../config/jwtMiddleware");

  // 0. 테스트 API
  app.get('/app/test', user.getTest)

//   // TODO: After 로그인 인증 방법 (JWT)
//   // 1. 로그인 하기 API (JWT 생성)
  app.post("/app/login", user.login);

//   // 2. POST 유저 생성 (회원가입) API
//   app.post("/consumer/user", user.postUsers);

//   // 3. GET 로그인된 유저의 이름
//   app.get("/consumer/user/name", user.getUserName);

//   // 4. 지역에 따른 펫시터 검색
//   app.get("/consumer/location/pet-sitters", user.getPetSitterByLocation);

//   // 5. GET 유저의 등록된 주소
//   app.get("/consumer/user/locations", user.getLocationsForUser);

//   // 6. GET petSitter의 상세 정보
//   app.get("/consumer/pet-sitter/detail", user.getPetSitterDetail);

//   // 7. GET 유저의 등록된 펫들의 정보
//   app.get("/consumer/users/:userId/pets", user.getUserPets);

//   // 8. POST 유저 주소 등록
//   app.post("/consumer/users/:userId/location", user.getUserLocation);
};

// TODO: 자동로그인 API (JWT 검증 및 Payload 내뱉기)
// JWT 검증 API
// app.get('/app/auto-login', jwtMiddleware, user.check);

// TODO: 탈퇴하기 API
