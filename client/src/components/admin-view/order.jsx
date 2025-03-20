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
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "/store/admin/order-slice";
import { Badge } from "../ui/badge";
import AdminOrderDetailsView from "./order-detail";
import ReactPaginate from "react-paginate";

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;
  const [itemsPerPage] = useState(6);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetailsForAdmin(getId));
  }

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

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

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-4xl leading-8 text-[#A67C6D] font-bold text-center my-5 uppercase tracking-wide mb-10">
          All Orders
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedOrders.map((orderItem) => (
              <TableRow key={orderItem?._id}>
                <TableCell>{orderItem?._id}</TableCell>
                <TableCell>{orderItem?.orderDate?.split("T")[0]}</TableCell>
                <TableCell>
                  <Badge
                    className={`py-1 px-3 text-white font-semibold rounded-md ${
                      orderItem?.orderStatus === "pending"
                        ? "bg-yellow-500"
                        : orderItem?.orderStatus === "confirmed"
                        ? "bg-green-500"
                        : orderItem?.orderStatus === "delivered"
                        ? "bg-green-700"
                        : orderItem?.orderStatus === "rejected"
                        ? "bg-red-500"
                        : orderItem?.orderStatus === "inShipping"
                        ? "bg-orange-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {orderItem?.orderStatus}
                  </Badge>
                </TableCell>
                <TableCell>{orderItem?.totalAmount} VND</TableCell>
                <TableCell>
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
                    <AdminOrderDetailsView orderDetails={orderDetails} />
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

         {/* ✅ Thêm phân trang */}
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

      </CardContent>
    </Card>
  );
}

export default AdminOrdersView;
