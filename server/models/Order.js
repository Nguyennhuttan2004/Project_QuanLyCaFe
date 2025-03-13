const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
    required: true
  },
  cartItems: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      title: String,
      image: String,
      price: Number,
      quantity: Number,
    },
  ],
  addressInfo: {
    addressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address"
    },
    address: String,
    city: String,
    phone: String,
    notes: String,
  },
  orderStatus: {
    type: String,
    default: "Pending"
  },
  paymentMethod: String,
  paymentStatus: {
    type: String,
    default: "Pending"
  },
  totalAmount: Number,
  shippingFee: Number,
  discount: Number,
  orderDate: {
    type: Date,
    default: Date.now
  },
  orderUpdateDate: Date,
  paymentId: String,
  payerId: String,
});

module.exports = mongoose.model("Order", OrderSchema);