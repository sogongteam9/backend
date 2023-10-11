const { getCategory } = require("./postProvider");

//음식 생성
async function createFood(connection, title, content, price, star, sell){
    const date = new Date();
    const formattedTime = date.toLocaleString();
    const createFoodQuery = `
        INSERT INTO food(date, title, content, price, star, sell)
        VALUES ('${formattedTime}',?,?,?,?,?);
    `;

    const createFoodRow = await connection.query(createFoodQuery, [title, content, price, star, sell]);
    
    return createFoodRow;
}

//상세정보 - 클래스 가져오기
async function getCategory(connection, id){
    const getCategoryQuery = `
        SELECT *
        FROM category
        WHERE id = ?`;
    const getCategoryRow = await connection.query(getCategoryQuery, id);

    return getCategoryRow[0]; 
}

//상세정보 - 클래스 가져오기
async function getFood(connection, id){
    const getFoodQuery = `
        SELECT *
        FROM food
        WHERE id = ?`;
    const getFoodRow = await connection.query(getFoodQuery, id);
    //카테고리를 음식에서 가져올건지 아니면 카테고리에서 가지고 올건지
    //리뷰도 가지고 와야해

    return getFoodRow[0]; 
}

async function Foodlist(connection){
    const FoodlistQuery = `
        SELECT *
        FROM food
        `;
    const FoodlistRow = await connection.query(FoodlistQuery);
    return FoodlistRow;
}

async function updateFood(connection, id, title, content, price, star, sell) { 
    const date = new Date();
    const formattedTime = date.toLocaleString();
    const updateFoodQuery = `
        UPDATE food
            SET date = '${formattedTime}',
            title = ?,
            content = ?,
            price = ?,
            star =?,
            sell = ?
        WHERE id = ${id};
    `;
    const updateFoodRow = await connection.query( 
        updateFoodQuery,
        [title, content, price, star, sell] 
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
    createFood, getFood,Foodlist,updateFood,deleteFood
};