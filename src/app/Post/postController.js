const postProvider = require("../Post/postProvider");
const postService = require("../Post/postService");
const multer = require("multer");

exports.foodCreate = async function(req,res){
    const {title, content, price, sell} = await req.body;
    //var image = req.file.location;
    var star = 3;

    if(!title || !content || !price || !sell){
        return res.status(400).send("필수 정보 누락");
    }

    const response = await postService.createFood(
        title, content, price, star, sell
    );

    return res.send(response);
};

exports.getCategory = async function (req, res){ 
    //var id =
    const result = await postProvider.getCategory(id);
    return res.send(result);
};


exports.getFoodList  = async function (req, res){ 
    const result = await postProvider.getFoodList();
    return res.send(result);
};

exports.getFood = async function (req, res){ 
    var id = req.params.id; 
    const result = await postProvider.getFood(id);
    return res.send(result);
};

exports.foodUpdate= async function (req, res) {
    var id = req.params.id;
    const {title, content, price, sell} = await req.body;

    // var image = req.file.location;
    var star = 3;

    if(!title || !content || !price || !sell){
        return res.status(400).send("필수 정보 누락");
    }

    const response = await postService.updateFood(
        id, title, content, price, star, sell
    );

    return res.send(response); 
}

exports.foodDelete = async function (req, res){ 
    var id = req.params.id;

    const response = await postService.deleteFood(id);

    return res.send(response);
}