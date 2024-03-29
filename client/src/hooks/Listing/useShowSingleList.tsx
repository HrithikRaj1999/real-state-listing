import { useState } from "react";
import api from "../../config/customApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setLoading } from "../../redux/user/userSlice";

import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

const useShowSingleList = () => {
  const { listId } = useParams();
  const [showContactModal, setShowContactModal] = useState(false);
  const [listing, setListing] = useState<ListingType | null>(null);
  SwiperCore.use([Navigation]);
  const [message, setMessage] = useState("");
  const { currentUser, loading } = useSelector(
    (state: RootState) => state.userReducer,
  );
  const handleEmailSend = async () => {
    try {
      const { data } = await api.get(
        `/user/get-user-details/${listing?.userRef}`,
        { withCredentials: true },
      );
      const email = data?.user?.email;
      const subject = `Regarding ${listing?.name}`;
      const body = encodeURIComponent(message); // Encode the message to handle special characters
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      setShowContactModal(false);
    } catch (error: any) {
      toast.error(error);
    }
  };
  const navigate = useNavigate();
  const userDispatch = useDispatch();
  const fetchListing = async () => {
    try {
      userDispatch(setLoading(true));
      const res = await api.get(`/listing/show-listing/${listId}`);
      setListing({ ...res.data.listing });
      userDispatch(setLoading(false));
    } catch (error: any) {
      toast.error(error);
      userDispatch(setLoading(false));
    }
  };
  return {
    navigate,
    userDispatch,
    fetchListing,
    handleEmailSend,
    message,
    setMessage,
    currentUser,
    loading,
    listing,
    listId,
    showContactModal,
    setShowContactModal,
  };
};

export default useShowSingleList;
