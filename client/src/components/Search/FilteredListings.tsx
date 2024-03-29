import { FaHome, FaRoute } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Eye } from "react-feather";
import { useSearchData } from "../../context/SearchedData";

const FilteredListings = () => {
  const { searchedLisitingData } = useSearchData();
  return searchedLisitingData.length > 0 ? (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {searchedLisitingData?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
          {/* Map over your items here */}
          {searchedLisitingData?.map((item) =>
            item?._id ? (
              <div
                key={item._id}
                className="flex flex-col max-w-full sm:w-[300px] bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out overflow-hidden"
              >
                {/* Image and overlay */}
                <Link to={`/show-listing/${item?._id}`} className="group">
                  <div className="relative overflow-hidden">
                    <img
                      className="w-full h-48 object-cover transform group-hover:scale-105 transition duration-300 ease-in-out"
                      src={
                        item?.imageUrls &&
                        typeof item?.imageUrls[0] === "string"
                          ? item?.imageUrls[0]
                          : "https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcTwGTmgN4WclFT5_MqG2LWj9nSsaabJ_hdFIxxBFf_SPblOvYwmOQdGu6cSOEmULMLm595LQ_FahMEgDtjqqDU"
                      }
                      alt={item.name}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                      <Eye className="text-white" size={40} />
                    </div>
                  </div>
                </Link>
                {/* Content */}
                <div className="flex-grow p-4">
                  <h4 className="text-lg font-semibold text-gray-800 truncate">
                    {item.name}
                  </h4>
                  <p className="text-gray-600 mt-2 line-clamp-3">
                    {item.description}
                  </p>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 truncate">
                      <FaRoute className="inline mr-1" />
                      {item?.address}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      <FaHome className="inline mr-1" />
                      {item?.roomType?.toUpperCase()}
                    </p>
                  </div>
                </div>
                {/* Price section */}
                <div className="px-4 py-3 bg-gray-100 flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500 line-through">
                    ₹{item?.specifications?.regularPrice?.toFixed(2)}
                  </span>
                  <span className="text-lg font-semibold text-green-600">
                    ₹{item?.specifications?.discountedPrice?.toFixed(2)}
                  </span>
                </div>
              </div>
            ) : null,
          )}
        </div>
      ) : (
        <h1 className="text-2xl text-center text-gray-800">No Listing Found</h1>
      )}
    </div>
  ) : null;
};

export default FilteredListings;
