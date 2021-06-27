const exp = require('express')
const userApi = exp.Router();
const bcryptjs = require("bcryptjs")
const jwt = require('jsonwebtoken')
const expressErrorHandler = require('express-async-handler');

const multerObj = require("./middlewares/addfile")
require('dotenv').config()


//configure cloudinary
/*
cloudinary.config({
    cloud_name: 'dfbfristv',
    api_key: '785929571141796',
    api_secret: '0Mo4wOYQ6iPsVSVAY50CvQvUIl0'
});
//configure cloudinary storage
const clStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        return {
            folder: 'CDB21DX003',
            public_key: file.fieldname + '-' + Date.now()
        }
    }
})
//configure multer
const multerObj=multer({storage: clStorage}) */


//body parser middleware
userApi.use(exp.json())




// read all data



// read all user using async and await
userApi.get("/getusers",expressErrorHandler( async (req,res,next) =>{
    let userCollectionObject = req.app.get("userCollectionObject")
    let userList= await userCollectionObject.find().toArray();
    res.send({message : userList})

}))







// read user by username using async
userApi.get("/getuser/:username",expressErrorHandler( async (req,res,next)=>{
    let userCollectionObject = req.app.get("userCollectionObject")
     let un = req.params.username;
     let user = await userCollectionObject.findOne({username:un})

     if(user === null){
         res.send({message: "User not existed"})
     }
     else{
         res.send({ message: user})
     }
}))






// create user using async
userApi.post("/createuser",multerObj.single('photo'),expressErrorHandler( async(req,res,next) =>{
    let userCollectionObject = req.app.get("userCollectionObject")
    let newUser = JSON.parse(req.body.userObj);
    
    let user= await userCollectionObject.findOne({username:newUser.username})
    if(user!==null){
        res.send({message: "user already existed"})
    }
        else{
            //hash the password
            let hashPassword = await bcryptjs.hash(newUser.password,7)
            //replace plain password with hashpassword
            newUser.password= hashPassword;
            newUser.profileImage = req.file.path;
            await userCollectionObject.insertOne(newUser)
            res.send({message: "user created"})

        }
    
}))


//update user using async and await

userApi.put("/updateuser/:username", expressErrorHandler( async(req,res,next) =>{
    let userCollectionObject = req.app.get("userCollectionObject")

    let modifiedUser = req.body;
     await userCollectionObject.updateOne({username:modifiedUser.username},{ $set: { ...modifiedUser }})
     res.send({message: "user updated"})
}))

// delete user using async and await

userApi.delete("/deleteuser/:username",expressErrorHandler( async(req,res,next) =>{
    let userCollectionObject = req.app.get("userCollectionObject")
    //get user by url params
    let un = req.params.username;
    //first find required user

    let user = await userApi.findOne({username: un})
    if(user === null){
        res.send({message: "user not existed"})
    }
    else{
        await userCollectionObject.deleteOne({username : un})
        res.send({message:"user deleted"})
    }

}))

//user login

userApi.post("/login",expressErrorHandler( async(req,res,next) =>{
    let userCollectionObject = req.app.get("userCollectionObject")
    let credentials = req.body;

    //verify username
     let user = await userCollectionObject.findOne({ username:credentials.username })
    //if user is not existed

    if(user===null){
        res.send({message :"Invalid password"})
    }
    else{
        let result = await bcryptjs.compare(credentials.password,user.password)
        //console.log(result)
        //if pass not matched
        if(result===false){
            res.send({message: "Invalid password"})
        }
        else{
            let token = await jwt.sign({ username : credentials.username},'abcdef',{expiresIn: 120})
           delete user.password
            res.send({message: "login-success",
             token: token,
             username: credentials.username,
             userObj : user})
        }
    }

}))

//Add to cart
userApi.post("/addtocart",expressErrorHandler(async(req,res,next)=>{

    let userCartCollectionObject = req.app.get("userCartCollectionObject")


    //get usercart Obj
    let userCartObj = req.body;
    console.log("usercartobj is",userCartObj)
    let userInCart = await userCartCollectionObject.findOne({ username: userCartObj.username})
    
    // if user is not existed in cart

    if(userInCart === null){
        let products= [];
        products.push(userCartObj.productObj)
        let newUserCartObject = {username:userCartObj.username,products: products};
      //  newUserCartObject.username = userCartObj.username
        //console.log(newUserCartObject)

        // await
        await userCartCollectionObject.insertOne(newUserCartObject)
        res.send({message: "Product added to cart"})
    }
    else{
        userInCart.products.push(userCartObj.productObj)
        //update

        await userCartCollectionObject.updateOne({ username: userCartObj.username}, {$set:{...userInCart}})
        res.send({ message : "product added to cart "})

    }
}))

userApi.get("/getcart", expressErrorHandler(async (req, res, next) => {

    let userCartCollectionObject = req.app.get("userCartCollectionObject");

    let cartObj = await userCartCollectionObject.find().toArray();
    res.send({ message: cartObj })

}))
//get cart data
userApi.get("/getcart/:username",expressErrorHandler(async(req,res,next)=>{
    let userCartCollectionObject=req.app.get("userCartCollectionObject")
    let un=req.params.username
    let cartList=await userCartCollectionObject.find({username:un}).toArray()
    console.log("cart list is",cartList)
    res.send({message:cartList})
}))


module.exports = userApi;