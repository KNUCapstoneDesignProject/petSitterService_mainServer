// 이메일로 회원 조회
async function selectUserIdStr(connection, idStr) {
  const selectUserIdStrQuery = `
                  SELECT userId,idStr
                  FROM Users 
                  WHERE idStr = ?;
                  `;
  const [userRows] = await connection.query(selectUserIdStrQuery, idStr);
  return userRows;
}

// 유저 생성
async function insertUserInfo(connection, insertUserInfoParams) {
  console.log(insertUserInfoParams);
  const insertUserInfoQuery = `
          INSERT INTO Users(idStr, userName,password,tel)
          VALUES (?, ?, ?,?);
      `;
  const insertUserInfoRow = await connection.query(
    insertUserInfoQuery,
    insertUserInfoParams
  );

  return insertUserInfoRow;
}

// 유저 주소 등록
async function insertAddress(connection, userId,address,status) {
  const insertAddressQuery = `
          INSERT INTO Address(userId,address,status)
          VALUES (?, ?, ?);
      `;
  const insertAddressRow = await connection.query(
    insertAddressQuery,
    [userId,address,status]
  );

  return insertAddressRow;
}


async function selectUserPassword(connection, selectUserPasswordParams) {
  const selectUserPasswordQuery = `
        SELECT userId,idStr, userName, password
        FROM Users 
        WHERE idStr = ? AND password = ?;`;
  const selectUserPasswordRow = await connection.query(
      selectUserPasswordQuery,
      selectUserPasswordParams
  );
  return selectUserPasswordRow;
}

async function registerPets(connection, dogs,userId) {

  for (i = 0; i < dogs.length; i++){
    dog = dogs[i];
    dogInfos = [
      userId,
      dog.profileImgUrl,
      dog.petName,
      dog.petAge,
      dog.petSex,
      dog.petBreed,
      dog.petSize
    ]
    const registerPetsQuery = `
          INSERT INTO Pets(userId, profileImgUrl,petName,petAge,petSex,petBreed,petSize)
          VALUES (?, ?, ?,?,?,?,?);
      `;
    const registerPetsResult = await connection.query(
      registerPetsQuery,
      dogInfos
    );
  }
  

  return 1;
}

async function retrieveUserName(connection, userId) {
  const retrieveUserNameQuery = `
        SELECT userId,userName
        FROM Users 
        WHERE userId = ?`;
  const userRow = await connection.query(
      retrieveUserNameQuery,
      userId
  );
  return userRow;
}

async function retrieveUserLocations(connection, userId) {
  const retrieveUserLocationsQuery = `
    SELECT addressId,address,status
    FROM Address
    WHERE userId = 10
    ORDER BY FIELD(status,"DEFAULT") DESC`;
  
  const userLocationRow = await connection.query(
    retrieveUserLocationsQuery,
      userId
  );
  return userLocationRow;
}


module.exports = {
  selectUserIdStr,
  insertUserInfo,
  registerPets,
  selectUserPassword,
  retrieveUserName,
  insertAddress,
  retrieveUserLocations,
};
