import { useFormikContext } from "formik";
import Creatable from "react-select/creatable";
import useListing from "../../hooks/Listing/useListing";
import { facilityOptions } from "../../constants/labels";

const ListingFacilities = () => {
  const { setFieldValue, initialValues } =
    useFormikContext<MongoListingDataType>();

  const { handleChangeOfSelect } = useListing();
  // Define the options for the react-select component
  const defaultDisplayData = initialValues?.facilities?.map((item: string) => {
    return { label: item, value: item };
  });
  const availableOptions = facilityOptions.filter((item) =>
    initialValues?.facilities
      ? !initialValues?.facilities.includes(item.value)
      : [],
  );

  return (
    <div className="shadow-lg p-4 rounded-xl flex gap-1  mb-3 text-black text-[0.8rem] sm:text-md flex-col">
      <label className="font-bold text-sm sm:text-lg">Facilities</label>
      <Creatable
        isMulti
        name="facilities"
        options={availableOptions}
        defaultValue={defaultDisplayData}
        onChange={(e) => handleChangeOfSelect(e, setFieldValue)}
        className="flex-1 text-sm sm:text-[1rem]"
      />
    </div>
  );
};

export default ListingFacilities;
