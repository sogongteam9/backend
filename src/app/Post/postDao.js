const { getCategory } = require("./postProvider");


//카테고리 아이디를 타이틀로 바꾸기
async function changeTitle2Id(connection, category){
    const changeTitle2IdQuery = `
        SELECT id
        FROM category
        WHERE title=?
    `;

    const changeId2TitleRow = await connection.query(changeTitle2Id, category);
    
    return changeId2TitleRow;
}

//음식 생성
async function createFood(connection, date, title, category, content, price, star, sell){
    const createFoodQuery = `
        INSERT INTO food(date, title, category, content, price, star, sell)
        VALUES ('?', ?, ?,?,?,?,?);
    `;

    const createFoodRow = await connection.query(createFoodQuery, [ date, title, category, content, price, star, sell]);
    
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
        WHERE category=${categoryid}
        `;
    const FoodlistRow = await connection.query(FoodlistQuery);
    return FoodlistRow;
}


async function updateFood(connection, id, date, title, content, price, star, sell) { 
    const updateFoodQuery = `
        UPDATE food
            SET date = '?',
            title = ?,
            content = ?,
            price = ?,
            star =?,
            sell = ?
        WHERE id = ${id};
    `;
    const updateFoodRow = await connection.query( 
        updateFoodQuery,
        [date, title, content, price, star, sell] 
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
    changeTitle2Id, createFood, getFoodIsExist, getFood,Foodlist,updateFood,deleteFood
};