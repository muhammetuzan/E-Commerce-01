import React from "react";
import { useHistory } from "react-router-dom";

// Slug oluşturma helper
const createSlug = (text) => {
  if (!text) return 'product';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/ş/g, 's')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/ı/g, 'i')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

const ProductCardBestseller = ({ image, name = "Graphic Design", price = 16.48, category = "Product", id, categoryId, categoryName }) => {
  const history = useHistory();
  
  const handleClick = () => {
    if (!id) return;
    
    // URL format: /shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId
    // gender: id 1-8 = 'k' (kız), id 9-14 = 'e' (erkek)
    const gender = categoryId && categoryId <= 8 ? 'k' : 'e';
    const catName = categoryName ? createSlug(categoryName) : 'category';
    const catId = categoryId || '1';
    const productSlug = createSlug(name);
    
    history.push(`/shop/${gender}/${catName}/${catId}/${productSlug}/${id}`);
  };

  return (
  <div 
    className={`w-[348px] h-[589px] bg-white rounded-[9px] overflow-hidden flex flex-col md:w-[238px] md:h-[442px] ${id ? 'cursor-pointer hover:shadow-lg transition' : ''}`}
    onClick={handleClick}
    role={id ? "button" : undefined}
    tabIndex={id ? 0 : undefined}
    onKeyPress={id ? (e) => { if (e.key === 'Enter') handleClick(); } : undefined}
  >
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
};

export default ProductCardBestseller;
