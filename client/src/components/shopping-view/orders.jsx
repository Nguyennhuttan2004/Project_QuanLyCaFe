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
import {
  getAllOrdersByUserId,
  getOrderDetails,
  resetOrderDetails,
} from "/store/shop/order-slice";
import ReactPaginate from "react-paginate";
import Lottie from "lottie-react";
import cartEmpty from "./../../assets/animations/Animation - cartEmpty.json";

function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const ordersPerPage = 5;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

  useEffect(() => {
    if (user?.id) dispatch(getAllOrdersByUserId(user.id));
  }, [dispatch, user?.id]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  const sortedOrders = [...orderList].sort(
    (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
  );
  const pageCount = Math.ceil(sortedOrders.length / ordersPerPage);
  const displayedOrders = sortedOrders.slice(
    currentPage * ordersPerPage,
    (currentPage + 1) * ordersPerPage
  );

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetails(getId));
  }

  function handlePageChange({ selected }) {
    setCurrentPage(selected);
  }

  return (
    <Card className="shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-gray-100">
        <CardTitle className="text-3xl font-semibold text-[#A67C6D]">
          Order History
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow className="text-xl font-semibold">
              <TableHead className="py-2 text-[#A67C6D]">Order ID</TableHead>
              <TableHead className="py-2 text-[#A67C6D]">Order Date</TableHead>
              <TableHead className="py-2 text-[#A67C6D]">Order Status</TableHead>
              <TableHead className="py-2 text-[#A67C6D]">Order Price</TableHead>
              <TableHead className="py-2 text-[#A67C6D]">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedOrders.length > 0 ? (
              displayedOrders.map((orderItem) => (
                <TableRow key={orderItem?._id} className="hover:bg-gray-100">
                  <TableCell className="py-2">{orderItem?._id}</TableCell>
                  <TableCell className="py-2">
                    {orderItem?.orderDate?.split("T")[0]}
                  </TableCell>
                  <TableCell className="py-2">
                    <Badge
                      className={`py-1 px-3 text-white font-bold rounded-full ${
                        orderItem?.orderStatus === "pending"
                          ? "bg-yellow-500"
                          : orderItem?.orderStatus === "confirmed"
                          ? "bg-green-500"
                          : orderItem?.orderStatus === "delivered"
                          ? "bg-blue-500"
                          : orderItem?.orderStatus === "rejected"
                          ? "bg-red-500"
                          : "bg-gray-500"
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
                        className="text-white font-medium px-4 py-2 rounded-md 
                        transition-all duration-300 ease-in-out 
                        bg-gradient-to-r from-[#A67C6D] via-[#D8CFC4] to-[#A67C6D]
                        hover:from-[#D8CFC4] hover:to-[#A67C6D]"
                      >
                        View Details
                      </Button>
                      <ShoppingOrderDetailsView orderDetails={orderDetails} />
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <Lottie
                animationData={cartEmpty}
                className="w-[30%] h-[30%] pl-28 ml-96"
              />
            )}
          </TableBody>
        </Table>

        {/* ✅ Pagination */}
        {orderList.length > ordersPerPage && (
          <div className="flex justify-center mt-6">
            <ReactPaginate
              previousLabel={"← Prev"}
              nextLabel={"Next →"}
              pageCount={pageCount}
              onPageChange={handlePageChange}
              containerClassName={"flex items-center space-x-2"}
              pageClassName={
                "px-4 py-2 border border-[#A67C6D] text-[#A67C6D] font-medium rounded-md transition-all duration-300 hover:bg-[#A67C6D] hover:text-white"
              }
              activeClassName={"bg-[#A67C6D] text-white font-bold"}
              previousClassName={
                "px-4 py-2 border border-gray-400 text-gray-500 rounded-md transition-all duration-300 hover:bg-gray-400 hover:text-white"
              }
              nextClassName={
                "px-4 py-2 border border-gray-400 text-gray-500 rounded-md transition-all duration-300 hover:bg-gray-400 hover:text-white"
              }
              disabledClassName={"opacity-50 cursor-not-allowed"}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default ShoppingOrders;
