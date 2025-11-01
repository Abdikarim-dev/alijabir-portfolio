"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"

// Import Swiper styles
import "swiper/css"

interface Service {
  id: number
  title: string
}

interface ServicesCarouselProps {
  services: Service[]
}

export default function ServicesCarousel({ services }: ServicesCarouselProps) {
  return (
    <div className="relative overflow-hidden">
      {/* Gradient overlays for blur effect */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none"></div>

      {/* Custom Swiper Styles */}
      <style jsx global>{`
        .services-text-carousel {
          overflow: visible !important;
          padding: 0 !important;
        }
        
        .services-text-carousel .swiper-wrapper {
          align-items: center;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        
        .services-text-carousel .swiper-slide {
          height: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.7;
          transform: scale(0.95);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .services-text-carousel .swiper-slide-active {
          opacity: 1;
          transform: scale(1);
        }
        
        .services-text-carousel .swiper-slide-next,
        .services-text-carousel .swiper-slide-prev {
          opacity: 0.85;
          transform: scale(0.98);
        }
        
        .services-text-carousel .swiper-slide:hover {
          opacity: 1;
          transform: scale(1.02);
        }
        
        @media (min-width: 1024px) {
          .services-text-carousel .swiper-slide-active,
          .services-text-carousel .swiper-slide-next {
            opacity: 1;
            transform: scale(1);
          }
          
          .services-text-carousel .swiper-slide-prev {
            opacity: 0.9;
            transform: scale(0.98);
          }
        }
      `}</style>

      {/* Swiper Carousel */}
      <Swiper
        modules={[Autoplay]}
        className="services-text-carousel"
        spaceBetween={24}
        slidesPerView={1}
        loop={true}
        centeredSlides={true}
        allowTouchMove={true}
        speed={2000}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
          reverseDirection: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 32,
          },
          
        }}
      >
        {services.map((service) => (
          <SwiperSlide key={service.id}>
            <div className="group cursor-pointer py-4 sm:py-6">
              <div className="relative">
                {/* Active slide background (full white) */}
                

                {/* Adjacent slides background (90% white) */}
                <div className="absolute inset-0 bg-white/90 rounded-2xl opacity-0 swiper-slide-next:opacity-100 swiper-slide-prev:opacity-100 transition-opacity duration-500"></div>

                {/* Text Content */}
                <div className="relative z-10 px-6 sm:px-8 py-4 sm:py-6">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white transition-all duration-500 text-center leading-tight group-hover:text-black swiper-slide-active:text-black swiper-slide-next:text-black swiper-slide-prev:text-black">
                    {service.title}
                  </h3>
                </div>

                {/* Subtle glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 swiper-slide-active:opacity-100">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-2xl"></div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
