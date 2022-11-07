

// 유저 생성
async function insertUserInfo(connection, insertUserInfoParams) {
  console.log(insertUserInfoParams);
  // nickName,profileImg,kakaoEmail,sex
  const insertUserInfoQuery = `
          INSERT INTO Customers(customerId,customerName,profileImgUrl,kakaoEmail,sex,status)
          VALUES (?, ?, ?, ?,?,"STEP1");
      `;
  const insertUserInfoRow = await connection.query(
    insertUserInfoQuery,
    insertUserInfoParams
  );

  return insertUserInfoRow;
}


// 유저 생성
async function getStatus(connection, customerId) {
  console.log(customerId);
  // nickName,profileImg,kakaoEmail,sex
  console.log(" 여기들어옴?")
  const getStatusQuery = `
          SELECT status
          FROM Customers
          WHERE customerId=?
      `;
  const customerStatus = await connection.query(
    getStatusQuery,
    customerId
  );
  console.log(customerStatus[0][0]);

  return customerStatus[0][0];
}

async function patchUserInfo(connection,customerId,patchInfo,userStatus) {
  console.log("here2");
  // nickName,profileImg,kakaoEmail,sex
  let updateStatement='customerId=customerId';

  if(patchInfo && patchInfo.age)
    updateStatement+=`, age=${patchInfo.age}`
  
  console.log("here");
  if(patchInfo && patchInfo.address)
    updateStatement+=`, address="${patchInfo.address}"`;

  if(patchInfo && patchInfo.tel)
    updateStatement+=`, tel="${patchInfo.tel}"`;

  if(userStatus)
    updateStatement+=`, status="${userStatus}"`;
  console.log(userStatus);    
  console.log(updateStatement);

  const patchUserInfo = `
          UPDATE Customers
          SET 
      `+updateStatement+` WHERE customerId=${customerId}`;
  
  console.log(patchUserInfo);

  const patchResponse = await connection.query(
    patchUserInfo,
    customerId
  );


  return patchResponse;
}

async function postUserPets(connection,customerId,newPet) {
  // nickName,profileImg,kakaoEmail,sex

  const postUserPetsQuery = `
    INSERT INTO Pets(customerId,petName, petType, petSpecies, petBirth, petSize, petSex, petAge, registrationType, isNeutralize)
    VALUES(
      ${customerId},
      "${newPet.petName}",
      "${newPet.petType}",
      "${newPet.petSpecies}",
      "${newPet.petBirth}",
      "${newPet.petSize}",
      "${newPet.petSex}",
      ${newPet.petAge},
      "${newPet.registrationType}",
      "${newPet.isNeutralize}"
    )
    `;
  
  console.log(postUserPetsQuery);

  const patchResponse = await connection.query(
    postUserPetsQuery
  );


  return patchResponse;
}


async function getUserInfoDetail(connection,customerId) {
  // nickName,profileImg,kakaoEmail,sex

  const getUserInfoDetailQuery = `
      SELECT address, profileImgUrl, customerName, tel, sex, age, status FROM Customers
      where customerId=${customerId};
    `;
  
  

  const getUserInfoDetailResponse = await connection.query(
    getUserInfoDetailQuery
  );


  return getUserInfoDetailResponse[0];
}

async function getUserInfo(connection,customerId) {
  // nickName,profileImg,kakaoEmail,sex

  const getUserInfoDetailQuery = `
      SELECT customerId,profileImgUrl,customerName,kakaoEmail FROM Customers
      where customerId=${customerId};
    `;
  
    console.log(getUserInfoDetailQuery);
  

  const getUserInfoDetailResponse = await connection.query(
    getUserInfoDetailQuery
  );


  return getUserInfoDetailResponse[0];
}

async function getUserAddress(connection,customerId) {
  // nickName,profileImg,kakaoEmail,sex

  const getUserAddressQuery = `
      SELECT customerId,address FROM Customers
      where customerId=${customerId};
    `;
  
    console.log(getUserAddressQuery);
  

  const getUserInfoDetailResponse = await connection.query(
    getUserAddressQuery
  );


  return getUserInfoDetailResponse[0][0];
}

async function getUserPets(connection,customerId) {
  // nickName,profileImg,kakaoEmail,sex

  const getUserPetsQuery = `
      select petId,petName,petType,petSpecies,petBirth,petSize,petSex,petAge,registrationType,isNeutralize from Pets
      Where customerId=${customerId};
    `;
  
    console.log(getUserPetsQuery);
  

  const getUserInfoDetailResponse = await connection.query(
    getUserPetsQuery
  );


  return getUserInfoDetailResponse[0];
}


async function getUserFriends(connection,customerId) {
  // nickName,profileImg,kakaoEmail,sex

  const getUserFriendsQuery = `
      SELECT customerId as friendId,customerName,kakaoEmail,profileImgUrl FROM Customers
      RIGHT JOIN (SELECT secondUserId as friendId FROM Friends
            WHERE firstUserId=${customerId}
            UNION
            SELECT firstUserId as friendId FROM Friends
            WHERE secondUserId=${customerId}) friend
      on friend.friendId=customerId;
    `;
  
    console.log(getUserFriendsQuery);
  

  const getUserFriendsResponse = await connection.query(
    getUserFriendsQuery
  );


  return getUserFriendsResponse[0];
}

async function postUserFriend(connection,firstId,secondId) {
  // nickName,profileImg,kakaoEmail,sex

  const postUserFriendQuery = `
      INSERT INTO Friends(firstUserId,secondUserId)
      VALUES(${firstId},${secondId})
    `;
  
  

  const getUserFriendsResponse = await connection.query(
    postUserFriendQuery
  );


  return getUserFriendsResponse;
}


async function getBookMark(connection,customerId) {
  // nickName,profileImg,kakaoEmail,sex

  const getBookMarkQuery = `
        SELECT PetSitters.petSitterId,petSitterName,sex,age,careType,isAgreeSharingLocation_YN,isAgreeToFilm_YN,isPossibleCareOldPet_YN,isWalkable_YN FROM PetSitters
        RIGHT JOIN BookMarks BM on PetSitters.petSitterId = BM.petSitterId
        WHERE BM.customerId=${customerId};
    `;
  
  

  const getBookMarkResponse = await connection.query(
    getBookMarkQuery
  );


  return getBookMarkResponse;
}

async function getReviews(connection) {
  // nickName,profileImg,kakaoEmail,sex

  const getReviewsQuery = `
      select C.customerName,C.profileImgUrl as profileImgOfCustomer,SC.reviewContent,Services.category,P.petSitterName,P.petSitterProfileImg from Services
      left join Service_Customer SC on Services.serviceId = SC.serviceId
      left join Customers C on SC.customerId = C.customerId
      left join PetSitters P on P.petSitterId=Services.petSitterId;
    `;
  
  

  const getReviewsResponse = await connection.query(
    getReviewsQuery
  );


  return getReviewsResponse[0];
}

async function getReviewsDetail(connection) {
  // nickName,profileImg,kakaoEmail,sex

  const getReviewsDetailQuery = `
      select C.customerName,C.profileImgUrl as profileImgOfCustomer,SC.reviewPicture,SC.isLike_YN,SC.reviewContent,Services.category,P.petSitterName,P.petSitterProfileImg from Services
      left join Service_Customer SC on Services.serviceId = SC.serviceId
      left join Customers C on SC.customerId = C.customerId
      left join PetSitters P on P.petSitterId=Services.petSitterId;
    `;
  
  

  const getReviewsResponse = await connection.query(
    getReviewsDetailQuery
  );


  return getReviewsResponse[0];
}

async function patchLike(connection,serviceId,customerId,isLike) {

  const patchLikeQuery = `
  UPDATE Service_Customer
  SET isLike_YN='${isLike}'
  WHERE serviceId=${serviceId} and customerId=${customerId}
    `;
  
  

  const patchLikeResponse = await connection.query(
    patchLikeQuery
  );


  return patchLikeResponse[0];
}

async function getCurrentServiceInfo(connection,userId) {

  const getCurrentServiceInfoQuery = `
  SELECT Services.serviceId,petSitterId,category,DATE_FORMAT(planStartTime,'%Y-%m-%d %H시') as planStartTime,DATE_FORMAT(planEndTime,'%Y-%m-%d %H시') AS planEndTime,customerRequestContent FROM Services
left join Service_Customer SC on Services.serviceId = SC.serviceId
where SC.customerId=4 and Services.status="ONGOING";
    `;
  
  

  const getCurrentServiceInfoResponse = await connection.query(
    getCurrentServiceInfoQuery
  );


  return getCurrentServiceInfoResponse[0][0];
}

async function getCurrentServicePets(connection,serviceId) {

  const getCurrentServicePetsQuery = `
  select petName,petSex,petSize,petAge,petSpecies,profileImg from Service_Customer_Pet
  left join Pets P on Service_Customer_Pet.petId = P.petId
  where serviceId=${serviceId};
    `;
  

  const getCurrentServicePetsResponse = await connection.query(
    getCurrentServicePetsQuery
  );

  return getCurrentServicePetsResponse[0];
}

async function retrievePetsittersSameLocation(connection,userId,city,filter) {
  //fileter: sex,isAgreeToFilm_YN,isWalkable_YN,isAgreeSharingLocation_YN,isPossibleCareOldPet,hasPet_YN
  let whereString=''
  if(filter.sex)
     whereString+=` and PetSitters.sex='${filter.sex}'`;
    
  if(filter.isAgreeToFilm_YN)
     whereString+=` and PetSitters.isAgreeToFilm_YN='${filter.isAgreeToFilm_YN}'`

  if(filter.isWalkable_YN)
     whereString+=` and PetSitters.isWalkable_YN='${filter.isWalkable_YN}'`
  
  if(filter.isAgreeSharingLocation_YN)
     whereString+=` and PetSitters.isAgreeSharingLocation_YN='${filter.isAgreeSharingLocation_YN}'`
     
  if(filter.isPossibleCareOldPet_YN)
     whereString+=` and PetSitters.isPossibleCareOldPet_YN='${filter.isPossibleCareOldPet_YN}'`
  
  if(filter.hasPet_YN)
     whereString+=` and PetSitters.hasPet_YN='${filter.hasPet_YN}'`
  

  const getCurrentServiceInfoQuery = `
  SELECT petSitterProfileImg,
       petSitterName,
       career,
       hasPet_YN,
       sex,
       age,
       selfIntroduction,
       isAgreeToFilm_YN,
       isAgreeSharingLocation_YN,
       isWalkable_YN,
       isPossibleCareOldPet_YN,
       CASE
           WHEN BM.customerId THEN 'Y'
           ELSE 'N'
       END
       AS isBookMark
FROM PetSitters
left join (
    SELECT * FROM BookMarks
    WHERE customerId=${userId}
) BM on BM.petSitterId=PetSitters.petSitterId
WHERE SUBSTRING_INDEX(address,' ',1)='${city}'
    `+whereString;
  console.log(getCurrentServiceInfoQuery);
  

  const getCurrentServiceInfoResponse = await connection.query(
    getCurrentServiceInfoQuery
  );


  return getCurrentServiceInfoResponse[0];
}

async function getUserCity(connection,userId) {

  const getUserCityQuery = `
  select SUBSTRING_INDEX(address,' ',1) as city from Customers
WHERE customerId=${userId};
    `;
  
  

  const getUserCityResponse = await connection.query(
    getUserCityQuery
  );


  return getUserCityResponse[0][0];
}


module.exports = {
  retrievePetsittersSameLocation,
  getUserCity,
  getCurrentServicePets,
  getCurrentServiceInfo,
  patchLike,
  getReviews,
  getReviewsDetail,
  insertUserInfo,
  getStatus,
  patchUserInfo,
  postUserPets,
  getUserInfoDetail,
  getUserInfo,
  getUserAddress,
  getUserPets,
  getUserFriends,
  postUserFriend,
  getBookMark,
};
