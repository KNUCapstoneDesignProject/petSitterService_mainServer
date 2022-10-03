
async function getServiceDetail(connection, serviceId) {
    const getServiceDetailQuery = `
        SELECT serviceId,userId,status,completeRequestCount
        FROM Services
        WHERE serviceId=?;
    `;//servicess// 잠깐만 서비스를 평가하는게 맞나? 펫시터를 평가하는거 아님?

    const servicePetList = await connection.query(
        getServiceDetailQuery,
        serviceId
    );

    return servicePetList[0];
}

async function requestCompleteService(connection, serviceId,evaluation,status) {
    
        
    const requestCompleteServiceQuery = `
        UPDATE Services
        SET completeRequestCount=(completeRequestCount+1), evaluation=?,status=?
        WHERE serviceId=?;
    `;//servicess// 잠깐만 서비스를 평가하는게 맞나? 펫시터를 평가하는거 아님?

    const requestCompleteServiceResult = await connection.query(
        requestCompleteServiceQuery,
        [evaluation,status,serviceId]
    );

    return requestCompleteServiceResult[0];
}

async function getCurrentService(connection, serviceId) {
    
        
    const getCurrentServiceQuery = `
        SELECT 
            s.serviceId,
            petSitterName,
            DATE_FORMAT(startTime,"%Y-%m-%d-%k:%i %p") as startTime,
            DATE_FORMAT(endTime,"%Y-%m-%d-%k:%i %p") as endTime,
            requestComment
        FROM Services
        LEFT JOIN servicepetmappings s on Services.serviceId = s.serviceId
        LEFT JOIN petsitters p on Services.petSitterId = p.petSitterId
        WHERE S.serviceId=?;
    `;

    const getCurrentServiceResult = await connection.query(
        getCurrentServiceQuery,
        serviceId
    );

    return getCurrentServiceResult[0];
}

async function getServicePets(connection, serviceId) {
    
        
    const getServicePetsQuery = `
        SELECT petName,profileImgUrl,petAge,petSex,petBreed,petSize FROM ServicePetMappings
        LEFT JOIN pets p on ServicePetMappings.petId = p.petId
        WHERE serviceId=?;
    `;

    const getServicePetsResult = await connection.query(
        getServicePetsQuery,
        serviceId
    );

    return getServicePetsResult[0];
}

async function userCheck(connection, serviceId) {
    
    
    const userCheckQuery = `  
        SELECT userId FROM services
        WHERE serviceId=?;
    `;

    const getServicePetsResult = await connection.query(
        userCheckQuery,
        serviceId
    );

    return getServicePetsResult[0][0];
}

module.exports = {
    getServiceDetail,
    requestCompleteService,
    getCurrentService,
    getServicePets,
    userCheck,
};