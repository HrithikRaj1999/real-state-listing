import { Link } from "react-router-dom";

const OffersSection = (props: OffersSectionpropsType) => {
  const { offerListings } = props;
  // Filter listings with price less than Rs.500

  return (
    <section className="bg-gray-100 py-8">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-semibold text-gray-800">Special Offers</h2>
        <p className="text-gray-600">Properties with the best prices.</p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {offerListings?.map((offer, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
            >
              <Link to={`/show-listing/${offer?._id}`}>
                <div className="relative">
                  <img
                    src={offer.imageUrls[0]}
                    alt={`Offer Property ${index + 1}`}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-0 left-0 bg-green-500 text-white px-2 py-1 text-sm font-bold">
                    Offer
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white py-2 text-center text-lg font-semibold">
                    Rs.{offer.specifications.discountedPrice}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OffersSection;
