import React from 'react';
import { useEffect,useState } from 'react';
import {useParams} from 'react-router-dom'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

function UserProfile(){

    const history = useHistory();

     // get username from url
     let paramsObj = useParams();


   let [user,setUser] = useState('');
     // fetch user data from api
    useEffect(()=>{
       /*axios.get(`/user/getuser/${paramsObj.username}`)
        .then(res =>{
            let userObj = res.data.message;
            setUser({ ...userObj })
        })*/
        // get userobj from localstorage
        let userObj= JSON.parse(localStorage.getItem('user'))
        setUser({...userObj})
    },[paramsObj.username])
    

   /* const backToRegister =(e) =>{
        history.push('/register')
    }*/

   
   




    return(
        <div>
            <h2 className="text-end ">welcome {paramsObj.username}</h2>
            <div className="text-center">
                <h3>{user.email}</h3>
                <h3>{user.dob}</h3>
                <img  src={user.profileImage} width="200px" alt=""></img>

            </div>


            <br></br><br></br>
            {/* <center
            <button  className="btn btn-secondary"
           
           onClick={backToRegister} >Logout</button>
           </center> */}


        </div>
    )
}
export default UserProfile;