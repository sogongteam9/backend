
// 장바구니 추가하기
async function addCart(connection, foodid, userid, count){
    console.log(foodid, count);
    const addCartQuery = `
    INSERT INTO cart(userid, foodid, count)
    VALUES (?, ?, ?)`; 
    const addCartRow = await connection.query(addCartQuery, [userid, foodid, count]);

    return addCartRow;
}


// 장바구니 조회하기
async function cartList(connection, userid, foodid){
    const getCountQuery = `
        SELECT count, id, is_cleared
        FROM cart
        WHERE userid = ?`;
    const getCountRow = await connection.query(getCountQuery, [userid]);
    console.log(getCountRow[0]);
    console.log(foodid);
    const getFoodNameQuery = `
        SELECT image, title, price
        FROM food
        WHERE id = ?`;
    const getFoodNameRow = await connection.query(getFoodNameQuery, [foodid]);
    console.log(getFoodNameRow[0]);

    return [
        {
            getFoodName: getFoodNameRow[0][0],
            getCount: getCountRow[0],
        },
    ];
}

async function getFoodId(connection, userid){
    const getFoodidQuery = `
        SELECT foodid
        FROM cart
        WHERE userid = ?`;
    const getFoodid = await connection.query(getFoodidQuery, userid);
    return getFoodid[0];
}

// 장바구니 가격 계산하기
async function calcCart(connection, userid){
    const calcCartQuery = `
        SELECT sum(f.price*c.count)
        FROM food f JOIN cart c
        ON f.id = c.foodid
        WHERE c.userid = ?`;
    const calcCartRow = await connection.query(calcCartQuery, userid);

    return calcCartRow;
}

//장바구니 삭제하기
async function deleteCart(connection,id){
    const deleteCartQuery = `DELETE FROM cart WHERE id = ${id};`;
    const deleteCartRow = await connection.query(deleteCartQuery);
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
    addCart, cartList, deleteCart,getCartIsExist, calcCart, getFoodId
};