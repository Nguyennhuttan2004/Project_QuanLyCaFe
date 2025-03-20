import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`cursor-pointer border rounded-lg shadow-lg transition-transform transform hover:scale-105 ${
        selectedId?._id === addressInfo?._id
          ? "border-red-500 border-[4px]"
          : "border-gray-300"
      }`}
    >
      <CardContent className="grid p-4 gap-2">
        <Label className="font-bold text-lg">Địa chỉ: {addressInfo?.streetAddress}</Label>
        <Label className="font-semibold">Phường/Xã: {addressInfo?.ward}</Label>
        <Label className="font-semibold">Quận/Huyện: {addressInfo?.district}</Label>
        <Label className="font-semibold">Tỉnh/Thành Phố: {addressInfo?.city}</Label>
        <Label className="font-semibold">SĐT: {addressInfo?.phone}</Label>
        <Label className="font-semibold">Loại địa chỉ: {addressInfo?.addressType}</Label>
        {addressInfo?.isDefault && <Label className="text-green-600 font-semibold">Mặc định</Label>}
      </CardContent>
      <CardFooter className="p-3 flex justify-between">
        <Button onClick={() => handleEditAddress(addressInfo)} className="bg-blue-500 hover:bg-blue-600">
          Chỉnh sửa
        </Button>
        <Button onClick={() => handleDeleteAddress(addressInfo)} className="bg-red-500 hover:bg-red-600">
          Xóa
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
