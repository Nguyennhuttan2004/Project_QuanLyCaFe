import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/shop/order";

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
  orderList: [],
  orderDetails: null,
};

// 🛒 Tạo đơn hàng mới
export const createNewOrder = createAsyncThunk(
  "order/createNewOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      console.log("🔍 Debug Order Data:", JSON.stringify(orderData, null, 2)); // Log đầy đủ dữ liệu

      const response = await axios.post("http://localhost:5000/api/shop/order/", orderData);
      return response.data;
    } catch (error) {
      console.error("❌ Error creating new order:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Error creating order");
    }
  }
);



// 💰 Xác nhận thanh toán đơn hàng
export const capturePayment = createAsyncThunk(
  "order/capturePayment",
  async ({ paymentId, payerId, orderId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/capture`, {
        paymentId,
        payerId,
        orderId,
      });
      return response.data;
    } catch (error) {
      console.error("Error capturing payment:", error);
      return rejectWithValue(error.response?.data || "Error capturing payment");
    }
  }
);

// 📦 Lấy danh sách đơn hàng theo userId
export const getAllOrdersByUserId = createAsyncThunk(
  "order/getAllOrdersByUserId",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching orders by user ID:", error);
      return rejectWithValue(error.response?.data || "Error fetching orders");
    }
  }
);

// 🔎 Lấy chi tiết đơn hàng theo orderId
export const getOrderDetails = createAsyncThunk(
  "order/getOrderDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching order details:", error);
      return rejectWithValue(error.response?.data || "Error fetching order details");
    }
  }
);

const shoppingOrderSlice = createSlice({
  name: "shoppingOrder",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
    resetOrderState: (state) => {
      state.approvalURL = null;
      state.orderId = null;
      state.orderList = [];
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🛒 Tạo đơn hàng mới
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalURL = action.payload.approvalURL;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem("currentOrderId", JSON.stringify(action.payload.orderId));
      })
      .addCase(createNewOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = null;
      })

      // 📦 Lấy danh sách đơn hàng
      .addCase(getAllOrdersByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersByUserId.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })

      // 🔎 Lấy chi tiết đơn hàng
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      })

      // 💰 Xác nhận thanh toán
      .addCase(capturePayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(capturePayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(capturePayment.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { resetOrderDetails, resetOrderState } = shoppingOrderSlice.actions;

export default shoppingOrderSlice.reducer;
