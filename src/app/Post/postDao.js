const { getCategory } = require("./postProvider");


//음식 생성
async function createFood(connection, userIdx, title, content, image, price, star, sell, categoryid){
    const createFoodQuery = `
        INSERT INTO food(userid, title, content, image, price, star, sell, categoryid)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `;

    const createFoodRow = await connection.query(createFoodQuery, [ userIdx, title, content, image, price, star, sell, categoryid]);
    
    return createFoodRow;
}

//음식이 존재하는지
async function getFoodIsExist(connection, id) {
    const result = await connection.query(
      `SELECT * FROM food  WHERE id=?`,
        id
    );
    return result[0];
}

//상세정보 - 클래스 가져오기
async function getFood(connection, id){
    const getFoodQuery = `
        SELECT *
        FROM food
        WHERE id = ?`;
    const getFoodRow = await connection.query(getFoodQuery, id);

    //리뷰도 가지고 와야해

    return getFoodRow[0]; 
}


async function Foodlist(connection, categoryid){
    const FoodlistQuery = `
        SELECT *
        FROM food
        WHERE categoryid=${categoryid}
        `;
    const FoodlistRow = await connection.query(FoodlistQuery);
    return FoodlistRow;
}


async function updateFood(connection, id, title, content, image, price, star, sell, categoryid) { 
    const updateFoodQuery = `
        UPDATE food
            SET
            title = ?,
            content = ?,
            image = ?,
            price =?,
            star = ?,
            sell = ?,
            categoryid = ?
        WHERE id = ${id};
    `;
    const updateFoodRow = await connection.query( 
        updateFoodQuery,
        [title, content, image, price, star, sell, categoryid] 
    );

    return updateFoodRow; 
}

async function deleteFood(connection,id){
    const deleteFoodQuery = `DELETE FROM food WHERE id = ${id};`;
    const deleteFoodRow = await connection.query(
        deleteFoodQuery
    );
    return deleteFoodRow; 
}


module.exports = {
    createFood, getFoodIsExist, getFood,Foodlist,updateFood,deleteFood
};