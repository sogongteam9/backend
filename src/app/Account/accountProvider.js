const accountDao = require("../Account/accountDao");
const {pool} =require("../../../config/database");

// account 테이블 만들기
exports.addAccount = async function (cartid, userId, totalprice) {
    const connection = await pool.getConnection(async (conn) => conn);
    const result = await accountDao.addAccount(connection, cartid, userId, totalprice);
    connection.release();
    return result;
};

// 번호표 반환
exports.returnNum = async function (cartid, userid) {
    const connection = await pool.getConnection(async (conn) => conn);
    const result = await accountDao.returnNum(connection, cartid, userid);
    connection.release();
    return result;
};