import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../config/customApi";
import React from "react";
import { useSearchData } from "../context/SearchedData";

const useHeaderSearch = () => {
  const { searchText, setSearchText, setSearchedLisitingData } =
    useSearchData();
  const fetchData = async (searchQueryParams: string) => {
    try {
      const { data } = await api.get(
        `listing/get-searched-item?${searchQueryParams}`,
      );
      setSearchedLisitingData([...data?.listings]);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  };

  const navigate = useNavigate();
  const handleSearch = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchText", searchText);
    const searchQueryParams = urlParams.toString();
    fetchData(searchQueryParams);
    navigate(`/search?${searchQueryParams}`);
  };

  return { setSearchText, handleSearch, fetchData };
};

export default useHeaderSearch;
