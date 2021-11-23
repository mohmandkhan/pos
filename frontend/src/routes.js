import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import CreateCategory from './pages/Category';
import CreateSubCategory from './pages/SubCategory'
import CreateProduct from './pages/Product';
import GetAllProducts from './pages/Products/Products';
import GetAllCategories from './pages/Categories/Categories';
import GetAllSubCategories from './pages/SubCategories/SubCategories';
import GetAllUsers from './pages/Users/Users';
import CreateSupplier from './pages/Supplier';
import LeftMenu from './pages/includes';
import GetAllSuppliers from './pages/Suppliers/Suppliers';
import GetProduct from './pages/ProductDetails';

export default function Router() {
    return (
        <BrowserRouter>
            <LeftMenu />
            <Switch>
                <Route path='/login' exact component={Login} />
                <Route path='/' exact component={Dashboard} />
                <Route path='/register' exact component={Register} />
                <Route path='/createCategory' exact component={CreateCategory} />
                <Route path='/createsubCategory' exact component={CreateSubCategory} />
                <Route path='/createProduct' exact component={CreateProduct} />
                <Route path='/Products' exact component={GetAllProducts} />
                <Route path='/Categories' exact component={GetAllCategories} />
                <Route path="/SubCategories" exact component={GetAllSubCategories} />
                <Route path="/Users" exact component={GetAllUsers} />
                <Route path="/Supplier" exact component={CreateSupplier} />
                <Route path="/Suppliers" exact component={GetAllSuppliers} />
                <Route path="/Product/:productId" exact component={GetProduct} />

            </Switch>
        </BrowserRouter>
    )
}