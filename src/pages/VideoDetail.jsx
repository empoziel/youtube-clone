import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { options } from "../utils/constant";
import axios from "axios";
import ReactPlayer from "react-player";
import loading from "../assets/loading.gif";
import { AiFillLike } from "react-icons/ai";
import { IoIosShareAlt } from "react-icons/Io";
import millify from "millify";
import VideoCard from "../components/VideoCard";
import StringArea from "../components/StringArea";

const VideoDetail = () => {
  const params = useParams();
  const [details, setDetails] = useState(null);
  const [relatedContent, setRelatedContent] = useState(null);

  useEffect(() => {
    setDetails(null);
    setRelatedContent(null);
    axios
      .get(
        `https://youtube138.p.rapidapi.com/video/details/?id=${params.videoId}`,
        options
      )
      .then((res) => setDetails(res.data));

    axios
      .get(
        `https://youtube138.p.rapidapi.com/video/related-contents/?id=${params.videoId}`,
        options
      )
      .then((res) => setRelatedContent(res.data.contents));
  }, [params.videoId]);
  // ! bağımlılık olarak use paramstan gelen videonun id sini ekledik . alakalı videolardan birine tıklanırsa datası geliyor.

  return (
    <div>
      {!details && <img className="m-auto mt-[200px]" src={loading} />}

      {details && (
        <div className="flex flex-col lg:flex-row lg:justify-between justify-center gap-5 sm:p-5 p-11 ">
          <div className="flex flex-col items-center lg:max-w-[800px]">
            <ReactPlayer
              width={"100%"}
              url={`https://www.youtube.com/watch?v=${details.videoId}`}
              controls
              playing={true}
            />
            <div className="flex flex-col gap-5 mt-5">
              <h2>{details?.title}</h2>
              <div className="flex justify-between ">
                <div className="flex gap-4 items-center">
                  <img
                    className="w-[48px] h-[48px] rounded-full"
                    src={details?.author?.avatar[0]?.url}
                  />
                  <div>
                    <p>{details.author.title}</p>
                    <p>{details.author.stats.subscribersText}</p>
                  </div>
                  <button className="bg-white text-black rounded-lg p-1">
                    Subscribe
                  </button>
                </div>
                <div className="flex gap-5">
                  <div className="flex items-center gap-3 bg-gray-800 rounded p-3 curser-pointer hover:bg-gray-700">
                    <AiFillLike />
                    <span>{millify(details.stats.likes)}</span>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-800 rounded p-3 curser-pointer hover:bg-gray-700">
                    <IoIosShareAlt />
                    <span>Share</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-600 rounded mt-3 p-4">
                <p className="flex gap-5 mb-3">
                  <span>{millify(details.stats.views)} watched</span>
                  <span>{details.publishedDate} published date</span>
                </p>
                <StringArea text={details.description} max={200} />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 lg:max-w-[300px] related">
            {!relatedContent && <p>Loading...</p>}
            {relatedContent &&
              relatedContent.map((video, i) => {
                if (video.type !== "video") return;
                return <VideoCard key={i} videoInfo={video} />;
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoDetail;
