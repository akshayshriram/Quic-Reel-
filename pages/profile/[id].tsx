import React, { useState, useEffect} from 'react'
import Image from 'next/image'
import { GoVerified } from 'react-icons/go'
import axios from 'axios'

import VideoCard from '@/components/VideoCard'
import { NoResult } from '@/components/NoResult'
import { IUser, Video} from '@/types'
import { BASE_URL } from '@/utils'

interface IProps{
  data:{
    user: IUser,
    userVideos: Video[],
    userLikedVideos: Video[]
  }
}

const Profile = ({ data } : IProps) => {

  const { user, userVideos, userLikedVideos } = data;

  const [showUserVideos, setshowUserVideos] = useState(true);

  const [videoList, setvideoList] = useState<Video[]>([])

  useEffect(() => {
    if(showUserVideos){
      setvideoList(userVideos)
    }else{
      setvideoList(userLikedVideos);
    }
  }, [showUserVideos, userLikedVideos, userVideos])
  

  const videos = showUserVideos ? 'border-b-2 border-black' : 'text-gray-400';
  const liked =  !showUserVideos ? 'border-b-2 border-black' : 'text-gray-400';

  return (
    <div>
      <div className='w-full'>
        <div className="flex gap-6 md:gap-10 mb-4 bg-white w-full">
        <div className='w-16 h-16 md:w-16 md:h-16'>
                <Image
                  width={34}
                  height={34}
                  className='rounded-full'
                  src={user.image}
                  alt='user-profile'
                  layout='responsive'
                />
              </div>

              <div className='flex flex-col justify-center'>
                <p className='md:text-2xl tracking-wider justify-center flex gap-1 items-center text-md font-bold text-primary lowercase'>
                  {user.userName.replace(/\s+/g, '')}{' '}
                  <GoVerified className='text-blue-400' />
                </p>
                <p className='capitalize text-gray-400 text-xl'>
                  {user.userName}
                </p>
              </div>
        </div>
        <div>
          <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full" >
            <p className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`} onClick={()=>{setshowUserVideos(true)}}>Videos</p>
            <p className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`} onClick={()=>{setshowUserVideos(false)}}>Liked</p>
          </div>

          <div className="flex gap-6 flex-wrap md:justify-start">
            {videoList.length > 0 ? (
              videoList.map((post: Video, idx: number)=>(
                <VideoCard post={post} key={idx} />
              )) 
              ) : <NoResult text={`No ${showUserVideos ? ''
              : 'Liked'} Videos Yet...`}  />
            }
          </div>

        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({ params:{
  id}
}: {
  params: {id: String}
}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`)  

  return {
    props: {data: res.data}
  }
  
}

export default Profile