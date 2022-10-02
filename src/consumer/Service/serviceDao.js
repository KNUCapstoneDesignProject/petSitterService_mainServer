
async function getServiceDetail(connection, serviceId) {
    const getServiceDetailQuery = `
        SELECT userId,status,completeRequestCount
        FROM Servicess
        WHERE serviceId=?;
    `;//servicess// 잠깐만 서비스를 평가하는게 맞나? 펫시터를 평가하는거 아님?

    const servicePetList = await connection.query(
        getServiceDetailQuery,
        serviceId
    );

    return servicePetList[0];
}

module.exports = {
    getServiceDetail,
};