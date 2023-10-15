const {pool} =require("../../../config/database");
const postDao = require("./postDao");


exports.getFoodList= async function (categoryid) {
    const connection = await pool.getConnection(async (conn) => conn);
    const result = await postDao.Foodlist(connection, categoryid);
    connection.release();

    return result;
};

exports.getFood = async function(id){
    const connection = await pool.getConnection(async (conn) => conn);
    const result = await postDao.getFood(connection,id);
    connection.release();

    return result[0];
}

exports.getFoodIsExist = async function (id) {
    const connection = await pool.getConnection(async (conn) => conn);
    const result = await postDao.getFoodIsExist(connection, id);
    connection.release();

    return result;
}

exports.changeTitle2Id = async function (category) {
    const connection = await pool.getConnection(async (conn) => conn);
    const result = await postDao.changeTitle2Id(changeTitle2Id, category);
    connection.release();
    
    return result;
}





