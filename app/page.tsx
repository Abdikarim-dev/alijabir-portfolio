"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState, useRef } from "react"
import { Menu, X } from "lucide-react"
import CompanyCarousel from "@/components/company-carousel"
import ServicesCarousel from "@/components/services-carousel"

// Counter Animation Hook
function useCounterAnimation(end: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return

    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [end, duration, start])

  return count
}

// Intersection Observer Hook
function useIntersectionObserver(threshold = 0.3) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return [ref, isVisible] as const
}

export default function Portfolio() {
  const [statsRef, statsVisible] = useIntersectionObserver(0.3)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const count4 = useCounterAnimation(4, 2000, statsVisible)
  const count5 = useCounterAnimation(5, 2200, statsVisible)
  const count30 = useCounterAnimation(30, 2500, statsVisible)

  // Company data for carousel
  const companies = [
    {
      id: 1,
      name: "TechCorp",
      color: "#10B981",
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      ),
    },
    {
      id: 2,
      name: "Company Image",
      color: "#3B82F6",
      icon: (
        <Image src="/images/company-image.png" alt="Company" width={32} height={32} className="w-6 h-6 sm:w-8 sm:h-8" />
      ),
    },
    {
      id: 3,
      name: "Media Corp",
      color: "#F59E0B",
      icon: <div className="text-yellow-500 font-bold text-sm sm:text-lg">media</div>,
    },
    {
      id: 4,
      name: "WebFlow",
      color: "#10B981",
      icon: (
        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-600 rounded flex items-center justify-center">
          <span className="text-white text-xs font-bold">W</span>
        </div>
      ),
    },
    {
      id: 5,
      name: "Brand Co",
      color: "#F97316",
      icon: (
        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">b</span>
        </div>
      ),
    },
    {
      id: 6,
      name: "CheckMark",
      color: "#3B82F6",
      icon: (
        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </div>
      ),
    },
    {
      id: 7,
      name: "Dollar Inc",
      color: "#10B981",
      icon: (
        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded flex items-center justify-center">
          <span className="text-white text-xs font-bold">$</span>
        </div>
      ),
    },
    {
      id: 8,
      name: "StartupX",
      color: "#8B5CF6",
      icon: (
        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">S</span>
        </div>
      ),
    },
    {
      id: 9,
      name: "InnovateLab",
      color: "#EF4444",
      icon: (
        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-500 rounded-lg flex items-center justify-center">
          <span className="text-white text-xs font-bold">I</span>
        </div>
      ),
    },
    {
      id: 10,
      name: "FutureTech",
      color: "#06B6D4",
      icon: (
        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-cyan-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">F</span>
        </div>
      ),
    },
  ]

  // Design services data for carousel
  const designServices = [
    {
      id: 1,
      title: "Pixel-Perfect Design",
    },
    {
      id: 2,
      title: "User Interface",
    },
    {
      id: 3,
      title: "User Experience",
    },
    {
      id: 4,
      title: "Creative Design",
    },
  ]

  // Smooth scroll function
  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
    setIsMobileMenuOpen(false) // Close mobile menu after navigation
  }

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen && !(event.target as Element).closest(".mobile-menu-container")) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMobileMenuOpen])

  return (
    <div className="min-h-screen bg-white">
      {/* Global Smooth Scrolling Styles */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 5px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        @media (min-width: 768px) {
          .hover-lift:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }
        }
        
        .hover-scale {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-scale:hover {
          transform: scale(1.02);
        }
        
        @media (min-width: 768px) {
          .hover-scale:hover {
            transform: scale(1.05);
          }
        }
        
        .hover-glow {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        
        .hover-glow::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }
        
        .hover-glow:hover::before {
          left: 100%;
        }
        
        .fade-in-up {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        @media (min-width: 768px) {
          .fade-in-up {
            transform: translateY(30px);
          }
        }
        
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }
        .stagger-6 { animation-delay: 0.6s; }
        .stagger-7 { animation-delay: 0.7s; }
        .stagger-8 { animation-delay: 0.8s; }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-15deg); }
          50% { transform: translateY(-10px) rotate(-15deg); }
        }
        
        @media (min-width: 768px) {
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(-15deg); }
            50% { transform: translateY(-20px) rotate(-15deg); }
          }
        }
      `}</style>

      {/* Header */}
      <header className="py-4 md:py-6 bg-white/95 backdrop-blur-sm transition-all duration-300 border-b border-gray-100">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-20 max-w-7xl mx-auto w-full">
          <div className="flex items-center hover-scale">
            <Image src="/images/logo.png" alt="BaroFigma" width={120} height={40} className="h-6 sm:h-8 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-12">
            <button
              onClick={() => smoothScrollTo("home")}
              className="text-sm font-medium text-gray-900 hover:text-transparent hover:bg-gradient-to-r hover:from-[#B16CEA] hover:to-[#FFA84C] hover:bg-clip-text transition-all duration-300"
            >
              HOME
            </button>
            <button
              onClick={() => smoothScrollTo("expertise")}
              className="text-sm font-medium text-gray-900 hover:text-transparent hover:bg-gradient-to-r hover:from-[#B16CEA] hover:to-[#FFA84C] hover:bg-clip-text transition-all duration-300"
            >
              EXPERTISE
            </button>
            <button
              onClick={() => smoothScrollTo("case-study")}
              className="text-sm font-medium text-gray-900 hover:text-transparent hover:bg-gradient-to-r hover:from-[#B16CEA] hover:to-[#FFA84C] hover:bg-clip-text transition-all duration-300"
            >
              CASE STUDY
            </button>
            <button
              onClick={() => smoothScrollTo("contact")}
              className="text-sm font-medium text-gray-900 hover:text-transparent hover:bg-gradient-to-r hover:from-[#B16CEA] hover:to-[#FFA84C] hover:bg-clip-text transition-all duration-300"
            >
              CONTACT
            </button>
          </nav>

          {/* Desktop CTA Button */}
          <Button
            className="hidden md:flex items-center space-x-2 px-4 lg:px-6 py-2 rounded-full text-white font-medium transition-all duration-300 hover-glow hover:shadow-lg hover:scale-105 text-sm"
            style={{
              background: "linear-gradient(to bottom, #B16CEA, #FE6267, #FFA84C)",
            }}
          >
            <span>BOOK A CALL</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 text-gray-900" /> : <Menu className="w-6 h-6 text-gray-900" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`mobile-menu-container md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="px-4 sm:px-6 py-4 bg-white border-t border-gray-100 shadow-lg">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => smoothScrollTo("home")}
                className="text-left text-base font-medium text-gray-900 hover:text-transparent hover:bg-gradient-to-r hover:from-[#B16CEA] hover:to-[#FFA84C] hover:bg-clip-text transition-all duration-300 py-2"
              >
                HOME
              </button>
              <button
                onClick={() => smoothScrollTo("expertise")}
                className="text-left text-base font-medium text-gray-900 hover:text-transparent hover:bg-gradient-to-r hover:from-[#B16CEA] hover:to-[#FFA84C] hover:bg-clip-text transition-all duration-300 py-2"
              >
                EXPERTISE
              </button>
              <button
                onClick={() => smoothScrollTo("case-study")}
                className="text-left text-base font-medium text-gray-900 hover:text-transparent hover:bg-gradient-to-r hover:from-[#B16CEA] hover:to-[#FFA84C] hover:bg-clip-text transition-all duration-300 py-2"
              >
                CASE STUDY
              </button>
              <button
                onClick={() => smoothScrollTo("contact")}
                className="text-left text-base font-medium text-gray-900 hover:text-transparent hover:bg-gradient-to-r hover:from-[#B16CEA] hover:to-[#FFA84C] hover:bg-clip-text transition-all duration-300 py-2"
              >
                CONTACT
              </button>
              <Button
                className="mt-4 w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-full text-white font-medium transition-all duration-300 hover-glow"
                style={{
                  background: "linear-gradient(to bottom, #B16CEA, #FE6267, #FFA84C)",
                }}
              >
                <span>BOOK A CALL</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative px-4 sm:px-6 py-8 sm:py-12 lg:px-20 lg:py-20 overflow-hidden">
        <div className="relative z-10">
          <div className="text-center mb-6 sm:mb-8">
            <div
              className="inline-block bg-white px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6 border-2 fade-in-up hover-scale"
              style={{
                borderImage: "linear-gradient(to bottom, #B16CEA, #FE6267, #FFA84C) 1",
              }}
            >
              <p className="text-xs text-gray-600 tracking-wide">HELLO! I AM ALJABIR ABDULKADIR</p>
            </div>

            {/* CSS Blob Shape */}
            <div
              className="absolute left-0 right-0 top-16 sm:top-20 w-screen h-64 sm:h-80 lg:h-96 flex items-center justify-center z-0"
              style={{ marginLeft: "calc(-50vw + 50%)" }}
            >
              <div
                className="w-full h-full opacity-20"
                style={{
                  background: "radial-gradient(circle, #F4F4F4 0%, #F5F5F5 50%, #F4F4F4 100%)",
                  borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
                  transform: "rotate(-15deg)",
                  animation: "float 6s ease-in-out infinite",
                }}
              ></div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 relative z-10 fade-in-up stagger-1 px-4">
              <span className="text-orange-500 hover:text-transparent hover:bg-gradient-to-r hover:from-[#B16CEA] hover:to-[#FFA84C] hover:bg-clip-text transition-all duration-500">
                Creative product
              </span>
              <br />
              <span className="text-black hover:text-transparent hover:bg-gradient-to-r hover:from-[#FE6267] hover:to-[#FFA84C] hover:bg-clip-text transition-all duration-500">
                designer
              </span>
            </h1>
          </div>

          <div className="flex justify-center mb-8 sm:mb-12 relative z-10 fade-in-up stagger-2">
            <div className="relative hover-lift">
              <div
                className="w-48 h-60 sm:w-64 sm:h-80 lg:w-80 lg:h-96 rounded-3xl overflow-hidden bg-orange-50 border-4 hover-glow"
                style={{
                  borderImage: "linear-gradient(to bottom, #B16CEA, #FE6267, #FFA84C) 1",
                }}
              >
                <Image
                  src="/images/hero-img.png"
                  alt="Aljabir Abdulkadir"
                  width={320}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mb-8 sm:mb-12 relative z-10 fade-in-up stagger-3">
            <Button
              className="text-white flex items-center space-x-2 rounded-full px-6 py-2 font-medium transition-all duration-300 hover-glow hover:shadow-lg hover:scale-105 group w-full sm:w-auto"
              style={{
                background: "linear-gradient(to bottom, #B16CEA, #FE6267, #FFA84C)",
              }}
            >
              <span>DOWNLOAD CV</span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
            <div className="flex space-x-6">
              <Link
                href="#"
                className="text-sm font-medium text-gray-600 hover:text-transparent hover:bg-gradient-to-r hover:from-[#B16CEA] hover:to-[#FFA84C] hover:bg-clip-text underline transition-all duration-300 hover:scale-105"
              >
                TIKTOK
              </Link>
              <Link
                href="#"
                className="text-sm font-medium text-gray-600 hover:text-transparent hover:bg-gradient-to-r hover:from-[#B16CEA] hover:to-[#FFA84C] hover:bg-clip-text underline transition-all duration-300 hover:scale-105"
              >
                LINKEDIN
              </Link>
            </div>
          </div>

          {/* Enhanced WORKED WITH Section with Swiper Carousel */}
          <div className="text-center mb-12 sm:mb-16 relative z-10 fade-in-up stagger-4">
            <div
              className="inline-block bg-white px-3 sm:px-4 py-2 rounded-full mb-6 sm:mb-8 border-2 hover-scale"
              style={{
                borderImage: "linear-gradient(to right, #B16CEA, #FE6267, #FFA84C) 1",
              }}
            >
              <p className="text-xs text-gray-600 tracking-wide">WORKED WITH</p>
            </div>

            {/* Company Carousel with Enhanced UX */}
            <div className="max-w-7xl mx-auto px-4 sm:px-8">
              <CompanyCarousel companies={companies} />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="expertise" className="px-4 sm:px-6 py-12 sm:py-16 lg:px-20 bg-gray-50">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          <div className="fade-in-up">
            <div
              className="inline-block px-3 py-1 rounded-full mb-4 sm:mb-6 text-white hover-scale"
              style={{
                background: "linear-gradient(to bottom, #B16CEA, #FE6267, #FFA84C)",
              }}
            >
              <p className="text-xs tracking-wide font-medium">CORE EXPERIENCE</p>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 hover:text-transparent hover:bg-gradient-to-r hover:from-[#B16CEA] hover:to-[#FFA84C] hover:bg-clip-text transition-all duration-500">
              I blend creativity with technical expertise
            </h2>
            <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed">
              I'm dedicated to crafting websites that bring your ideas to life, combining design and development to
              deliver fast, impactful results.
            </p>
            <Button className="bg-black hover:bg-gradient-to-r hover:from-[#B16CEA] hover:to-[#FFA84C] text-white flex items-center space-x-2 transition-all duration-300 hover:scale-105 group w-full sm:w-auto">
              <span>BOOK A CALL</span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
          </div>
          <div className="space-y-4 sm:space-y-6">
            {[
              { title: "SPOTIFY", role: "Senior Product Designer", year: "(PRESENT)" },
              { title: "WAAFI", role: "UI/UX Designer", year: "2024 (PRESENT)" },
              { title: "JAMHURIYA TECHNOLOGY SOLUTIONS - JTECH", role: "Multimedia Intern", year: "(2023 / 2024)" },
              { title: "BAKEYIE", role: "Freelancer Graphic Designer", year: "(2022 - 2023)" },
              { title: "ALJAMHAD PSS", role: "Teacher", year: "(2018 / 2021)" },
              { title: "FREELANCE", role: "Product Designer", year: "(2020 - 2022)" },
              { title: "STARTUP", role: "Co-founder", year: "(2019 - 2020)" },
            ].map((item, index) => (
              <div key={index} className={`py-3 sm:py-4 border-b hover-lift fade-in-up stagger-${index + 1} group`}>
                <h3
                  className="font-medium text-base sm:text-lg mb-2 transition-all duration-300"
                  style={{
                    background: "linear-gradient(to right, #B16CEA, #FE6267, #FFA84C)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {item.title}
                </h3>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                  <span className="font-semibold text-black group-hover:text-[#B16CEA] transition-colors duration-300">
                    {item.role}
                  </span>
                  <span className="text-sm text-[#CCCCCC] group-hover:text-[#FE6267] transition-colors duration-300">
                    {item.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="case-study" className="px-4 sm:px-6 py-12 sm:py-16 lg:px-20 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          {/* Services Carousel Header */}
          <div className="mb-8 sm:mb-12 fade-in-up">
            <ServicesCarousel services={designServices} />
          </div>

          {/* Case Study Badge */}
          <div className="text-center mb-6 sm:mb-8 fade-in-up stagger-1">
            <div
              className="inline-block bg-white px-3 sm:px-4 py-2 rounded-full border-2 hover-scale"
              style={{
                borderImage: "linear-gradient(to right, #B16CEA, #FE6267, #FFA84C) 1",
              }}
            >
              <p className="text-sm leading-[14px] font-semibold text-black tracking-wide">CASE STUDY</p>
            </div>
          </div>

          {/* Main Heading */}
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight sm:leading-[52px] mb-8 sm:mb-12 text-center fade-in-up stagger-2 hover:text-transparent hover:bg-gradient-to-r hover:from-[#B16CEA] hover:to-[#FFA84C] hover:bg-clip-text transition-all duration-500">
            Meet with creative things
          </h3>

          {/* Case Studies Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* WAAFI Website Card - Updated Design */}
            <div className="relative group cursor-pointer hover-lift fade-in-up stagger-3">
              <div className="overflow-hidden rounded-[10px] hover-glow relative">
                <Image
                  src="/images/waafi-case-study.png"
                  alt="WAAFI Website"
                  width={570}
                  height={427}
                  className="w-full aspect-[570/427] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay Content */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 group-hover:from-orange-500/30 group-hover:to-red-500/30 transition-all duration-300"></div>
              </div>
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 transition-all duration-300 group-hover:bottom-6 sm:group-hover:bottom-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs sm:text-sm leading-[14px] font-semibold tracking-wide uppercase bg-black/70 px-2 py-1 rounded backdrop-blur-sm">
                    UI/UX DESIGN
                  </span>
                  <span className="text-xs sm:text-sm text-gray-200 bg-black/70 px-2 py-1 rounded backdrop-blur-sm">
                    SEP 12, 2024
                  </span>
                </div>
                <div className="flex items-start justify-between">
                  <h4 className="text-lg sm:text-xl lg:text-2xl leading-6 sm:leading-8 font-semibold text-white max-w-md group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#B16CEA] group-hover:to-[#FFA84C] group-hover:bg-clip-text transition-all duration-500">
                    Website For Waafi – A Platform Built To Simplify Financial And Communication Services.
                  </h4>
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white ml-2 sm:ml-4 flex-shrink-0 transition-all duration-300 group-hover:translate-x-2 group-hover:text-[#FFA84C]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>

            {/* 27 April Card */}
            <div className="relative group cursor-pointer hover-lift fade-in-up stagger-4">
              <div className="overflow-hidden rounded-[10px] hover-glow">
                <Image
                  src="/images/case-study-2.png"
                  alt="27 April Mobile Design"
                  width={570}
                  height={427}
                  className="w-full aspect-[570/427] object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 transition-all duration-300 group-hover:bottom-6 sm:group-hover:bottom-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs sm:text-sm leading-[14px] font-semibold tracking-wide uppercase bg-black/70 px-2 py-1 rounded backdrop-blur-sm">
                    CREATIVITY
                  </span>
                  <span className="text-xs sm:text-sm text-gray-200 bg-black/70 px-2 py-1 rounded backdrop-blur-sm">
                    FEB 22, 2022
                  </span>
                </div>
                <div className="flex items-start justify-between">
                  <h4 className="text-lg sm:text-xl lg:text-2xl leading-6 sm:leading-8 font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#B16CEA] group-hover:to-[#FFA84C] group-hover:bg-clip-text transition-all duration-500">
                    27 April, World's Graphic Design Day !
                  </h4>
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white ml-2 sm:ml-4 flex-shrink-0 transition-all duration-300 group-hover:translate-x-2 group-hover:text-[#FFA84C]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Full Width Speaking Card */}
          <div className="relative group cursor-pointer mb-8 sm:mb-12 hover-lift fade-in-up stagger-5">
            <div className="overflow-hidden rounded-[10px] hover-glow">
              <Image
                src="/images/case-study-3.png"
                alt="Figma vs Adobe XD Speaking"
                width={1200}
                height={898}
                className="w-full aspect-[1200/898] object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 transition-all duration-300 group-hover:bottom-6 sm:group-hover:bottom-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm leading-[14px] font-semibold tracking-wide uppercase bg-black/70 px-2 py-1 rounded backdrop-blur-sm">
                  CREATIVITY
                </span>
                <span className="text-xs sm:text-sm text-gray-200 bg-black/70 px-2 py-1 rounded backdrop-blur-sm">
                  FEB 22, 2025
                </span>
              </div>
              <div className="flex items-start justify-between">
                <h4 className="text-lg sm:text-xl lg:text-2xl leading-6 sm:leading-8 font-semibold text-white max-w-2xl group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#B16CEA] group-hover:to-[#FFA84C] group-hover:bg-clip-text transition-all duration-500">
                  Roadmap of UI/UX Design: Key Principles and Best Practices
                </h4>
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-white ml-2 sm:ml-4 flex-shrink-0 transition-all duration-300 group-hover:translate-x-2 group-hover:text-[#FFA84C]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>

          {/* View All Projects Button */}
          <div className="text-center fade-in-up stagger-6">
            <Button
              variant="outline"
              className="border-white text-white hover:bg-gradient-to-r hover:from-[#B16CEA] hover:to-[#FFA84C] hover:border-transparent hover:text-white px-6 sm:px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 group w-full sm:w-auto"
            >
              VIEW ALL PROJECTS
              <svg
                className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_432px] gap-8 sm:gap-12 lg:gap-16">
            <div className="fade-in-up">
              <div
                className="inline-block bg-white px-3 sm:px-4 py-2 rounded-full mb-6 sm:mb-8 border-2 hover-scale"
                style={{
                  borderImage: "linear-gradient(to bottom, #B16CEA, #FE6267, #FFA84C) 1",
                }}
              >
                <p className="text-sm leading-[14px] text-black tracking-wide font-medium">BARO FIGMA</p>
              </div>

              <h2
                className="text-3xl sm:text-4xl lg:text-5xl leading-tight sm:leading-[58px] font-bold mb-8 sm:mb-12 text-black hover:text-transparent hover:bg-gradient-to-r hover:from-[#B16CEA] hover:to-[#FFA84C] hover:bg-clip-text transition-all duration-500"
                style={{ letterSpacing: "-1.44px" }}
              >
                Learn Figma - Baro Figma | Passionate about Design, Technology, and User Experience.
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8" ref={statsRef}>
                {[
                  { number: count4, target: 4, text: "Years of experience" },
                  { number: count5, target: 5, text: "Companies Worked with" },
                  { number: count30, target: 30, text: "Projects Done" },
                ].map((stat, index) => (
                  <div key={index} className={`text-center hover-lift fade-in-up stagger-${index + 1}`}>
                    <div
                      className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[100%] mb-2 pb-2 border-b-2 hover:text-transparent hover:bg-gradient-to-r hover:from-[#B16CEA] hover:to-[#FFA84C] hover:bg-clip-text transition-all duration-500"
                      style={{
                        borderImage: "linear-gradient(to bottom, #B16CEA, #FE6267, #FFA84C) 1",
                      }}
                    >
                      +{stat.number}
                    </div>
                    <p className="text-sm sm:text-base leading-6 font-normal" style={{ letterSpacing: "-0.32px" }}>
                      {stat.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              {[
                { name: "Leonardo F. Ashton", title: "CTO" },
                { name: "Diego H. Redmond", title: "UI/UX DESIGNER" },
                { name: "Andres W. Huxley", title: "PRODUCT MANAGER" },
              ].map((person, index) => (
                <div
                  key={index}
                  className={`bg-white p-6 sm:p-8 lg:p-10 rounded border border-gray-200 hover-lift hover:shadow-lg transition-all duration-300 fade-in-up stagger-${index + 3} group`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <Image
                      src="/images/testimonial-icon.png"
                      alt="Quote"
                      width={20}
                      height={20}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                    <span className="text-xs sm:text-sm text-gray-500 font-medium group-hover:text-[#B16CEA] transition-colors duration-300">
                      / DESIGN & USABILITY
                    </span>
                  </div>
                  <p className="text-gray-800 mb-4 sm:mb-6 leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                    " It's clear that a lot of thought went into showcasing your skills and creativity. "
                  </p>
                  <div className="flex items-center space-x-3">
                    <Image
                      src="/images/testimonial-img.png"
                      alt={person.name}
                      width={40}
                      height={40}
                      className="rounded-full transition-transform duration-300 group-hover:scale-110"
                    />
                    <div>
                      <p className="font-semibold text-sm text-black group-hover:text-[#B16CEA] transition-colors duration-300">
                        {person.name}
                      </p>
                      <p className="text-xs text-gray-500 group-hover:text-[#FE6267] transition-colors duration-300">
                        {person.title}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-4 sm:px-6 py-12 sm:py-16 lg:px-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
            <div className="space-y-6 sm:space-y-8 fade-in-up">
              <div className="inline-block bg-gray-200 px-3 sm:px-4 py-2 rounded-full hover-scale">
                <p className="text-xs text-gray-700 tracking-wide font-medium">LET'S TALK FOR YOUR PROJECT DONE</p>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black leading-tight hover:text-transparent hover:bg-gradient-to-r hover:from-[#B16CEA] hover:to-[#FFA84C] hover:bg-clip-text transition-all duration-500">
                Let's create amazing stuff together!
              </h2>

              <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-md">
                Have a project in mind? Looking to partner or work together? Reach out through the form and I'll get
                back to you in the next 48 hours.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 hover-lift group">
                  <div className="w-5 h-5 bg-black rounded-sm flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-[#B16CEA] group-hover:to-[#FFA84C] transition-all duration-300">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <span className="text-gray-800 font-medium group-hover:text-[#B16CEA] transition-colors duration-300">
                    info@portfolio.com
                  </span>
                </div>

                <div className="flex items-center space-x-3 hover-lift group">
                  <div className="w-5 h-5 bg-black rounded-sm flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-[#B16CEA] group-hover:to-[#FFA84C] transition-all duration-300">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <span className="text-gray-800 font-medium group-hover:text-[#B16CEA] transition-colors duration-300">
                    +(123) 456 789 00
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm hover-lift fade-in-up stagger-1">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-black hover:text-transparent hover:bg-gradient-to-r hover:from-[#B16CEA] hover:to-[#FFA84C] hover:bg-clip-text transition-all duration-500">
                Send a message
              </h3>
              <form className="space-y-6">
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-[#B16CEA] transition-colors duration-300">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Jon portoz"
                    className="w-full px-0 py-3 border-0 border-b border-gray-300 bg-transparent focus:border-[#B16CEA] focus:outline-none text-gray-900 placeholder-gray-400 transition-all duration-300"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-[#B16CEA] transition-colors duration-300">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="hello@mail.com"
                    className="w-full px-0 py-3 border-0 border-b border-gray-300 bg-transparent focus:border-[#B16CEA] focus:outline-none text-gray-900 placeholder-gray-400 transition-all duration-300"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-[#B16CEA] transition-colors duration-300">
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="+(123) 456 789 00"
                    className="w-full px-0 py-3 border-0 border-b border-gray-300 bg-transparent focus:border-[#B16CEA] focus:outline-none text-gray-900 placeholder-gray-400 transition-all duration-300"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-[#B16CEA] transition-colors duration-300">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Type here...."
                    className="w-full px-0 py-3 border-0 border-b border-gray-300 bg-transparent focus:border-[#B16CEA] focus:outline-none text-gray-900 placeholder-gray-400 resize-none transition-all duration-300"
                  />
                </div>

                <Button className="w-full bg-black hover:bg-gradient-to-r hover:from-[#B16CEA] hover:to-[#FFA84C] text-white py-4 rounded-xl font-medium text-sm tracking-wide transition-all duration-300 hover:scale-105">
                  SUBMIT NOW
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section id="contact" className="px-4 sm:px-6 py-12 sm:py-16 lg:px-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
            <div className="space-y-6 sm:space-y-8 fade-in-up">
              <div className="inline-block bg-gray-200 px-3 sm:px-4 py-2 rounded-full hover-scale">
                <p className="text-xs text-gray-700 tracking-wide font-medium">LET'S TALK FOR YOUR PROJECT DONE</p>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black leading-tight hover:text-transparent hover:bg-gradient-to-r hover:from-[#B16CEA] hover:to-[#FFA84C] hover:bg-clip-text transition-all duration-500">
                Let's create amazing stuff together!
              </h2>

              <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-md">
                Have a project in mind? Looking to partner or work together? Reach out through the form and I'll get
                back to you in the next 48 hours.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 hover-lift group">
                  <div className="w-5 h-5 bg-black rounded-sm flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-[#B16CEA] group-hover:to-[#FFA84C] transition-all duration-300">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <span className="text-gray-800 font-medium group-hover:text-[#B16CEA] transition-colors duration-300">
                    info@portfolio.com
                  </span>
                </div>

                <div className="flex items-center space-x-3 hover-lift group">
                  <div className="w-5 h-5 bg-black rounded-sm flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-[#B16CEA] group-hover:to-[#FFA84C] transition-all duration-300">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <span className="text-gray-800 font-medium group-hover:text-[#B16CEA] transition-colors duration-300">
                    +(123) 456 789 00
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm hover-lift fade-in-up stagger-1">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-black hover:text-transparent hover:bg-gradient-to-r hover:from-[#B16CEA] hover:to-[#FFA84C] hover:bg-clip-text transition-all duration-500">
                Send a message
              </h3>
              <form className="space-y-6">
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-[#B16CEA] transition-colors duration-300">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Jon portoz"
                    className="w-full px-0 py-3 border-0 border-b border-gray-300 bg-transparent focus:border-[#B16CEA] focus:outline-none text-gray-900 placeholder-gray-400 transition-all duration-300"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-[#B16CEA] transition-colors duration-300">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="hello@mail.com"
                    className="w-full px-0 py-3 border-0 border-b border-gray-300 bg-transparent focus:border-[#B16CEA] focus:outline-none text-gray-900 placeholder-gray-400 transition-all duration-300"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-[#B16CEA] transition-colors duration-300">
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="+(123) 456 789 00"
                    className="w-full px-0 py-3 border-0 border-b border-gray-300 bg-transparent focus:border-[#B16CEA] focus:outline-none text-gray-900 placeholder-gray-400 transition-all duration-300"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-[#B16CEA] transition-colors duration-300">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Type here...."
                    className="w-full px-0 py-3 border-0 border-b border-gray-300 bg-transparent focus:border-[#B16CEA] focus:outline-none text-gray-900 placeholder-gray-400 resize-none transition-all duration-300"
                  />
                </div>

                <Button className="w-full bg-black hover:bg-gradient-to-r hover:from-[#B16CEA] hover:to-[#FFA84C] text-white py-4 rounded-xl font-medium text-sm tracking-wide transition-all duration-300 hover:scale-105">
                  SUBMIT NOW
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-6 py-12 sm:py-16 lg:px-20 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12 sm:mb-16 fade-in-up gap-4">
            <p className="text-sm text-gray-400">Available for freelance work</p>
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <span className="text-sm text-gray-400">MORE CREATIONS</span>
              <div className="flex items-center space-x-4">
                <Link
                  href="#"
                  className="w-10 h-10 border border-orange-500 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-[#B16CEA] hover:to-[#FFA84C] hover:border-transparent transition-all duration-300 hover:scale-110"
                >
                  <Image src="/images/ig-icon.png" alt="Instagram" width={20} height={20} />
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 border border-orange-500 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-[#B16CEA] hover:to-[#FFA84C] hover:border-transparent transition-all duration-300 hover:scale-110"
                >
                  <span className="text-orange-500 font-bold text-lg">J</span>
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-[#B16CEA] hover:to-[#FFA84C] hover:border-transparent transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-gray-800 mb-12 sm:mb-16" />

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div className="fade-in-up">
              <Image
                src="/images/logo.png"
                alt="BaroFigma"
                width={300}
                height={120}
                className="h-16 sm:h-20 lg:h-24 w-auto filter invert mb-6 sm:mb-8 hover-scale"
              />
            </div>

            <div className="space-y-6 sm:space-y-8 fade-in-up stagger-1">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight hover:text-transparent hover:bg-gradient-to-r hover:from-[#B16CEA] hover:to-[#FFA84C] hover:bg-clip-text transition-all duration-500">
                Let's create something amazing & extraordinary together.
              </h2>

              <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4 sm:gap-6 text-sm text-gray-300">
                <Link
                  href="mailto:info.aljabir@gmail.com"
                  className="hover:text-transparent hover:bg-gradient-to-r hover:from-[#B16CEA] hover:to-[#FFA84C] hover:bg-clip-text transition-all duration-300 underline"
                >
                  info.aljabir@gmail.com
                </Link>
                <Link
                  href="tel:+252-619-870-770"
                  className="hover:text-transparent hover:bg-gradient-to-r hover:from-[#B16CEA] hover:to-[#FFA84C] hover:bg-clip-text transition-all duration-300"
                >
                  +252-619-870-770
                </Link>
                <Link
                  href="tel:+252-615-903-749"
                  className="hover:text-transparent hover:bg-gradient-to-r hover:from-[#B16CEA] hover:to-[#FFA84C] hover:bg-clip-text transition-all duration-300"
                >
                  +252-615-903-749
                </Link>
              </div>

              <Button className="bg-transparent border border-orange-500 text-orange-500 hover:bg-gradient-to-r hover:from-[#B16CEA] hover:to-[#FFA84C] hover:text-white hover:border-transparent transition-all duration-300 px-6 sm:px-8 py-3 rounded-full hover:scale-105 group w-full sm:w-auto">
                DOWNLOAD CV
                <svg
                  className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
