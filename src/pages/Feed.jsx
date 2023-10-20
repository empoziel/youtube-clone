import { useContext } from "react";
import SideNav from "../components/SideNav";
import { YoutubeContext } from "../context/youtubeContext";
import VideoCard from "../components/VideoCard";

const Feed = () => {
  const { searchResult } = useContext(YoutubeContext);
  return (
    <div className="flex">
      <SideNav />
      <div className="videos">
        {!searchResult ? (
          <p>Loading...</p>
        ) : (
          searchResult.map((video, i) => {
            if (video.type !== "video") return;
            return <VideoCard key={i} videoInfo={video} />;
          })
        )}
      </div>
    </div>
  );
};

export default Feed;
