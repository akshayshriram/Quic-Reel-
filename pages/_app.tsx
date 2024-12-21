import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import { NextApiRequest, NextApiResponse } from "next";

import {
  GoogleOAuthProvider,
  GoogleLogin,
  googleLogout,
} from "@react-oauth/google";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Cors from "cors";

export function initMiddleware(middleware: any) {
  return (req: NextApiRequest, res: NextApiResponse) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result: any) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}

export const cors = initMiddleware(
  Cors({
    // Options
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    origin: [
      "https://quickreel.akshayshriram.in",
      "https://quic-reel.vercel.app",
    ],
    credentials: true,
  })
);
const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  return (
    <GoogleOAuthProvider
      clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}
    >
      <div className="xl:w-[1200px] m-auto overflow-hidden h-[100vh]">
        <Navbar />
        <div className="flex gap-6 md:gap-20">
          <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto xl:w-400">
            <Sidebar />
          </div>
          <div className="mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1">
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default MyApp;
