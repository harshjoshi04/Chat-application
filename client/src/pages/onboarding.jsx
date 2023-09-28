import Avatar from "@/components/common/Avatar";
import Input from "@/components/common/Input";
import { UseStateProvider } from "@/context/StateContext";
import { IMAGE_UPLOAD, ONBORD_USER_ROUTE } from "@/utils/ApiRoutes";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { reducerCases } from "@/context/constants";

function onboarding() {
  const router = useRouter();
  const [name, setname] = useState("");
  const [about, setabout] = useState("");
  const [email, setemail] = useState("");
  const [image, setImg] = useState("/avatar.png");
  const [FileImage, setFileImage] = useState();
  const [{ userinfo, newUser }, dispatch] = UseStateProvider();
  useEffect(() => {
    if (userinfo?.email) router.push("/");
  }, [newUser, userinfo, router]);
  const onborduserHandler = async () => {
    try {
      let img;
      if (FileImage != null) {
        const formData = new FormData();
        formData.append("image", FileImage);
        const {
          data: { image },
        } = await axios.post(IMAGE_UPLOAD, formData);
        img = image;
      }

      const { data } = await axios.post(ONBORD_USER_ROUTE, {
        email,
        name,
        about,
        image: img || image,
      });
      if (data) {
        dispatch({ type: reducerCases.SET_NEW_USER, newUser: false });
        dispatch({
          type: reducerCases.SET_USER_INFO,
          userinfo: {
            id: data?.data?._id,
            name,
            email,
            profileImage: img || image,
            status: about || "Avalibale",
          },
        });
        router.push("/");
      }
    } catch (er) {
      console.log(er);
    }
  };
  const SaveImageFromServer = async () => {
    if (FileImage != null) {
      console.log("Done");
      const formData = new FormData();
      formData.append("image", FileImage);
      const {
        data: { image },
      } = await axios.post(IMAGE_UPLOAD, formData);
      setImg(image);
    }
  };

  return (
    <>
      <div className="bg-panel-header-background h-screen w-screen text-white flex flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-2">
          <Image src={"/icon.png"} alt="GearChat" height={300} width={300} />
          <span className="text-7xl text-white">GearChat</span>
        </div>
        <h2 className="text-2xl">Create Your Profile</h2>
        <div className="flex gap-6 mt-6">
          <div className="flex flex-col items-center justify-center mt-5 gap-6">
            <Input name="Name" state={name} setState={setname} label />
            <Input name="About" state={about} setState={setabout} label />
            <Input name="Email" state={email} setState={setemail} label />
            <div className="flex items-center justify-center">
              <button
                className="flex justify-center bg-search-input-container-background gap-7 p-4 rounded-lg px-8"
                onClick={onborduserHandler}
              >
                Create Profile
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center m-16 pt-8 ">
            <Avatar
              type="xl"
              image={image}
              setImage={setImg}
              setFileImage={setFileImage}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default onboarding;
