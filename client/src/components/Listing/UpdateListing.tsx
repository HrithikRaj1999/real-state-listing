import { Form, Formik, FormikValues } from "formik";
import { LABELS } from "../../constants/labels";
import { validationSchema } from "../../hooks/Listing/useListing";
import useUpdateListing from "../../hooks/Listing/useUpdateListing";
import Spinner from "../Spinner";
import ListingFacilities from "./ListingFacilities";
import ListingImageProperty from "./ListingImageProperty";
import ListingInformation from "./ListingInformation";
import ListingRoomType from "./ListingRoomType";
import ListingSpecifications from "./ListingSpecifications";
import ListingType from "./ListingType";
import ViewSelectedImages from "./ViewSelectedImages";

const UpdateListing = () => {
  const { initialFormikData, handleUpdate } = useUpdateListing();
  return (
    <Formik
      initialValues={initialFormikData as FormikValues}
      validationSchema={validationSchema}
      onSubmit={async (values, formikHelpers) => {
        const { setFieldValue } = formikHelpers;
        formikHelpers.setSubmitting(true);
        await handleUpdate(
          values as PictureUploadListingDataType,
          setFieldValue,
        );
        formikHelpers.setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => {
        return (
          <div className="container mx-auto  ">
            <h1 className="text-3xl font-bold text-center text-gray-800 my-8 ">
              {LABELS.UPDATE_LISTING_HEADING}
            </h1>
            <div className="overflow-hidden sm:rounded-lg ">
              <Form className="p-3 gap-4 bg-white space-y-4 space-x-10 sm:p-3  flex flex-col sm:flex-row justify-center">
                <div className="flex flex-col gap-4">
                  <ListingType />
                  <ListingInformation />
                  <ListingFacilities />
                  <ListingRoomType />
                  <ListingSpecifications />
                </div>
                <div className="flex flex-col gap-5 p-2 items-center">
                  <ListingImageProperty />
                  <ViewSelectedImages />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className=" w-full px-4 border border-transparent shadow-sm text-lg font-medium rounded-md text-white p-3 hover:bg-blue-600 bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
                  >
                    {isSubmitting ? <Spinner /> : LABELS.UPDATE}
                  </button>
                </div>
              </Form>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default UpdateListing;
