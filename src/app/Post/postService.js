const postDao = require("./postDao");
const {response} = require("../../../config/response");
const {pool} =require("../../../config/database");
const baseResponseStatus = require("../../../config/baseResponseStatus");


exports.createFood = async function(userIdx, title, content, image, price, star, sell, categoryid){
    try{
        const connection = await pool.getConnection(async (conn) => conn);
        await postDao.createFood(connection, userIdx, title, content, image, price, star, sell, categoryid);

        connection.release();
        return response(baseResponseStatus.SUCCESS);
    }catch(err){
        return response(baseResponseStatus.DB_ERROR);
    }

}

exports.updateFood = async function(id, title, content, price, star, sell, categoryid){
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        await postDao.updateFood(connection, id, title, content, price, star, sell, categoryid); //정보를 데이터베이스에 삽입
        
        connection.release();
        
        return response(baseResponseStatus.SUCCESS); 


    } catch (err) {
        return response(baseResponseStatus.DB_ERROR);
    }
}

exports.deleteFood = async function(id){
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        
        await postDao.deleteFood(connection,id);
        connection.release();
        
        return response(baseResponseStatus.SUCCESS); 

    } catch (err) {
        return response(baseResponseStatus.DB_ERROR);
    }
}
