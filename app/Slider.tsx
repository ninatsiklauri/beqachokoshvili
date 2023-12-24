import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface LightboxProps {
  images: ImageType[];
  selectedImageIndex: number;
  onClose: () => void;
}

interface ImageType {
  path: string;
}

const Lightbox: React.FC<LightboxProps> = ({
  images,
  selectedImageIndex,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(selectedImageIndex);
  const [isSliderOpen, setIsSliderOpen] = useState(false);

  useEffect(() => {
    setCurrentIndex(selectedImageIndex);
    setIsSliderOpen(true);
  }, [selectedImageIndex]);

  const handleClose = () => {
    setIsSliderOpen(false);
    onClose();
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isSliderOpen) {
        setIsSliderOpen(false);
        onClose();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSliderOpen, onClose]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="lightbox">
      <div className="lightbox-content">
        <span className="lightbox-close" onClick={handleClose}>
          &times;
        </span>
        <div className="lightbox-image">
          <Carousel
            selectedItem={currentIndex}
            showThumbs={false}
            showStatus={false}
            dynamicHeight={false}
            infiniteLoop={true}
            emulateTouch
          >
            {images.map((image, index) => (
              <div key={index}>
                <img src={image.path} alt={`Image ${index}`} />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="lightbox-navigation">
          <button
            className="arrow left-arrow"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            {/* <FontAwesomeIcon icon={faChevronLeft} /> */}
          </button>
          <button
            className="arrow right-arrow"
            onClick={handleNext}
            disabled={currentIndex === images.length - 1}
          >
            {/* <FontAwesomeIcon icon={faChevronRight} /> */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Lightbox;
