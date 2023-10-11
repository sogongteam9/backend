const {pool} =require("../../../config/database");
const postDao = require("./postDao");


exports.getFoodList= async function () {
    const connection = await pool.getConnection(async (conn) => conn);
    const result = await postDao.Foodlist(connection);
    connection.release();

    return result;
};

exports.getFood = async function(id){
    const connection = await pool.getConnection(async (conn) => conn);
    const result = await postDao.getFood(connection,id);
    connection.release();

    return result[0];
}

exports.getCategory = async function(id){
    const connection = await pool.getConnection(async (conn) => conn);
    const result = await postDao.getCategory(connection,id);
    connection.release();

    return result[0];
}



