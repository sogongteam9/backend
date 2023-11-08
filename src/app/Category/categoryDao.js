
//카테고리 전체 가져오기
async function getCategoryList(connection){
    const CategorylistQuery = `
        SELECT *
        FROM category
        `;
    const CategorylistRow = await connection.query(CategorylistQuery);
    
    return CategorylistRow[0];
}

//카테고리 가져오기
async function getCategory(connection, id){
    const getCategoryQuery = `
        SELECT *
        FROM category
        WHERE id = ?`;
    const getCategoryRow = await connection.query(getCategoryQuery, id);

    return getCategoryRow;
}


module.exports = {
    getCategoryList, getCategory
};