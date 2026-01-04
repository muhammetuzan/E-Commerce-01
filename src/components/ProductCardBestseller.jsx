import React from "react";


const ProductCardBestseller = ({ image }) => (
  <div className="w-[348px] h-[589px] bg-white rounded-[9px] overflow-hidden flex flex-col md:w-[238px] md:h-[442px]">
    {/* Image section */}
    <div className="w-[348px] h-[427px] flex items-center justify-center bg-gray-100 md:w-[238px] md:h-[280px]">
      <img src={image} alt="Graphic Design" className="w-full h-full object-cover" />
    </div>
    {/* Frame 3: Info section */}
    <div className="w-[348px] h-[162px] flex flex-col gap-[10px] pt-[25px] pr-[25px] pb-[35px] pl-[25px] md:w-[238px] md:h-[162px]">
      <h4 className="font-montserrat font-bold text-[18px] leading-[28px] tracking-[0.1px] text-[#252B42] text-left">Graphic Design</h4>
      <span className="font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#737373] text-left">English Department</span>
      <div className="flex gap-2 items-center">
        <span className="font-montserrat font-bold text-[16px] leading-[24px] tracking-[0.1px] text-[#BDBDBD] text-left">$16.48</span>
        <span className="font-montserrat font-bold text-[16px] leading-[24px] tracking-[0.1px] text-[#23856D] text-left">$6.48</span>
      </div>
    </div>
  </div>
);

export default ProductCardBestseller;
