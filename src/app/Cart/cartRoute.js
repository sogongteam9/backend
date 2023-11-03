module.exports = function(app){
    const cart = require('./cartController');
    const jwtMiddleware = require("../../../config/jwtMiddleware");
    //cart 추가
    app.get('/app/cart',jwtMiddleware, cart.addCart);
    //cart 보기
    app.get('/app/cartlist',jwtMiddleware, cart.cartList);
    
}