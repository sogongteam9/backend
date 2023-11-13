
// 장바구니 추가하기
async function addCart(connection, foodid, userid, count){
    const addCartQuery = `
    INSERT INTO cart(userid, foodid, count)
    VALUES (?, ?, ?); 
    `
    const addCartRow = await connection.query(addCartQuery, [ userid, foodid, count]);

    return addCartRow;
}

// 장바구니 조회하기
async function cartList(connection, userid){
    const getCartListQuery = `
        SELECT foodid, count
        FROM cart
        WHERE userid = ?`;
    const getCartListRow = await connection.query(getCartListQuery, userid);

    return getCartListRow;
}

// 장바구니 가격 계산하기
async function calcCart(connection, userid){
    const calcCartQuery = `
        SELECT f.price*c.count
        FROM food f JOIN cart c
        ON f.id = c.foodid
        WHERE c.userid = ?`;
    const calcCartRow = await connection.query(getCartListQuery, userid);

    return calcCartRow;
}

//장바구니 삭제하기
async function deleteCart(connection,id){
    const deleteCartQuery = `DELETE FROM cart WHERE id = ${id};`;
    const deleteCartRow = await connection.query(
        deleteCartQuery
    );
    return deleteCartRow; 
}

//카트에 존재하는지 확인
async function getCartIsExist(connection, userId, foodid) {
    const result = await connection.query(
      `SELECT * FROM cart WHERE userid = ? and foodid = ? `,
        [foodid, userId]
    );
    return result[0];
}


module.exports = {
    addCart, cartList, deleteCart,getCartIsExist, calcCart
};