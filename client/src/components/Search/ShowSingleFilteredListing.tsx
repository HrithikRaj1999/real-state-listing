import { Eye } from "react-feather";
import { FaHome, FaInfoCircle, FaRoute } from "react-icons/fa";
import { Link } from "react-router-dom";

const ShowSingleFilteredListing = (props: propTypes) => {
  const { item } = props;
  return (
    <div
      key={item._id}
      className="flex flex-col bg-white  shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out rounded-xl"
    >
      {/* Image and overlay */}
      <Link to={`/show-listing/${item._id}`}>
        <div className="relative">
          <img
            className="w-full h-48 object-cover"
            src={typeof item.imageUrls[0] === "string" ? item.imageUrls[0] : ""}
            alt={item.name}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 opacity-0 transition-opacity duration-300 hover:bg-opacity-50 hover:opacity-100">
            <Eye color={"white"} size={40} />
          </div>
        </div>
      </Link>
      {/* Content */}
      <div className="flex flex-col flex-grow p-4">
        <h4 className="text-xl font-semibold text-gray-800 truncate">
          {item.name}
        </h4>
        <p
          className="flex-1 text-sm text-gray-600 mt-2 overflow-hidden"
          style={{
            maxHeight: "2.5rem",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            display: "-webkit-box",
          }}
        >
          <FaInfoCircle className="inline mr-2" size={16} />
          {item.description}
        </p>
        <div className="mt-auto">
          <p className="text-sm text-gray-600 truncate">
            <FaRoute className="inline mr-2" />
            {item.address}
          </p>
          <p className="text-sm text-gray-600 truncate">
            <FaHome className="inline mr-2" />
            {item.roomType.toUpperCase()}
          </p>
        </div>
      </div>
      {/* Price section */}
      <div className="px-4 py-3 bg-gray-100">
        <span className="text-sm font-medium text-gray-600 line-through">
          ₹{item.specifications.regularPrice.toFixed(2)}
        </span>
        <span className="text-lg font-semibold text-green-600">
          ₹{item.specifications.discountedPrice.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default ShowSingleFilteredListing;
