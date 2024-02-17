"use client";

import React, { useState, useEffect, useCallback } from "react";
import "../styles/dashboard.css";
import AddImage from "./AddImage";
import axios from "axios";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";

interface Image {
  id: string;
  path: string;
}

function App(): JSX.Element {
  const [selectedImages, setSelectedImages] = useState<Image[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalImages = selectedImages.length;
  const totalPages = Math.ceil(totalImages / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const imagesToDisplay = selectedImages.slice(startIndex, endIndex);

  useEffect(() => {
    const storedCurrentPage = localStorage.getItem("currentPage");
    setCurrentPage(storedCurrentPage ? JSON.parse(storedCurrentPage) : 1);
    fetchImages();
  }, []);

  useEffect(() => {
    localStorage.setItem("currentPage", JSON.stringify(currentPage));
  }, [currentPage]);

  const router = useRouter();

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        "https://www.beqachokoshvili.com/api/photos"
      );

      setSelectedImages(response.data.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleImageSelect = async (imageUrl: string): Promise<void> => {
    try {
      const response = await axios.post("http://localhost:8000/images/", {
        image: imageUrl,
      });

      if (response.status === 201) {
        const newImage = {
          id: response.data.id,
          url: imageUrl,
        };

        // setSelectedImages((prevImages) => [...prevImages, newImage]);
      }
    } catch (error) {
      console.error("Error adding image:", error);
    }
  };

  const handleImageDelete = async (imageId: string): Promise<void> => {
    try {
      const response = await axios.delete(
        `https://www.beqachokoshvili.com/api/photos`,
        {
          data: {
            id: imageId,
          },
        }
      );

      if (response.status === 200) {
        setSelectedImages((prevImages) =>
          prevImages.filter((image) => image.id !== imageId)
        );
        if (imagesToDisplay.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      } else {
        console.error("Error deleting image. Server response:", response);
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleChange = async (url: string, id: string) => {
    const body = await axios.put("https://www.beqachokoshvili.com/api/photos", {
      id,
      url,
    });

    if (body.status === 200) {
      window.location.reload();
    }
  };

  const handleUpload = useCallback((result: any, id: string) => {
    handleChange(result.info.secure_url, id);
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    router.push("/signin");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) return;

    router.push("/signin");
  }, []);

  return (
    <div className="App">
      <div className="dashboard">
        <h3 className="admin"> admin panel</h3>
        <p className="products">
          <a href="/dashboard">images</a>
        </p>
        <p className="products">
          <a href="/about">about</a>
        </p>
      </div>
      <div className="table-wrapper">
        <button className="log-out" onClick={handleLogOut}>
          {" "}
          log out
        </button>
        <br />
        <AddImage onImageSelect={handleImageSelect} />
        <br />
        <table className="fl-table">
          <thead>
            <tr>
              <th>Numeric</th>
              <th>IMAGE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {imagesToDisplay.map((image, i) => {
              i++;
              return (
                <tr key={i}>
                  <td>{i}</td>
                  <td>
                    <img src={image.path} alt="" />
                  </td>
                  <td className="changes">
                    <button
                      onClick={() => handleImageDelete(image.id)}
                      className="delete-button"
                    >
                      {" "}
                      Delete Item
                    </button>

                    <CldUploadWidget
                      onUpload={(e) => handleUpload(e, image.id)}
                      uploadPreset="wap373zh"
                      options={{
                        maxFiles: 1,
                      }}
                    >
                      {({ open }) => {
                        return (
                          <button
                            onClick={() => open?.()}
                            className="edit-button"
                          >
                            Edit Item
                          </button>
                        );
                      }}
                    </CldUploadWidget>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="pagination-container">
          <div className="pagination">
            {" "}
            {Array.from(
              {
                length: totalPages,
              },
              (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={currentPage === index + 1 ? "active" : ""}
                >
                  {" "}
                  {index + 1}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
