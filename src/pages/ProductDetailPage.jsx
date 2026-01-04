import ProductCardBestseller from "../components/ProductCardBestseller";
import bestsellerImg1 from '../assets/product-cards/0bfcbfefc49b63d0071c5ef94c3d4dde5f05172f.jpg';
import bestsellerImg2 from '../assets/product-cards/f454f9ee9a7979dac6cbd7699a260c7deacd7b13.jpg';
import bestsellerImg3 from '../assets/product-cards/685f2d7c3cabc3250d9fd223e5b93cebd2761439.jpg';
import bestsellerImg4 from '../assets/product-cards/079b4c5d47938d7b09087b31f361063fb40f9a11.jpg';
import bestsellerImg5 from '../assets/product-cards/926bf1d65669af4e049e20ceb30aa6408b6a79f3.jpg';
import bestsellerImg6 from '../assets/product-cards/a93e41b42e460896a15fe5f82a56836939f30577.jpg';

import { ChevronLeft, ChevronRight, Star } from "lucide-react";

import React, { useState } from "react";
import { useParams } from "react-router-dom";

import MobileClients from "../components/MobileClients";
import Footer from "../layout/Footer";
import productImg1 from '../assets/product-cards/2b79e11ed885dbe3ab31e6f0c95ec64b26599246.jpg';
import productImg2 from '../assets/product-cards/882355260767f5620ba9dda5365be14f4ce71741.jpg';
import productDescImg from '../assets/product-cards/8b0c0f76c949a2cffacf01d40c82241e905719cb.jpg';

const ProductDetailPage = () => {
  const { id } = useParams();
  // Ürün verisini id ile fetch edebilirsiniz
  const images = [productImg1, productImg2];
  const [selectedImage, setSelectedImage] = useState(0);
  return (
    <div className="w-full min-h-screen bg-white">
      {/* Breadcrumb Container - Sıfırdan */}
      <div className="bg-[#FAFAFA] w-[414px] h-[92px] pt-6 pb-6 mx-auto md:w-[1440px] md:h-[92px] md:pt-6 md:pb-6 md:mx-auto">
        {/* Row */}
        <div className="w-[414px] h-[44px] flex items-center justify-center gap-[30px] mx-auto md:w-[1033px] md:h-[44px] md:gap-[30px] md:justify-start">
          {/* col-md */}
          <div className="w-[414px] h-[44px] flex items-center gap-[5px] md:w-[509px] md:h-[44px] md:gap-[5px] md:justify-start">
            {/* Breadcrumb */}
            <nav className="w-[117px] h-[44px] flex items-center justify-center gap-[15px] py-[10px] mx-auto md:w-[119px] md:justify-start md:mx-0 md:h-[44px] md:gap-[15px] md:py-[10px]">
              <span className="font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#252B42]">Home</span>
              <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L6 6L1 11" stroke="#BDBDBD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#737373]">Shop</span>
            </nav>
          </div>
        </div>
      </div>
      
      {/* Product Detail Card Section */}
      <div className="w-full flex justify-center bg-[#FAFAFA] md:w-[1440px] md:h-[598px] md:mx-auto">
        <div className="w-[348px] h-[991px] pt-12 pb-12 flex flex-col mx-auto md:w-[1050px] md:h-[598px] md:pb-0 md:ml-0 md:mr-0 md:pt-0">
          <div className="flex flex-col justify-between w-[348px] h-[895px] md:flex-row md:w-[1050px] md:h-[550px] md:gap-[30px] md:pt-0 md:pb-[48px] md:items-start md:justify-start">
            {/* Üstteki col-md-6: Slider ve indicator */}
            <div className="w-[348px] h-[394px] flex flex-col items-center md:w-[506px] md:h-[546px]">
              <div className="w-[348px] h-[394px] relative flex flex-col items-center mb-[30px] rounded-[5px] opacity-100 md:w-[506px] md:h-[546px] md:rounded-[5px] md:opacity-100">
                {/* Carousel/Slider */}
                <div className="w-[348px] h-[277px] rounded-[5px] overflow-hidden bg-gray-100 flex items-center justify-center relative md:w-[506px] md:h-[450px]">
                  {/* Sol ok */}
                  <button
                    className="absolute left-10 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center"
                    onClick={() => setSelectedImage((selectedImage - 1 + images.length) % images.length)}
                    aria-label="Önceki görsel"
                    style={{padding: 0}}  
                  >
                    <ChevronLeft size={50} strokeWidth={1.5} color="#FFFFFF" />
                  </button>
                  <img src={images[selectedImage]} alt={`Product ${selectedImage + 1}`} className="w-full h-full object-cover" />
                  {/* Sağ ok */}
                  <button
                    className="absolute right-10 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center"
                    onClick={() => setSelectedImage((selectedImage + 1) % images.length)}
                    aria-label="Sonraki görsel"
                    style={{padding: 0}}
                  >
                    <ChevronRight size={50} strokeWidth={1.5} color="#FFFFFF" />
                  </button>
                </div>
                {/* Indicator */}
                <div className="w-[219px] h-[75px] flex gap-[19px] justify-start self-start absolute left-0 top-[319px] md:w-[219px] md:h-[75px] md:top-[471px] md:opacity-100">
                  {images.map((img, idx) => (
                    <div
                      key={idx}
                      className={`w-[100px] h-[75px] rounded-[5px] overflow-hidden border-2 ${selectedImage === idx ? 'border-[#23A6F0]' : 'border-transparent'} cursor-pointer ${selectedImage !== idx ? 'opacity-50' : ''}`}
                      onClick={() => setSelectedImage(idx)}
                    >
                      <img src={img} alt={`Product ${idx + 1} thumb`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Alttaki col-md-6: Bilgi alanı (yeni) */}
            <div className="w-[348px] h-[471px] flex flex-col gap-[23px] px-6 pt-[11px] pb-0 opacity-100 mt-[30px] relative md:w-[510px] md:h-[471px] md:px-0 md:pt-[11px] md:pb-0 md:mt-0">
              {/* Floating Phone başlığı */}
              <h2 className="w-[156px] h-[30px] font-montserrat font-semibold text-[20px] leading-[30px] tracking-[0.2px] antialiased text-[#252B42] whitespace-nowrap md:absolute md:top-[11px] md:left-[24px]">Floating Phone</h2>
              {/* Frame31: Yıldızlar ve 10 Reviews */}
              <div className="w-[221px] h-[24px] flex items-center gap-[10px] absolute top-[53px] left-[24px] opacity-100 md:w-[221px] md:h-[24px] md:top-[53px] md:left-[24px]">
                {/* Yıldızlar */}
                <div className="flex items-center gap-[5px] w-[130px] h-[22px]">
                  <Star size={22} className="text-[#F3CD03]" fill="#F3CD03" />
                  <Star size={22} className="text-[#F3CD03]" fill="#F3CD03" />
                  <Star size={22} className="text-[#F3CD03]" fill="#F3CD03" />
                  <Star size={22} className="text-[#F3CD03]" fill="#F3CD03" />
                  <Star size={22} className="text-[#BDBDBD]" fill="#BDBDBD" />
                </div>
                {/* 10 Reviews */}
                <span className="text-[#737373] font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] whitespace-nowrap flex-nowrap flex items-center">10 Reviews</span>
              </div>
              {/* Fiyat (h5) */}
              <h5 className="w-[108px] h-[32px] text-[#252B42] font-montserrat font-bold text-[24px] leading-[32px] tracking-[0.1px] text-center opacity-100 absolute top-[97px] left-[24px] md:w-[108px] md:h-[32px] md:top-[97px] md:left-[24px]">$1,139.33</h5>
              {/* Availability Row */}
              <div className="w-[161px] h-[24px] flex items-center gap-[5px] absolute top-[134px] left-[24px] opacity-100 md:w-[161px] md:h-[24px] md:top-[134px] md:left-[24px]">
                <span className="w-[94px] h-[24px] font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#737373]">Availability :</span>
                <span className="w-[62px] h-[24px] font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#23A6F0] text-right">In Stock</span>
              </div>
              {/* Açıklama Paragrafı - Mobile */}
              <p className="w-[271px] h-[100px] font-montserrat font-normal text-[14px] leading-[20px] tracking-[0.2px] text-[#858585] absolute top-[190px] left-[24px] opacity-100 md:hidden">
                Met minim Mollie non desert<br />
                Alamo est sit cliquey dolor do<br />
                met sent. RELIT official consequent<br />
                door ENIM RELIT Mollie. Excitation<br />
                venial consequent sent nostrum met.
              </p>
              {/* Açıklama Paragrafı - Desktop */}
              <p className="hidden md:block w-[271px] h-[100px] font-montserrat font-normal text-[14px] leading-[20px] tracking-[0.2px] text-[#858585] absolute top-[190px] left-[24px] opacity-100 md:w-[464px] md:h-[60px] md:top-[190px] md:left-[24px]">
                Met minim Mollie non desert Alamo est sit cliquey dolor<br /> do met sent. RELIT official consequent door ENIM RELIT Mollie.<br/> Excitation venial consequent sent nostrum met.
              </p>
              {/* Figma hr çizgisi */}
              <hr className="w-[283px] border-t border-[#BDBDBD] absolute top-[306px] left-[29px] opacity-100 md:w-[445px] md:top-[277px] md:left-[25px]" style={{height:0, borderWidth:1}} />
              {/* Renkli Toplar */}
              <div className="w-[150px] h-[30px] flex items-center gap-[10px] absolute top-[325px] left-[24px] opacity-100 md:w-[150px] md:h-[30px] md:top-[306px] md:left-[24px]">
                <span className="w-[30px] h-[30px] rounded-full bg-[#23A6F0] inline-block"></span>
                <span className="w-[30px] h-[30px] rounded-full bg-[#2DC071] inline-block"></span>
                <span className="w-[30px] h-[30px] rounded-full bg-[#E77C40] inline-block"></span>
                <span className="w-[30px] h-[30px] rounded-full bg-[#252B42] inline-block"></span>
              </div>
              {/* Select Options ve ikonlar bölümü */}
              <div className="w-[298px] h-[44px] flex items-center gap-[10px] absolute top-[403px] left-[24px] opacity-100 md:w-[298px] md:h-[44px] md:top-[403px] md:left-[24px]">
                {/* Select Options butonu */}
                <button className="w-[148px] h-[44px] flex items-center justify-center px-[20px] py-[10px] gap-[10px] rounded-[5px] bg-[#23A6F0]">
                  <span className="font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-center text-white whitespace-nowrap">Select Options</span>
                </button>
                {/* Kalp kutusu */}
                <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-white border border-[#E8E8E8]">
                  <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.995 14.5C8.7 14.5 8.4 14.4 8.2 14.2C3.1 9.7 0.6 7.4 0.6 4.8C0.6 2.6 2.3 0.9 4.5 0.9C5.7 0.9 6.8 1.5 7.5 2.4C8.2 1.5 9.3 0.9 10.5 0.9C12.7 0.9 14.4 2.6 14.4 4.8C14.4 7.4 11.9 9.7 6.8 14.2C6.6 14.4 6.3 14.5 6 14.5H8.995Z" stroke="#252B42" strokeWidth="1" fill="none"/>
                  </svg>
                </div>
                {/* Sepet kutusu */}
                <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-white border border-[#E8E8E8]">
                  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5 5.5H16.5L15 13.5H4L2.5 5.5Z" stroke="#252B42" strokeWidth="1.2" fill="none"/>
                    <path d="M6 5.5V4C6 3.17157 6.67157 2.5 7.5 2.5H11.5C12.3284 2.5 13 3.17157 13 4V5.5" stroke="#252B42" strokeWidth="1.2" fill="none"/>
                    <circle cx="6" cy="15.5" r="1" stroke="#252B42" strokeWidth="1" fill="none"/>
                    <circle cx="13" cy="15.5" r="1" stroke="#252B42" strokeWidth="1" fill="none"/>
                  </svg>
                </div>
                {/* Göz kutusu */}
                <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-white border border-[#E8E8E8]">
                  <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="8" cy="5.5" rx="7" ry="4.5" stroke="#000" strokeWidth="1" fill="none"/>
                    <circle cx="8" cy="5.5" r="2" fill="#000" />
                  </svg>
                </div>
              </div>
            </div>
            </div>
        </div>
      </div>
      {/* Product Description Section */}
      <section className="w-[414px] h-[1306px] bg-white mx-auto relative md:w-[1440px] md:h-[572px]">
        {/* Üstteki bar */}
        <div className="w-[414px] h-[91px] bg-white absolute top-0 left-5 md:w-[1440px] md:h-[91px] md:left-0">
          <nav className="w-[404px] h-[72px] flex md:w-[1051px] md:h-[72px] md:absolute md:top-[10px] md:left-[193px]">
            {/* 1. li */}
            <li className="w-[98px] h-[72px] list-none flex items-center justify-center md:w-[134px] md:h-[72px] md:absolute md:left-[280px] md:opacity-100">
              <a className="w-[98px] h-[72px] flex items-center justify-center px-[12px] py-[24px] gap-[8px] md:w-[134px] md:h-[72px]" href="#">
                <span className="w-[86px] h-[24px] font-montserrat font-semibold text-[14px] leading-[24px] tracking-[0.2px] text-center text-[#737373] underline underline-offset-2">Description</span>
              </a>
            </li>
            {/* 2. li */}
            <li className="w-[177px] h-[72px] list-none flex items-center justify-center ml-0 md:w-[220px] md:h-[72px] md:absolute md:left-[414px] md:opacity-100" style={{marginLeft:'0px'}}>
              <a className="w-[177px] h-[72px] flex items-center justify-center px-[12px] py-[24px] gap-[8px] whitespace-nowrap md:w-[220px] md:h-[72px]" href="#">
                <span className="w-[172px] h-[24px] font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-center text-[#737373] whitespace-nowrap">Additional Information</span>
              </a>
            </li>
            {/* 3. li */}
            <li className="w-[110px] h-[72px] list-none flex items-center justify-center ml-0 md:w-[138px] md:h-[72px] md:absolute md:left-[631px] md:opacity-100" style={{marginLeft:'0px'}}>
              <a className="w-[114px] h-[72px] flex items-center justify-center px-[12px] py-[24px] gap-[8px] md:w-[138px] md:h-[72px]" href="#">
                <span className="w-[62px] h-[24px] font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-center text-[#737373]">Reviews</span>
                <span className="w-[20px] h-[24px] font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-center text-[#23856D]">(0)</span>
              </a>
            </li>
          </nav>
          {/* Line 1 - Desktop only */}
          <hr className="hidden md:block w-[1049px] border-t border-[#ECECEC] absolute top-[86px] left-[195px] opacity-100" style={{height:0, borderWidth:'1px'}} />
        </div>
        
          {/* Content div - sibling to bar */}
          <div className="w-[332px] h-[1275px] absolute top-[91px] left-[41px] opacity-100 pt-[24px] pb-[80px] flex flex-col gap-[80px] md:w-[1056px] md:h-[499px] md:pt-[24px] md:pb-[48px] md:gap-[30px] md:opacity-100 md:absolute md:top-[108px] md:left-1/2 md:-translate-x-1/2">
            {/* Row container */}
            <div className="w-[332px] h-[1171px] flex flex-col gap-[30px] md:w-[1056px] md:h-[427px] md:flex-row md:gap-[30px] md:opacity-100">
            {/* 1. col-md-4 - Image */}
            <div className="w-[332px] h-[292px] opacity-100 relative md:w-[332px] md:h-[392px] md:opacity-100">
              {/* Unsplash background */}
              <div className="w-[325px] h-[282px] absolute left-[3px] rounded-[5.62px] bg-gray-200 md:w-[325px] md:h-[382px] md:left-[3px] md:rounded-[5.62px] md:bg-[#C4C4C433]">
                {/* Image */}
                <img src={productDescImg} alt="Product Description" className="w-[321px] h-[271px] rounded-[5.39px] object-cover absolute top-1 left-0.5 md:w-[316px] md:h-[372px] md:rounded-[5.39px]" />
              </div>
            </div>
            {/* 2. col-md-4 - Card */}
            <div className="w-[332px] h-[452px] opacity-100 md:w-[332px] md:h-[427px] md:opacity-100">
              <div className="w-[332px] h-[452px] py-[25px] gap-[30px] rounded-[9px] bg-white flex flex-col md:w-[332px] md:h-[427px] md:py-0 md:pb-[25px] md:gap-[30px] md:rounded-[9px] md:opacity-100">
                {/* h5 başlık */}
                <h5 className="w-full h-auto font-montserrat font-bold text-[24px] leading-[32px] tracking-[0.1px] text-[#252B42] whitespace-nowrap md:w-[304px] md:h-[32px] md:opacity-100 md:pt-0">the quick fox jumps over</h5>
                {/* h6 paragraf */}
                <div className="w-[332px] h-[340px] opacity-100 md:w-[332px] md:h-[340px] md:opacity-100">
                  <p className="font-montserrat font-normal text-[14px] leading-[20px] tracking-[0.2px] text-[#737373]">
                    Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.<br /><br />
                    Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.<br /><br />
                    Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
                  </p>
                </div>
              </div>
            </div>
            {/* 3. col-md-4 - Placeholder */}
            <div className="w-[332px] h-[367px] opacity-100 flex flex-col gap-[30px] md:w-[332px] md:h-[367px] md:gap-0 md:opacity-100">
              {/* 1. card-item */}
              <div className="w-[332px] h-[178px] bg-white rounded-[9px] flex flex-col gap-[30px] p-0 md:w-[332px] md:h-[188px] md:gap-[30px] md:rounded-[9px] md:opacity-100">
                <h5 className="w-[304px] h-[32px] font-montserrat font-bold text-[24px] leading-[32px] tracking-[0.1px] text-[#252B42] mt-[14px] md:mt-0 md:w-[304px] md:h-[32px] md:opacity-100 whitespace-nowrap">the quick fox jumps over</h5>
                <ul className="w-[303px] h-[126px] flex flex-col gap-[10px] md:w-[303px] md:h-[126px] md:gap-[10px] md:opacity-100">
                  {Array(4).fill().map((_, idx) => (
                    <li key={idx} className="w-[303px] h-[24px] flex items-center gap-[20px] overflow-visible md:w-[303px] md:h-[24px] md:gap-[20px] md:opacity-100">
                      <svg className="flex-shrink-0" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L7 7L1 13" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#737373] whitespace-nowrap">the quick fox jumps over the lazy dog</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* 2. card-item (3 maddeli) */}
              <div className="w-[332px] h-[149px] bg-white rounded-[9px] flex flex-col gap-[30px] p-0 md:w-[332px] md:h-[179px] md:pt-[25px] md:gap-[30px] md:rounded-[9px] md:opacity-100">
                <h5 className="w-[304px] h-[32px] font-montserrat font-bold text-[24px] leading-[32px] tracking-[0.1px] text-[#252B42] mt-[14px] md:mt-0 md:w-[304px] md:h-[32px] md:opacity-100 whitespace-nowrap">the quick fox jumps over</h5>
                <ul className="w-[303px] h-[87px] flex flex-col gap-[10px] md:w-[303px] md:h-[92px] md:gap-[10px] md:opacity-100">
                  {Array(3).fill().map((_, idx) => (
                    <li key={idx} className="w-[303px] h-[24px] flex items-center gap-[20px] overflow-visible md:w-[303px] md:h-[24px] md:gap-[20px] md:opacity-100">
                      <svg className="flex-shrink-0" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L7 7L1 13" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#737373] whitespace-nowrap">the quick fox jumps over the lazy dog</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
      </section>
      {/* mobile-product-cards-15 section */}
          <section className="w-[414px] h-[2622px] bg-[#FAFAFA] mx-auto relative md:w-[1440px] md:h-[1086px] md:mx-auto" style={{opacity:1}}>
            <div className="w-[331px] h-[2622px] absolute left-[41.5px] pt-[48px] pb-[48px] flex flex-col gap-[24px] md:w-[1124px] md:h-[1086px] md:absolute md:left-[195px] md:pt-[48px] md:pb-[48px] md:gap-[24px]" style={{opacity:1}}>
              {/* 1. row */}
              <div className="w-[324px] h-[32px] flex items-center md:w-[1040px] md:h-[32px]" style={{opacity:1}}>
                {/* main-content */}
                <div className="w-[332px] h-[32px] flex items-center gap-[10px] md:w-[691px] md:h-[32px] md:gap-[10px]" style={{opacity:1}}>
                  {/* frame 1 */}
                  <div className="w-[324px] h-[32px] flex items-center gap-[10px] md:w-[299px] md:h-[32px]" style={{opacity:1}}>
                    <h3 id="section-title" className="w-[324px] h-[32px] font-montserrat font-bold text-[24px] leading-[32px] tracking-[0.1px] text-center text-[#252B42] md:w-[299px] md:h-[32px] md:font-bold md:text-[24px] md:leading-[32px] md:tracking-[0.1px] md:text-center md:text-[#252B42] md:whitespace-nowrap">BESTSELLER PRODUCTS</h3>
                  </div>
                </div>
              </div>
              {/* line 1 */}
              <div className="w-[331px] h-0 border-t border-[#ECECEC] md:w-[1042px] md:h-[2px] md:border-[#ECECEC] md:opacity-100" style={{borderWidth:'1px', opacity:1}}></div>
              {/* 2. row */}
              <div className="w-[328px] h-[2446px] flex flex-col gap-[30px] md:w-[1049px] md:h-[442px] md:flex-row md:gap-[30px] md:opacity-100" style={{opacity:1}}>
                {/* 4 col-md, each with ProductCardBestseller */}
                <div className="w-[328px] h-[589px] md:w-[238px] md:h-[442px] md:opacity-100">
                  <ProductCardBestseller image={bestsellerImg1} />
                </div>
                <div className="w-[328px] h-[589px] md:w-[238px] md:h-[442px] md:opacity-100">
                  <ProductCardBestseller image={bestsellerImg2} />
                </div>
                <div className="w-[328px] h-[589px] md:w-[238px] md:h-[442px] md:opacity-100">
                  <ProductCardBestseller image={bestsellerImg3} />
                </div>
                <div className="w-[328px] h-[589px] md:w-[238px] md:h-[442px] md:opacity-100">
                  <ProductCardBestseller image={bestsellerImg4} />
                </div>
              </div>
              {/* 3. row - Desktop only */}
              <div className="hidden md:flex md:w-[1049px] md:h-[442px] md:flex-row md:gap-[30px] md:opacity-100">
                {/* 4 col-md, each with ProductCardBestseller */}
                <div className="md:w-[238px] md:h-[442px] md:opacity-100">
                  <ProductCardBestseller image={bestsellerImg5} />
                </div>
                <div className="md:w-[238px] md:h-[442px] md:opacity-100">
                  <ProductCardBestseller image={bestsellerImg6} />
                </div>
                <div className="md:w-[238px] md:h-[442px] md:opacity-100">
                  <ProductCardBestseller image={bestsellerImg3} />
                </div>
                <div className="md:w-[238px] md:h-[442px] md:opacity-100">
                  <ProductCardBestseller image={bestsellerImg2} />
                </div>
              </div>
            </div>
          </section>
      <MobileClients bg="#FAFAFA" />
          
    </div>
  );
};

export default ProductDetailPage;
