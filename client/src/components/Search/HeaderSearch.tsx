import { FaSearch } from "react-icons/fa";
import useHeaderSearch from "../../hooks/useHeaderSearch";

const HeaderSearch = () => {
  const { setSearchText, handleSearch } = useHeaderSearch();

  return (
    <div className="bg-slate-100 p-1 sm:p-2 mx-2 sm:mx-4 rounded-lg flex ">
      <form>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearchText(e.target.value)}
          className="bg-transparent focus:outline-none w-12 sm:w-40"
        />
        <button type="submit">
          <FaSearch className="text-black" onClick={handleSearch} />
        </button>
      </form>
    </div>
  );
};

export default HeaderSearch;
