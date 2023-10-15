module.exports = function(app){
    const category = require('./categoryController');
    const jwtMiddleware = require("../../../config/jwtMiddleware");
    //category 조회
    app.get('/app/getcategory',jwtMiddleware, category.getcategoryList);
    //특정 category 조회
    app.get('/app/getcategory/:id',jwtMiddleware, category.getcategory);
    
}