import React, { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../config/customApi";
import { CLIENT_MESSAGE } from "../constants/clientMessage";
import { RootState } from "../redux/store";
import {
  setKeepMeSignedIn,
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import { initialState, reducer } from "../util/signUpReducer";

const useSignIn = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const userDispatch = useDispatch(); //It allows you to send (or "dispatch") actions to your Redux store, which in turn triggers changes in your application's state.
  const { loading, error, keepMeSignedIn } = useSelector(
    (state: RootState) => state.userReducer,
  ); //useSelector in a Redux-based application is to access and manage the application's state stored in the Redux store ir. user Store
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    userDispatch(signInStart());
    const { email, password } = state;
    try {
      const res = await api.post(
        "auth/signin",
        {
          email,
          password,
          keepMeSignedIn,
        },
        { withCredentials: true },
      );
      sessionStorage.setItem("status", "user is active on same instance");
      userDispatch(signInSuccess(res.data.user));
      toast.success(CLIENT_MESSAGE.SUCCESS_SIGNIN, {
        toastId: CLIENT_MESSAGE.SUCCESS_SIGNIN,
      });
      navigate("/");
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ?? "Invalid Credentials";
      userDispatch(signInFailure(errorMessage));
      return toast.error(errorMessage, {
        toastId: errorMessage,
      });
    }
  };
  const handleKeepMeSignIn = (event: React.ChangeEvent<HTMLInputElement>) => {
    userDispatch(setKeepMeSignedIn(event.target.checked));
  };

  return {
    handleSubmit,
    state,
    reducer,
    dispatch,
    loading,
    error,
    handleKeepMeSignIn,
  };
};

export default useSignIn;
