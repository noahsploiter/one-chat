import React from "react";
import Logo from "../public/images/onechat.png";
import GoogleLogo from "../public/images/google-logo.png";
import Image from "next/future/image";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

const Login = () => {
  const login = async () => {
    await signInWithPopup(auth, provider);
  };
  return (
    <div className="w-full h-screen overflow-hidden bg-[#fff] flex justify-center items-center flex-col space-y-10">
      <div className="items-center space-x-4 ">
        <Image
          src={Logo}
          width={100}
          height={100}
          priority={true}
          quality={100}
          alt=""
        />
        <h1 className="text-5xl font-bold">
          <span className="text-black">One</span>{" "}
          <span className="text-[#3a75ece8]">Chat</span>
        </h1>
      </div>
      <div className="shadow-lg rounded-sm">
        <button
          className="flex items-center text-3xl bg-white text-black px-5 py-2 rounded-md hover:bg-[#e2e2e2] transition-colors font-semibold space-x-3"
          onClick={login}
        >
          <Image
            src={GoogleLogo}
            width={40}
            height={40}
            priority={true}
            quality={100}
            alt=""
          />
        </button>
      </div>
    </div>
  );
};

export default Login;
