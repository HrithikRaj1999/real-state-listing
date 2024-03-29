import { Home } from "react-feather";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LABELS } from "../constants/labels";
import { RootState } from "../redux/store";

import HeaderSearch from "./Search/HeaderSearch";

const Header = () => {
  const { currentUser } = useSelector((state: RootState) => state.userReducer);
  return (
    <header className="bg-zinc-800 shadow-lg">
      <div className="flex justify-center  items-center p-4">
        <ul className="flex gap-1 sm:gap-5 text-sm sm:text-lg font-medium  items-center">
          <li>
            <h1 className="font-normal sm:font-bold text-sm sm:text-2xl flex items-center ">
              <span className="text-slate-100 flex items-center gap-2  ">
                <Home color="Green" size={30} />
                Property
              </span>
              <span className="text-blue-500">Hub</span>
            </h1>
          </li>
          <li>
            <HeaderSearch />
          </li>
          <Link to="/">
            <li className="text-slate-100 hover:underline hover:font-bold">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className=" text-slate-100 hover:underline hover:font-bold">
              About
            </li>
          </Link>
          {currentUser ? (
            <Link to="/profile">
              <li className="inline text-slate-100 hover:underline hover:font-bold">
                <img
                  alt="profile"
                  title="profile-pic"
                  src={currentUser.avatar}
                  className="rounded-full text-slate-100 h-10 w-10 object-cover"
                />
              </li>
            </Link>
          ) : (
            <Link to="/signin">
              <li className="text-slate-100 hover:underline hover:font-bold">
                {LABELS.SIGN_IN}
              </li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
