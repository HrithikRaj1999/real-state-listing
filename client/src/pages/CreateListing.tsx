import ListingFacilities from "../components/Listing/ListingFacilities";
import ListingInformation from "../components/Listing/ListingInformation";
import ListingSpecifications from "../components/Listing/ListingSpecifications";
import ListingType from "../components/Listing/ListingType";
import useListing from "../hooks/Listing/useListing";
import { Formik, Form } from "formik";
import { inititalFormikData } from "../constants/labels";
import ViewSelectedImages from "../components/Listing/ViewSelectedImages";
import ListingImageProperty from "../components/Listing/ListingImageProperty";
import Spinner from "../components/Spinner";
import ListingRoomType from "../components/Listing/ListingRoomType";
const CreateListing = () => {
  const { validationSchema, handleImagesSubmit } = useListing();

  return (
    <Formik
      initialValues={inititalFormikData}
      validationSchema={validationSchema}
      onSubmit={async (values, formikHelpers) => {
        const { setFieldValue } = formikHelpers;
        formikHelpers.setSubmitting(true);
        handleImagesSubmit(values, setFieldValue);
        formikHelpers.setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => {
        return (
          <div className="container mx-auto  ">
            <h1 className="text-3xl font-bold text-center text-gray-800 my-8 ">
              Create Your Listing
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
                    {isSubmitting ? <Spinner /> : "Create Listing"}
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

export default CreateListing;
