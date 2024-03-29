import { Eye } from "react-feather";
import { Link } from "react-router-dom";
const FeatureSection = (props: FeatureSectionProps) => {
  const { regularListings } = props;
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-10">
        Featured Listings
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Single Listing Card */}
        {regularListings?.map((item, index) => (
          <div key={index} className="rounded-lg overflow-hidden shadow-lg">
            <Link to={`/show-listing/${item._id}`}>
              <div className="relative group">
                <img
                  src={item.imageUrls[0]}
                  alt={`Property ${index + 1}`}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center group-hover:bg-opacity-50 group-hover:opacity-100 transition duration-300 ease-in-out">
                  <Eye
                    color="white"
                    size={40}
                    className="opacity-0 group-hover:opacity-100"
                  />
                </div>
              </div>
            </Link>
            <div className="p-4">
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p className="text-gray-600">{item.address}</p>
              <div className="mt-4 ">
                <span className="inline-block line-through mx-3 bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                  Rs.{item.specifications.regularPrice}
                </span>
                <span className="inline-block bg-green-200 mx-3 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                  Rs.{item.specifications.discountedPrice}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;
