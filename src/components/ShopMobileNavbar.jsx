
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, Instagram, Youtube, Facebook, Twitter, Menu, User, Search, ShoppingCart, Heart } from "lucide-react";

export default function ShopMobileNavbar({ onSignUpClick }) {
  // Desktop navbar için gerekli state ve fonksiyonlar
  const shopDropdown = [
    {
      label: "Kadın",
      items: ["Bags", "Belts", "Cosmetics", "Bags", "Hats"],
    },
    {
      label: "Erkek",
      items: ["Bags", "Belts", "Cosmetics", "Bags", "Hats"],
    },
  ];
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const shopBtnRef = useRef(null);
  // Dropdown mouse enter/leave kontrolü için gecikmeli kapanış
  const closeDropdownTimeout = useRef();
  const handleShopMouseEnter = () => {
    if (closeDropdownTimeout.current) clearTimeout(closeDropdownTimeout.current);
    setDropdownOpen(true);
  };
  const handleShopMouseLeave = () => {
    closeDropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 120);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        shopBtnRef.current &&
        !shopBtnRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    }
    function handleEsc(event) {
      if (event.key === "Escape") {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEsc);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [dropdownOpen]);

  return (
    <>
      {/* Desktop Top Bar - Sadece lg ve üzeri */}
      <div className="hidden lg:block w-full text-white" style={{ backgroundColor: "#23856D" }}>
        <div className="w-full">
          <div className="max-w-[1440px] mx-auto w-full h-[58px] flex items-center px-0">
            <div className="flex w-full h-[46px] items-center justify-between">
              {/* 1. col-md-4 */}
              <div className="flex items-center gap-2 pl-[25px]">
                <button className="flex items-center gap-[5px] rounded-[5px] px-[10px] py-[10px] h-[44px] min-w-[145px]">
                  <Phone size={16} className="text-white" />
                  <h6 className="font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-white min-w-[104px]">(225) 555-0118</h6>
                </button>
                <button className="flex items-center gap-[5px] rounded-[5px] px-[10px] py-[10px] h-[44px] min-w-[260px]">
                  <Mail size={16} className="text-white" />
                  <h6 className="font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-white min-w-[180px]">michelle.rivera@example.com</h6>
                </button>
              </div>
              {/* 2. col-md-4 */}
              <div className="mx-8 flex items-center justify-center">
                <h6 className="font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-white text-center">
                  Follow Us  and get a chance to win 80% off
                </h6>
              </div>
              {/* 3. col-md-4 */}
              <div className="flex items-center gap-2 pr-[30px] justify-end">
                <h6 className="font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-white w-auto">
                  Follow Us :
                </h6>
                <div className="flex gap-[10px] items-center">
                  <a href="#" className="flex items-center justify-center w-[26px] h-[26px] p-[5px] rounded bg-transparent">
                    <Instagram size={16} className="text-white" />
                  </a>
                  <a href="#" className="flex items-center justify-center w-[26px] h-[26px] p-[5px] rounded bg-transparent">
                    <Youtube size={16} className="text-white" />
                  </a>
                  <a href="#" className="flex items-center justify-center w-[26px] h-[26px] p-[5px] rounded bg-transparent">
                    <Facebook size={16} className="text-white" />
                  </a>
                  <a href="#" className="flex items-center justify-center w-[26px] h-[26px] p-[5px] rounded bg-transparent">
                    <Twitter size={16} className="text-white" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Desktop Navbar - Sadece lg ve üzeri */}
      <nav className="hidden lg:block w-full bg-white shadow z-50 relative">
        <div className="w-full flex justify-center">
          <div className="w-[1437px] flex items-center h-[58px] mx-auto relative pr-[38px]">
            {/* Brand */}
            <div className="w-[187px] h-[58px] flex items-center pl-[38px]">
              <span className="font-montserrat font-bold text-[24px] leading-[32px] tracking-[0.1px] text-[#252B42]">Bandage</span>
            </div>
            {/* Main Nav */}
            <div className="flex items-center w-[1155px] h-[58px] ml-[70px] pr-[38px] justify-between">
              {/* Left Nav */}
              <ul className="flex items-center gap-[15px] w-[361px] h-[25px] mt-[16.5px]">
                <li className="w-[43px] h-[24px] flex items-center justify-center">
                  <Link to="/" className="w-[43px] h-[24px] flex items-center justify-center">
                    <span className="font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-center text-[#737373]">Home</span>
                  </Link>
                </li>
                <li
                  className="w-[63px] h-[25px] flex items-center gap-[10px] relative"
                  onMouseEnter={handleShopMouseEnter}
                  onMouseLeave={handleShopMouseLeave}
                >
                  <button
                    ref={shopBtnRef}
                    className="flex items-center font-montserrat font-medium text-[14px] leading-[28px] tracking-[0.2px] text-[#252B42] focus:outline-none"
                  >
                    <span className="w-[38px] h-[28px]">Shop</span>
                    <svg className={`ml-2 transition-transform duration-200 ${dropdownOpen ? 'rotate-0' : '-rotate-90'}`} width="10" height="5.7" viewBox="0 0 10 5.7" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L5 5L9 1" stroke="#252B42" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  {dropdownOpen && (
                    <div
                      ref={dropdownRef}
                      className="absolute left-0 top-[36px] w-[396px] max-w-[90vw] h-[272px] bg-white shadow-lg rounded z-50 flex"
                    >
                      {/* Kadın */}
                      <div className="flex flex-col w-[186px] h-full">
                        <button
                          className="w-[186px] h-[56px] px-6 py-4 font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#252B42] text-left hover:bg-gray-100 transition"
                          style={{paddingTop:16,paddingBottom:16,paddingLeft:24,paddingRight:24}}
                        >
                          Kadın
                        </button>
                        <div className="w-[186px] h-[216px] px-6 py-4 flex flex-col gap-4" style={{paddingTop:16,paddingBottom:16,paddingLeft:24,paddingRight:24}}>
                          {shopDropdown[0].items.map((item, i) => (
                            <a
                              key={i}
                              href="#"
                              className="font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#737373] w-[38px] h-[24px] hover:text-[#23A6F0] transition-colors  cursor-pointer"
                            >
                              {item}
                            </a>
                          ))}
                        </div>
                      </div>
                      {/* Erkek */}
                      <div className="flex flex-col w-[210px] h-full">
                        <button
                          className="w-[210px] h-[56px] px-6 py-4 font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#252B42] text-left hover:bg-gray-100 transition"
                          style={{paddingTop:16,paddingBottom:16,paddingLeft:24,paddingRight:24}}
                        >
                          Erkek
                        </button>
                        <div className="w-[210px] h-[216px] px-6 py-4 flex flex-col gap-4" style={{paddingTop:16,paddingBottom:16,paddingLeft:24,paddingRight:24}}>
                          {shopDropdown[1].items.map((item, i) => (
                            <a
                              key={i}
                              href="#"
                              className="font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#737373] w-[38px] h-[24px] hover:text-[#23A6F0] transition-colors  cursor-pointer"
                            >
                              {item}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </li>
                <li className="w-[45px] h-[24px] flex items-center justify-center">
                  <Link to="/aboutus" className="w-[45px] h-[24px] flex items-center justify-center">
                    <span className="font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-center text-[#737373]">About</span>
                  </Link>
                </li>
                 <li className="w-[50px] h-[24px] flex items-center justify-center">
                   <Link to="/team" className="w-[50px] h-[24px] flex items-center justify-center">
                     <span className="font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-center text-[#737373]">Team</span>
                   </Link>
                 </li>
                <li className="w-[33px] h-[24px] flex items-center justify-center">
                  <a href="#" className="w-[33px] h-[24px] flex items-center justify-center">
                    <span className="font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-center text-[#737373]">Blog</span>
                  </a>
                </li>
                <li className="w-[58px] h-[24px] flex items-center justify-center">
                  <Link to="/contact" className="w-[58px] h-[24px] flex items-center justify-center">
                    <span className="font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-center text-[#737373]">Contact</span>
                  </Link>
                </li>
                <li className="w-[44px] h-[24px] flex items-center justify-center">
                  <a href="#" className="w-[44px] h-[24px] flex items-center justify-center">
                    <span className="font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-center text-[#737373]">Pages</span>
                  </a>
                </li>
              </ul>
              {/* Right Nav */}
              <ul className="flex items-center gap-[10px] w-[324px] h-[54px] ml-[40px]">
                <li className="w-[166px] h-[54px] flex items-center">
                  <button className="flex items-center gap-[5px] w-[166px] h-[54px] rounded-[37px] px-[15px] py-[15px] whitespace-nowrap overflow-hidden">
                    <User size={14} className="text-[#23A6F0] flex-shrink-0" />
                    <span className="font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#23A6F0]" style={{width:'119px',height:'24px'}}>Login / Register</span>
                  </button>
                </li>
                <li className="w-[46px] h-[46px] flex items-center">
                  <button className="flex items-center justify-center w-[46px] h-[46px] rounded-[37px] p-[15px] gap-[5px]">
                    <Search size={16} className="text-[#23A6F0]" />
                  </button>
                </li>
                <li className="w-[56px] h-[46px] flex items-center">
                  <button className="flex items-center w-[56px] h-[46px] rounded-[37px] p-[15px] gap-[5px]">
                    <ShoppingCart size={16} className="text-[#23A6F0]" />
                    <span className="font-montserrat font-normal text-[12px] leading-[16px] tracking-[0.2px] text-[#23A6F0] w-[5px] h-[16px] flex items-center justify-center">1</span>
                  </button>
                </li>
                <li className="w-[56px] h-[46px] flex items-center">
                  <button className="flex items-center w-[56px] h-[46px] rounded-[37px] p-[15px] gap-[5px]">
                    <Heart size={16} className="text-[#23A6F0]" />
                    <span className="font-montserrat font-normal text-[12px] leading-[16px] tracking-[0.2px] text-[#23A6F0] w-[5px] h-[16px] flex items-center justify-center">1</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      {/* Mobile Navbar - sadece md ve altı */}
      <nav className="relative w-[414px] h-[879px] bg-white mx-auto block md:hidden lg:hidden">
        {/* Brand ve Menu Icon Row - Figma'ya uygun hizalama */}
        <div className="absolute top-[23px] left-[35px] w-[344px] h-[58px]">
          <span className="absolute top-[13px] left-0 w-[108px] h-[32px] font-montserrat font-bold text-[24px] leading-[32px] tracking-[0.1px] text-[#252B42]">
            Bandage
          </span>
          <div className="absolute top-[13px] right-0">
            <Menu size={24} className="text-[#3C403D] cursor-pointer" />
          </div>
        </div>
        {/* Menü Bloğu - Üstte */}
        <div className="absolute top-[149px] left-[145.5px] w-[122px] h-[420px] flex flex-col gap-[30px] opacity-100">
          <Link to="/" className="font-montserrat font-normal text-center text-[#252B42] text-[30px] leading-[45px] tracking-[0.2px]">
            Home
          </Link>
          <span className="font-montserrat font-normal text-center text-[#737373] text-[30px] leading-[45px] tracking-[0.2px]">
            Shop
          </span>
           <Link to="/team" className="font-montserrat font-normal text-center text-[#737373] text-[30px] leading-[45px] tracking-[0.2px]">
             Team
           </Link>
          <span className="font-montserrat font-normal text-center text-[#737373] text-[30px] leading-[45px] tracking-[0.2px]">
            <Link to="/aboutus" className="font-montserrat font-normal text-center text-[#737373] text-[30px] leading-[45px] tracking-[0.2px]">About</Link>
          </span>
          <span className="font-montserrat font-normal text-center text-[#737373] text-[30px] leading-[45px] tracking-[0.2px]">
            Blog
          </span>
          <Link to="/contact" className="font-montserrat font-normal text-center text-[#737373] text-[30px] leading-[45px] tracking-[0.2px]">
            Contact
          </Link>
          <span className="font-montserrat font-normal text-center text-[#737373] text-[30px] leading-[45px] tracking-[0.2px]">
            Pages
          </span>
        </div>
        {/* Login/Register ve ikonlar bloğu - Altta */}
        <div className="absolute top-[590px] left-[52px] w-[310px] flex flex-col items-center">
          <button onClick={onSignUpClick} className="flex items-center gap-[5px] w-[301px] h-[75px] rounded-[37px] px-[15px] py-[15px] bg-white hover:bg-gray-100 transition">
            <User size={27} className="text-[#23A6F0]" />
            <span className="font-montserrat font-normal text-[30px] leading-[45px] tracking-[0.2px] text-[#23A6F0] text-center w-[239px] h-[45px]">
              Login / Register
            </span>
          </button>
          {/* Search Icon - teğet hizalama */}
          <div className="w-[64px] h-[64px] flex justify-center">
            <button className="flex justify-center w-[64px] h-[64px] rounded-[37px] p-[15px] bg-white">
              <Search size={42} className="text-[#23A6F0]" />
            </button>
          </div>
          {/* Shopping Cart Icon - teğet hizalama */}
          <div className="w-[77px] h-[67px] flex justify-center mt-[0px]">
            <button className="flex items-center gap-[5px] w-[77px] h-[67px] rounded-[37px] p-[15px] bg-white">
              <div className="w-[37px] h-[37px] flex justify-center">
                <ShoppingCart size={42} className="text-[#23A6F0]" />
              </div>
              <span className="font-montserrat font-normal text-[12px] leading-[16px] tracking-[0.2px] text-[#23A6F0] text-center w-[5px] h-[16px]">
                1
              </span>
            </button>
          </div>
          {/* Heart Icon Block - Figma specs */}
          <div className="w-[69px] h-[59px] flex justify-center mt-[0px]">
            <button className="flex items-center gap-[5px] w-[69px] h-[59px] rounded-[37px] p-[15px] bg-white">
              <div className="w-[37px] h-[37px] flex justify-center">
                <Heart size={42} className="text-[#23A6F0]" />
              </div>
              <span className="font-montserrat font-normal text-[12px] leading-[16px] tracking-[0.2px] text-[#23A6F0] text-center w-[5px] h-[16px]">
                1
              </span>
            </button>
          </div>
        </div>
        {/* Diğer ikonlar buraya eklenecek */}
      </nav>
    </>
  );
}
