import { createSlice } from "@reduxjs/toolkit";

const initialState: UserSliceType = {
  currentUser: null,
  error: null,
  loading: false,
  keepMeSignedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  //Reducers (read it return)  are functions that take the current state and an action as arguments, and return a new state result
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    setKeepMeSignedIn: (state, action) => {
      state.keepMeSignedIn = action.payload;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOutUserStart: (state) => {
      state.loading = true;
    },
    signOutUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
      state.keepMeSignedIn = false;
    },
    signOutUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setListing: (state, actions) => {
      if (state.currentUser !== null)
        state.currentUser.listings = actions.payload;
    },
    clearUserData: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
      state.keepMeSignedIn = false;
    },
    setLoading: (state, actions) => {
      state.loading = actions.payload;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
  setKeepMeSignedIn,
  clearUserData,
  setListing,
  setLoading,
} = userSlice.actions;
export default userSlice.reducer;
