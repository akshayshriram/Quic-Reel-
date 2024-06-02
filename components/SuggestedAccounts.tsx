// passing the fetchAllUsers function to the SuggestedAccounts component, especially since the function is only used in the useEffect hook in the parent component (Sidebar.tsx). Typically, you only need to pass down props that will be used within the child component directly. If fetchAllUsers is only needed to trigger the fetching of users when the component mounts, it can be managed within the parent component, and only the data (allUsers) needs to be passed down.

// Here’s a refined approach:

// 1. Trigger the Fetch in the Parent Component: Use fetchAllUsers in the parent component to fetch data when the component mounts.
// 2. Pass Only the Necessary Data to the Child Component: Pass allUsers as a prop to the SuggestedAccounts component, since it’s the only data needed in the child component.

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import { NextPage } from 'next';
import { IUser } from '@/types';

interface IProps {
  allUsers: IUser[];
}

const SuggestedAccounts: NextPage<IProps> = ({ allUsers }) => {
  if (!Array.isArray(allUsers)) {
    console.error('allUsers is not an array', allUsers); // Log the value for debugging
    return null; // Or some fallback UI
  }

  const users = allUsers
    .sort(() => 0.5 - Math.random())
    .slice(0, allUsers.length);

  return (
    <div className='xl:border-b-2 border-gray-200 pb-4'>
      <p className='text-gray-500 font-semibold m-3 mt-4 hidden xl:block'>
        Suggested accounts
      </p>
      <div>
        {users.slice(0, 6).map((user: IUser) => (
          <Link href={`/profile/${user._id}`} key={user._id}>
            <div className='flex gap-3 md:justify-start justify-center hover:bg-primary p-2 cursor-pointer font-semibold rounded'>
              <div className='w-8 h-8'>
                <Image
                  width={34}
                  height={34}
                  className='rounded-full'
                  src={user.image}
                  alt='user-profile'
                  layout='responsive'
                />
              </div>

              <div className='hidden xl:block'>
                <p className='flex gap-1 items-center text-md font-bold text-primary lowercase'>
                  {user.userName.replace(/\s+/g, '')}{' '}
                  <GoVerified className='text-blue-400' />
                </p>
                <p className='capitalize text-gray-400 text-xs'>
                  {user.userName}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SuggestedAccounts;
