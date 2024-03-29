import { useFormikContext } from "formik";
import useListing from "../../hooks/Listing/useListing";

const ViewSelectedImages = () => {
  const { values, setFieldValue } =
    useFormikContext<PictureUploadListingDataType>();
  const { updatedPictureList } = useListing();

  return (
    <>
      <div className="flex flex-col sm:flex-wrap gap-2">
        {values?.imageUrls &&
          Array.from(values?.imageUrls).map((file, index) => {
            const imgUrl =
              typeof file === "string" ? file : URL.createObjectURL(file); // for update we are sendinging direct Url but for create we are storing FileList so this might cause error
            return (
              <div
                key={index}
                className="relative group flex gap-1 w-[15rem] sm:w-[15rem] h-[10rem] sm:h-[15rem] border-black rounded-lg"
              >
                <img
                  key={index}
                  src={imgUrl}
                  alt={`img-${index}`}
                  className="  rounded-lg"
                />
                <div
                  className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100"
                  onClick={() =>
                    setFieldValue("imageUrls", [
                      ...updatedPictureList(index, values),
                    ])
                  }
                >
                  <span key={index} className="text-white text-2xl">
                    X
                  </span>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ViewSelectedImages;
