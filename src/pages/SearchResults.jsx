import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { options } from "../utils/constant";
import SideNav from "../components/SideNav";
import VideoCard from "../components/VideoCard";
import loading from "../assets/loading.gif";

const SearchResults = () => {
  const [videos, setVideos] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("search_query");

  useEffect(() => {
    setVideos(null);
    axios
      .get(
        `https://youtube138.p.rapidapi.com/search/?q=${query}
    `,
        options
      )
      .then((res) => setVideos(res.data.contents));
  }, [query]);

  return (
    <div className="flex">
      <SideNav />
      <div className="flex justify-center p-5 w-full">
        {!videos && (
          <img
            className="mx-auto mt-[200px] w-[100px] h-[100px]"
            src={loading}
          />
        )}
        <div className="flex flex-col items-center gap-20  max-w-[500px]">
          {videos?.map((content, index) => {
            if (content.type !== "video") return;
            return <VideoCard key={index} videoInfo={content} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
