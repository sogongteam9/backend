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
    const getStarQuery = `SELECT star, COUNT(*) AS starCount
    FROM comment
    WHERE foodid = ?
    GROUP BY star
    ORDER BY star;
    `;
    const getStarRow = await connection.query(getStarQuery, id);

    return [
        {
            getFood: getFoodRow[0],
            getstar: getStarRow[0],
        },
    ];
}

//별점 평균 반환
async function getStarAvg(connection, foodid){
    try {
        const result = await connection.query(
            `SELECT AVG(star) AS avg_star FROM comment WHERE foodid = ?`, foodid
        );
        console.log("Query result:", result[0]);
        
        if (result[0]) {
            return result[0];
        } else {
            console.log("No comments found for foodid:", foodid);
            return 0;
        }
    } catch (error) {
        console.error(error);
        // throw error; // 에러를 던지지 않고 그냥 반환
        return 0;
    }
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

// 검색
async function search(connection, word) {
    // pose_id 불러오기
    const query = `
        SELECT DISTINCT *
        FROM food
        WHERE title LIKE ? OR content LIKE ?
    `;
    const searchTerm = `%${word}%`; 
    const [poseid_result] = await connection.query(query, [searchTerm,searchTerm]);
    console.log(poseid_result);
    return poseid_result
  }


module.exports = {
    createFood, getFoodIsExist, getFood,Foodlist,updateFood,deleteFood, getStarAvg, search
};