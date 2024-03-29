import ShowSingleFilteredListing from "./ShowSingleFilteredListing";

const SearchedItem = (props: propType) => {
  const { searchedData } = props;

  // Render each item here
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 rounded-lg gap-4">
      {/* Map over your items here */}
      {searchedData?.map((item, index) => (
        <ShowSingleFilteredListing key={index} item={item} />
      ))}
    </div>
  );
};

export default SearchedItem;
