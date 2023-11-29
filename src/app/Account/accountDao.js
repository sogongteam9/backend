//account table 만들기
async function addAccount(connection, cartid, userId, totalprice) {
    console.log(cartid, totalprice);
    const result = await connection.query(
        `INSERT INTO account(cartid, userid, totalprice)
        VALUES (?, ?, ?); `,
        [cartid, userId, totalprice]
    );
    return result;
}


// 장바구니 조회하기
async function accountlist(connection, userid, foodid){
    const getCountQuery = `
        SELECT count
        FROM cart
        WHERE userid = ?`;
    const getCountRow = await connection.query(getCountQuery, [userid]);
    console.log(foodid);
    const getFoodNameQuery = `
        SELECT image, title, price, categoryid
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

//장바구니 비우기
async function clearCart(connection, userid, cartid){
    const clearCartQuery = 'UPDATE cart SET is_cleared = true WHERE id = ? and userid=?';
    const clearCartRow = await connection.query(clearCartQuery, [cartid, userid]);
    const getclearCartQuery = 'SELECT is_cleared = true FROM cart WHERE id = ? and userid=?';
    const getclearCartRow = await connection.query(getclearCartQuery, [cartid, userid]);
    console.log(getclearCartRow);
    return getclearCartRow[0];
}

//번호표 반환
async function returnNum(connection, cartid, userId) {
    const result = await connection.query(
        `SELECT MAX(id) 
        FROM account 
        WHERE cartid = ? and userid = ? `,
        [cartid, userId]
    );
    return result;
}


// admin페이지 - 주문출력
async function orderList(connection) {
    const selectOrderListQuery = `
    SELECT account.id AS "no", account.totalprice, user.nickname, food.title AS food_title
    FROM account
    INNER JOIN user ON account.userid = user.id
    INNER JOIN cart ON account.cartid = cart.id
    INNER JOIN food ON cart.foodid = food.id;
    
                  `;
    const [orderRows] = await connection.query(selectOrderListQuery);
    return orderRows;
};
  

module.exports = {
    addAccount, returnNum, orderList, accountlist, getFoodId, clearCart
};