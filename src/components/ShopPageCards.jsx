import React from "react";
import img1 from "../assets/resimler/c9a64276a14f623312021f83a598c945b5165068.jpg";
import img2 from "../assets/resimler/96c86912d491d421800e62998b9af7c838cc25d1.jpg";
import img3 from "../assets/resimler/7bc2f9fb559eeb7e6b92ed49f40128729a9f74f1.jpg";
import img4 from "../assets/resimler/6e722a25b740dd4eea5b5580d5e1601a818f98c2.jpg";
import img5 from "../assets/resimler/2650d8d792d83e3292df63340b2a44fd9763c159.jpg";

const images = [img1, img2, img3, img4, img5];

function Card({ src }) {
  return (
    <div className="relative w-[332px] h-[300px] rounded-lg overflow-hidden mx-auto lg:w-[205px] lg:h-[223px] lg:mx-0">
      <img src={src} alt="Cloths" className="w-full h-full object-cover" />
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#212121]/25 pointer-events-none" />
      <span className="absolute top-[134px] left-1/2 -translate-x-1/2 w-[67px] h-[24px] font-montserrat font-bold text-[16px] leading-[24px] tracking-[0.1px] text-white text-center
        lg:top-[87px] lg:left-[69px] lg:-translate-x-0 lg:w-[67px] lg:h-[24px] lg:text-left">CLOTHS</span>
      <span className="absolute top-[168px] left-1/2 -translate-x-1/2 w-[54px] h-[24px] font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-white text-center whitespace-nowrap
        lg:top-[121px] lg:left-[76px] lg:-translate-x-0 lg:w-[54px] lg:h-[20px] lg:text-left">5 Items</span>
    </div>
  );
}
export default function ShopPageCards() {
  return (
    <div className="w-full max-w-[414px] mx-auto bg-[#FFFFFF] block lg:max-w-[1440px] lg:h-[271px] lg:mx-auto lg:bg-[#FFFFFF] lg:block">
      <div className="w-full px-0 pt-6 pb-6 flex flex-col gap-5 lg:w-[1088px] lg:h-[271px] lg:mx-auto lg:pb-[48px] lg:flex lg:items-end lg:justify-center">
        {/* Row: 5 kart yan yana */}
        <div className="w-full flex flex-col gap-5 lg:w-[1088px] lg:h-[223px] lg:flex-row lg:gap-[15px] lg:justify-between">
          {images.map((src, i) => (
            <Card src={src} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
