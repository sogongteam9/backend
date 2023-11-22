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

// 별점 개수 반환
exports.getStarAvg = async function(foodid){
    const connection = await pool.getConnection(async (conn) => conn);
    const result = await postDao.getStarAvg(connection, foodid);
    connection.release();
    return result;
}

// 음식 있는지 확인
exports.getFoodIsExist = async function (id) {
    const connection = await pool.getConnection(async (conn) => conn);
    const result = await postDao.getFoodIsExist(connection, id);
    connection.release();
    return result;
}

// 검색
exports.search = async function (word) {
    const connection = await pool.getConnection(async (conn) => conn);
    const result = await postDao.search(connection, word);
    connection.release();
    return result;
  };




