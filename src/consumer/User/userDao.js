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
  console.log("DAO 에서 dogs");
  console.log(dogs);
  console.log(dogs.length);
  for (i = 0; i < dogs.length; i++){
    dog = dogs[i];
    console.log(dog);
    console.log(dog['profileImgUrl']);
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

async function postNewLocation(connection, userId, location) {
  const postNewLocationQuery = `
    SELECT addressId,address,status
    FROM Address
    WHERE userId = 10
    ORDER BY FIELD(status,"DEFAULT") DESC`;
  
  const userLocationRow = await connection.query(
    postNewLocationQuery,
    userId,
    location
  );
  return userLocationRow;
}

async function retrievePets(connection, userId) {
  const retrievePetsQuery = `
    SELECT petId,profileImgUrl,petName,petAge,petSex,petBreed,petSize FROM Pets
    LEFT JOIN Users U on Pets.userId = U.userId
    where U.userId=?;
  `;
  
  const petLists = await connection.query(
    retrievePetsQuery,
    userId
  );
  return petLists[0];
}
//startTime,endTime,requestComment,hasWalk,hasBath,totalPrice,status
async function reserveService(connection, userId, petSitterId, serviceInfo) {
  serviceInfo.unshift(petSitterId);
  serviceInfo.unshift(userId);

  const reserveServiceQuery = `
    INSERT INTO Services(userId, petSitterId, startTime, endTime, requestComment, hasWalk, hasBath, totalPrice, status)
    VALUES(?,?,?,?,?,?,?,?,?)
  `;
  
  const reserveServiceResult = await connection.query(
    reserveServiceQuery,
    serviceInfo
  );

  return reserveServiceResult[0];
}

async function mappingPets(connection, serviceId,petId) {
  const mappingPetsQuery = `
    INSERT INTO ServicePetMappings(serviceId, petId)
    VALUES(?,?)
  `;
  
  const mappingPetsResult = await connection.query(
    mappingPetsQuery,
    [serviceId,
    petId]
  );

  return mappingPetsResult[0];
}

async function getPetSitterProfileInfo(connection, petSitterId) {
  const getPetSitterProfileInfoQuery = `
    SELECT 
      profileImgUrl,
      petSitterName,
      Round((serviceCount/goodCount),1) as satisfaction
    FROM PetSitters
    WHERE petSitterId=?
  `;
  
  const petSitterInfo = await connection.query(
    getPetSitterProfileInfoQuery,
    petSitterId
  );

  return petSitterInfo[0][0];
}


async function getPetSitterCertificationLists(connection, petSitterId) {
  const getPetSitterCertificationListsQuery = `
      SELECT
      cerificationName,
      DATE_FORMAT(acquisitionDate,"%Y-%m-%d"),
      certificateIssuer
      FROM Certificates
      WHERE petSitterId=?
  `;
  
  const CertificationLists = await connection.query(
    getPetSitterCertificationListsQuery,
    petSitterId
  );

  return CertificationLists[0];
}


async function getPetSitterExperienceLists(connection, petSitterId) {
  const getPetSitterExperienceListsQuery = `
      SELECT
        content
      FROM Experiences
      WHERE petSitterId=?
  `;
  
  const experienceLists = await connection.query(
    getPetSitterExperienceListsQuery,
    petSitterId
  );

  return experienceLists[0];
}

async function getPetSitterPriceLists(connection, petSitterId) {
  const getPetSitterPriceListsQuery = `
      SELECT
        petSize,
        price
      FROM Prices
      WHERE petSitterId=?
  `;
  
  const experienceLists = await connection.query(
    getPetSitterPriceListsQuery,
    petSitterId
  );

  return experienceLists[0];
}

async function getPrevServicesDetail(connection, userId) {
  const getPetSitterPriceListsQuery = `
    SELECT
        serviceId,
        PS.petSitterId,
        petSitterName,
        CONCAT(petSitterName," 펫시터에게 받은 돌봄 서비스") as serviceName,
        IF(DATEDIFF(startTime,endTime)=0,
            DATE_FORMAT(startTime,"%Y-%m-%d"),
            CONCAT(DATE_FORMAT(startTime,"%Y-%m-%d")," ~ ",DATE_FORMAT(endTime,"%Y-%m-%d"))) AS "기간",
        evaluation
    FROM Services
    LEFT JOIN PetSitters PS on Services.petSitterId = PS.petSitterId
    WHERE userId=?;
  `;
  
  const experienceLists = await connection.query(
    getPetSitterPriceListsQuery,
    userId
  );

  return experienceLists[0];
}

async function getServicePets(connection, serviceId) {
  const getServicePetsQuery = `
      SELECT SPM.petId,P.petName FROM Services
      LEFT JOIN ServicePetMappings SPM on Services.serviceId = SPM.serviceId
      LEFT JOIN Pets P on P.petId=SPM.petId
      WHERE SPM.serviceId=?;
  `;
  
  const servicePetList = await connection.query(
    getServicePetsQuery,
    serviceId
  );

  return servicePetList[0];
}

module.exports = {
  selectUserIdStr,
  insertUserInfo,
  registerPets,
  selectUserPassword,
  retrieveUserName,
  insertAddress,
  retrieveUserLocations,
  postNewLocation,
  retrievePets,
  reserveService,
  mappingPets,
  getPetSitterProfileInfo,
  getPetSitterCertificationLists,
  getPetSitterExperienceLists,
  getPetSitterPriceLists,
  getPrevServicesDetail,
  getServicePets,
};
