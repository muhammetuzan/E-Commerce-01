import { ChevronLeft, ChevronRight } from "lucide-react";
import carouselImg from "../assets/resimler/96c86912d491d421800e62998b9af7c838cc25d1.jpg";
import { useState } from "react";

export default function DesktopCarousel() {
  const [active, setActive] = useState(0);
  const slides = [
    {
      img: carouselImg,
      h5: "SUMMER 2020",
      h1: "NEW COLLECTION",
      h4: "We know how large objects will act, but things on a small scale.",
    },
    {
      img: carouselImg,
      h5: "SUMMER 2020",
      h1: "NEW COLLECTION",
      h4: "We know how large objects will act, but things on a small scale.",
    },
  ];
  return (
    <div className="hidden lg:block w-[1439px] h-[716px] mx-auto mt-[136px] relative rounded-[5px] border border-[#DEDEDE] overflow-hidden">
      {/* Slide */}
      <img src={slides[active].img} alt="carousel" className="absolute w-full h-full object-cover z-0" />
      {/* Overlay Content */}
      <div className="absolute w-full h-full flex items-center justify-center z-10">
        <div className="w-[975px] h-[651px] flex items-center pt-[112px] pb-[112px] mx-auto" style={{gap:80}}>
          <div className="w-[599px] h-[331px] flex flex-col gap-[35px]">
            <h5 className="font-montserrat font-bold text-[16px] leading-[24px] tracking-[0.1px] bg-white w-[122px] h-[24px]">SUMMER 2020</h5>
            <h1 className="font-montserrat font-bold text-[58px] leading-[80px] tracking-[0.2px] bg-white w-[548px] h-[80px]">NEW COLLECTION</h1>
            <h4 className="font-montserrat font-normal text-[20px] leading-[30px] tracking-[0.2px] bg-[#FAFAFA] w-[376px] h-[60px]">We know how large objects will act, <br />but things on a small scale.</h4>
            <div className="w-[221px] h-[62px] flex items-center" style={{position:'absolute',bottom:0}}>
              <button className="w-[221px] h-[62px] rounded-[5px] px-[40px] py-[15px] bg-[#2DC071] flex items-center justify-center">
                <h3 className="font-montserrat font-bold text-[24px] leading-[32px] tracking-[0.1px] text-center bg-white w-[141px] h-[32px]">SHOP NOW</h3>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Left Chevron */}
      <button
        className="absolute left-[40px] top-1/2 -translate-y-1/2 w-[24px] h-[44.5px] flex items-center justify-center bg-white rounded z-20"
        onClick={() => setActive((active - 1 + slides.length) % slides.length)}
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} className="w-[24px] h-[44.5px]" />
      </button>
      {/* Right Chevron */}
      <button
        className="absolute right-[40px] top-1/2 -translate-y-1/2 w-[24px] h-[44.5px] flex items-center justify-center bg-white rounded z-20"
        onClick={() => setActive((active + 1) % slides.length)}
        aria-label="Next slide"
      >
        <ChevronRight size={24} className="w-[24px] h-[44.5px]" />
      </button>
      {/* Indicators */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[657px] w-[126px] h-[10px] flex gap-0 z-30">
        {slides.map((_, i) => (
          <div
            key={i}
            className="transition-opacity duration-200"
            style={{
              width: i === 0 ? 63 : 62,
              height: 10,
              background: '#fff',
              opacity: active === i ? 1 : 0.5,
              marginLeft: i === 0 ? 0 : 1,
              borderRadius: 5,
            }}
          />
        ))}
      </div>
    </div>
  );
}
