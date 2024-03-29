import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../config/customApi";

import { CLIENT_MESSAGE } from "../constants/clientMessage";
import { app } from "../firebase/firebase";
import { signInSuccess } from "../redux/user/userSlice";

export const useGoogleAuth = () => {
  const navigate = useNavigate();
  const userDispatch = useDispatch();
  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const res = await signInWithPopup(auth, provider);
      const backendRes = await api.post("/auth/google", {
        name: res.user.displayName,
        email: res.user.email,
        photoUrl: res.user.photoURL,
      });
      userDispatch(signInSuccess(backendRes.data.user));
      toast.success(CLIENT_MESSAGE.SUCCESS_SIGNIN);
      navigate("/");
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || error);
    }
  };
  return {
    handleGoogleAuth,
  };
};
