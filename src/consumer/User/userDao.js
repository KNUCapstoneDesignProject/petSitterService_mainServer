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
          INSERT INTO Users(idStr, userName,password,tel,address)
          VALUES (?, ?, ?,?,?);
      `;
  const insertUserInfoRow = await connection.query(
    insertUserInfoQuery,
    insertUserInfoParams
  );

  return insertUserInfoRow;
}

module.exports = {
  selectUserIdStr,
  insertUserInfo,
};
