
import { Inter } from "next/font/google";
import axios from 'axios';
import { Video } from "@/types";
import { NoResult } from "@/components/NoResult";
import VideoCard from "@/components/VideoCard";
import { BASE_URL } from "@/utils";

interface Iprops{
  videos: Video[]
}

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let response = await axios.get(`${BASE_URL}/api/post`);

  if(topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  }
  
  return {
    props: { videos: response.data },
  };
};


export default function Home({videos}: Iprops) {
  // console.log(videos);
  return (
    <>
    <div className="flex flex-col gap-10 videos h-full">
      {videos.length ? 
      (videos.map((video: Video)=>(
        <VideoCard post={video} key={video._id} />
      ))):(
        <NoResult text={"No Videos"}/>
      )}
    </div>
    </>
  );
}

