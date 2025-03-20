import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  orderList: [],
  orderDetails: null,
  salesData: [],
  totalOrders: 0,
};

export const getAllOrdersForAdmin = createAsyncThunk(
  "/order/getAllOrdersForAdmin",
  async () => {
    const response = await axios.get(
      `http://localhost:5000/api/admin/orders/get`
    );

    return response.data;
  }
);

export const getOrderDetailsForAdmin = createAsyncThunk(
  "/order/getOrderDetailsForAdmin",
  async (id) => {
    const response = await axios.get(
      `http://localhost:5000/api/admin/orders/details/${id}`
    );

    return response.data;
  }
);

// Cập nhật trạng thái đơn hàng
export const updateOrderStatus = createAsyncThunk(
  "/order/updateOrderStatus",
  async ({ id, orderStatus }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/admin/orders/update/${id}`, {
        orderStatus,
      });

      if (response.data.success) {
        dispatch(getOrderDetailsForAdmin(id));
        dispatch(getAllOrdersForAdmin());
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Update failed" });
    }
  }
);
export const getSalesPerMonth = createAsyncThunk(
  "/order/getSalesPerMonth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/admin/orders/sales-per-month`);
      console.log("Redux fetch sales data:", response.data); // Debug API data
      return response.data; // Đảm bảo trả về đúng cấu trúc
    } catch (error) {
      console.error("Error in getSalesPerMonth:", error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const getTotalOrders = createAsyncThunk(
  "/order/getTotalOrders",
  async () => {
    const response = await axios.get(
      `http://localhost:5000/api/admin/orders/total-orders`
    );

    return response.data;
  }
);


// Slice quản lý state của admin orders
const adminOrderSlice = createSlice({
  name: "adminOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersForAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.orderList = [];
        state.error = action.payload;
      })
      .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.orderDetails = action.payload.data;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.orderDetails.orderStatus = action.payload.updatedStatus;
        }
      });
  },
});


export const { resetOrderDetails } = adminOrderSlice.actions;

export default adminOrderSlice.reducer;
