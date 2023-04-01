import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { notification } from 'antd';
import userService from '../../../services/userServices';
import { HttpStatusCode } from "axios";

const initialState = {
    users: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// get all Products
export const getUsers = createAsyncThunk(
    "users/getAll",
    async (_, thunkAPI) => {
      try {
        return await userService.getUsers();
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );

  const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
    },
    extraReducers: (builder)=>{
        builder
          .addCase(getUsers.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            console.log(action.payload, 'data');
            state.users = action.payload;
          })
          .addCase(getUsers.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            notification.error({
              message: action.payload
            });
          })
    }
  });
  
  export const selectIsLoading = (state) => state.users.isLoading;
  
  
  
  export default userSlice.reducer