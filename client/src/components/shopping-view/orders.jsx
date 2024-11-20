import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import ShoppingOrderDetailsView from "./order-detail";
import { getAllOrdersByUserId, getOrderDetails, resetOrderDetails } from "/store/shop/order-slice";
import ReactPaginate from "react-paginate";
import Lottie from "lottie-react";
import cartEmpty from "./../../assets/animations/Animation - cartEmpty.json";

function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const ordersPerPage = 5; // Số đơn hàng trên mỗi trang
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

  useEffect(() => {
    dispatch(getAllOrdersByUserId(user?.id));
  }, [dispatch, user]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  // Sắp xếp đơn hàng theo ngày đặt hàng (mới nhất lên đầu)
  const sortedOrders = [...orderList].sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

  const pageCount = Math.ceil(sortedOrders.length / ordersPerPage);
  const displayedOrders = sortedOrders.slice(currentPage * ordersPerPage, (currentPage + 1) * ordersPerPage);

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetails(getId));
  }

  return (
    <Card className="shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-gray-100">
        <CardTitle className="text-3xl font-semibold text-[#A67C6D]">Order History</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow className="text-xl font-semibold ">
              <TableHead className="py-2 text-[#A67C6D]">Order ID</TableHead>
              <TableHead className="py-2 text-[#A67C6D]">Order Date</TableHead>
              <TableHead className="py-2 text-[#A67C6D]">Order Status</TableHead>
              <TableHead className="py-2 text-[#A67C6D]">Order Price</TableHead>
              <TableHead className="py-2 text-[#A67C6D]">
                <span className="">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedOrders && displayedOrders.length > 0
              ? displayedOrders.map((orderItem) => (
                  <TableRow key={orderItem?._id} className="hover:bg-gray-100">
                    <TableCell className="py-2">{orderItem?._id}</TableCell>
                    <TableCell className="py-2">{orderItem?.orderDate.split("T")[0]}</TableCell>
                    <TableCell className="py-2">
                      <Badge
                        className={`py-1 px-3 rounded-full ${
                          orderItem?.orderStatus === "confirmed"
                            ? "bg-green-500"
                            : orderItem?.orderStatus === "delivered"
                            ? "bg-green-600"
                            : orderItem?.orderStatus === "rejected"
                            ? "bg-red-600"
                            : orderItem?.orderStatus === "pending" ||
                              orderItem?.orderStatus === "inProcess" ||
                              orderItem?.orderStatus === "inShipping"
                            ? "bg-yellow-500"
                            : "bg-black"
                        }`}
                      >
                        {orderItem?.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-2">${orderItem?.totalAmount}</TableCell>
                    <TableCell className="py-2">
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          dispatch(resetOrderDetails());
                        }}
                      >
                        <Button
                          onClick={() => handleFetchOrderDetails(orderItem?._id)}
                          className="btn"
                        >
                          View Details
                        </Button>
                        <ShoppingOrderDetailsView orderDetails={orderDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : <Lottie
                  animationData={cartEmpty}
                  className="w-[30%] h-[30%] pl-28 ml-96"
                />}
          </TableBody>
        </Table>
        {/* Phân trang */}
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={(data) => setCurrentPage(data.selected)}
          containerClassName={"pagination flex justify-center mt-4"}
          activeClassName={"active"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
        />
      </CardContent>
    </Card>
  );
}

export default ShoppingOrders;