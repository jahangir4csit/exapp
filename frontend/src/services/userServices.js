import axios from 'axios'
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/users/all`

// Get all Products
const getUsers = async()=>{
    const response = await axios.get(API_URL);
    return response.data
}

const userService = {
    getUsers
}
export default userService;