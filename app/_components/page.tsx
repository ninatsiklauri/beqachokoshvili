'use client'

import React, { useEffect, useRef, useState } from 'react'
import '../styles/home.css'
import Link from 'next/link'
import Masonry from 'react-masonry-css'
import Lightbox from 'Slider'
import Information from 'Information'

interface Image {
  path: string
}

const breakpointColumnsObj = {
  default: 4,
  900: 2,
}

export default function OverView({ data }: any) {
  const [navOpen, setNavOpen] = useState(false)
  const navRef = useRef<HTMLDivElement | null>(null)
  const [openModal, setOpenModal] = useState(false)
  const [openInformationModal, setOpenInformationModal] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (openModal) {
      document.body.classList.add('body-no-scroll')
    } else {
      document.body.classList.remove('body-no-scroll')
    }

    return () => {
      document.body.classList.remove('body-no-scroll')
    }
  }, [openModal])

  const handleClickOutside = (event: MouseEvent) => {
    if (navRef.current && !(navRef.current as any).contains(event.target)) {
      setNavOpen(false)
    }
  }

  const handleOpenInformation = () => {
    setOpenModal(false)
    setOpenInformationModal(true)
    setNavOpen(false)
  }

  const handleImageClick = (index: number) => {
    console.log(index)
    setSelectedImageIndex(index)
    setLightboxOpen(true)
  }

  return (
    <div className="page-container">
      <header>
        <div ref={navRef} className="container">
          <nav id="navigation">
            <ul className={`nav-link ${navOpen ? 'active' : ''}`}>
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
                  href="https://wa.me/593221313/"
                  className="link-item"
                  target="blank"
                >
                  WHATSAPP
                </a>
              </li>
            </ul>
            <div
              className={`burger ${navOpen ? 'open' : ''}`}
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
        <div className="photo-gallery-container">
          <div className="image-container">
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="photo-gallery"
              columnClassName="photo-gallery-column"
            >
              {data.map((image: any, index: any) => (
                <div className="photo" key={index}>
                  <img
                    src={image.path}
                    className="images"
                    onClick={() => handleImageClick(index)}
                    alt={`Image ${index}`}
                  />
                </div>
              ))}
            </Masonry>
          </div>
        </div>
      </main>

      {lightboxOpen && (
        <Lightbox
          images={data}
          selectedImageIndex={selectedImageIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      {openInformationModal && (
        <Information
          modalOpen={openInformationModal}
          setModalOpen={setOpenInformationModal}
        />
      )}

      <footer className="footer-container">
        <div className="footer">
          <p> &copy; 2023 Website developed by NINO TSIKLAURI</p>
        </div>
      </footer>
    </div>
  )
}
