import React, { useState, useContext, createContext } from "react";
const SearchContext = createContext<SearchContextType>({} as SearchContextType);

export const SearchedDataProvider: React.FC<SearchProviderProps> = ({
  children,
}) => {
  const data = localStorage.getItem("formik values") || "";
  const initVal = data ? JSON.parse(data).filteredListings : [];
  const [searchedLisitingData, setSearchedLisitingData] = useState<itemType[]>([
    ...initVal,
  ]);
  const [searchText, setSearchText] = useState("");
  return (
    <SearchContext.Provider
      value={{
        searchedLisitingData,
        setSearchedLisitingData,
        searchText,
        setSearchText,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
export const useSearchData = () => useContext(SearchContext);
