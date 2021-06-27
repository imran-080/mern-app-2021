import React from 'react';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import axios from 'axios'
import {useHistory} from 'react-router-dom'


function AddProduct(){

    const { register,handleSubmit} =useForm();
    const history = useHistory();
    const [file,setFile] = useState(null)

    const onFormSubmit =(productObj) =>{
        //formdata object creation
        let formData = new FormData();
        
        formData.append('photo',file,file.name)
        formData.append("productObj",JSON.stringify(productObj))
        console.log(productObj)


        axios.post("/product/createproduct", formData)
       .then(res =>{
           let productObj= res.data;
           alert(productObj.message)
           history.push('/view-products')
       })
       .catch(err =>{
           console.log(err);
           alert("something is not right")
       })
        
    }
    const onFileSelect =(e) =>{
        //console.log(e.target.files[0]);
        setFile(e.target.files[0])
    }
    


    return(
        <div>
            <form className="form-label w-25 mx-auto m-5" onSubmit={handleSubmit(onFormSubmit)}>
        {/* product name */}
            <label htmlFor="pn">ProductName</label>
            <input type="text" id="pn" {...register('productname')}  className="form-control mb-3"/>
        {/* product company */}
            <label htmlFor="mo">Model</label>
            <input type="text" id="mo" {...register('model')}  className="form-control mb-3"/>

        {/* price */}
        <label htmlFor="pr">Price</label>
            <input type="number" id="pr" {...register('price')}  className="form-control mb-3"/>
            <textarea type="text" className="form-control mb-3"  {...register("description")} placeholder="description" />
            <input type="file" name="photos"  className="form-control mt-3 mb-3" onChange={(e)=>{onFileSelect(e)}}
            {...register("productImage")}
            ></input>

            <button type="submit" className="btn btn-danger">Add product</button>
          </form>
        </div>
    )
}
export default AddProduct;