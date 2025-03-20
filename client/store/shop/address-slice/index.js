import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/shop/address";

const initialState = {
  isLoading: false,
  addressList: [],
};

export const addNewAddress = createAsyncThunk(
  "addresses/addNewAddress",
  async (formData) => {
    const response = await axios.post(`${API_BASE_URL}`, formData);
    return response.data;
  }
);

export const fetchAllAddresses = createAsyncThunk(
  "addresses/fetchAllAddresses",
  async (userId) => {
    const response = await axios.get(`${API_BASE_URL}/${userId}`);
    return response.data;
  }
);

export const editAddress = createAsyncThunk(
  "addresses/editAddress",
  async ({ userId, addressId, formData }) => {
    const response = await axios.put(`${API_BASE_URL}/${userId}/${addressId}`, formData);
    return response.data;
  }
);

export const deleteAddress = createAsyncThunk(
  "addresses/deleteAddress",
  async ({ userId, addressId }) => {
    const response = await axios.delete(`${API_BASE_URL}/${userId}/${addressId}`);
    return response.data;
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList.push(action.payload.data);
      })
      .addCase(fetchAllAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(editAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = state.addressList.map((address) =>
          address._id === action.payload.data._id ? action.payload.data : address
        );
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = state.addressList.filter(
          (address) => address._id !== action.meta.arg.addressId
        );
      });
  },
});

export default addressSlice.reducer;
