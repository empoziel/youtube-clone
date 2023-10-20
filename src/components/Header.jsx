import { useState } from "react";
import { FaBell } from "react-icons/fa";
import { LuSearch } from "react-icons/Lu";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  return (
    <header className="flex justify-between items-center p-2 sticky">
      <Link to={"/"}>
        <div className="flex items-center">
          <img
            className="w-[100px]"
            src="https://static.vecteezy.com/system/resources/previews/018/930/572/non_2x/youtube-logo-youtube-icon-transparent-free-png.png"
          />
          <h1 className="text-white text-2xl">Youtube</h1>
        </div>
      </Link>
      <form className="flex items-center bg-white rounded">
        <input
          type="text"
          className="px-4 py-1 rounded text-black outline-none"
          onChange={(e) => setQuery(e.target.value)}
        />
        <Link to={`/results?search_query=${query}`} className="mr-2">
          <LuSearch className="text-black" />
        </Link>
      </form>
      <FaBell className="mr-4" />
    </header>
  );
};

export default Header;
