import React from 'react';
import { useEffect,useState } from 'react';
import {useParams} from 'react-router-dom'
import axios from 'axios'
function ViewProducts(){

    let [product,setProduct] = useState('');
    let paramsObj = useParams();
   

    useEffect(()=>{
        axios.get("/product/getproduct")
        .then(res =>{
            let productObj = res.data.message;
            setProduct({ ...productObj })
        })
    },[])


    return(
        <div>
            <h2>{product.Price}</h2>
        </div>
    )
}
export default ViewProducts;

