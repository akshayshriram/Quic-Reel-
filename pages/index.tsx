
import { Inter } from "next/font/google";
import axios from 'axios';
import { Video } from "@/types";
import { NoResult } from "@/components/NoResult";
import VideoCard from "@/components/VideoCard";

interface Iprops{
  videos: Video[]
}

export const getServerSideProps = async () => {

  const response = await axios.get('http://localhost:3000/api/post');

  const data =response.data
  return {
    props:{
      videos: data
    }
  }
}


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

