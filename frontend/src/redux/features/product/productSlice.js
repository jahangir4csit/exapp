import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
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
  async(formData, thunkAPI)=>{
    try {
      return await productService.createProduct(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue( error.response.data.message)
    }
  }
)

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
          console.log(action.payload)
          state.products.push(action.payload)
          notification.success('Product added successfully');
        })
        .addCase(createProduct.rejected, (state, action)=>{
          state.isLoading = false
          state.isError = true
          state.message = action.payload
          notification.error(action.payload);
        })
  }
});

export const {CALC_STORE_VALUES} = productSlice.actions

export default productSlice.reducer