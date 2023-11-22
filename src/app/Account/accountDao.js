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
    addAccount, returnNum, orderList
};