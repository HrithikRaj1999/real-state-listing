import { Field, Form, Formik, FormikHelpers } from "formik";
import useSearch from "./useSearch";
import { LABELS } from "../../constants/labels";
import FilteredListings from "./FilteredListings";
import Spinner from "../Spinner";
import { useSearchData } from "../../context/SearchedData";

const Search = () => {
  const { options, initVal, handleLoadMore, handleSubmit } = useSearch();
  const { searchedLisitingData } = useSearchData();
  return (
    <Formik
      initialValues={{ ...initVal }}
      enableReinitialize // this tells Formik to reset the form when initialValues change
      onSubmit={async (
        values,
        formikHelpers: FormikHelpers<SearchValuesType>,
      ) => await handleSubmit(values, formikHelpers)}
    >
      {({ values, isSubmitting }) => {
        return (
          <div className="flex flex-col sm:flex-col md:flex-row ">
            <div className="min-w-[375px] max-w-full sm:h-[calc(100vh-76px)] sm:max-w-sm border-b-4 sm:border-r-4 md:border-r-4 ">
              <Form className=" px-7 ">
                {/*Sort */}
                <div className="flex items-center gap-5 border-b-2  py-2 ">
                  <label className="whitespace-nowrap font-bold">
                    Sort Listings:
                  </label>
                  <Field
                    as="select"
                    id="sort_order"
                    name="sortBy"
                    className="rounded-md p-3 w-full"
                  >
                    {options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field>
                </div>
                {/* Types of offer and rent and sale*/}
                <div className="flex  my-3 gap-5 border-b-2">
                  <label className="font-bold">Type:</label>
                  <div className="flex flex-wrap gap-5">
                    <div className="flex items-center gap-3">
                      <Field name="type" type="checkbox" value="rent" />
                      <label>Rent </label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Field name="type" type="checkbox" value="sale" />
                      <label>sale </label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Field name="type" type="checkbox" value="offer" />
                      <label>Offers </label>
                    </div>
                  </div>
                </div>
                {/*Room Types furnished unfurnished*/}
                <div className="flex flex-col my-4 gap-5 border-b-2">
                  <label className="font-bold">Room Type: </label>
                  <div className="flex flex-wrap gap-5">
                    <div className="flex items-center gap-3">
                      <Field name="roomType" type="radio" value="furnished" />
                      <label>Furnished</label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Field
                        name="roomType"
                        type="radio"
                        value="semi-furnished"
                      />
                      <label>Semi-Furnished</label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Field
                        name="roomType"
                        type="radio"
                        value="un-furnished"
                      />
                      <label>Un-Furnished</label>
                    </div>
                  </div>
                </div>
                {/*Benefits facilities with room and flat*/}
                <div className="flex flex-col my-4 gap-5 border-b-2">
                  <label className="font-bold">Amenities: </label>
                  <div className="flex flex-wrap gap-5">
                    <div className="flex items-center gap-3">
                      <Field
                        type="checkbox"
                        name="amenities"
                        value={LABELS.PARKING}
                      />
                      {LABELS.PARKING}
                    </div>
                    <div className="flex items-center gap-3">
                      <Field
                        type="checkbox"
                        name="amenities"
                        value={LABELS.POOL}
                      />
                      {LABELS.POOL}
                    </div>
                    <div className="flex items-center gap-3">
                      <Field
                        type="checkbox"
                        name="amenities"
                        value={LABELS.SECURITY}
                      />
                      {LABELS.SECURITY}
                    </div>
                    <div className="flex items-center gap-3">
                      <Field
                        type="checkbox"
                        name="amenities"
                        value={LABELS.POWER_BACKUP}
                      />
                      {LABELS.POWER_BACKUP}
                    </div>
                    <div className="flex items-center gap-3">
                      <Field
                        type="checkbox"
                        name="amenities"
                        value={LABELS.WATER_SUPPLY}
                      />
                      {LABELS.WATER_SUPPLY}
                    </div>
                    <div className="flex items-center gap-3">
                      <Field
                        type="checkbox"
                        name="amenities"
                        value={LABELS.ELEVATORS}
                      />
                      {LABELS.ELEVATORS}
                    </div>
                    <div className="flex items-center gap-3">
                      <Field
                        type="checkbox"
                        name="amenities"
                        value={LABELS.GYM}
                      />
                      {LABELS.GYM}
                    </div>
                    <div className="flex items-center gap-3">
                      <Field
                        type="checkbox"
                        name="amenities"
                        value={LABELS.PLAYGROUND}
                      />
                      {LABELS.PLAYGROUND}
                    </div>
                    <div className="flex items-center gap-3">
                      <Field
                        type="checkbox"
                        name="amenities"
                        value={LABELS.COMMUNITY_HALL}
                      />
                      {LABELS.COMMUNITY_HALL}
                    </div>
                    <div className="flex items-center gap-3">
                      <Field
                        type="checkbox"
                        name="amenities"
                        value={LABELS.GARDENS}
                      />
                      {LABELS.GARDENS}
                    </div>
                    <div className="flex items-center gap-3">
                      <Field
                        type="checkbox"
                        name="amenities"
                        value={LABELS.CAR_PARKING}
                      />
                      {LABELS.CAR_PARKING}
                    </div>
                    <div className="flex items-center gap-3">
                      <Field
                        type="checkbox"
                        name="amenities"
                        value={LABELS.WASTE_DISPOSAL}
                      />
                      {LABELS.WASTE_DISPOSAL}
                    </div>
                    <div className="flex items-center gap-3">
                      <Field
                        type="checkbox"
                        name="amenities"
                        value={LABELS.FIRE_SAFETY}
                      />
                      {LABELS.FIRE_SAFETY}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center border-b-2">
                  <button
                    type="submit"
                    className="p-2  bg-slate-700 w-full hover:shadow-2xl text-white rounded"
                  >
                    {isSubmitting ? (
                      <Spinner width={15} height={15} />
                    ) : (
                      "Search"
                    )}
                  </button>{" "}
                </div>
              </Form>
            </div>

            {isSubmitting ? (
              <div className="flex justify-center items-center h-sreen w-full ">
                <Spinner width={30} height={30} />
              </div>
            ) : searchedLisitingData.length ? (
              <div className="flex flex-col">
                <div className="flex m-6 flex-wrap justify-center sm:justify-center gap-6 sm:w-full  ">
                  <FilteredListings />
                </div>
                <div className=" flex justify-center my-4">
                  <button
                    className="p-2 bg-blue-500 text-white rounded text-whiter w-fit hover:shadow-2xl "
                    type="button"
                    onClick={() => handleLoadMore(values)}
                  >
                    Show more
                  </button>
                </div>
              </div>
            ) : (
              <h1>No more Items</h1>
            )}
          </div>
        );
      }}
    </Formik>
  );
};

export default Search;
