
const exp = require('express')
const productApi = exp.Router();
const expressErrorHandler = require('express-async-handler');
const multerObj = require("./middlewares/addfile")


//body parser middleware
productApi.use(exp.json())






productApi.post("/createproduct",multerObj.single('photo'),expressErrorHandler( async(req,res,next) =>{
    let productCollectionObject =req.app.get("productCollectionObject")
    const newProduct = JSON.parse(req.body.productObj);
    
    let product= await productCollectionObject.findOne({model:newProduct.model})
    if(product!==null){
        res.send({message: "product already existed"})
    }
        else{
           
            newProduct.productImage = req.file.path;
            await productCollectionObject.insertOne(newProduct)
            res.send({message: "product created"})

        }
    
}))

// get product




productApi.get("/viewproducts", expressErrorHandler(async (req, res, next) => {

    let productCollectionObject = req.app.get("productCollectionObject");

    let products = await productCollectionObject.find().toArray();
    res.send({ message: products })

}))

// read product by its name using promise
productApi.get("/getproduct/:productname", (req, res, next) => {
    //get username from url params
    let pn = req.params.productname;
    //search
    productCollectionObject.findOne({ productname: pn })
        .then(productObj => {
            if (productObj == null) {
                res.send({ message: "product is not there" })
            }
            else {
                res.send({ message: productObj })
            }
        })
        .catch(err => {
            console.log("errr in reading product", err)
            res.send({ message: err.message })
        })
})


module.exports = productApi;
