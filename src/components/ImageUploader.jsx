import React, { useRef } from "react";

export default function ImageUploader({ onImageSelect }) {
  const fileRef = useRef();

  const handleFile = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      onImageSelect(ev.target.result); // data URL
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="form-control form-control-sm file-input"
        onChange={handleFile}
      />
    </>
  );
}
