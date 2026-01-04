import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setCategory, setSort, setFilter } from "../store/actions";
import { fetchProducts } from "../store/thunks";

import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";

import img1 from "../assets/resimler/9da5ab42c0357746eb27e42fff6279478e2c8a48.jpg";
import img2 from "../assets/resimler/b384eba608bd8616723a95d25fce7dcb8f25ba9d.jpg";
import img3 from "../assets/resimler/3e7f7eafd5316e4fa827cf3570a2a8c7855d5a94.jpg";
import img4 from "../assets/resimler/edfcad0dba1967435dad649ed91c2e00be5f640f.jpg";
import img5 from "../assets/resimler/192d37cf726d1f63d6a96c19556e7a721f4f64da.jpg";
import img6 from "../assets/resimler/8696d051d5b4e9d2b71de14231ff0f1540509e72.jpg";
import img7 from "../assets/resimler/e93aae2e1138e5741f6879c9d8b83f0b79f972ce.jpg";
import img8 from "../assets/resimler/a01449552eeaef7ecedd3954687aefbdb6236bb6.jpg";
import img9 from "../assets/resimler/26f06d36b8be071a9cfb336e8edfa8e534284b19.jpg";
import img10 from "../assets/resimler/6722d236f78733bd50e39ff93410c2469644d50e.jpg";
import img11 from "../assets/resimler/605b83752e220c164e230e86bf1054bccbd5ccab.jpg";
import img12 from "../assets/resimler/ab7b991d7f3b413395097d70baef867596099727.jpg";

const productImages = [
  img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12
];

export default function ShopProductCards() {
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  
  const apiProducts = useSelector(state => state.product.productList);
  const apiTotal = useSelector(state => state.product.total);
  const fetchState = useSelector(state => state.product.fetchState);
  const category = useSelector(state => state.product.category);
  const categories = useSelector(state => state.product.categories);
  const sort = useSelector(state => state.product.sort);
  const filter = useSelector(state => state.product.filter);
  
  // Category name bul
  const categoryName = categories?.find(cat => cat.id === parseInt(category))?.title || 'products';
  
  const [page, setPage] = useState(1);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  const [localSort, setLocalSort] = useState('');
  const [localFilter, setLocalFilter] = useState('');
  
  // Window resize dinle
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // URL'den categoryId geldiğinde Redux'a kaydet
  React.useEffect(() => {
    if (categoryId) {
      dispatch(setCategory(categoryId));
    }
  }, [categoryId, dispatch]);
  
  // Kategori, sort, filter değişirse API'ye istek yap
  React.useEffect(() => {
    const perPageLimit = isMobile ? 4 : 12;
    
    // Filter varsa tüm sonuçları çek (999), yoksa normal limit
    const fetchLimit = filter ? 999 : perPageLimit;
    
    const params = {
      limit: fetchLimit,
      offset: 0,
    };
    
    if (category) {
      params.category = category;
    }
    if (sort) {
      params.sort = sort;
    }
    if (filter) {
      params.filter = filter;
    }
    
    dispatch(fetchProducts(params));
    setPage(1); // Yeni sonuçlara geçince sayfa 1'e dön
  }, [category, sort, filter, dispatch, isMobile]);
  
  // Sayfa değişirse offset ile API'ye istek yap
  React.useEffect(() => {
    // Filter varsa çağrılmaz (filter change zaten çağırıyor)
    // Filter yoksa normal pagination
    if (filter) return;
    
    const perPageLimit = isMobile ? 4 : 12;
    const offset = (page - 1) * perPageLimit;
    
    const params = {
      limit: perPageLimit,
      offset: offset,
    };
    
    if (category) {
      params.category = category;
    }
    if (sort) {
      params.sort = sort;
    }
    if (filter) {
      params.filter = filter;
    }
    
    dispatch(fetchProducts(params));
  }, [page, isMobile, category, sort, dispatch]);
  
  const perPage = isMobile ? 4 : 12;
  
  const hasApiProducts = apiProducts && apiProducts.length > 0;
  
  // Eğer filter/sort/kategori seçilmişse SADECE API ürünlerini göster
  // Yoksa hardcoded + API'yi birleştir
  const isFiltered = category || sort || filter;
  
  let allProducts = [];
  
  if (hasApiProducts) {
    if (isFiltered) {
      // Filtrelenmiş/sıralanmış: SADECE API ürünleri
      // Frontend'de de filter edelim (backend tarafındaki zayıf filter için)
      let filteredProducts = apiProducts;
      
      if (filter) {
        filteredProducts = apiProducts.filter((product) =>
          product.name && product.name.toLowerCase().includes(filter.toLowerCase())
        );
      }
      
      allProducts = filteredProducts.map((product) => ({
        ...product,
        image: product.images && product.images.length > 0 ? product.images[0].url : null,
        category: null,
        isFromApi: true
      }));
    } else {
      // API'den gelen ürünleri direkt kullan
      allProducts = apiProducts.map((product) => ({
        ...product,
        image: product.images && product.images.length > 0 ? product.images[0].url : null,
        category: null,
        isFromApi: true
      }));
    }
  } else {
    // API ürünü yoksa hardcoded ürünleri göster
    allProducts = productImages.map((src, idx) => ({
      id: `hardcoded-${idx}`,
      image: src,
      name: "Graphic Design",
      category: "English Department",
      price: 16.48,
      salePrice: 6.48,
      isFromApi: false
    }));
  }
  
  const total = allProducts.length;
  
  // Backend filtreleme zayıf, frontend'te de filter et
  let visibleData = allProducts;
  
  if (filter && hasApiProducts) {
    // İsimde filter yazısını içerenleri göster
    visibleData = allProducts.filter((product) =>
      product.name && product.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
  
  // Pagination hesaplaması
  // Filter varsa, API tüm sonuçları döndürdü, frontend'te paginate et
  // Filter yoksa, API zaten paginated
  let paginatedData = visibleData;
  let effectiveTotal = apiTotal;
  
  if (filter) {
    // Frontend pagination: filtrelenen tüm ürünler üzerinde slice yap
    const startIdx = (page - 1) * perPage;
    const endIdx = startIdx + perPage;
    paginatedData = visibleData.slice(startIdx, endIdx);
    effectiveTotal = visibleData.length;
  }
  
  const totalPages = Math.ceil(effectiveTotal / perPage);

  if (fetchState === 'FETCHING') {
    return (
      <div className="w-full flex justify-center items-center py-20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#FAFAFA] border-t-[#23A6F0] rounded-full animate-spin"></div>
          <p className="text-[#737373] font-montserrat">Ürünler yükleniyor...</p>
        </div>
      </div>
    );
  }

  const desktopRows = [];
  for (let i = 0; i < paginatedData.length; i += 4) {
    desktopRows.push(paginatedData.slice(i, i + 4));
  }

  return (
    <>
      {/* Mobile Layout */}
      <div className="w-full max-w-[414px] mx-auto bg-[#FFFFFF] block md:hidden lg:hidden">
        <div className="w-full px-0 pt-6 pb-6 flex flex-col gap-5">
          <div className="w-full flex flex-col gap-5">
            {paginatedData.map((item, i) => (
              <div key={item.id || i} className="w-full flex justify-center">
                <ProductCard
                  id={item.id}                  categoryId={item.category_id}
                  categoryName={categoryName}                  image={item.image}
                  title={item.name || "Graphic Design"}
                  category={item.category}
                  price={`$${item.price || 16.48}`}
                  salePrice={item.isFromApi ? (item.sale_price ? `$${item.sale_price}` : null) : "$6.48"}
                  isFromApi={item.isFromApi}
                  colors={["#23A6F0", "#23856D", "#E77C40", "#252B42"]}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <Pagination
              total={filter ? effectiveTotal : apiTotal}
              perPage={perPage}
              onPageChange={setPage}
              currentPage={page}
            />
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block w-full md:max-w-[1440px] md:mx-auto md:bg-[#FFFFFF]">
        <div className="md:w-[1124px] md:mx-auto md:flex md:flex-col md:items-center md:justify-between md:pt-[48px] md:pb-[48px]">
          <div className="w-full flex flex-col md:gap-[48px] md:items-center">
            {desktopRows.length > 0 && desktopRows.map((row, rowIdx) => (
              <div key={rowIdx} className="md:w-[1048px] md:flex md:flex-row md:gap-[30px] md:justify-center">
                {row.map((item, i) => {
                  if (item.isFromApi === true) {
                    return (
                      <ProductCard
                        key={item.id || i}
                        id={item.id}
                        categoryId={item.category_id}
                        categoryName={categoryName}
                        image={item.image}
                        title={item.name}
                        category={item.category}
                        price={`$${item.price}`}
                        salePrice={item.sale_price ? `$${item.sale_price}` : null}
                        isFromApi={true}
                        colors={["#23A6F0", "#23856D", "#E77C40", "#252B42"]}
                      />
                    );
                  } else {
                    return (
                      <ProductCard
                        key={item.id || i}
                        id={item.id}
                        categoryId={item.category_id}
                        categoryName={categoryName}
                        image={item.image}
                        title={item.name}
                        category={item.category}
                        price={`$${item.price}`}
                        salePrice="$6.48"
                        isFromApi={false}
                        colors={["#23A6F0", "#23856D", "#E77C40", "#252B42"]}
                      />
                    );
                  }
                })}
              </div>
            ))}
          </div>
          {/* Pagination */}
          <div className="w-full flex items-center justify-center md:h-full md:mt-auto">
            <div className="w-full flex items-center justify-center bg-white">
              <Pagination
                total={filter ? effectiveTotal : apiTotal}
                perPage={perPage}
                onPageChange={setPage}
                currentPage={page}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
