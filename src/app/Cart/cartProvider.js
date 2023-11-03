// 장바구니 추가하기
exports.addCart = async function( foodid, userid) {
    const connection = await pool.getConnection(async (conn) => conn);
    const result = await cartDao.addCart(connection, userid);
    connection.release();
    return result;
};


// 장바구니 내역 보기
exports.cartList = async function (userid) {
    const connection = await pool.getConnection(async (conn) => conn);
    const result = await cartDao.cartList(connection, userid);
    connection.release();
    return result;
};