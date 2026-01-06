import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingCart as CartIcon, X, Check } from "lucide-react";
import { MdCheck } from "react-icons/md";
import { removeFromCart, toggleCartItem, increaseCartItem, decreaseCartItem } from "../store/actions";
import LoginModal from "../components/LoginModal";
import SignUpModal from "../components/SignUpModal";

// Geçerli kuponlar listesi (mock data)
const VALID_COUPONS = {
  'WELCOME10': { discount: 10, type: 'percentage', description: 'Hoş geldin kuponu' },
  'SAVE20': { discount: 20, type: 'percentage', description: '%20 indirim' },
  'FREESHIP': { discount: 29.99, type: 'fixed', description: 'Ücretsiz kargo' },
  'NEWYEAR2026': { discount: 50, type: 'fixed', description: 'Yeni yıl indirimi' },
};

export default function ShoppingCartPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const cart = useSelector(state => state.shoppingCart.cart);
  const user = useSelector(state => state.client.user);
  
  // Kupon state'leri
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  // Kupon uygulama fonksiyonu
  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    
    if (!code) {
      setCouponError('Lütfen bir kupon kodu girin');
      return;
    }
    
    const coupon = VALID_COUPONS[code];
    
    if (coupon) {
      setAppliedCoupon({ code, ...coupon });
      setCouponError('');
      setShowCouponInput(false);
      setCouponCode('');
    } else {
      setCouponError('Geçersiz kupon kodu');
      setAppliedCoupon(null);
    }
  };

  // Kupon kaldırma fonksiyonu
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  // Seçili ürünlerin toplam tutarını hesapla
  const calculateTotal = () => {
    return cart
      .filter(item => item.checked)
      .reduce((total, item) => total + (item.product.price * item.count), 0);
  };

  const subtotal = calculateTotal();
  const shippingCost = subtotal > 0 ? 29.99 : 0; // Kargo ücreti
  const discount = subtotal >= 150 ? 29.99 : 0; // 150 TL üzeri kargo bedava
  
  // Kupon indirimi hesapla
  let couponDiscount = 0;
  if (appliedCoupon && subtotal > 0) {
    if (appliedCoupon.type === 'percentage') {
      couponDiscount = (subtotal * appliedCoupon.discount) / 100;
    } else {
      couponDiscount = appliedCoupon.discount;
    }
  }
  
  const grandTotal = subtotal + shippingCost - discount - couponDiscount;
  
  const selectedItemCount = cart.filter(item => item.checked).length;

  if (cart.length === 0) {
    return (
      <>
        <LoginModal 
          isOpen={showLoginModal} 
          onClose={() => setShowLoginModal(false)}
          onSwitchToSignUp={() => {
            setShowLoginModal(false);
            setShowSignUpModal(true);
          }}
        />
        
        <SignUpModal 
          isOpen={showSignUpModal} 
          onClose={() => setShowSignUpModal(false)}
          onSwitchToLogin={() => {
            setShowSignUpModal(false);
            setShowLoginModal(true);
          }}
        />
      
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-center py-20">
          <CartIcon size={80} className="mx-auto text-gray-300 mb-6" />
          <h2 className="font-montserrat font-bold text-[24px] text-[#252B42] mb-4">
            Sepetiniz Boş
          </h2>
          <p className="font-montserrat text-[16px] text-gray-600 mb-8">
            Sepetinize ürün eklemek için alışverişe başlayın
          </p>
          <button
            onClick={() => history.push('/shop')}
            className="px-8 py-3 bg-[#23A6F0] text-white font-montserrat font-semibold rounded-lg hover:bg-[#1a7ab8] transition"
          >
            Alışverişe Başla
          </button>
        </div>
      </div>
      </>
    );
  }

  return (
    <>
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        onSwitchToSignUp={() => {
          setShowLoginModal(false);
          setShowSignUpModal(true);
        }}
      />
      
      <SignUpModal 
        isOpen={showSignUpModal} 
        onClose={() => setShowSignUpModal(false)}
        onSwitchToLogin={() => {
          setShowSignUpModal(false);
          setShowLoginModal(true);
        }}
      />
    
    <div className="min-h-screen bg-[#FAFAFA] pb-4">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-4 md:py-6">
          <h1 className="font-montserrat font-bold text-[20px] md:text-[28px] text-[#252B42]">
            Sepetim ({cart.length} Ürün)
          </h1>
          <p className="font-montserrat text-[12px] md:text-[14px] text-gray-600 mt-1 md:mt-2">
            Sepetindeki Ürünleri Bireysel Veya Kurumsal Fatura Seçerek Alabilirsin.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-4 md:py-8">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
          {/* Cart Items - Sol taraf */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Desktop Table Header */}
              <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 font-montserrat font-semibold text-[14px] text-gray-700">
                <div className="col-span-1"></div>
                <div className="col-span-4">ÜRÜN</div>
                <div className="col-span-2 text-center">FİYAT</div>
                <div className="col-span-2 text-center">ADET</div>
                <div className="col-span-2 text-center">TOPLAM</div>
                <div className="col-span-1"></div>
              </div>

          {/* Cart Items */}
          {cart.map((item, index) => (
            <div
              key={item.product.id}
              className={`px-4 md:px-6 py-4 md:py-6 ${
                index !== cart.length - 1 ? 'border-b border-gray-200' : ''
              }`}
            >
              {/* Desktop Layout */}
              <div className="hidden md:grid md:grid-cols-12 gap-4 hover:bg-gray-50 transition">
                {/* Checkbox */}
                <div className="col-span-1 flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => dispatch(toggleCartItem(item.product.id))}
                    className="w-5 h-5 text-[#23A6F0] rounded border-gray-300 focus:ring-[#23A6F0] cursor-pointer"
                  />
                </div>

                {/* Product Info */}
                <div className="col-span-4 flex gap-4">
                  <img
                    src={item.product.images?.[0]?.url || ''}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-montserrat font-semibold text-[16px] text-[#252B42] line-clamp-2">
                      {item.product.name}
                    </h3>
                    <p className="font-montserrat text-[12px] text-gray-600 mt-1">
                      Beden: {item.product.size || 'Tek Ebat'}
                    </p>
                    {item.product.store_name && (
                      <p className="font-montserrat text-[12px] text-gray-500 mt-1">
                        Satıcı: {item.product.store_name}
                      </p>
                    )}
                  </div>
                </div>

                {/* Price */}
                <div className="col-span-2 flex items-center justify-center">
                  <span className="font-montserrat font-bold text-[16px] text-[#252B42]">
                    ${item.product.price}
                  </span>
                </div>

                {/* Quantity */}
                <div className="col-span-2 flex items-center justify-center">
                  <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
                    <button
                      onClick={() => dispatch(decreaseCartItem(item.product.id))}
                      disabled={item.count <= 1}
                      className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      <Minus size={16} className="text-gray-600" />
                    </button>
                    <span className="font-montserrat font-semibold text-[16px] text-[#252B42] min-w-[30px] text-center">
                      {item.count}
                    </span>
                    <button
                      onClick={() => dispatch(increaseCartItem(item.product.id))}
                      className="p-2 hover:bg-gray-100 transition"
                    >
                      <Plus size={16} className="text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="col-span-2 flex items-center justify-center">
                  <span className="font-montserrat font-bold text-[18px] text-[#23A6F0]">
                    ${(item.product.price * item.count).toFixed(2)}
                  </span>
                </div>

                {/* Delete */}
                <div className="col-span-1 flex items-center justify-center">
                  <button
                    onClick={() => dispatch(removeFromCart(item.product.id))}
                    className="p-2 hover:bg-red-50 rounded-full transition"
                    title="Sepetten Çıkar"
                  >
                    <Trash2 size={18} className="text-red-500" />
                  </button>
                </div>
              </div>

              {/* Mobile Layout */}
              <div className="md:hidden">
                {/* Top Row: Checkbox, Image, Info */}
                <div className="flex gap-3">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => dispatch(toggleCartItem(item.product.id))}
                    className="w-5 h-5 mt-1 text-[#23A6F0] rounded border-gray-300 focus:ring-[#23A6F0] cursor-pointer flex-shrink-0"
                  />
                  <img
                    src={item.product.images?.[0]?.url || ''}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-montserrat font-semibold text-[14px] text-[#252B42] line-clamp-2">
                      {item.product.name}
                    </h3>
                    <p className="font-montserrat text-[11px] text-gray-600 mt-1">
                      Beden: {item.product.size || 'Tek Ebat'}
                    </p>
                    <p className="font-montserrat font-bold text-[14px] text-[#23A6F0] mt-1">
                      ${item.product.price}
                    </p>
                  </div>
                </div>

                {/* Bottom Row: Quantity, Total, Delete */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 border border-gray-300 rounded-lg">
                      <button
                        onClick={() => dispatch(decreaseCartItem(item.product.id))}
                        disabled={item.count <= 1}
                        className="p-1.5 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                      >
                        <Minus size={14} className="text-gray-600" />
                      </button>
                      <span className="font-montserrat font-semibold text-[14px] text-[#252B42] min-w-[24px] text-center">
                        {item.count}
                      </span>
                      <button
                        onClick={() => dispatch(increaseCartItem(item.product.id))}
                        className="p-1.5 hover:bg-gray-100 transition"
                      >
                        <Plus size={14} className="text-gray-600" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-montserrat font-bold text-[16px] text-[#23A6F0]">
                      ${(item.product.price * item.count).toFixed(2)}
                    </span>
                    <button
                      onClick={() => dispatch(removeFromCart(item.product.id))}
                      className="p-1.5 hover:bg-red-50 rounded-full transition"
                      title="Sepetten Çıkar"
                    >
                      <Trash2 size={16} className="text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
            </div>
          </div>

          {/* Order Summary Box - Sağ taraf - Sadece Desktop */}
          <div className="hidden lg:block lg:w-[440px] flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="font-montserrat font-bold text-[20px] text-[#252B42] mb-6 pb-4 border-b border-gray-200">
                Sipariş Özeti
              </h2>
              
              {/* Price Details */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-montserrat text-[14px] text-gray-600">
                    Ürünün Toplamı
                  </span>
                  <span className="font-montserrat font-semibold text-[16px] text-[#252B42]">
                    {subtotal.toFixed(2)} TL
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="font-montserrat text-[14px] text-gray-600">
                    Kargo Toplamı
                  </span>
                  <span className="font-montserrat font-semibold text-[16px] text-[#252B42]">
                    {shippingCost.toFixed(2)} TL
                  </span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between items-center bg-green-50 -mx-2 px-2 py-2 rounded">
                    <span className="font-montserrat text-[14px] text-green-700 flex items-center gap-1">
                      <span className="w-4 h-4 flex items-center justify-center rounded-full bg-green-600">
                        <MdCheck size={12} color="#fff" />
                      </span>
                      150 TL ve Üzeri Kargo Bedava (Satıcı Karşılar)
                    </span>
                    <span className="font-montserrat font-semibold text-[16px] text-green-700">
                      -{discount.toFixed(2)} TL
                    </span>
                  </div>
                )}
                
                {couponDiscount > 0 && (
                  <div className="flex justify-between items-center bg-orange-50 -mx-2 px-2 py-2 rounded">
                    <span className="font-montserrat text-[14px] text-orange-700 flex items-center gap-1">
                      <Check size={16} />
                      Kupon İndirimi ({appliedCoupon.code})
                    </span>
                    <span className="font-montserrat font-semibold text-[16px] text-orange-700">
                      -{couponDiscount.toFixed(2)} TL
                    </span>
                  </div>
                )}
              </div>

              {/* Discount Code Input */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                {!appliedCoupon ? (
                  <>
                    {!showCouponInput ? (
                      <button 
                        onClick={() => setShowCouponInput(true)}
                        className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg hover:border-[#FF6F00] transition"
                      >
                        <span className="font-montserrat text-[14px] text-gray-700">
                          + İndirim Kodu Gir
                        </span>
                      </button>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={couponCode}
                            onChange={(e) => {
                              setCouponCode(e.target.value.toUpperCase());
                              setCouponError('');
                            }}
                            onKeyPress={(e) => e.key === 'Enter' && handleApplyCoupon()}
                            placeholder="Kupon kodunu girin"
                            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg font-montserrat text-[14px] focus:outline-none focus:border-[#FF6F00] uppercase"
                          />
                          <button
                            onClick={handleApplyCoupon}
                            className="px-4 py-2.5 bg-[#FF6F00] text-white font-montserrat font-semibold text-[14px] rounded-lg hover:bg-[#E66300] transition"
                          >
                            Uygula
                          </button>
                          <button
                            onClick={() => {
                              setShowCouponInput(false);
                              setCouponCode('');
                              setCouponError('');
                            }}
                            className="px-3 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                          >
                            <X size={18} className="text-gray-600" />
                          </button>
                        </div>
                        {couponError && (
                          <p className="text-red-500 font-montserrat text-[12px] flex items-center gap-1">
                            <X size={14} />
                            {couponError}
                          </p>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex items-center justify-between px-4 py-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Check size={18} className="text-green-600" />
                      <div>
                        <p className="font-montserrat font-semibold text-[14px] text-green-800">
                          {appliedCoupon.code}
                        </p>
                        <p className="font-montserrat text-[12px] text-green-700">
                          {appliedCoupon.description}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleRemoveCoupon}
                      className="p-1.5 hover:bg-green-100 rounded-full transition"
                      title="Kuponu Kaldır"
                    >
                      <X size={18} className="text-green-700" />
                    </button>
                  </div>
                )}
              </div>

              {/* Grand Total */}
              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-montserrat font-bold text-[18px] text-[#252B42]">
                    Toplam
                  </span>
                  <span className="font-montserrat font-bold text-[24px] text-[#FF6F00]">
                    {grandTotal.toFixed(2)} TL
                  </span>
                </div>
              </div>

              {/* Create Order Button */}
              <button
                onClick={() => {
                  if (user) {
                    history.push('/create-order');
                  } else {
                    setShowLoginModal(true);
                  }
                }}
                disabled={selectedItemCount === 0}
                className="w-full px-6 py-4 bg-[#FF6F00] text-white font-montserrat font-bold text-[16px] rounded-lg hover:bg-[#E66300] disabled:opacity-50 disabled:cursor-not-allowed transition active:scale-[0.98] shadow-lg"
              >
                Sepeti Onayla &gt;
              </button>
              
              {selectedItemCount === 0 && (
                <p className="mt-3 text-center font-montserrat text-[12px] text-gray-500">
                  Lütfen en az bir ürün seçin
                </p>
              )}
              
              {selectedItemCount > 0 && (
                <p className="mt-3 text-center font-montserrat text-[12px] text-gray-600">
                  <span className="font-semibold text-[#252B42]">{selectedItemCount}</span> Adet ve Üzeri{' '}
                  <span className="font-semibold text-[#FF6F00]">40 TL</span> İndirim
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Bottom Summary - Sadece mobilde görünecek */}
        <div className="lg:hidden mt-4 bg-white rounded-lg shadow-sm p-4">
          <h2 className="font-montserrat font-bold text-[18px] text-[#252B42] mb-4 pb-3 border-b border-gray-200">
            Sipariş Özeti
          </h2>
          
          {/* Price Details */}
          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center">
              <span className="font-montserrat text-[13px] text-gray-600">
                Ürünün Toplamı
              </span>
              <span className="font-montserrat font-semibold text-[14px] text-[#252B42]">
                {subtotal.toFixed(2)} TL
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-montserrat text-[13px] text-gray-600">
                Kargo Toplamı
              </span>
              <span className="font-montserrat font-semibold text-[14px] text-[#252B42]">
                {shippingCost.toFixed(2)} TL
              </span>
            </div>
            
            {discount > 0 && (
              <div className="flex justify-between items-center bg-green-50 -mx-2 px-2 py-2 rounded">
                <span className="font-montserrat text-[11px] text-green-700 flex items-center gap-1">
                  <span className="w-3 h-3 flex items-center justify-center rounded-full bg-green-600">
                        <MdCheck size={12} color="#fff" />
                      </span>
                  150 TL ve Üzeri Kargo Bedava
                </span>
                <span className="font-montserrat font-semibold text-[13px] text-green-700">
                  -{discount.toFixed(2)} TL
                </span>
              </div>
            )}
            
            {couponDiscount > 0 && (
              <div className="flex justify-between items-center bg-orange-50 -mx-2 px-2 py-2 rounded">
                <span className="font-montserrat text-[11px] text-orange-700 flex items-center gap-1">
                  <Check size={14} />
                  Kupon İndirimi ({appliedCoupon.code})
                </span>
                <span className="font-montserrat font-semibold text-[13px] text-orange-700">
                  -{couponDiscount.toFixed(2)} TL
                </span>
              </div>
            )}
          </div>

          {/* Discount Code Input */}
          <div className="mb-4 pb-4 border-b border-gray-200">
            {!appliedCoupon ? (
              <>
                {!showCouponInput ? (
                  <button 
                    onClick={() => setShowCouponInput(true)}
                    className="w-full flex items-center justify-between px-3 py-2.5 border border-gray-300 rounded-lg hover:border-[#FF6F00] transition"
                  >
                    <span className="font-montserrat text-[13px] text-gray-700">
                      + İndirim Kodu Gir
                    </span>
                  </button>
                ) : (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => {
                          setCouponCode(e.target.value.toUpperCase());
                          setCouponError('');
                        }}
                        onKeyPress={(e) => e.key === 'Enter' && handleApplyCoupon()}
                        placeholder="Kupon kodunu girin"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg font-montserrat text-[13px] focus:outline-none focus:border-[#FF6F00] uppercase"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        className="px-3 py-2 bg-[#FF6F00] text-white font-montserrat font-semibold text-[12px] rounded-lg hover:bg-[#E66300] transition"
                      >
                        Uygula
                      </button>
                      <button
                        onClick={() => {
                          setShowCouponInput(false);
                          setCouponCode('');
                          setCouponError('');
                        }}
                        className="px-2 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                      >
                        <X size={16} className="text-gray-600" />
                      </button>
                    </div>
                    {couponError && (
                      <p className="text-red-500 font-montserrat text-[11px] flex items-center gap-1">
                        <X size={12} />
                        {couponError}
                      </p>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center justify-between px-3 py-2.5 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-green-600" />
                  <div>
                    <p className="font-montserrat font-semibold text-[12px] text-green-800">
                      {appliedCoupon.code}
                    </p>
                    <p className="font-montserrat text-[10px] text-green-700">
                      {appliedCoupon.description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleRemoveCoupon}
                  className="p-1 hover:bg-green-100 rounded-full transition"
                  title="Kuponu Kaldır"
                >
                  <X size={16} className="text-green-700" />
                </button>
              </div>
            )}
          </div>

          {/* Grand Total */}
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <span className="font-montserrat font-bold text-[16px] text-[#252B42]">
                Toplam
              </span>
              <span className="font-montserrat font-bold text-[20px] text-[#FF6F00]">
                {grandTotal.toFixed(2)} TL
              </span>
            </div>
          </div>

          {/* Create Order Button */}
          <button
            onClick={() => {
              if (user) {
                history.push('/create-order');
              } else {
                setShowLoginModal(true);
              }
            }}
            disabled={selectedItemCount === 0}
            className="w-full px-6 py-3 bg-[#FF6F00] text-white font-montserrat font-bold text-[14px] rounded-lg hover:bg-[#E66300] disabled:opacity-50 disabled:cursor-not-allowed transition active:scale-[0.98] shadow-lg"
          >
            Sepeti Onayla &gt;
          </button>
          
          {selectedItemCount === 0 && (
            <p className="mt-3 text-center font-montserrat text-[11px] text-gray-500">
              Lütfen en az bir ürün seçin
            </p>
          )}
          
          {selectedItemCount > 0 && (
            <p className="mt-3 text-center font-montserrat text-[11px] text-gray-600">
              <span className="font-semibold text-[#252B42]">{selectedItemCount}</span> Adet ve Üzeri{' '}
              <span className="font-semibold text-[#FF6F00]">40 TL</span> İndirim
            </p>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
