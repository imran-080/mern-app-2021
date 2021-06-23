import React from 'react';
import {BrowserRouter,Switch,Link, Route} from 'react-router-dom'
import ViewProducts from './ViewProducts'
import AddProduct from './AddProduct';
function AdminProfile(){


    return(
        <BrowserRouter>
        <ul className =" nav nav-pills nav-fill">
            <li className="nav-item">
                <Link to="/add-product" className="nav-link" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">Add-Product</Link>
            </li>
            <li className="nav-item">
                <Link to="/view-product" className="nav-link" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">View-Product</Link>
            </li>
           
        </ul>

        <Switch>
            <Route path="/add-product">
                <AddProduct />
            </Route>
            <Route path="/view-product">
                <ViewProducts />
            </Route>
        </Switch>
        </BrowserRouter>
        
    )
}
export default AdminProfile;