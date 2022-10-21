// 유저 생성
async function insertUserInfo(connection, insertUserInfoParams) {
    console.log(insertUserInfoParams);
    //  petSitterName,sex 
    const insertUserInfoQuery = `
            INSERT INTO PetSitters(petSitterName,sex)
            VALUES (?, ?);
        `;
    const insertUserInfoRow = await connection.query(
      insertUserInfoQuery,
      insertUserInfoParams
    );
  
    return insertUserInfoRow;
  }


  module.exports = {
    insertUserInfo,
  };