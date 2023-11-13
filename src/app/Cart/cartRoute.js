module.exports = function(app){
    const cart = require('./cartController');
    const jwtMiddleware = require("../../../config/jwtMiddleware");
    //cart 추가
    app.post('/app/addcart',jwtMiddleware, cart.addCart);
    //cartList 보기
    app.get('/app/cartlist',jwtMiddleware, cart.getcartList);
    //cart 삭제하기
    app.delete('/app/deletecart/:id',jwtMiddleware, cart.cartDelete);
    //cart 계산하기
    app.get('/app/calcCart',jwtMiddleware, cart.getcalcCart);
}