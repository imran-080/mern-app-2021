import { useEffect,useState } from 'react';
import React from 'react';
import axios from 'axios'

function UserCart(props){

   /* const[product,setProduct] = useState('')

    useEffect(() => {
        axios.get('/user/getcart')
            .then(res => {
                let productsObj =  res.data.message;
               // setUserCart(res.data.message)
             //  console.log("cartobj is",productsObj)
               setProduct([...productsObj])
               let count = productsObj
               //console.log(count)
            })
            .catch(err => {
                console.log("err in get products ", err)
                alert("Something went wrong")
            })
    }, [product.username])
    console.log(product)*/


    let  cartData=props.product;
    console.log("card data is ", cartData)


      
    return(
        <table className="table">
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Model</th>
                    <th>Price</th>
                    <th>product Image</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {
                 cartData && cartData.map((da,ind)=>{
                     return(
                        da.products.map((data)=>{
                           return(
                                <tr key={ind}>
                            <td>{data.productname}</td>
                            <td>{data.model}</td>
                            <td>{data.price}</td>
                            <td><img src={data.productImage} width="80px" /></td> 
                            <td><button className="btn btn-danger btn-sm">Delete</button></td>

    
                        </tr>
                        )
                        })
                    
                      )
                     
                 })
             }    
            
            </tbody>

        </table>
    )
}
export default UserCart;