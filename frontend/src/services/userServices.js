import { notification } from 'antd';
import axios from 'axios'
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Get all Users
const getUsers = async()=>{
    const response = await axios.get(`${BACKEND_URL}/api/users/all`);
    return response.data
}

// Update Role 
export const updateRole = async (formData, id) => {
    try {
      const response = await axios.patch(
        `${BACKEND_URL}/api/users/add-role/${id}`,
        formData
      );
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      notification.error(message);
    }
  };

const userService = {
    getUsers,
    updateRole
}
export default userService;