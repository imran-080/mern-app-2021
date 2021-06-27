import React from 'react';
import { useEffect,useState } from 'react';
import {useParams} from 'react-router-dom'
import axios from 'axios'
import {BrowserRouter,Switch,Link, Route} from 'react-router-dom'
import {useHistory} from 'react-router-dom'
import ViewProducts from './ViewProducts'
import UserCart from './UserCart';

function UserProfile(){

    const history = useHistory();

     // get username from url
     let paramsObj = useParams();


   let [user,setUser] = useState('');
   const   [product, setProduct]= useState(0);
  // let history = useHistory();
   let paramObj = useParams();
   let [count, setcount] = useState(0)
 let [cd, setCd]= useState([])

   //function to make post to usercart api
    const addProductToCart =(productObj) =>{
        //get username from localstorage
        let username = localStorage.getItem("username")
        //productObj.username= username;
        let newObj ={username,productObj}
        console.log("product  added is",newObj)

        //make post req
        axios.post("/user/addtocart",newObj)
        .then(res =>{
            let responseObj = res.data;
            alert(responseObj.message)
        })
        .catch(err =>{
            console.log("error in adding product",err)
            alert('something is wrong')
        })
    }
     // fetch user data from api
    useEffect(()=>{


        let username = localStorage.getItem("username")
                        axios.get(`/user/getcart/${username}`)
                        .then(res=>{
                                    let productsObj = res.data.message;
                                    let products= productsObj[0].products
                                    
                                    let countt=products.length;
                                    
                                    console.log("count isss",countt)
                           
                                  setCd([...productsObj]) 
                                  setcount(countt)
                        },[])
                        .catch(err=>{
                           console.log(err)
                                    alert("something went wrong ")
                        })
       
        let userObj= JSON.parse(localStorage.getItem('user'))
        setUser({...userObj})
    },[paramsObj.username])
    console.log(user)

    //fetch cart data
    
    

   
   
   




    return(
        <div>
            <h5 className="text-end ">welcome {paramsObj.username}
           
               
                <img  src={user.profileImage} width="50px" alt=""></img>
                

           </h5>

           <BrowserRouter>
        <ul className =" nav nav-pills nav-fill">
            
            
            <li className="nav-item">
                <Link to="/addtocart" className="nav-link" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">Cart <span className="badge text-dark ms-2 bg-light">{count} </span></Link>
            </li>
            <li className="nav-item">
                <Link to="/view-product" className="nav-link" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">View-Product</Link>
            </li>
        </ul>

        <Switch>
            <Route path="/addtocart">
                <UserCart product={cd} />
            </Route>
            <Route path="/view-product">
                <ViewProducts addProductToCart ={addProductToCart} />
            </Route>
        </Switch>
        </BrowserRouter>


           
            {/* <center
            <button  className="btn btn-secondary"
           
           onClick={backToRegister} >Logout</button>
           </center> */}


        </div>
    )
}
export default UserProfile;