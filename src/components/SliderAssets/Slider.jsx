import React, { useState, useEffect, useContext } from "react";
import ImagesContext from "@/src/context/ImagesContext";
import { PropTypes } from 'prop-types'
import Link from 'next/link'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from 'swiper';
import "swiper/css";
import PopUp from "../Animation/PopUp";
import Image from 'next/image'
import Tools from '@/src/images/tools-4.svg'
import { data } from "@/src/data/heroImages";



export default function Slider({ autoPlay, navigation, slidesPerView, onClick, style }) {

  const [screenSize, setScreenSize] = useState("")


  const { state: { heroImages }, dispatch } = useContext(ImagesContext)

  useEffect(() => { dispatch({ type: "SET_HERO_IMAGES", payload: data }) }, [])

  useEffect(() => {
    if (typeof window !== undefined) {
      if (window.innerWidth > 640) {
        setScreenSize("-lg")
      }
      else {
        setScreenSize("-sm")
      }
      // detect window screen width function
      window.addEventListener('resize', () => {
        if (window.innerWidth > 640) {
          setScreenSize("-lg")
        }
        else {
          setScreenSize("-sm")
        }
      })
      return () => {
        document.body.removeEventListener('resize', () => { });
      };
    }
  }, [])

  let modules = [Navigation, Autoplay]
  if (autoPlay) {
    modules.push(Autoplay)
  }

  const test = navigation ? {
    220: {
      slidesPerView: 1,
    },
    800: {
      slidesPerView: 2,
    },
    1000: {
      slidesPerView: 3,
    },
  } : {}

  return (
    <>
      <Swiper
        className="mySwiper overflow-x-hidden p-0 h-1/2"
        style={style}
        spaceBetween={20}
        slidesPerView={slidesPerView}
        autoplay={{
          enabled: autoPlay,
          delay: 5000,
        }}
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        breakpoints={test}
        dir="ltr"
        onClick={(e) => onClick(e)}
      >

        {
          // This Function Chooses the right image size depending on screen size
          heroImages.map((image, index) => {
            let Img = (image.images).split("-")
            let firstPart = ""
            let size = ""
            let ext = "."

            if (Img.length > 1) {
              Img.forEach((part, index) => {
                if (index !== Img.length - 1)
                  firstPart += `${index !== 0 ? "-" : ""}${part}`
              })
              ext += (Img[Img.length - 1]).split(".")[1]
              size = screenSize
            }
            else {
              firstPart = image.images
              size = ""
              ext = ""
            }
            return (
              <SwiperSlide key={index} id={`${image.ID}`} className='bg-transparent m-0 rounded '>
                {navigation ? (<h3 className='absolute -top-6'> Image - {index + 1}</h3>) : ""}
                <Link className='w-auto' href={image.link !== null && !navigation ? image.link : "#"}>
                  {screenSize === "-lg" ? (
                    <Image
                      priority={index === 0 ? true : false}
                      width={navigation ? 180 : 1440}
                      height={navigation ? 180 : 480}
                      // sizes="200vh, 100vh"
                      // style={{ objectFit: 'cover' }}
                      sizes="300×100, 1110×370, 1534×511, 2048×682"
                      style={{ height: "100%" }}
                      className='rounded h-fit w-full mx-auto '
                      id={`${firstPart}-lg.${ext}`}
                      src={image.images !== "No Image" ? `https://zahabico.com/api/v1/assets/${firstPart}${size}${ext}` : Tools.src}
                      alt='product'
                    />) : screenSize === "-sm" ?
                    (<Image
                      priority={true}
                      width={navigation ? 180 : 1440}
                      height={navigation ? 180 : 1440}
                      sizes="300×100, 1110×370, 1534×511, 2048×682"
                      // fill
                      // sizes="200vh, 100vh"
                      // style={{ objectFit: 'cover' }}
                      style={{ height: "100%" }}
                      className='rounded h-fit w-full mx-auto '
                      src={image.images.length > 0 ? `https://zahabico.com/api/v1/assets/${firstPart}${size}.${ext}` : Tools.src}
                      alt='product'
                    />) : ""}
                </Link>
              </SwiperSlide>)
          })
        }
      </Swiper>
    </>
  );
}

Slider.defaultProps = {
  slidesPerView: 3,
  autoPlay: false,
  navigation: false,
  images: [{ ID: 0, images: "pexels-field-engineer-442151.jpg", link: "" }, { ID: 1, images: "pexels-field-engineer-442151.jpg", link: "" }, { ID: 2, images: "pexels-field-engineer-442151.jpg", link: "" }],
  onClick: () => { },
  style: {}
}

Slider.propTypes = {
  slidesPerView: PropTypes.number,
  autoPlay: PropTypes.bool,
  navigation: PropTypes.bool,
  images: PropTypes.array,
  onClick: PropTypes.func,
  style: PropTypes.object
}