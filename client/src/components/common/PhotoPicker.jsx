import React from "react";
import ReactDOM from "react-dom";
function PhotoPicker({ setImg }) {
  const Component = (
    <input
      type="file"
      className="z-40"
      hidden
      id="photo-picker"
      onChange={setImg}
    />
  );
  return ReactDOM.createPortal(
    Component,
    document.getElementById("photo-picker-element")
  );
}

export default PhotoPicker;
