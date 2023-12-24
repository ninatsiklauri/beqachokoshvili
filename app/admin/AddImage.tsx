import React, { useCallback } from "react";
import axios from "axios";
import { CldUploadWidget } from "next-cloudinary";

interface AddImageProps {
  onImageSelect: (imageUrl: string) => void;
}

declare global {
  var cloudinary: any;
}

const AddImage: React.FC<AddImageProps> = ({ onImageSelect }) => {
  const handleChange = async (url: string) => {
    const body = await axios.post(
      "https://www.beqachokoshvili.com/api/photos",
      { url }
    );

    if (body.status === 200) {
      window.location.reload();
    }
  };

  const handleUpload = useCallback((result: any) => {
    handleChange(result.info.secure_url);
  }, []);

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="wap373zh"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div onClick={() => open?.()}>
            <button>ატვირთვა</button>
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default AddImage;
