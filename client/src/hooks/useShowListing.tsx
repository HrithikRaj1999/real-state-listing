import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import api from "../config/customApi";
import { toast } from "react-toastify";
import { setListing } from "../redux/user/userSlice";
const useShowListing = () => {
  const fetchListings = async () => {
    try {
      const res = await api.get(`user/listings/${currentUser?._id}`, {
        withCredentials: true,
      });
      userDispatch(setListing([...res.data.listings]));
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Server Error");
    }
  };
  const { currentUser } = useSelector((state: RootState) => state.userReducer);
  const userDispatch = useDispatch();
  const handleDeleteListing = async (id: string) => {
    try {
      const res = await api.delete(
        `listing/delete-listing/${currentUser?._id}/${id}`,
        {
          withCredentials: true,
        },
      );
      const deletedListingList =
        currentUser?.listings !== undefined
          ? currentUser?.listings.filter((list) => list._id !== id)
          : [];
      userDispatch(setListing(JSON.parse(JSON.stringify(deletedListingList))));
      toast.success(res.data.message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  return {
    handleDeleteListing,
    fetchListings,
    currentUser,
  };
};

export default useShowListing;
