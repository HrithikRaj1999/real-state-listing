import { useState } from "react";
import api from "../../config/customApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const useHomePage = () => {
  const [listings, setListings] = useState<itemType[] | null>([]);
  const [loading, setLoading] = useState(false);

  let offer: itemType[] | null = [];
  let regular: itemType[] | null = [];
  listings?.forEach((listing) => {
    if (listing.specifications.discountedPrice < 5000) offer?.push(listing);
    else regular?.push(listing);
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/listing/get-all-listings`);
      setListings([...data?.listings]);
      setLoading(false);
    } catch (error: any) {
      setLoading(true);
      toast.error(error?.response.data.message);
    }
  };
  const navigate = useNavigate();
  return {
    navigate,
    fetchData,
    loading,
    listings,
    offer,
    regular,
  };
};

export default useHomePage;
