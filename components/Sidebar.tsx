import React, { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { GoogleOAuthProvider,useGoogleLogin, GoogleLogin, googleLogout } from '@react-oauth/google';

import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import Discover from "./Discover";
import SuggestedAccounts from "./SuggestedAccounts";
import Footer from "./Footer";

const Sidebar = () => {
  const [showSidebar, setshowSidebar] = useState(true);

  const userPorfile = false;

  const normalLink =
    "flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-ponter font-semibold text-[#F51997] rounded";

  return (
    <>
      <div
        className="block xl-hidden m-2 ml-4 mt-3 text-xl cursor-pointer"
        onClick={() => setshowSidebar((prev) => !prev)}
      >
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSidebar && (
        <>
          <div className="xl:w-400 w-20 flex-col justify-start mb-10 border-r-2 border-gray-200 xl:border-0 p-3"></div>
          <div className="xl:border-b-2 border-gray-200 pb-4">
            <Link href="/">
              <div className={normalLink}>
                <p className="text-2xl">
                  <AiFillHome />
                </p>
                <span className="text-xl hidden xl:block">For You</span>
              </div>
            </Link>
          </div>
          <Discover />
          <SuggestedAccounts />
          <Footer />
        </>
      )}
    </>
  );
};

export default Sidebar;
