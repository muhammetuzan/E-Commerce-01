
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

export default function ProductCard({ image, title, category, price, salePrice, colors, id, isFromApi, categoryId, categoryName, isHomePage }) {
  const history = useHistory();
  
  const handleClick = () => {
    if (!id) return;
    
    // URL format: /shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId
    // gender: id 1-8 = 'k' (kız), id 9-14 = 'e' (erkek)
    const gender = categoryId && categoryId <= 8 ? 'k' : 'e';
    const catName = categoryName ? createSlug(categoryName) : 'category';
    const catId = categoryId || '1';
    const productSlug = createSlug(title);
    
    history.push(`/shop/${gender}/${catName}/${catId}/${productSlug}/${id}`);
  };
  return (
    <div
      className="w-[328px] h-[615px] md:w-[239px] md:h-[488px] cursor-pointer hover:shadow-lg transition"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyPress={e => { if (e.key === 'Enter') handleClick(); }}
    >
      {/* Image */}
      <div className="w-[328px] h-[427px] md:w-[239px] md:h-[300px]">
        <img 
          src={image}
          alt={title}
          className="w-[328px] h-[427px] md:w-[239px] md:h-[300px] object-cover"
        />
      </div>
      {/* Info */}
      <div className="w-[328px] h-[188px] pt-[25px] pr-[25px] pb-[35px] pl-[25px] flex flex-col gap-[10px] items-center md:w-[239px] md:h-[188px] md:pt-[25px] md:pr-[15px] md:pb-[35px] md:pl-[15px]">
        <h5 className="font-montserrat font-bold text-[16px] leading-[24px] tracking-[0.1px] text-center text-[#252B42] md:text-[16px] line-clamp-2 w-full">
          {title}
        </h5>
        <a href="#" className="font-montserrat text-[14px] font-bold leading-[24px] tracking-[0.2px] text-center text-[#737373] no-underline block md:text-[14px] line-clamp-1">
          {category}
        </a>
        <div className="flex gap-[12px] justify-center items-center md:gap-[8px]">
          <span className={`font-montserrat text-[16px] font-bold leading-[24px] tracking-[0.1px] text-center md:text-[16px] ${
            isHomePage ? 'text-[#BDBDBD]' : (isFromApi ? 'text-[#23856D]' : 'text-[#BDBDBD]')
          }`}>
            {price}
          </span>
          {salePrice && (
            <span className="font-montserrat text-[16px] font-bold leading-[24px] tracking-[0.1px] text-center text-[#23856D] md:text-[16px]">
              {salePrice}
            </span>
          )}
        </div>
        <div className="w-[82px] h-[16px] flex gap-[6px] md:w-auto md:h-auto">
          {colors && colors.map((color, idx) => (
            <div key={idx} className={`w-[16px] h-[16px] rounded-full`} style={{ backgroundColor: color }}></div>
          ))}
        </div>
      </div>
    </div>
  );
}
