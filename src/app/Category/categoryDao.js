const { getCategory } = require("./categoryProvider");


//상세정보 - 클래스 가져오기
async function getCategory(connection, id){
    const getCategoryQuery = `
        SELECT *
        FROM category
        WHERE id = ?`;
    const getCategoryRow = await connection.query(getCategoryQuery, id);

    return title;
}


async function Categorylist(connection){
    const CategorylistQuery = `
        SELECT *
        FROM category
        `;
    const CategorylistRow = await connection.query(CategorylistQuery);
    return CategorylistRow;
}

module.exports = {
    getCategory, Categorylist
};