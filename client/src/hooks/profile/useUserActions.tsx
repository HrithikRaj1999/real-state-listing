import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import api from "../../config/customApi";
import { CLIENT_MESSAGE } from "../../constants/clientMessage";
import { RootState } from "../../redux/store";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../../redux/user/userSlice";

const useUserActions = (
  formData: FormDataType | null,
  setFormData: React.Dispatch<React.SetStateAction<FormDataType | null>>,
) => {
  const { currentUser } = useSelector((state: RootState) => state.userReducer);
  const userDispatch = useDispatch();
  const handleUpdateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      userDispatch(updateUserStart());
      const res = await api.put(`user/update/${currentUser?._id}`, formData, {
        withCredentials: true,
      });
      toast.success(CLIENT_MESSAGE.SUCCESS_UPDATE);
      userDispatch(updateUserSuccess(res.data.user));
    } catch (error: any) {
      userDispatch(updateUserFailure(error.response.data.message));
      toast.error(error.response.data.message);
    }
  };
  const handleSignOut = async () => {
    try {
      userDispatch(signOutUserStart());
      const res = await api.get(`auth/signout/${currentUser?._id}`, {
        withCredentials: true,
      });
      userDispatch(signOutUserSuccess(res.data.message));
      toast.success(res.data.message);
    } catch (error: any) {
      userDispatch(signOutUserFailure(error.response.data.message));
      toast.error(error.response.data.message);
    }
  };

  const handleUserDelete = async () => {
    try {
      userDispatch(deleteUserStart());
      const res = await api.delete(`/user/delete/${currentUser?._id}`, {
        withCredentials: true,
      });

      toast.success(res.data.message);
      userDispatch(deleteUserSuccess());
    } catch (error: any) {
      userDispatch(deleteUserFailure(error.response.data.message));
      toast.error(error.response.data.message);
    }
  };

  return { currentUser, handleSignOut, handleUserDelete, handleUpdateSubmit };
};

export default useUserActions;
