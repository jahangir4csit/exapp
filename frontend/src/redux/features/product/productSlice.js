import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    product: null,
    products: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Create New Product
const createNewProduct = createAsyncThunk(
  "products/create",
  async()=>{
    try {
      
    } catch (error) {
      
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

  }
});

export const {CALC_STORE_VALUES} = productSlice.actions

export default productSlice.reducer