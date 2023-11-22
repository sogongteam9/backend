const cartDao = require("./cartDao");
const {response} = require("../../../config/response");
const {pool} =require("../../../config/database");
const baseResponseStatus = require("../../../config/baseResponseStatus");

// 장바구니 추가하기
exports.addCart = async function(foodid, userid, count){
    try{
        const connection = await pool.getConnection(async (conn) => conn);
        await cartDao.addCart(connection, foodid, userid, count);
        connection.release();
        return response(baseResponseStatus.SUCCESS);
    }catch(err){
        return response(baseResponseStatus.DB_ERROR);
    }

}

//장바구니 삭제하기
exports.deleteCart = async function(id){
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        
        await cartDao.deleteCart(connection,id);
        connection.release();
        
        return response(baseResponseStatus.SUCCESS); 

    } catch (err) {
        return response(baseResponseStatus.DB_ERROR);
    }
}