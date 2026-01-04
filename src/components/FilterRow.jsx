import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSort, setFilter } from "../store/actions";
import { Grid, List } from "lucide-react";

export default function FilterRow() {
    const dispatch = useDispatch();
    const sort = useSelector(state => state.product.sort);
    const filter = useSelector(state => state.product.filter);
    
    const [dropdownOpen, setDropdownOpen] = useState(false);
    
    const sortOptions = [
      { label: 'Price: Low to High', value: 'price:asc' },
      { label: 'Price: High to Low', value: 'price:desc' },
      { label: 'Rating: Low to High', value: 'rating:asc' },
      { label: 'Rating: High to Low', value: 'rating:desc' },
    ];
    
    const handleSortChange = (value) => {
      dispatch(setSort(value));
      setDropdownOpen(false);
    };
    
    const handleFilterChange = (e) => {
      const value = e.target.value;
      dispatch(setFilter(value));
    };
    
    const currentSortLabel = sort 
      ? sortOptions.find(opt => opt.value === sort)?.label || 'Sort'
      : 'Sort';
  return (
    <div className="w-[412px] h-[216px] mx-auto bg-white md:w-full md:h-[98px] md:bg-white md:flex md:items-center md:justify-center">
      <div className="w-[412px] h-[216px] pt-[24px] pb-[24px] flex items-center justify-center md:w-[1050px] md:h-[98px] md:bg-white md:mx-auto md:flex md:items-center md:gap-[80px] md:pt-[24px] md:pb-[24px]">
        <div className="w-[252px] h-[168px] flex flex-col gap-[24px] items-center justify-center md:w-[1049px] md:h-[50px] md:flex-row md:justify-between md:gap-0">
          {/* Üstteki sort: sonuç sayısı */}
          <div className="w-[168px] h-[24px] flex items-center justify-center pr-[1px] pl-[1px] md:justify-start">
            <span className="w-[166px] h-[24px] flex items-center justify-center font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#737373] text-center">
              Showing all 12 results
            </span>
          </div>
          {/* Ortadaki sort: Views ikonları */}
          <div className="w-[177px] h-[46px] flex items-center gap-[15px] px-[1px] justify-between md:w-[177px] md:h-[46px] md:gap-[15px] md:px-[1px]">
            <span className="w-[53px] h-[24px] font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#737373] flex items-center">Views:</span>
            <div className="w-[107px] h-[46px] flex items-center gap-[15px] justify-between">
              <button className="w-[46px] h-[46px] flex items-center justify-center rounded-[5px] border border-[#ECECEC] bg-white p-[15px]">
                <span className="w-[16px] h-[16px] flex items-center justify-center">
                  {/* 4 küçük kareden oluşan grid ikon */}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginTop: '1px', marginLeft: '1px'}}>
                    <rect x="0" y="0" width="6" height="6" rx="2" fill="#252B42" />
                    <rect x="8" y="0" width="6" height="6" rx="2" fill="#252B42" />
                    <rect x="0" y="8" width="6" height="6" rx="2" fill="#252B42" />
                    <rect x="8" y="8" width="6" height="6" rx="2" fill="#252B42" />
                  </svg>
                </span>
              </button>
              <button className="w-[46px] h-[46px] flex items-center justify-center rounded-[5px] border border-[#ECECEC] bg-white p-[15px]">
                <span className="w-[16px] h-[16px] flex items-center justify-center">
                  <List size={14} className="text-[#737373]" style={{marginTop: '3px', marginLeft: '0.5px'}} />
                </span>
              </button>
            </div>
          </div>
          {/* Alttaki sort: Sort ve Filter input */}
          <div className="w-[252px] h-[50px] flex items-center gap-[15px] px-[1px] justify-center md:w-[400px] md:h-[50px] md:justify-end md:gap-[15px] md:px-[1px]">
            {/* Filter Input */}
            <input
              type="text"
              placeholder="Filter..."
              value={filter}
              onChange={handleFilterChange}
              className="w-[120px] h-[50px] px-3 rounded-[5px] border border-[#DDDDDD] bg-[#F9F9F9] font-montserrat text-[14px] text-[#737373] focus:outline-none focus:border-[#23A6F0]"
            />
            
            {/* Sort Dropdown */}
            <div className="relative w-[141px] h-[50px] rounded-[5px] border border-[#DDDDDD] bg-[#F9F9F9] flex items-center px-3 cursor-pointer" onClick={() => setDropdownOpen((v) => !v)}>
              <span className="font-montserrat font-normal text-[14px] leading-[28px] tracking-[0.2px] text-[#737373]">{currentSortLabel}</span>
              <svg className="absolute right-3 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6L8 10L12 6" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {dropdownOpen && (
                <div className="absolute left-0 top-full mt-1 w-full rounded-[5px] border border-[#DDDDDD] bg-[#F9F9F9] shadow z-10">
                  {sortOptions.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => handleSortChange(option.value)}
                      className="px-3 py-2 font-montserrat text-[14px] text-[#737373] hover:bg-[#ECECEC] cursor-pointer"
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
