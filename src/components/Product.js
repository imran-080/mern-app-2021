import React from 'react';
import ViewProducts from './ViewProducts';
//import AddProduct from './AddProduct'
import {BrowserRouter,Switch,Link, Route} from 'react-router-dom'
import {useHistory} from 'react-router-dom';


function Product(){
    const history = useHistory()


    return(
        <BrowserRouter>
        <div>
            <ul className="nav justify-content-center">
            <li className="nav-item">
      <Link to ="/view-product" className="nav-link">ViewProducts</Link>
      </li>
       </ul>
            <Switch>
            <Route path="/view-product"> 
         <ViewProducts /> 
        </Route> 
        
        
            </Switch>
        </div>
        </BrowserRouter>
    )
}
export default Product;