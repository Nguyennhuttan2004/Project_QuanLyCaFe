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

export const updateOrderStatus = createAsyncThunk(
  "/order/updateOrderStatus",
  async ({ id, orderStatus }, { dispatch }) => {
    const response = await axios.put(
      `http://localhost:5000/api/admin/orders/update/${id}`,
      { orderStatus }
    );

    // Gọi lại các API để cập nhật lại dữ liệu
    dispatch(getTotalOrders()); // Lấy lại tổng số đơn hàng
    dispatch(getSalesPerMonth()); // Lấy lại doanh thu theo tháng
    
    return response.data; // Trả lại kết quả sau khi cập nhật trạng thái đơn hàng
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


const adminOrderSlice = createSlice({
  name: "adminOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      console.log("resetOrderDetails");

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
      .addCase(getAllOrdersForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetailsForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetailsForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      })
      .addCase(getTotalOrders.fulfilled, (state, action) => {
        state.totalOrders = action.payload.totalOrders; // Cập nhật tổng số đơn hàng
      })
      .addCase(getSalesPerMonth.fulfilled, (state, action) => {
        state.salesData = action.payload.data; // Cập nhật doanh số bán hàng
      });
  },
});


export const { resetOrderDetails } = adminOrderSlice.actions;

export default adminOrderSlice.reducer;
