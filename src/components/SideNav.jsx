import { categories } from "../utils/constant";
import { Fragment, useContext } from "react";
import { YoutubeContext } from "../context/youtubeContext";

const SideNav = () => {
  const { selectedCategory, setSelectedCategory } = useContext(YoutubeContext);
  return (
    <nav className="flex flex-col  pt-4">
      {categories.map((item, index) => (
        <Fragment key={index}>
          <div
            onClick={() => setSelectedCategory(item.name)}
            className={`${
              selectedCategory === item.name && "bg-blue-600"
            } flex items-center gap-2 p-2 py-3 text-lg cursor-pointer rounded hover:bg-gray-800 `}
          >
            {item.icon}
            <span>{item.name}</span>
          </div>

          {item.divider && <hr />}
        </Fragment>
      ))}
    </nav>
  );
};

export default SideNav;
