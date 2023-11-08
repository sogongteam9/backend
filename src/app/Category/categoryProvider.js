const {pool} =require("../../../config/database");
const categoryDao = require("./categoryDao");


//카테고리 전체 가져오기
exports.getCategoryList= async function () {
    const connection = await pool.getConnection(async (conn) => conn);
    const result = await categoryDao.getCategoryList(connection);
    connection.release();

    return result;
};

// 해당 카테고리 가져오기
exports.getCategory = async function(id){
    const connection = await pool.getConnection(async (conn) => conn);
    const result = await categoryDao.getCategory(connection,id);
    connection.release();

    return result;
}