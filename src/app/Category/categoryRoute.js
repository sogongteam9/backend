module.exports = function(app){
    const category = require('./categoryController');
    const jwtMiddleware = require("../../../config/jwtMiddleware");
    //category 전체 조회
    app.get('/app/getcategoryList',jwtMiddleware, category.getCategoryList);
    //특정 category 조회
    app.get('/app/getcategory/:id',jwtMiddleware, category.getCategory);
    
}