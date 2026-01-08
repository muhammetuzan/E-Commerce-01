import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSort, setFilter } from "../store/actions";
import { Grid, List } from "lucide-react";
import { MdKeyboardArrowDown } from "react-icons/md";
import FourSquareIcon from "../assets/ikonvektorleri/4kare.png";

export default function FilterRow() {
    const dispatch = useDispatch();
    const sort = useSelector(state => state.product.sort);
    const filter = useSelector(state => state.product.filter);
    const total = useSelector(state => state.product.total);
    
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
    <div className="w-[412px] h-[216px] mx-auto bg-white lg:w-full lg:h-[98px] lg:bg-white lg:flex lg:items-center lg:justify-center">
      <div className="w-[412px] h-[216px] pt-[24px] pb-[24px] flex items-center justify-center lg:w-[1050px] lg:h-[98px] lg:bg-white lg:mx-auto lg:flex lg:items-center lg:gap-[80px] lg:pt-[24px] lg:pb-[24px]">
        <div className="w-[252px] h-[168px] flex flex-col gap-[24px] items-center justify-center lg:w-[1049px] lg:h-[50px] lg:flex-row lg:justify-between lg:gap-0">
          {/* Üstteki sort: sonuç sayısı */}
          <div className="w-[168px] h-[24px] flex items-center justify-center pr-[1px] pl-[1px] lg:justify-start">
            <span className="w-[166px] h-[24px] flex items-center justify-center font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#737373] text-center">
              Showing all {total} results
            </span>
          </div>
          {/* Ortadaki sort: Views ikonları */}
          <div className="w-[177px] h-[46px] flex items-center gap-[15px] px-[1px] justify-between lg:w-[177px] lg:h-[46px] lg:gap-[15px] lg:px-[1px]">
            <span className="w-[53px] h-[24px] font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#737373] flex items-center">Views:</span>
            <div className="w-[107px] h-[46px] flex items-center gap-[15px] justify-between">
              <button className="w-[46px] h-[46px] flex items-center justify-center rounded-[5px] border border-[#ECECEC] bg-white p-[15px]">
                <span className="w-[16px] h-[16px] flex items-center justify-center">
                  <img src={FourSquareIcon} alt="Grid" width={14} height={14} style={{marginTop: '1px', marginLeft: '1px'}} />
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
          <div className="w-[252px] h-[50px] flex items-center gap-[15px] px-[1px] justify-center lg:w-[400px] lg:h-[50px] lg:justify-end lg:gap-[15px] lg:px-[1px]">
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
              <MdKeyboardArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737373]" size={16} />
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
