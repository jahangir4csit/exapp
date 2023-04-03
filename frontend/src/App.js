import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register.js'
import Forgot from './pages/auth/Forgot'
import Reset from './pages/auth/Reset'
import { loggedinStatusApiRequest } from './services/authServices';
import { SET_LOGIN } from './redux/features/auth/authSlice';

import Dashboard from "./pages/dashboard/Dashboard";
import Users from "./pages/users/Users";
import AddRole from './pages/users/AddRole';
import Unauthorized from './pages/unauthorized/Unauthorized';

import Products from "./pages/products/Products";
import AddProduct from "./pages/products/AddProduct";
import EditProduct from "./pages/products/EditProduct";

import Categories from "./pages/categories/Categories";
import AddCategory from "./pages/categories/AddCategory";
import EditRole from './pages/users/EditRole';



axios.defaults.withCredentials = true

function App() {
  const dispatch = useDispatch();
  //const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const getUser = async () => {
		try {
			const url = `${process.env.REACT_APP_BACKEND_URL}/api/users/login/success`;
			const { data } = await axios.get(url, { withCredentials: true });
      setUser(data.user._json);
      await dispatch(SET_LOGIN(true));
      <Navigate to={'/dashboard'} />
		} catch (err) {
			console.log(err);
		}
	};

  useEffect(() => {
		getUser();
	}, []);


  console.log(user, '... google auth user');


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
        <Route path='/unauthorized' element={<Unauthorized/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/registration' element={<Register/>} />
        <Route path='/forgot' element={<Forgot/>} />
        <Route path='/users' element={<Users/>} />
        <Route path='/users/add-role' element={<AddRole/>} />
        <Route path='/users/edit-role/:id' element={<EditRole/>} />
        <Route path='/resetpassword/:resetToken' element={<Reset/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/products' element={<Products/>} />
        <Route path='/add-product' element={<AddProduct/>} />
        <Route path='/edit-product/:id' element={<EditProduct/>} />
        <Route path='/categories' element={<Categories/>} />
        <Route path='/add-category' element={<AddCategory/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;