import { Field, useFormikContext } from "formik";

const ListingType = () => {
  const { values, handleChange } = useFormikContext<itemType>();
  return (
    <div className=" flex shadow  p-2 flex-wrap justify-start gap-2">
      <div className="flex gap-2 ">
        <Field
          name="type"
          type="radio"
          value="sell"
          placeholder="sell"
          className="w-5"
          onChange={handleChange}
          checked={values.type === "sell"}
        />
        <span>Sell House</span>
      </div>
      <div className="flex gap-2">
        <Field
          name="type"
          type="radio"
          value="rent"
          placeholder="rent"
          className="w-5"
          onChange={handleChange}
          checked={values.type !== "sell"}
        />
        <span>Rent House</span>
      </div>
    </div>
  );
};

export default ListingType;
