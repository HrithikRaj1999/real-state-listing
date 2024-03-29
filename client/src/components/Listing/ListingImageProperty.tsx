import { Field, useFormikContext } from "formik";
import React from "react";
import { LABELS } from "../../constants/labels";
import { toast } from "react-toastify";

const ListingImageProperty = () => {
  const { setFieldValue } = useFormikContext<PictureUploadListingDataType>();
  return (
    <>
      <span className="font-semibold text-black">
        {LABELS.IMAGE}
        {LABELS.LISTING_IMG_UPLOAD_WARNING}
      </span>
      <div className="flex flex-row w-full p-2gap-2 mt-3">
        <Field
          type="file"
          name="images"
          accept="image/*"
          placeholder="images"
          unselectable="off"
          multiple
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length < 7)
              setFieldValue("imageUrls", e.target.files);
            else toast.error("6 images at Allowed");
          }}
          className="p-3 text-sm  border rounded-lg w-full"
        />
      </div>
    </>
  );
};

export default ListingImageProperty;
