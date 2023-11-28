const accountDao = require("../Account/accountDao");
const {pool} =require("../../../config/database");

// account 테이블 만들기
exports.addAccount = async function (cartid, userId, totalprice) {
    const connection = await pool.getConnection(async (conn) => conn);
    const result = await accountDao.addAccount(connection, cartid, userId, totalprice);
    connection.release();
    return result;
};

// 장바구니 내역 보기
exports.accountlist = async function (userid, foodid) {
    const connection = await pool.getConnection(async (conn) => conn);
    const result = await accountDao.accountlist(connection, userid, foodid);
    connection.release();
    return result;
};
// foodid 구하기
exports.getFoodid = async function (userid) {
    const connection = await pool.getConnection(async (conn) => conn);
    const result = await accountDao.getFoodId(connection, userid);
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

// adminpage 주문 리스트 출력
exports.orderList = async function (email){
    const connection = await pool.getConnection(async (conn) => conn);
    const result = await accountDao.orderList(connection,email);
    connection.release();
    return result;
};