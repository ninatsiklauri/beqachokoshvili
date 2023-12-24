import React, { useState } from "react";
import "styles/information.css";

interface InformationProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Information: React.FC<InformationProps> = ({
  modalOpen,
  setModalOpen,
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  return (
    <div className={`modal-overlay ${modalOpen ? "modal-open" : ""}`}>
      <div className="informationModal">
        <div>
          {imageSrc && <img src={imageSrc} alt="" className="informationImg" />}
          <h1>Information Modal</h1>
          <p>This is some information.</p>
        </div>
      </div>
    </div>
  );
};

export default Information;
