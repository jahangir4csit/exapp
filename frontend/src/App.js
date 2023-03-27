import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register.js'
import Forgot from './pages/auth/Forgot'
import Reset from './pages/auth/Reset'
import { loggedinStatusApiRequest } from './services/authServices';
import { SET_LOGIN } from './redux/features/auth/authSlice';

import Dashboard from "./pages/dashboard/Dashboard";

import Products from "./pages/products/Products";
import AddProduct from "./pages/products/AddProduct";
import EditProduct from "./pages/products/EditProduct";

import Categories from "./pages/categories/Categories";
import AddCategory from "./pages/categories/AddCategory";



axios.defaults.withCredentials = true

function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    async function loginStatus(){
      const status = await loggedinStatusApiRequest();
      dispatch(SET_LOGIN(status))
    }
    loginStatus();
  },[dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/registration' element={<Register/>} />
        <Route path='/forgot' element={<Forgot/>} />
        <Route path='/resetpassword/:resetToken' element={<Reset/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/products' element={<Products/>} />
        <Route path='/add-product' element={<AddProduct/>} />
        <Route path='/edit-product' element={<EditProduct/>} />
        <Route path='/categories' element={<Categories/>} />
        <Route path='/add-category' element={<AddCategory/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
