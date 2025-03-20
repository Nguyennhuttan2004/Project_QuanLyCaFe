import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editAddress,
  fetchAllAddresses,
} from "/store/shop/address-slice";
import CommonForm from "../common/form";
import AddressCard from "./address-card";
import { useToast } from "@/hooks/use-toast";

const initialAddressFormData = {
  streetAddress: "",
  ward: "",
  district: "",
  city: "",
  phone: "",
  notes: "",
  addressType: "Home",
  isDefault: false,
};

function Address({ setCurrentSelectedAddress, selectedId }) {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  const { toast } = useToast();

  function handleManageAddress(event) {
    event.preventDefault();

    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialAddressFormData);
      toast({
        title: "You can add max 3 addresses",
        variant: "destructive",
      });
      return;
    }

    currentEditedId !== null
      ? dispatch(
          editAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            setCurrentEditedId(null);
            setFormData(initialAddressFormData);
            toast({
              title: "Address updated successfully",
            });
          }
        })
      : dispatch(
          addNewAddress({
            ...formData,
            userId: user?.id,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            setFormData(initialAddressFormData);
            toast({
              title: "Address added successfully",
            });
          }
        });
  }

  function handleDeleteAddress(getCurrentAddress) {
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id));
        toast({
          title: "Address deleted successfully",
        });
      }
    });
  }

  function handleEditAddress(getCurrentAddress) {
    if (!getCurrentAddress) return;
    
    setCurrentEditedId(getCurrentAddress?._id);
    setFormData({
      streetAddress: getCurrentAddress?.streetAddress || "",
      ward: getCurrentAddress?.ward || "",
      district: getCurrentAddress?.district || "",
      city: getCurrentAddress?.city || "",
      phone: getCurrentAddress?.phone || "",
      notes: getCurrentAddress?.notes || "",
      addressType: getCurrentAddress?.addressType || "Home",
      isDefault: getCurrentAddress?.isDefault || false,
    });
  }

  function isFormValid() {
    return Object.values(formData).every(
      (value) => value !== undefined && value !== null && value.toString().trim() !== ""
    );
  }

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchAllAddresses(user?.id));
    }
  }, [dispatch, user?.id]);

  return (
    <Card className="p-6 bg-white shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center mb-4">
          Quản lý địa chỉ của bạn
        </CardTitle>
        <p className="text-gray-600 text-center">
          Hãy chọn hoặc thêm mới địa chỉ của bạn.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {addressList && addressList.length > 0 ? (
            addressList.map((singleAddressItem) => (
              <AddressCard
                key={singleAddressItem._id}
                selectedId={selectedId}
                handleDeleteAddress={handleDeleteAddress}
                addressInfo={singleAddressItem}
                handleEditAddress={handleEditAddress}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">Không tìm thấy địa chỉ nào.</p>
          )}
        </div>
        <CardHeader>
          <CardTitle>
            {currentEditedId !== null ? "Chỉnh sửa địa chỉ" : "Thêm địa chỉ mới"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <CommonForm
            formControls={addressFormControls}
            formData={formData}
            setFormData={setFormData}
            buttonText={currentEditedId !== null ? "Cập nhật" : "Thêm mới"}
            onSubmit={handleManageAddress}
            isBtnDisabled={!isFormValid()}
          />
        </CardContent>
      </CardContent>
    </Card>
  );
}

export default Address;
