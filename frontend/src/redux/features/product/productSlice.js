import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { notification } from 'antd';
import productService from '../../../services/productServices';

const initialState = {
    product: null,
    products: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Create New Product
export const createProduct = createAsyncThunk(
  "products/create",
  async (formData, thunkAPI) => {
    try {
      return await productService.createProduct(formData);
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

// get all Products
export const getProducts = createAsyncThunk(
  "products/getAll",
  async (_, thunkAPI) => {
    try {
      return await productService.getProducts();
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

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    CALC_STORE_VALUES(state, action){
        console.log('store values');
    }
  },
  extraReducers: (builder)=>{
      builder
        .addCase(createProduct.pending, (state)=>{
          state.isLoading = true
        })
        .addCase(createProduct.fulfilled, (state, action)=>{
          state.isLoading = false
          state.isSuccess = true
          state.products.push(action.payload)
          notification.success({
            message: 'Product created Successfully'
          });
        })
        .addCase(createProduct.rejected, (state, action)=>{
          state.isLoading = false
          state.isError = true
          state.message = action.payload
          notification.error({
            message: action.payload
          });
        })
        .addCase(getProducts.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getProducts.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          console.log(action.payload);
          state.products = action.payload;
        })
        .addCase(getProducts.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          notification.error({
            message: action.payload
          });
        })
  }
});

export const {CALC_STORE_VALUES} = productSlice.actions
export const selectIsLoading = (state) => state.product.isLoading;


export default productSlice.reducer