import React, { useState } from "react";
import axios from "axios";

interface EditImageProps {
  imageId: string;
  imageUrl: string;
  onUpdate: () => void;
  onClose: () => void;
}

const EditImage: React.FC<EditImageProps> = ({
  imageId,
  imageUrl,
  onUpdate,
  onClose,
}) => {
  const [newImageFile, setNewImageFile] = useState<File | null>(null);

  const handleSave = async () => {
    try {
      const formData = new FormData();
      if (newImageFile) {
        formData.append("image", newImageFile);
      }
      formData.append("newImageUrl", imageUrl);

      const response = await axios.put(
        `http://localhost:8000/images/${imageId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        onUpdate();
        onClose();
      }
    } catch (error) {
      console.error("Error updating image:", error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2> Edit Image</h2>{" "}
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setNewImageFile(e.target.files ? e.target.files[0] : null)
          }
        />{" "}
        <button onClick={handleSave}> Save</button>{" "}
        <button onClick={onClose}> Cancel</button>
      </div>
    </div>
  );
};

export default EditImage;
