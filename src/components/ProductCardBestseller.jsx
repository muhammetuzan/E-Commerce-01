import React from "react";


const ProductCardBestseller = ({ image, name = "Graphic Design", price = 16.48, category = "Product" }) => (
  <div className="w-[348px] h-[589px] bg-white rounded-[9px] overflow-hidden flex flex-col md:w-[238px] md:h-[442px]">
    {/* Image section */}
    <div className="w-[348px] h-[427px] flex items-center justify-center bg-gray-100 md:w-[238px] md:h-[280px]">
      <img src={image} alt={name} className="w-full h-full object-cover" />
    </div>
    {/* Frame 3: Info section */}
    <div className="w-[348px] h-[162px] flex flex-col justify-between pt-[25px] pr-[25px] pb-[35px] pl-[25px] md:w-[238px] md:h-[162px]">
      <h4 className="font-montserrat font-bold text-[18px] leading-[28px] tracking-[0.1px] text-[#252B42] text-center line-clamp-2">{name}</h4>
      <div className="flex gap-2 items-center justify-center">
        <span className="font-montserrat font-bold text-[16px] leading-[24px] tracking-[0.1px] text-[#BDBDBD]">${(price * 1.5).toFixed(2)}</span>
        <span className="font-montserrat font-bold text-[16px] leading-[24px] tracking-[0.1px] text-[#23856D]">${price.toFixed(2)}</span>
      </div>
    </div>
  </div>
);

export default ProductCardBestseller;
