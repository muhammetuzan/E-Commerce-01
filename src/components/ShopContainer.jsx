import React from "react";
import { ChevronRight } from "lucide-react";

export default function ShopContainer() {
  return (
    <div
      className="w-full bg-[#FAFAFA] pt-[24px] pb-[24px] h-[202px] md:h-[92px] md:px-0"
    >
      <div
        className="w-full h-[154px] flex flex-col gap-[30px] md:flex-row md:items-center md:justify-center md:w-[1049px] md:h-[44px] md:gap-[30px] md:mx-auto"
      >
        {/* col-md-6 - Shop Title */}
        <div
          className="w-full h-[80px] pt-[24px] pb-[24px] flex items-center justify-center md:justify-start md:w-[510px] md:h-[32px] md:p-0"
        >
          <span
            className="w-[63px] h-[32px] font-montserrat font-bold text-[24px] leading-[32px] tracking-[0.1px] text-center text-[#252B42] md:w-auto md:text-left md:h-[32px]"
          >
            Shop
          </span>
        </div>
        {/* col-md-10 - Breadcrumb */}
        <div
          className="w-full h-[44px] flex items-center justify-center md:justify-end md:w-[509px] md:h-[44px]"
        >
          <div
            className="flex items-center gap-[15px] w-[117px] h-[44px] py-[10px] md:w-[119px] md:gap-[15px]"
          >
            <span
              className="w-[43px] h-[24px] font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-center text-[#252B42]"
            >
              Home
            </span>
            {/* Vector icon: right arrow */}
            <span className="inline-flex items-center justify-center w-[16px] h-[16px]">
              <ChevronRight size={16} strokeWidth={2} color="#BDBDBD" className="w-[16px] h-[16px] min-w-[16px] min-h-[16px] max-w-[16px] max-h-[16px]" />
            </span>
            <span
              className="w-[37px] h-[24px] font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-center text-[#737373]"
            >
              Shop
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
