

// 유저 생성
async function insertUserInfo(connection, insertUserInfoParams) {
  console.log(insertUserInfoParams);
  // nickName,profileImg,kakaoEmail,sex
  const insertUserInfoQuery = `
          INSERT INTO Customers(customerName,profileImgUrl,kakaoEmail,sex,status)
          VALUES (?, ?, ?,?,"STEP1");
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


  return getUserInfoDetailResponse[0];
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

module.exports = {
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
};
