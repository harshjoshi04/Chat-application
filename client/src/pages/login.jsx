import Image from "next/image";

import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";

import axios from "axios";
import { CHEACK_USER_ROUTE, LOGIN_USER } from "@/utils/ApiRoutes";
import { useRouter } from "next/router";
import { UseStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import Link from "next/link";
import Input from "@/components/common/Input";

function login() {
  const [email, setemail] = useState("");
  const route = useRouter();
  const [{ userinfo, newUser }, dispatch] = UseStateProvider();
  useEffect(() => {
    if (userinfo?.id) route.push("/");
  }, [userinfo, newUser]);
  const HandleLogin = async () => {
    try {
      const { data } = await axios.post(LOGIN_USER, { email });

      dispatch({ type: reducerCases.SET_NEW_USER, newUser: false });
      dispatch({
        type: reducerCases.SET_USER_INFO,
        userinfo: { ...data },
      });
      route.push("/");
    } catch (er) {
      if (er) {
        alert("User Not Found");
      }
    }
  };
  return (
    <>
      <div className="flex justify-center items-center bg-panel-header-background h-screen w-screen flex-col gap-6">
        <div className="flex items-center justify-center gap-2 text-white">
          <Image
            src={"/icon.png"}
            alt="GearChat"
            height={300}
            width={300}
            id=""
          />
          <span className="text-7xl">GearChat</span>
        </div>
        <div className="flex gap-6 mt-6">
          <div className="flex flex-col items-center justify-center mt-5 gap-6">
            <Input name="Email" state={email} setState={setemail} label />
          </div>
        </div>{" "}
        <button
          onClick={HandleLogin}
          className="flex items-center  justify-center gap-7 bg-search-input-container-background p-2 rounded-lg px-4"
        >
          <span className="text-white text-md ">Login</span>
        </button>
        <Link href={"/onboarding"} className="text-white">
          Sign Up
        </Link>
      </div>
    </>
  );
}

export default login;
