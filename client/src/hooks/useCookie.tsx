// Import necessary hooks and components from React and Redux
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../config/customApi"; // Importing the custom API configuration
import { RootState } from "../redux/store"; // Importing the RootState type for useSelector hook
import { clearUserData } from "../redux/user/userSlice"; // Importing the action creator to clear user data from Redux store

// Define the CheckCookie component
const useCookie = () => {
  // Using the useSelector hook to extract currentUser and keepMeSignedIn from the Redux store
  const { currentUser, keepMeSignedIn } = useSelector(
    (state: RootState) => state.userReducer,
  );

  // Using the useDispatch hook to get the dispatch function from the Redux store
  const userDispatch = useDispatch();

  const navigate = useNavigate();
  // Define a function to check if the cookie exists
  const checkCookieExists = async () => {
    try {
      // Try to make an API call to check if the cookie exists
      // if cookies exists that means user is in same browser instance. so do nothing
      // if there is no cookies that means user has logged out or reopen the browser
      const res = await api.get("/checkCookie", {
        withCredentials: true, // withCredentials is set to true to send cookies with the request
      });
      // If the API call is successful and the cookie exists its valid user and still on the same instance of browser
      if (res.data.success) {
      }
    } catch (error) {
      // If an error occurs while making the API call that means cookie is not there
      // so check user has opted for keepMeSign In
      if (keepMeSignedIn) {
        // If the user has opted to stay signed in
        try {
          // Try to get token
          // token will be only present if the user had not logged out, as upon log out/sign out token will be deleted from mongo db document and redux persist will set
          // local storage data to null
          await api.get(`auth/getToken/${currentUser?._id}`, {
            withCredentials: true,
          });
          // If the no error is there that means  token exits that means user must have closed the browser or manually deleted the cookie from the browser
          // After checking token is refreshed successfully, update the session storage and render the Outlet component
          sessionStorage.setItem("status", "user is cookies refreshed");
        } catch (error) {
          // If an error occurs while refreshing the token, clear the user data from the Redux store and redirect to sign-in page
          userDispatch(clearUserData());
          navigate("/signin");
        }
      } else {
        // If the user has not opted to stay signed in, clear the user data from the Redux store and redirect to sign-in page
        userDispatch(clearUserData());
        navigate("/signin");
      }
    }
  };

  // Render the component based on the current state
  return {
    checkCookieExists,
  };
};

// Export the CheckCookie component for use in other files
export default useCookie;
