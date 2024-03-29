import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import { CookieProvider } from "./context/Cookie";
import About from "./pages/About";
import CreateListing from "./pages/CreateListing";
import Home from "./pages/Home";
import { Profile } from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ShowListings from "./pages/ShowListings";
import UpdateListing from "./components/Listing/UpdateListing";
import ShowSingleList from "./pages/ShowSingleList";
import Search from "./components/Search/Search";
import ContactUs from "./pages/ContactUs";
import { SearchedDataProvider } from "./context/SearchedData";

function App() {
  return (
    <CookieProvider>
      <SearchedDataProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/contactUs" element={<ContactUs />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/show-listing/:listId" element={<ShowSingleList />} />
          <Route path="/search" element={<Search />} />
          {/*These are Private Route Sign in or Login is Must */}

          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-listing" element={<CreateListing />} />
            <Route path="/show-listings" element={<ShowListings />} />
            <Route path="/update-listing/:listId" element={<UpdateListing />} />
          </Route>
        </Routes>
      </SearchedDataProvider>
    </CookieProvider>
  );
}

export default App;
