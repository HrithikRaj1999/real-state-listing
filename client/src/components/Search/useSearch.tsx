import { FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import api from "../../config/customApi";
import { toast } from "react-toastify";
import { useSearchData } from "../../context/SearchedData";

const useSearch = () => {
  const navigate = useNavigate();
  const { searchText, searchedLisitingData, setSearchedLisitingData } =
    useSearchData();
  const fetchListings = async (searchQueryParams: string = "") => {
    try {
      const { data } = await api.get(
        `listing/get-filtered-listings?${searchQueryParams}`,
      );
      navigate(`/search?${searchQueryParams}`);
      return data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleLoadMore = async (values: SearchValuesType) => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set("startIndex", searchedLisitingData?.length.toString());
      const searchQueryParams = urlParams.toString();
      const data = await fetchListings(searchQueryParams);
      navigate(`/search?${searchQueryParams}`);
      setSearchedLisitingData([...searchedLisitingData, ...data?.listings]);
      toast.success("Fetched");
    } catch (error: any) {
      toast.error(error?.response?.data.message || "No more results");
    }
  };

  const handleSubmit = async (
    values: SearchValuesType,
    formikHelpers: FormikHelpers<SearchValuesType>,
  ) => {
    try {
      formikHelpers.setSubmitting(true);
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set("searchText", searchText);
      urlParams.set("sortBy", values.sortBy);
      urlParams.set("type", values.type.join(","));
      urlParams.set("amenities", values.amenities.join(","));
      urlParams.set("roomType", values.roomType);
      const searchQueryParams = urlParams.toString();
      const data = await fetchListings(searchQueryParams);
      navigate(`/search?${searchQueryParams}`);
      if (data?.listings?.length) {
        setSearchedLisitingData([...data?.listings]);
      } else {
        setSearchedLisitingData([]);
      }
    } catch (error: any) {
      setSearchedLisitingData([]);
      toast.error(error?.response.data.message);
    } finally {
      formikHelpers.setSubmitting(false);
    }
  };
  const options = [
    { value: "", label: "Select" },
    { value: "specifications.regularPrice_desc", label: "Price high to low " },
    { value: "specifications.regularPrice_asc", label: "Price low to high" },
    { value: "createdAt_desc", label: "Latest" },
    { value: "createdAt_asc", label: "Oldest" },
  ];

  const initVal = {
    searchText: "",
    sortBy: "",
    type: [""],
    amenities: [""],
    roomType: "",
  };

  return { options, initVal, fetchListings, handleLoadMore, handleSubmit };
};

export default useSearch;
