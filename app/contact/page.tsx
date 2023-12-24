"use client";

import React, { useRef, useState } from "react";
import "styles/contact.css";
import "styles/home.css";
import Information from "Information";
import { sendEmail } from "actions/sendEmail";
import Link from "next/link";

const Contact = () => {
  const [statusMessage] = useState("");
  const [emailSentSuccessfully] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [_, setOpenModal] = useState(false);
  const navRef = useRef(null);
  const [openInformationModal, setOpenInformationModal] = useState(false);
  const [showLoader] = useState(false);

  const handleOpenInformation = () => {
    setOpenModal(false);
    setOpenInformationModal(true);
    setNavOpen(false);
  };
  return (
    <div>
      <header>
        <div ref={navRef} className="container">
          <nav id="navigation">
            <ul className={`nav-link ${navOpen ? "active" : ""}`}>
              <li>
                <Link href="/" className="link-item">
                  OVERVIEW
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="link-item"
                  onClick={handleOpenInformation}
                >
                  INFORMATION
                </a>
              </li>
              <li>
                <Link href="/contact" className="link-item">
                  CONTACT
                </Link>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/beqachokoshvili/"
                  className="link-item"
                  target="blank"
                >
                  INSTAGRAM
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/555008949/"
                  className="link-item"
                  target="blank"
                >
                  WHATSAPP
                </a>
              </li>
            </ul>
            <div
              className={`burger ${navOpen ? "open" : ""}`}
              onClick={() => setNavOpen(!navOpen)}
            >
              <div className="line1"></div>
              <div className="line2"></div>
              <div className="line3"></div>
            </div>
          </nav>
          <h1>
            <a href="/">BEQA CHOKOSHVILI</a>
          </h1>
        </div>
      </header>
      <main>
        <div className="contact-container">
          <div>
            <form
              action={async (formData) => {
                await sendEmail(formData);
              }}
            >
              <input
                className="input"
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                required
              />

              <input
                className="input"
                type="text"
                id="subject"
                name="subject"
                placeholder="Subject"
                required
              />

              <input
                className="input"
                type="email"
                name="senderEmail"
                placeholder="Enter your email"
                required
              />

              <textarea
                name="message"
                rows={4}
                cols={20}
                placeholder="Enter a message"
                required
              ></textarea>

              <button
                className={`send-btn ${emailSentSuccessfully ? "sent" : ""}`}
                type="submit"
                style={{
                  backgroundColor: emailSentSuccessfully ? "green" : "",
                }}
              >
                {emailSentSuccessfully ? (
                  <>
                    Sent
                    {/* <FontAwesomeIcon icon={faCheck} /> */}
                  </>
                ) : (
                  "Send"
                )}
              </button>
              {showLoader && (
                <div className="loader-container">
                  <div className="loader"></div>
                </div>
              )}
              {statusMessage && (
                <p
                  className={`status-message ${
                    statusMessage.includes("Failed")
                      ? "error-message"
                      : "success-message"
                  }`}
                >
                  {statusMessage}
                </p>
              )}
              {openInformationModal && (
                <Information
                  modalOpen={openInformationModal}
                  setModalOpen={setOpenInformationModal}
                />
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
