import ProductCardBestseller from "../components/ProductCardBestseller";
import bestsellerImg1 from '../assets/product-cards/0bfcbfefc49b63d0071c5ef94c3d4dde5f05172f.jpg';
import bestsellerImg2 from '../assets/product-cards/f454f9ee9a7979dac6cbd7699a260c7deacd7b13.jpg';
import bestsellerImg3 from '../assets/product-cards/685f2d7c3cabc3250d9fd223e5b93cebd2761439.jpg';
import bestsellerImg4 from '../assets/product-cards/079b4c5d47938d7b09087b31f361063fb40f9a11.jpg';
import bestsellerImg5 from '../assets/product-cards/926bf1d65669af4e049e20ceb30aa6408b6a79f3.jpg';
import bestsellerImg6 from '../assets/product-cards/a93e41b42e460896a15fe5f82a56836939f30577.jpg';


import { ChevronLeft, ChevronRight, Star, ArrowLeft, Heart, ShoppingCart, Eye } from "lucide-react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductDetail, fetchBestsellers } from "../store/thunks";
import { addToCart, addToLiked, removeFromLiked } from "../store/actions";

import MobileClients from "../components/MobileClients";
import Footer from "../layout/Footer";

const ProductDetailPage = () => {
  const { id, productId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  
  const productDetail = useSelector(state => state.product.productDetail);
  const fetchState = useSelector(state => state.product.fetchState);
  const likedProducts = useSelector(state => state.liked.liked);
  
  const isLiked = likedProducts.some(item => item.id === productDetail?.id);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [bestsellers, setBestsellers] = useState([]);
  
  // productId varsa onu kullan, yoksa id kullan (eski route için backward compatibility)
  const actualProductId = productId || id;
  
  useEffect(() => {
    if (actualProductId) {
      dispatch(fetchProductDetail(actualProductId));
    }
  }, [actualProductId, dispatch]);
  
  useEffect(() => {
    // Bestseller ürünlerini rating'e göre fetch et
    const loadBestsellers = async () => {
      try {
        // Eğer productDetail varsa ve category_id varsa, o kategorideki ürünleri çek
        const categoryId = productDetail?.category_id;
        const bestsellerList = await dispatch(fetchBestsellers(categoryId));
        if (bestsellerList && bestsellerList.length > 0) {
          setBestsellers(bestsellerList);
        }
      } catch (error) {
        console.error('Error loading bestsellers:', error);
        // Fallback gösterilecek
      }
    };
    
    if (productDetail) {
      loadBestsellers();
    }
  }, [productDetail, dispatch]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [actualProductId]);
  
  if (fetchState === 'FETCHING' || !productDetail) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-[#FAFAFA] border-t-[#23A6F0] rounded-full animate-spin"></div>
          <p className="text-[#737373] font-montserrat text-lg">Loading product...</p>
        </div>
      </div>
    );
  }
  
  const images = productDetail.images?.map(img => img.url) || [];
  const productName = productDetail.name || "Product";
  const productPrice = productDetail.price || 0;
  const productDescription = productDetail.description || "";
  const productStock = productDetail.stock || 0;
  const productRating = productDetail.rating || 0;
  
  const handleAddToCart = () => {
    dispatch(addToCart(productDetail));
  };
  
  return (
    <div className="w-full min-h-screen bg-white">
      {/* Back Button */}
      <div className="w-full bg-white border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-6 py-4">
          <button
            onClick={() => history.push('/shop')}
            className="flex items-center gap-2 text-[#23A6F0] hover:text-[#1a7ab8] transition-colors font-montserrat font-semibold"
          >
            <ArrowLeft size={20} />
            Back to Products
          </button>
        </div>
      </div>
      
      {/* Breadcrumb Container - Sıfırdan */}
      <div className="bg-[#FAFAFA] w-[414px] h-[92px] pt-6 pb-6 mx-auto md:w-[1440px] md:h-[92px] md:pt-6 md:pb-6 md:mx-auto">
        {/* Row */}
        <div className="w-[414px] h-[44px] flex items-center justify-center gap-[30px] mx-auto md:w-[1033px] md:h-[44px] md:gap-[30px] md:justify-start">
          {/* col-md */}
          <div className="w-[414px] h-[44px] flex items-center gap-[5px] md:w-[509px] md:h-[44px] md:gap-[5px] md:justify-start">
            {/* Breadcrumb */}
            <nav className="w-[117px] h-[44px] flex items-center justify-center gap-[15px] py-[10px] mx-auto md:w-[119px] md:justify-start md:mx-0 md:h-[44px] md:gap-[15px] md:py-[10px]">
              <span className="font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#252B42]">Home</span>
              <ChevronRight size={24} color="#737373" strokeWidth={2} className="flex-shrink-0" />
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
                  {images.length > 0 ? (
                    <>
                      {/* Sol ok */}
                      <button
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center transition-opacity"
                        onClick={() => setSelectedImage((selectedImage - 1 + 2) % 2)}
                        aria-label="Önceki görsel"
                        style={{padding: 0}}
                      >
                        <ChevronLeft size={50} strokeWidth={1.5} color="#98BFEC" />
                      </button>
                      <img 
                        src={images[selectedImage] || images[0] || ''} 
                        alt={`Product ${selectedImage + 1}`} 
                        className={`w-full h-full ${selectedImage === 1 ? 'object-contain' : 'object-cover'}`}
                      />
                      {/* Sağ ok */}
                      <button
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center transition-opacity"
                        onClick={() => setSelectedImage((selectedImage + 1) % 2)}
                        aria-label="Sonraki görsel"
                        style={{padding: 0}}
                      >
                        <ChevronRight size={50} strokeWidth={1.5} color="#98BFEC" />
                      </button>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <p className="text-gray-500 font-montserrat">No image available</p>
                    </div>
                  )}
                </div>
                {/* Indicator */}
                <div className="w-[219px] h-[75px] flex gap-[19px] justify-start self-start absolute left-0 top-[319px] md:w-[219px] md:h-[75px] md:top-[471px] md:opacity-100">
                  {[0, 1].map((idx) => (
                    <div
                      key={idx}
                      className={`w-[100px] h-[75px] rounded-[5px] overflow-hidden border-2 ${selectedImage === idx ? 'border-[#23A6F0]' : 'border-transparent'} cursor-pointer ${selectedImage !== idx ? 'opacity-50' : ''}`}
                      onClick={() => setSelectedImage(idx)}
                    >
                      <img 
                        src={images[idx] || images[0] || ''} 
                        alt={`Product ${idx + 1} thumb`} 
                        className={`w-full h-full object-cover ${idx === 1 ? 'scale-50' : ''}`}
                        style={idx === 1 ? {transform: 'scale(0.5)', transformOrigin: 'center'} : {}}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Alttaki col-md-6: Bilgi alanı (yeni) */}
            <div className="w-[348px] h-[471px] flex flex-col gap-[23px] px-6 pt-[11px] pb-0 opacity-100 mt-[30px] relative md:w-[510px] md:h-[471px] md:px-0 md:pt-[11px] md:pb-0 md:mt-0">
              {/* Product Name */}
              <h2 className="font-montserrat font-semibold text-[20px] leading-[30px] tracking-[0.2px] antialiased text-[#252B42] md:absolute md:top-[11px] md:left-[24px]">{productName}</h2>
              {/* Frame31: Yıldızlar ve Reviews */}
              <div className="w-[221px] h-[24px] flex items-center gap-[10px] absolute top-[53px] left-[24px] opacity-100 md:w-[221px] md:h-[24px] md:top-[53px] md:left-[24px]">
                {/* Yıldızlar */}
                <div className="flex items-center gap-[5px] w-[130px] h-[22px]">
                  {[1,2,3,4,5].map((starIdx) => {
                    if (productRating >= starIdx) {
                      return <FaStar key={starIdx} size={18} color="#F3CD03" style={{marginRight:'2px'}} />;
                    } else if (productRating > starIdx - 1) {
                      return <FaStarHalfAlt key={starIdx} size={18} color="#F3CD03" style={{marginRight:'2px'}} />;
                    } else {
                      return <FaRegStar key={starIdx} size={18} color="#BDBDBD" style={{marginRight:'2px'}} />;
                    }
                  })}
                </div>
                {/* 10 Reviews */}
                <span className="text-[#737373] font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] whitespace-nowrap flex-nowrap flex items-center">10 Reviews</span>
              </div>
              {/* Fiyat (h5) */}
              <h5 className="w-[108px] h-[32px] text-[#23856D] font-montserrat font-bold text-[24px] leading-[32px] tracking-[0.1px] text-center opacity-100 absolute top-[97px] left-[24px] md:w-[108px] md:h-[32px] md:top-[97px] md:left-[24px]">${productPrice}</h5>
              {/* Availability Row */}
              <div className="w-[161px] h-[24px] flex items-center gap-[5px] absolute top-[134px] left-[24px] opacity-100 md:w-[161px] md:h-[24px] md:top-[134px] md:left-[24px]">
                <span className="w-[94px] h-[24px] font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#737373]">Availability :</span>
                <span className={`w-[62px] h-[24px] font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-right ${productStock > 0 ? 'text-[#23A6F0]' : 'text-[#E74040]'}`}>
                  {productStock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              {/* Açıklama Paragrafı - Mobile */}
              <p className="w-[271px] font-montserrat font-normal text-[14px] leading-[20px] tracking-[0.2px] text-[#858585] absolute top-[190px] left-[24px] opacity-100 md:hidden line-clamp-5">
                {productDescription}
              </p>
              {/* Açıklama Paragrafı - Desktop */}
              <p className="hidden md:block w-[464px] font-montserrat font-normal text-[14px] leading-[20px] tracking-[0.2px] text-[#858585] absolute top-[190px] left-[24px] opacity-100 line-clamp-3">
                {productDescription}
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
                <button 
                  onClick={handleAddToCart}
                  disabled={productStock === 0}
                  className={`w-[148px] h-[44px] flex items-center justify-center px-[20px] py-[10px] gap-[10px] rounded-[5px] ${productStock > 0 ? 'bg-[#23A6F0] hover:bg-[#1a7ab8] cursor-pointer' : 'bg-gray-400 cursor-not-allowed'} transition-colors`}
                >
                  <span className="font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-center text-white whitespace-nowrap">
                    {productStock > 0 ? 'Add to Cart' : 'Out of Stock'}
                  </span>
                </button>
                {/* Kalp kutusu */}
                <div 
                  onClick={() => {
                    if (isLiked) {
                      dispatch(removeFromLiked(productDetail.id));
                    } else {
                      dispatch(addToLiked(productDetail));
                    }
                  }}
                  className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-white border border-[#E8E8E8] cursor-pointer hover:bg-gray-100 transition"
                >
                  <Heart size={18} color={isLiked ? "#E74C3C" : "#252B42"} fill={isLiked ? "#E74C3C" : "none"} strokeWidth={1.5} />
                </div>
                {/* Sepet kutusu */}
                <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-white border border-[#E8E8E8]">
                  <div 
                    onClick={productStock > 0 ? handleAddToCart : undefined}
                    className={`w-full h-full flex items-center justify-center ${productStock > 0 ? 'cursor-pointer hover:bg-gray-100' : 'cursor-not-allowed opacity-50'}`}
                    style={{ pointerEvents: productStock > 0 ? 'auto' : 'none' }}
                    title={productStock > 0 ? 'Sepete ekle' : 'Stokta yok'}
                  >
                    <ShoppingCart size={22} color="#252B42" strokeWidth={1.5} />
                  </div>
                </div>
                {/* Göz kutusu */}
                <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-white border border-[#E8E8E8]">
                  <Eye size={20} color="#252B42" strokeWidth={1.5} />
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
                {images.length > 0 && (
                  <img src={images[0]} alt="Product Description" className="w-[321px] h-[271px] rounded-[5.39px] object-cover absolute top-1 left-0.5 md:w-[316px] md:h-[372px] md:rounded-[5.39px]" />
                )}
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
                      
                      <ChevronRight size={16} color="#737373" strokeWidth={2} className="flex-shrink-0" />
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
                       <ChevronRight size={16} color="#737373" strokeWidth={2} className="flex-shrink-0" />
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
                {bestsellers.length > 0 ? (
                  bestsellers.slice(0, 4).map((product, idx) => (
                    <div key={idx} className="w-[328px] h-[589px] md:w-[238px] md:h-[442px] md:opacity-100">
                      <ProductCardBestseller 
                        image={product.images?.[0]?.url || bestsellerImg1}
                        name={product.name || "Product"}
                        price={product.price || 0}
                        id={product.id}
                        categoryId={product.category_id}
                        categoryName={product.category?.title}
                      />
                    </div>
                  ))
                ) : (
                  <>
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
                  </>
                )}
              </div>
              {/* 3. row - Desktop only */}
              <div className="hidden md:flex md:w-[1049px] md:h-[442px] md:flex-row md:gap-[30px] md:opacity-100">
                {/* 4 col-md, each with ProductCardBestseller */}
                {bestsellers.length > 4 ? (
                  bestsellers.slice(4, 8).map((product, idx) => (
                    <div key={idx} className="md:w-[238px] md:h-[442px] md:opacity-100">
                      <ProductCardBestseller 
                        image={product.images?.[0]?.url || bestsellerImg5}
                        name={product.name || "Product"}
                        price={product.price || 0}
                        id={product.id}
                        categoryId={product.category_id}
                        categoryName={product.category?.title}
                      />
                    </div>
                  ))
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </div>
          </section>
      <MobileClients bg="#FAFAFA" />
          
    </div>
  );
};

export default ProductDetailPage;
