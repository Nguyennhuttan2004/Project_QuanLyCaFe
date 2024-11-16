// client/src/components/shopping-view/address-card.jsx
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
      <CardContent className="grid p-4 gap-4">
        <Label className="font-bold text-lg">Address: {addressInfo?.address}</Label>
        <Label className="font-semibold">City: {addressInfo?.city}</Label>
        <Label className="font-semibold">Pincode: {addressInfo?.pincode}</Label>
        <Label className="font-semibold">Phone: {addressInfo?.phone}</Label>
        <Label className="font-semibold">Notes: {addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className="p-3 flex justify-between">
        <Button onClick={() => handleEditAddress(addressInfo)} className="bg-blue-500 hover:bg-blue-600">Edit</Button>
        <Button onClick={() => handleDeleteAddress(addressInfo)} className="bg-red-500 hover:bg-red-600">Delete</Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;