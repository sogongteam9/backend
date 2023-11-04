const postDao = require("./postDao");
const {response} = require("../../../config/response");
const {pool} =require("../../../config/database");
const baseResponseStatus = require("../../../config/baseResponseStatus");


exports.createFood = async function(userIdx, title, content, image, price, star, sell, getCategoryId, date){
    try{
        const connetion = await pool.getConnection(async (conn) => conn);
        await postDao.createFood(connetion, userIdx, title, content, image, price, star, sell, getCategoryId, date);

        connection.release();
    }catch(err){
        return response(baseResponseStatus.SUCCESS);
    }

}

exports.updateFood = async function(id, date, title, content, price, star, sell){
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        await postDao.updateFood(connection, id, date, title, content, price, star, sell); //정보를 데이터베이스에 삽입
        
        connection.release(); //데이터베이스 연결 해제(꼭 해줘야 됨)
        
        return response(baseResponseStatus.SUCCESS); //회원가입 성공했다고 응답 반환


    } catch (err) {
        return errResponse(baseResponseStatus.DB_ERROR);
    }
}

exports.deleteFood = async function(id){
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        
        await postDao.deleteFood(connection,id);
        connection.release();
        
        return response(baseResponseStatus.SUCCESS); 

    } catch (err) {
        return errResponse(baseResponseStatus.DB_ERROR);
    }
}