module.exports = {
  // Success
  SUCCESS: { isSuccess: true, code: 1000, message: "성공" },
  NO_REDUNDANT_ID: { isSuccess: true, code: 1001, message: "아이디 중복 체크 성공" },
  HAS_NO_ID:{isSuccess: true, code: 1001, message: "hasn't id"},
  // Common
  TOKEN_EMPTY: {
    isSuccess: false,
    code: 2000,
    message: "JWT 토큰을 입력해주세요.",
  },
  TOKEN_VERIFICATION_FAILURE: {
    isSuccess: false,
    code: 3000,
    message: "JWT 토큰 검증 실패",
  },
  TOKEN_VERIFICATION_SUCCESS: {
    isSuccess: true,
    code: 1001,
    message: "JWT 토큰 검증 성공",
  }, // ?

  //Request error
  SIGNUP_ID_EMPTY: {
    isSuccess: false,
    code: 2001,
    message: "아이디를 입력해주세요",
  },
  SIGNUP_ID_LENGTH: {
    isSuccess: false,
    code: 2002,
    message: "아이디는 20자리 미만으로 입력해주세요.",
  },
  SIGNUP_ID_ERROR_TYPE: {
    isSuccess: false,
    code: 2003,
    message: "이메일을 형식을 정확하게 입력해주세요.",
  },
  SUCCESS_SIGNUP: { isSuccess: true, code: 1000, message: "회원가입 성공" },
  SIGNUP_PASSWORD_EMPTY: {
    isSuccess: false,
    code: 2004,
    message: "비밀번호를 입력 해주세요.",
  },
  SIGNUP_PASSWORD_LENGTH: {
    isSuccess: false,
    code: 2005,
    message: "비밀번호는 6~20자리를 입력해주세요.",
  },
  SIGNUP_NICKNAME_EMPTY: {
    isSuccess: false,
    code: 2006,
    message: "닉네임을 입력 해주세요.",
  },
  SIGNUP_NICKNAME_LENGTH: {
    isSuccess: false,
    code: 2007,
    message: "닉네임은 최대 20자리를 입력해주세요.",
  },
  SIGNUP_TEL_EMPTY: {
    isSuccess: false,
    code: 2008,
    message: "전화번호를 입력해주세요.",
  },
  SIGNUP_ADDRESS_EMPTY: {
    isSuccess: false,
    code: 2009,
    message: "주소를 입력해주세요.",
  },
  SIGNUP_NAME_EMPTY: {
    isSuccess: false,
    code: 2010,
    message: "이름을 입력해주세요.",
  },

  SIGNUP_DOGS_EMPTY: {
    isSuccess: false,
    code: 2011,
    message: "강아지를 추가해주세요.",
  },
  SIGNUP_PROFILE_IMG_EMPTY: {
    isSuccess: false,
    code: 2012,
    message: "프로필이미지를 등록해주세요",
  },
  SIGNUP_EMAIL_EMPTY:{
    isSuccess: false,
    code: 2013,
    message: "이메일을 등록해주세요",
  },
  SIGNUP_SEX_EMPTY:{
    isSuccess: false,
    code: 2014,
    message: "성별을 등록해주세요",
  },

  SIGNIN_EMAIL_EMPTY: {
    isSuccess: false,
    code: 2008,
    message: "이메일을 입력해주세요",
  },
  SIGNIN_EMAIL_LENGTH: {
    isSuccess: false,
    code: 2009,
    message: "이메일은 30자리 미만으로 입력해주세요.",
  },
  SIGNIN_EMAIL_ERROR_TYPE: {
    isSuccess: false,
    code: 2010,
    message: "이메일을 형식을 정확하게 입력해주세요.",
  },
  SIGNIN_PASSWORD_EMPTY: {
    isSuccess: false,
    code: 2011,
    message: "비밀번호를 입력 해주세요.",
  },

  USER_USERID_EMPTY: {
    isSuccess: false,
    code: 2012,
    message: "userId를 입력해주세요.",
  },
  USER_USERID_NOT_EXIST: {
    isSuccess: false,
    code: 2013,
    message: "해당 회원이 존재하지 않습니다.",
  },

  USER_USEREMAIL_EMPTY: {
    isSuccess: false,
    code: 2014,
    message: "이메일을 입력해주세요.",
  },
  USER_USEREMAIL_NOT_EXIST: {
    isSuccess: false,
    code: 2015,
    message: "해당 이메일을 가진 회원이 존재하지 않습니다.",
  },
  USER_ID_NOT_MATCH: {
    isSuccess: false,
    code: 2016,
    message: "유저 아이디 값을 확인해주세요",
  },
  USER_NICKNAME_EMPTY: {
    isSuccess: false,
    code: 2017,
    message: "변경할 닉네임 값을 입력해주세요",
  },

  USER_STATUS_EMPTY: {
    isSuccess: false,
    code: 2018,
    message: "회원 상태값을 입력해주세요",
  },
  LOCATION_EMPTY: {
    isSuccess: false,
    code: 2019,
    message: "장소를 입력해주세요",
  },

  PET_SITTER_ID_EMPTY: {
    isSuccess: false,
    code: 2020,
    message: "petSitter의 ID를 입력해주세요.",
  },
  SERVICE_SERVICEID_EMPTY: {
    isSuccess: false,
    code: 2021,
    message: "service의 ID를 입력해주세요.",
  },
  SERVICEID_NOT_MATCH: {
    isSuccess: false,
    code: 2022,
    message: "service의 ID값을 확인해주세요.",
  },
  EVALUATION_EMPTY: {
    isSuccess: false,
    code: 2023,
    message: "평가를 입력해주세요",
  },

  // Response error
  SIGNUP_REDUNDANT_ID: {
    isSuccess: false,
    code: 3001,
    message: "중복된 아이디 입니다.",
  },
  SIGNUP_REDUNDANT_NICKNAME: {
    isSuccess: false,
    code: 3002,
    message: "중복된 닉네임입니다.",
  },

  SIGNIN_ID_STR_WRONG: {
    isSuccess: false,
    code: 3003,
    message: "아이디가 잘못 되었습니다.",
  },
  SIGNIN_PASSWORD_WRONG: {
    isSuccess: false,
    code: 3004,
    message: "비밀번호가 잘못 되었습니다.",
  },
  SIGNIN_INACTIVE_ACCOUNT: {
    isSuccess: false,
    code: 3005,
    message: "비활성화 된 계정입니다. 고객센터에 문의해주세요.",
  },
  SIGNIN_WITHDRAWAL_ACCOUNT: {
    isSuccess: false,
    code: 3006,
    message: "탈퇴 된 계정입니다. 고객센터에 문의해주세요.",
  },

  //Connection, Transaction 등의 서버 오류
  DB_ERROR: { isSuccess: false, code: 4000, message: "데이터 베이스 에러" },
  SERVER_ERROR: { isSuccess: false, code: 4001, message: "서버 에러" },
};
