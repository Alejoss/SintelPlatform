import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Thumbs,
  FreeMode,
  Controller,
} from "swiper/modules";
import axios from "../axiosConfig";

import { useLayoutEffect, useRef, useState, useEffect } from "react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/thumbs";

export default function Tab2() {
  const [thumbsSwiper, setThumbsSwiper] = useState();
  const [firstSwiper, setFirstSwiper] = useState();
  const [secondSwiper, setSecondSwiper] = useState();
  const swiper1Ref = useRef(null);
  const swiper2Ref = useRef();
  const [galleryImages, setGalleryImages] = useState([]);

  useLayoutEffect(() => {
    if (swiper1Ref.current !== null) {
      swiper1Ref.current.controller.control = swiper2Ref.current;
    }
  }, []);

  useEffect(() => {
    // Fetch gallery images from the API
    axios.get("/project_media/") // Replace with the actual endpoint
      .then(response => {
        console.log("IMAGES RESPONSE:")
        console.log(response.data)
        setGalleryImages(response.data.filter(media => media.file_type === "image"));
      })
      .catch(error => {
        console.error("Failed to fetch gallery images:", error);
      });
  }, []);

  return (
    <div className="bg-gray-800">
      <div className="bg-gray-800 text-stone-300 px-6 md:px-12 w-full xl:px-20 mx-auto max-w-6xl 2xl:max-w-screen-xl">
        <div className="text-center py-8">
          <h1 className="text-3xl md:text-4xl">Project Title</h1>
        </div>
        <div className="">
          <p className="text-lg md:text-xl">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet
            repudiandae illum a, aperiam accusamus explicabo ut quia maiores
            tenetur, ad nisi iure, expedita velit ea dolorum. Blanditiis
            perspiciatis in nemo? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Soluta eius, optio adipisci architecto natus aut
            quod laudantium mollitia. A magni corrupti modi eaque distinctio
            corporis consequuntur ex cum aliquam quisquam.
          </p>
        </div>

        <div className="py-6 space-y-6">
          <h1 className="text-3xl text-center md:text-4xl">Gallery</h1>

      {/* Swiper to display gallery images */}
      <Swiper
        onSwiper={(swiper) => {
          if (swiper1Ref.current !== null) {
            swiper1Ref.current = swiper;
          }
        }}
        preloadImages={false}
        controller={{ control: secondSwiper }}
        spaceBetween={10}
        slidesPerView={1}
        grabCursor={true}
        navigation={true}
        draggable={true}
        centeredSlides={true}
        loop={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs, Controller]}
        breakpoints={{
          768: { slidesPerView: 1.2 },
          1280: { slidesPerView: 1.2 },
        }}
      >
        {galleryImages.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image.file_url}
              alt={`Slide ${index + 1}`}
              className="rounded-lg w-full"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Swiper for thumbnails */}
      <Swiper
        controller={{ control: firstSwiper }}
        loop={false}
        spaceBetween={10}
        slidesPerView={3}
        watchSlidesProgress
        touchRatio={0.2}
        grabCursor={true}
        slideToClickedSlide={true}
        onSwiper={setThumbsSwiper}
        modules={[Navigation, Thumbs, Controller]}
        breakpoints={{
          640: { slidesPerView: 4 },
          1280: { slidesPerView: 6 },
        }}
      >
        {galleryImages.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image.file_url}
              alt={`Thumbnail ${index + 1}`}
              className="rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
        </div>

        <div className="py-6 pb-16 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-center">
          <input
            type="text"
            placeholder="Email"
            className="py-4 px-4 w-full rounded-xl h-full shadow-md bg-gray-500 shadow-gray-500 text-sm text-stone-100 
          placeholder:text-stone-300
          transition-all focus:ring-gray-300  focus:ring-2 focus:outline-none 
          max-w-md
          sm:w-3/4 "
          />
          <a href="" className="cursor-pointer text-center">
            <button
              type="button"
              className="text-white shadow-gray-500 shadow-md text-lg bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg px-3 py-4 text-center 
            sm:text-sm"
            >
              Keep me updated!
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
