const {pool} =require("../../../config/database");
const categoryDao = require("./categoryDao");


exports.getCategoryList= async function () {
    const connection = await pool.getConnection(async (conn) => conn);
    const result = await categoryDao.Categorylist(connection);
    connection.release();

    return result;
};


exports.getCategory = async function(id){
    const connection = await pool.getConnection(async (conn) => conn);
    const title = await categoryDao.getCategory(connection,id);
    connection.release();

    return title;
}