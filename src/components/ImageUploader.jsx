import React, { useRef } from "react";

export default function ImageUploader({ onImageSelect, returnFile = false }) {
  const fileRef = useRef();

  const handleFile = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (returnFile) {
      // pass the raw File object (profile image use-case)
      onImageSelect(file);
      return;
    }

    // default: read as data URL and pass base64 (post creation)
    const reader = new FileReader();
    reader.onload = (ev) => {
      onImageSelect(ev.target.result); // data URL
    };
    reader.readAsDataURL(file);
  };

  return (
    <input
      ref={fileRef}
      type="file"
      accept="image/*"
      className="form-control form-control-sm file-input"
      onChange={handleFile}
    />
  );
}
