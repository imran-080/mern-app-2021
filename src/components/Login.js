import React from 'react';
import {useForm} from 'react-hook-form';
import {useHistory} from 'react-router-dom';
import axios from 'axios'

function Login(props){
    const { register,handleSubmit,formState: {errors}} =useForm();
    const history= useHistory();
   // console.log('history is',history)

    const onFormSubmit =(credentials) =>{
       // console.log(userObj)
        

       //make post request
       axios.post(`/${credentials.type}/login`,credentials)
        .then(res =>{

            // get res obj.
            let resObj = res.data;
            
            
            if(resObj.message === 'login-success'){
                //save token in local storage
                localStorage.setItem("token",resObj.token)
                localStorage.setItem("username",resObj.username)
                localStorage.setItem("user",JSON.stringify( resObj.userObj))
                //update userlogin status
                props.setUserLoginStatus(true)

                //navigate to user profile 
                //check whether admin or user
                if(credentials.type === "user"){

                history.push(`/userprofile/${resObj.username}`)
                }
                if(credentials.type === "admin"){

                    history.push(`/adminprofile/${resObj.username}`)
                    }
            }
            else {
                alert(resObj.message)
            }

        })
        .catch(err =>{
            console.log(err)
            alert("wrong login or password")
        })

        // to check whether it is admin or user

        


    
      
    }



    return(
        <div>
            <form className="w-25 mx-auto" onSubmit={handleSubmit(onFormSubmit)}>

            <div className="form-check">
                <input className="form-check-input" type="radio" id="admin" {...register("type")} value="admin"></input>
                <label className="form-check-label" htmlFor='admin'>Admin</label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" id="user" {...register("type")} value="user"></input>
                <label className="form-check-label" htmlFor='user'>User</label>
            </div>



            {/* username */}
            <label htmlFor="un">Username</label>
            <input type="text" id="un" {...register('username',{required:true,minLength:4})}  className="form-control mb-3"/>
            {errors.username?.type==='required' && <p className="text-danger"> username is required</p>}
            {errors.username?.type==='minLength' && <p className="text-danger"> please provide at least 4 char</p>}

            <label htmlFor="pw">Password</label>
            <input type="password" id="pw" {...register('password',{required:true,minLength:2})}  className="form-control mb-3"/>
            {errors.password?.type==='required' && <p className="text-danger"> username is required</p>}
            {errors.password?.type==='minLength' && <p className="text-danger">Set min 2 char password</p>}
            

         

        <button type="submit" className="btn btn-danger">Submit</button>
        </form>
        </div>
    )
}
export default Login;