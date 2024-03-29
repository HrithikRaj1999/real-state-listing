import { ErrorMessage, Field, useFormikContext } from "formik";
import { LABELS } from "../../constants/labels";

const ListingSpecifications = () => {
  const { values, handleChange } =
    useFormikContext<PictureUploadListingDataType>();
  return (
    <div className="rounded-lg p-4 bg-white shadow">
      <label className="font-bold text-lg sm:text-xl mb-3 block">
        {LABELS.SPECIFICATIONS}
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex flex-col items-center gap-2">
          <Field
            placeholder="1"
            type="number"
            name="specifications.bedrooms"
            required
            className="rounded-md border border-gray-300 p-2 text-gray-700 w-full"
            onChange={handleChange}
          />
          <span className="whitespace-nowrap">{LABELS.BEDROOMS}</span>
          <ErrorMessage
            name="specifications.bedrooms"
            className="text-red-600"
            component="div"
          />
        </div>

        <div className="flex  flex-col items-center gap-2">
          <Field
            placeholder="1"
            type="number"
            name="specifications.bathroom"
            required
            className="rounded-md border border-gray-300 p-2 text-gray-700 w-full"
            onChange={handleChange}
          />
          <span className="whitespace-nowrap">{LABELS.BATHROOMS}</span>
          <ErrorMessage
            name="specifications.bathroom"
            className="text-red-600"
            component="div"
          />
        </div>

        <div className="flex  flex-col items-center gap-2">
          <Field
            placeholder="1"
            type="number"
            name="specifications.hall"
            required
            className="rounded-md border border-gray-300 p-2 text-gray-700 w-full"
            onChange={handleChange}
          />
          <span className="whitespace-nowrap">{LABELS.HALL}</span>
          <ErrorMessage
            name="specifications.hall"
            className="text-red-600"
            component="div"
          />
        </div>

        <div className="flex  flex-col items-center gap-2">
          <Field
            placeholder="1"
            type="number"
            name="specifications.regularPrice"
            required
            className="rounded-md border border-gray-300 p-2 text-gray-700 w-full"
            onChange={handleChange}
          />
          <div className="flex flex-col">
            <span className="whitespace-nowrap">{LABELS.REGULAR_PRICE}</span>
            {values.type === "rent" ? (
              <span className="text-xs">{LABELS.REGULAR_PRICE_SUB}</span>
            ) : null}
          </div>
          <ErrorMessage
            name="specifications.regularPrice"
            className="text-red-600"
            component="div"
          />
        </div>

        <div className="flex  flex-col items-center gap-2">
          <Field
            placeholder="1"
            type="number"
            name="specifications.discountedPrice"
            required
            className="rounded-md border border-gray-300 p-2 text-gray-700 w-full"
            onChange={handleChange}
          />
          <div className="flex flex-col">
            <span className="whitespace-nowrap">{LABELS.DISCOUNT_PRICE}</span>
            {values.type === "rent" ? (
              <span className="text-xs">{LABELS.DISCOUNT_PRICE_SUB}</span>
            ) : null}
          </div>
          <ErrorMessage
            name="specifications.discountedPrice"
            className="text-red-600"
            component="div"
          />
        </div>
      </div>
    </div>
  );
};

export default ListingSpecifications;
