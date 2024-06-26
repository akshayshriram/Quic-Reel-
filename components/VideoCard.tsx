import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

import Link from "next/link";
import { Video } from "@/types";
import { NextPage } from "next";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import defaultImage from '../utils/favicon.ico';

interface IProps {
  post: Video;
}


const VideoCard: NextPage<IProps> = ({ post }) => {

  
  const [isHover,setIsHover] = useState(false);

  const [playing,setPlaying] = useState(false);

  const [isVideoMuted, setIsVideoMuted] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  // this videoRef is going to attach HTMLVideoElement which  has pause and play properties

  const onVideoPress = () => {
    if(playing){
      videoRef?.current?.pause(); //? is used to do not crash the application if it doesn't work
      setPlaying(false);
    }else{
      videoRef?.current?.play();
      setPlaying(true);
    }
  }

  const onMutePress = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsVideoMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6">
      <div>
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
          <div className="md:w-16 md:h-16 w-10 h-10">
            <Link href={`/profile/${post.postedBy._id}`}>
              <>
                
                  <Image
                    width={62}
                    height={62}
                    className="rounded-circle"
                    src={post.postedBy.image || defaultImage}
                    // src={defaultImage}
                    alt="Profile Photo"
                    layout="responsive"
                  />
                
              </>
            </Link>
          </div>
          <div>
            <Link href={`/profile/${post.postedBy._id}`}>
              <div className="flex items-center gap-2">
                <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                  {post.postedBy.userName} {` `}
                  <GoVerified className="text-blue-400 text-md"></GoVerified>
                </p>
                <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">{post.postedBy.userName}</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="lg:ml-20 flex gap-4 relative">
        <div onMouseEnter={()=>{setIsHover(true)}} onMouseLeave={()=>{setIsHover(false)}} className="rounded-3xl">
          <Link href={`/detail/${post._id}`}>
            <video 
            loop 
            ref={videoRef}
            src={post.video.asset.url} 
            className="lg:w-[600px] lg:h=[530px] w-[200px] h-[300px] md:h-[400px] rounded-2xl cursor-pointer bg-gray-100" ></video>
          </Link>
          {isHover &&(
            <div className="absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between 
            w-[100px] md:w-[50px] p-3">
              {playing ? (
                <button onClick={onVideoPress}>
                  <BsFillPauseFill className="text-black text-2xl lg:text-4xl"></BsFillPauseFill>
                </button>
              ) : (
                <button onClick={onVideoPress}>
                  <BsFillPlayFill className="text-black text-2xl lg:text-4xl"></BsFillPlayFill>
                </button>
              )}
              {isVideoMuted ? (
                <button onClick={onMutePress}>
                  <HiVolumeOff className="text-black text-2xl lg:text-4xl"></HiVolumeOff>
                </button>
              ) : (
                <button onClick={onMutePress}>
                  <HiVolumeUp className="text-black text-2xl lg:text-4xl"></HiVolumeUp>
                </button>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default VideoCard;
