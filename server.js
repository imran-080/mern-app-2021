// create express app
const exp = require('express');
const app = exp()
const path = require("path")


// creating build of react with current user

app.use(exp.static(path.join(__dirname,'./build/')))

const userApi = require("./APIS/user-api")
const productApi = require("./APIS/product-api")
const adminApi = require("./APIS/admin-api")


app.use('/user', userApi);
//if /user then call userapi
app.use('/product', productApi);
app.use('/admin',adminApi)


//database connectiivity
const mongoClient = require('mongodb').MongoClient;

const dburl ="mongodb+srv://924080cdb:924080cdb@imran7866.xd0vx.mongodb.net/924080cdb?retryWrites=true&w=majority"

//database obj
//let databaseObject;

mongoClient.connect(dburl,{ useNewUrlParser:true, useUnifiedTopology: true },(err,client)=>{
    if(err){
        console.log("error in db connect",err)
    }
    else{
      //create database object
        let databaseObject = client.db("924080cdb")

        //create our collection project
        let userCollectionObject = databaseObject.collection("user-collection")
        let productCollectionObject = databaseObject.collection("productcollection")
        let adminCollectionObject = databaseObject.collection("admincollection")
        

        //sharing collection object
        app.set("userCollectionObject",userCollectionObject)
        app.set("productCollectionObject",productCollectionObject)
        app.set("adminCollectionObject",adminCollectionObject)
        console.log("DB connection is successful")
    }
})

app.get('/*', (req, res)=> {
    res.sendFile(path.join(__dirname, './build/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })












// assign port 
const port =8080;
app.listen(port,()=> console.log(`server listening on port ${port}..`)) 