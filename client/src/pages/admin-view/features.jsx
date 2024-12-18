import ProductImageUpLoad from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeatureImage, getFeatureImages } from "/store/common/common-slice";

function AdminFeatures() {
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const dispatch = useDispatch();
    const { featureImageList } = useSelector((state) => state.commonFeature);


    function handleUploadFeatureImage() {
        dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
          if (data?.payload?.success) {
            dispatch(getFeatureImages());
            setImageFile(null);
            setUploadedImageUrl("");
          }
        });
      }
      useEffect(() => {
        dispatch(getFeatureImages()).then((response) => {
            console.log("Feature Image List Response:", response);
        });
    }, [dispatch]);
    

  return (
    <div>
      <ProductImageUpLoad
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
      />
        <Button onClick={handleUploadFeatureImage} className="mt-5 w-full btn mb-10">
        Upload
      </Button>
      <div className="flex flex-col gap-4 mt-5">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((featureImgItem) => (
              <div className="relative">
                <img
                  src={featureImgItem.image}
                  className="w-full h-[300px] object-cover rounded-t-lg"
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default AdminFeatures;
