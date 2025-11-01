"use client"

import type React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"

// Import Swiper styles
import "swiper/css"

interface CompanyCarouselProps {
  companies: Array<{
    id: number
    name: string
    icon: React.ReactNode
    color: string
  }>
}

export default function CompanyCarousel({ companies }: CompanyCarouselProps) {
  return (
    <div className="relative overflow-hidden">
      {/* Gradient overlays for blur effect */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"></div>

      {/* Custom Swiper Styles */}
      <style jsx global>{`
        .company-carousel {
          overflow: visible !important;
        }
        
        .company-carousel .swiper-wrapper {
          align-items: center;
          transition-timing-function: linear !important;
        }
        
        .company-carousel .swiper-slide {
          height: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.7;
          transform: scale(0.9);
          transition: all 0.3s ease;
        }
        
        .company-carousel .swiper-slide-active,
        .company-carousel .swiper-slide-next,
        .company-carousel .swiper-slide-prev {
          opacity: 1;
          transform: scale(1);
        }
        
        .company-carousel .swiper-slide:hover {
          opacity: 1;
          transform: scale(1.05);
        }
      `}</style>

      {/* Swiper Carousel */}
      <Swiper
        modules={[Autoplay]}
        className="company-carousel"
        spaceBetween={16}
        slidesPerView={3}
        loop={true}
        centeredSlides={false}
        allowTouchMove={false}
        allowSlideNext={false}
        allowSlidePrev={false}
        speed={3000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
          reverseDirection: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 5,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 28,
          },
          1280: {
            slidesPerView: 8,
            spaceBetween: 32,
          },
        }}
      >
        {/* Duplicate companies array for seamless loop */}
        {[...companies, ...companies].map((company, index) => (
          <SwiperSlide key={`${company.id}-${index}`}>
            <div
              className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 bg-white rounded-xl shadow-sm flex items-center justify-center p-3 sm:p-4 lg:p-5 border-2 transition-all duration-300 group cursor-pointer hover:shadow-lg"
              style={{
                borderImage: "linear-gradient(to bottom, #B16CEA, #FE6267, #FFA84C) 1",
              }}
            >
              <div className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                {company.icon}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
