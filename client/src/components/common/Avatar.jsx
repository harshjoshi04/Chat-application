import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import ContextMenu from "./ContextMenu";
import PhotoPicker from "./PhotoPicker";
import PhotoLibrary from "./PhotoLibrary";

function Avatar({ type, image, setImage, setFileImage }) {
  const [hover, setHover] = useState(false);
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const [ContextMenuCodinate, setContextMenuCodinate] = useState({
    x: 0,
    y: 0,
  });
  const [FetchPhoto, setFetchPhoto] = useState(false);
  const [Library, setLibrary] = useState(false);
  const ContextMenuOption = [
    {
      name: "Choose Photo ",
      callback: () => {
        setLibrary(true);
      },
    },
    {
      name: "Upload Photo",
      callback: () => {
        setFetchPhoto(true);
      },
    },
    {
      name: "Remove Photo",
      callback: () => {
        setImage("/avatar.png");
      },
    },
  ];
  const ShowContextMenu = (e) => {
    e.preventDefault();
    setIsContextMenuVisible(true);
    setContextMenuCodinate({ x: e.pageX, y: e.pageY });
  };

  const PhotoPickerChnage = async (e) => {
    let file = e.target.files[0];
    setFileImage(file);
    setImage(URL.createObjectURL(file));
  };

  useEffect(() => {
    if (FetchPhoto) {
      let data = document.getElementById("photo-picker");
      data.click();
      document.body.focus = (e) => {
        setFetchPhoto(false);
      };
    }
  }, [FetchPhoto]);

  const convertImage = (img) => {
    let demo = img?.split("\\");
    if (demo?.includes("uploads")) return `http://localhost:8000/${img}`;
    return img;
  };
  return (
    <>
      <div className="flex items-center justify-center">
        {type === "mess" && (
          <div className="relative h-8 w-8">
            <img
              src={convertImage(image)}
              alt="avatar"
              className="rounded-full w-full h-full"
            />
          </div>
        )}
        {type === "sm" && (
          <div className="relative h-10 w-10">
            <img
              src={convertImage(image)}
              alt="avatar"
              className="rounded-full w-full h-full"
            />
          </div>
        )}
        {type === "lg" && (
          <div className="relative h-14 w-14">
            <img
              src={convertImage(image)}
              alt="avatar"
              className="h-14 rounded-full"
              width={500}
              height={500}
            />
          </div>
        )}
        {type === "xl" && (
          <div
            className="relative cursor-pointer z-0"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <div
              className={`z-10 bg-photopicker-overlay-background h-48 w-48 absolute top-0 left-0 flex items-center rounded-full justify-center flex-col text-center gap-2
              ${hover ? "visible" : "hidden"}
            `}
              onClick={ShowContextMenu}
              id="context-opener"
            >
              <FaCamera
                className="text-2xl"
                id="context-opener"
                onClick={ShowContextMenu}
              />
              <span onClick={ShowContextMenu} id="context-opener">
                Change Photo
              </span>
            </div>
            <div className=" h-48 w-48 ">
              <img
                src={image}
                alt="avatar"
                className="rounded-full h-full w-full"
              />
            </div>
          </div>
        )}
      </div>
      {isContextMenuVisible && (
        <ContextMenu
          option={ContextMenuOption}
          cordinates={ContextMenuCodinate}
          contextMenu={isContextMenuVisible}
          setContextMenu={setIsContextMenuVisible}
          setFileImage={setFileImage}
        />
      )}
      {Library && (
        <PhotoLibrary
          setPhoto={setImage}
          hidePhotoLibrary={setLibrary}
          setFileImage={setFileImage}
        />
      )}

      {FetchPhoto && <PhotoPicker setImg={PhotoPickerChnage} />}
    </>
  );
}

export default Avatar;
