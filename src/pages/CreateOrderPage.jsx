import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addressAPI, cardAPI, orderAPI } from "../store/api";
import { CLEAR_CART } from "../store/actionTypes";
import { Plus, MapPin, Edit2, Trash2, X, Check, CreditCard, ChevronDown, ChevronUp } from "lucide-react";
import troyLogo from '../assets/bank/Troy_logo.png';
import { MdCheck } from "react-icons/md";

// Geçerli kuponlar (ShoppingCartPage ile aynı)
const VALID_COUPONS = {
  'WELCOME10': { discount: 10, type: 'percentage', description: 'Hoş geldin kuponu' },
  'SAVE20': { discount: 20, type: 'percentage', description: '%20 indirim' },
  'FREESHIP': { discount: 29.99, type: 'fixed', description: 'Ücretsiz kargo' },
  'NEWYEAR2026': { discount: 50, type: 'fixed', description: 'Yeni yıl indirimi' },
};

// Türkiye'nin illeri
const CITIES = [
  "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin",
  "Aydın", "Balıkesir", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale",
  "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir",
  "Gaziantep", "Giresun", "Gümüşhane", "Hakkâri", "Hatay", "Isparta", "Mersin", "İstanbul", "İzmir",
  "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir", "Kocaeli", "Konya", "Kütahya", "Malatya",
  "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş", "Nevşehir", "Niğde", "Ordu", "Rize", "Sakarya",
  "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Şanlıurfa", "Uşak",
  "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman", "Kırıkkale", "Batman", "Şırnak",
  "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye", "Düzce"
];

export default function CreateOrderPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.client.user);
  const cart = useSelector(state => state.shoppingCart.cart);
  
  const [addresses, setAddresses] = useState([]);
  const [selectedShippingAddress, setSelectedShippingAddress] = useState(null);
  const [selectedBillingAddress, setSelectedBillingAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('address'); // 'address' or 'payment'
  const [formType, setFormType] = useState('shipping'); // 'shipping' or 'billing'
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [isFormCollapsed, setIsFormCollapsed] = useState(true);
  const [isCardFormCollapsed, setIsCardFormCollapsed] = useState(true);
  
  // Kupon state'leri
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  // Card state
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [editingCard, setEditingCard] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    surname: '',
    phone: '',
    city: '',
    district: '',
    neighborhood: ''
  });

  // Card form state
  const [cardFormData, setCardFormData] = useState({
    card_title: '',
    card_no: '',
    expire_month: '',
    expire_year: '',
    name_on_card: '',
    cvv: '' // CVV sadece ödeme sırasında kullanılacak, kayıt edilmeyecek
  });

  // Auth kontrolü - Component mount olduğunda bir kere kontrol et
  useEffect(() => {
    const checkAuth = async () => {
      // Token var mı kontrol et
      const token = localStorage.getItem('token');
      
      if (!token && !user) {
        // Token yok ve user yok ise login'e yönlendir
        localStorage.setItem('previousPage', '/create-order');
        history.push('/');
      } else {
        setIsCheckingAuth(false);
      }
    };
    
    checkAuth();
  }, []);

  // User yüklendiğinde adresleri ve kartları getir
  useEffect(() => {
    if (user && !isCheckingAuth) {
      fetchAddresses();
      fetchCards();
    }
  }, [user, isCheckingAuth]);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const response = await addressAPI.getAddresses();
      setAddresses(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching addresses:', err);
      setError('Adresler yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const fetchCards = async () => {
    try {
      const response = await cardAPI.getCards();
      // localStorage'dan card title'ları oku ve kartlara ekle
      const savedTitles = JSON.parse(localStorage.getItem('cardTitles') || '{}');
      const cardsWithTitles = response.data.map(card => ({
        ...card,
        card_title: savedTitles[card.id] || ''
      }));
      setCards(cardsWithTitles);
    } catch (err) {
      console.error('Error fetching cards:', err);
      setError('Kartlar yüklenirken bir hata oluştu');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.name || !formData.surname || !formData.phone || 
        !formData.city || !formData.district || !formData.neighborhood) {
      setError('Lütfen tüm alanları doldurun');
      return;
    }

    try {
      setLoading(true);
      
      if (editingAddress) {
        // Update
        await addressAPI.updateAddress({
          id: editingAddress.id,
          ...formData
        });
      } else {
        // Add new
        await addressAPI.addAddress(formData);
      }
      
      // Reset form and refresh addresses
      setFormData({
        title: '',
        name: '',
        surname: '',
        phone: '',
        city: '',
        district: '',
        neighborhood: ''
      });
      setShowAddressForm(false);
      setEditingAddress(null);
      setFormType('shipping'); // Reset form type
      setIsFormCollapsed(true); // Formu kapat
      fetchAddresses();
      setError('');
    } catch (err) {
      console.error('Error saving address:', err);
      setError('Adres kaydedilirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    setFormData({
      title: address.title,
      name: address.name,
      surname: address.surname,
      phone: address.phone,
      city: address.city,
      district: address.district,
      neighborhood: address.neighborhood
    });
    setShowAddressForm(true);
    setIsFormCollapsed(false);
    // Form tipini otomatik belirle - seçili adreslerle karşılaştır
    if (selectedBillingAddress?.id === address.id && selectedShippingAddress?.id !== address.id) {
      setFormType('billing');
    } else {
      setFormType('shipping');
    }
  };

  const handleDelete = async (addressId) => {
    if (!window.confirm('Bu adresi silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      setLoading(true);
      await addressAPI.deleteAddress(addressId);
      
      // Silinen adres seçiliyse seçimi kaldır
      if (selectedShippingAddress?.id === addressId) {
        setSelectedShippingAddress(null);
      }
      if (selectedBillingAddress?.id === addressId) {
        setSelectedBillingAddress(null);
      }
      
      fetchAddresses();
    } catch (err) {
      console.error('Error deleting address:', err);
      setError('Adres silinirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelForm = () => {
    setShowAddressForm(false);
    setEditingAddress(null);
    setFormData({
      title: '',
      name: '',
      surname: '',
      phone: '',
      city: '',
      district: '',
      neighborhood: ''
    });
    setFormType('shipping');
    setError('');
    setIsFormCollapsed(true);
  };

  // Checkbox değiştiğinde
  const handleBillingSameAsShippingChange = (checked) => {
    setBillingSameAsShipping(checked);
    if (checked) {
      setSelectedBillingAddress(selectedShippingAddress);
    } else {
      setSelectedBillingAddress(null);
    }
  };

  // Kupon fonksiyonları (ShoppingCartPage ile aynı)
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

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  // Card input değişikliklerini yakala
  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Card kaydetme/güncelleme
  const handleCardSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!cardFormData.card_no || !cardFormData.expire_month || !cardFormData.expire_year || !cardFormData.name_on_card) {
      setError('Lütfen tüm kart bilgilerini doldurun');
      return;
    }

    // Kart numarası 16 haneli olmalı
    if (cardFormData.card_no.replace(/\s/g, '').length !== 16) {
      setError('Kart numarası 16 haneli olmalıdır');
      return;
    }

    try {
      setLoading(true);

      // CVV ve card_title backend'e gönderilmez (card_title sadece UI için)
      const { cvv, card_title, ...cardData } = cardFormData;
      
      // Month ve year number olmalı
      const payload = {
        ...cardData,
        expire_month: parseInt(cardData.expire_month),
        expire_year: parseInt(cardData.expire_year)
      };

      if (editingCard) {
        // Update
        const response = await cardAPI.updateCard({
          id: editingCard.id,
          ...payload
        });
        
        // card_title'ı localStorage'a kaydet
        if (card_title) {
          const savedTitles = JSON.parse(localStorage.getItem('cardTitles') || '{}');
          savedTitles[editingCard.id] = card_title;
          localStorage.setItem('cardTitles', JSON.stringify(savedTitles));
        }
      } else {
        // Add new
        const response = await cardAPI.addCard(payload);
        
        // Yeni kart eklendiyse card_title'ı localStorage'a kaydet
        if (card_title && response.data && response.data.id) {
          const savedTitles = JSON.parse(localStorage.getItem('cardTitles') || '{}');
          savedTitles[response.data.id] = card_title;
          localStorage.setItem('cardTitles', JSON.stringify(savedTitles));
        }
      }

      // Reset form and refresh cards
      setCardFormData({
        card_title: '',
        card_no: '',
        expire_month: '',
        expire_year: '',
        name_on_card: '',
        cvv: ''
      });
      setEditingCard(null);
      setIsCardFormCollapsed(true); // Kart formunu kapat
      fetchCards();
      setError('');
    } catch (err) {
      console.error('Error saving card:', err);
      setError('Kart kaydedilirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  // Card düzenleme
  const handleCardEdit = (card) => {
    setEditingCard(card);
    setCardFormData({
      card_title: card.card_title || '',
      card_no: card.card_no,
      expire_month: card.expire_month.toString(),
      expire_year: card.expire_year.toString(),
      name_on_card: card.name_on_card,
      cvv: ''
    });
    setIsCardFormCollapsed(false);
  };

  // Card silme
  const handleCardDelete = async (cardId) => {
    if (!window.confirm('Bu kartı silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      setLoading(true);
      await cardAPI.deleteCard(cardId);

      // localStorage'dan da card_title'ı sil
      const savedTitles = JSON.parse(localStorage.getItem('cardTitles') || '{}');
      delete savedTitles[cardId];
      localStorage.setItem('cardTitles', JSON.stringify(savedTitles));

      // Silinen kart seçiliyse seçimi kaldır
      if (selectedCard?.id === cardId) {
        setSelectedCard(null);
      }

      fetchCards();
    } catch (err) {
      console.error('Error deleting card:', err);
      setError('Kart silinirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  // Card form iptal
  const handleCancelCardForm = () => {
    setEditingCard(null);
    setCardFormData({
      card_title: '',
      card_no: '',
      expire_month: '',
      expire_year: '',
      name_on_card: '',
      cvv: ''
    });
    setError('');
    setIsCardFormCollapsed(true);
  };

  // Siparişi tamamla
  const handleCompleteOrder = async () => {
    if (!selectedCard || !termsAccepted || !selectedShippingAddress) {
      setError('Lütfen tüm gerekli alanları doldurun');
      return;
    }

    try {
      setLoading(true);

      // Toplam fiyat hesapla
      const subtotal = cart.reduce((total, item) => total + (item.product.price * item.count), 0);
      const shipping = 29.99;
      const freeShipping = subtotal >= 150 ? 29.99 : 0;
      let couponDiscount = 0;
      if (appliedCoupon) {
        if (appliedCoupon.type === 'percentage') {
          couponDiscount = (subtotal * appliedCoupon.discount) / 100;
        } else {
          couponDiscount = appliedCoupon.discount;
        }
      }
      const totalPrice = subtotal + shipping - freeShipping - couponDiscount;

      // Order payload oluştur
      const orderPayload = {
        address_id: selectedShippingAddress.id,
        order_date: new Date().toISOString(),
        card_no: parseInt(selectedCard.card_no),
        card_name: selectedCard.name_on_card,
        card_expire_month: parseInt(selectedCard.expire_month),
        card_expire_year: parseInt(selectedCard.expire_year),
        card_ccv: parseInt(cardFormData.cvv) || 0,
        price: Math.round(totalPrice * 100) / 100,
        products: cart.map(item => ({
          product_id: item.product.id,
          count: item.count,
          detail: item.product.detail || ''
        }))
      };

      // POST /order endpoint'ine gönder
      const response = await orderAPI.createOrder(orderPayload);

      if (response.data) {
        // Başarılı - Congratulations mesajı göster
        window.alert(`🎉 Siparişiniz başarıyla oluşturuldu!\nSipariş ID: ${response.data.id || response.data.order_id || 'Alındı'}\n\nÖdeme işlemi tamamlanmıştır. Teşekkür ederiz!`);
        
        // Shopping cart'ı Redux'ta temizle
        dispatch({ type: CLEAR_CART });
        
        // Seçili kuponu temizle (kupon kodları kalır)
        setAppliedCoupon(null);
        setCouponCode('');
        
        // Home sayfasına yönlendir
        history.push('/');
        if (window.innerWidth < 768) {
          setTimeout(() => { window.scrollTo(0, 0); }, 150);
        }
      }
    } catch (err) {
      console.error('Error creating order:', err);
      setError(err.response?.data?.message || 'Sipariş oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  // Loading state göster
  if (isCheckingAuth || (loading && !addresses.length)) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-[#FAFAFA] border-t-[#23A6F0] rounded-full animate-spin"></div>
          <p className="text-[#737373] font-montserrat text-lg">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  // User yoksa null render (redirect olacak)
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-8">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-4 md:py-6">
          <h1 className="font-montserrat font-bold text-[20px] md:text-[28px] text-[#252B42]">
            Sipariş Oluştur
          </h1>
          
          {/* Tabs */}
          <div className="flex gap-4 mt-4 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('address')}
              className={`pb-3 px-2 font-montserrat font-semibold text-[14px] md:text-[16px] border-b-2 transition ${
                activeTab === 'address'
                  ? 'border-[#23A6F0] text-[#23A6F0]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              1. Adres Bilgileri
            </button>
            <button
              onClick={() => setActiveTab('payment')}
              disabled={!selectedShippingAddress || (!billingSameAsShipping && !selectedBillingAddress)}
              className={`pb-3 px-2 font-montserrat font-semibold text-[14px] md:text-[16px] border-b-2 transition ${
                activeTab === 'payment'
                  ? 'border-[#23A6F0] text-[#23A6F0]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed'
              }`}
            >
              2. Ödeme Bilgileri
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-6 md:py-8">
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="font-montserrat text-[14px] text-red-700">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sol ve Orta: İçerik */}
          <div className="lg:col-span-2">
        {/* Adres Bilgileri Tab */}
        {activeTab === 'address' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Sol: Adres Listesi ve Seçim */}
            <div className="space-y-6">
              {/* Teslimat Adresi */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="font-montserrat font-bold text-[18px] text-[#252B42] mb-4 flex items-center gap-2">
                  <MapPin size={20} className="text-[#23A6F0]" />
                  Teslimat Adresi
                </h2>

                {addresses.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="font-montserrat text-[14px] text-gray-600 mb-4">
                      Henüz kayıtlı adresiniz yok. Sağdaki formu kullanarak yeni adres ekleyin.
                    </p>
                    <button
                      onClick={() => {
                        setFormType('shipping');
                        setEditingAddress(null);
                        setFormData({
                          title: '',
                          name: '',
                          surname: '',
                          phone: '',
                          city: '',
                          district: '',
                          neighborhood: ''
                        });
                        setIsFormCollapsed(false);
                      }}
                      className="px-6 py-3 bg-[#23A6F0] text-white font-montserrat font-semibold rounded-lg hover:bg-[#1a7ab8] transition flex items-center gap-2 mx-auto"
                    >
                      <Plus size={18} />
                      Yeni Teslimat Adresi Ekle
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3 mb-4">
                      {addresses.map(address => (
                        <div
                          key={address.id}
                          onClick={() => setSelectedShippingAddress(address)}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                            selectedShippingAddress?.id === address.id
                              ? 'border-[#23A6F0] bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                {selectedShippingAddress?.id === address.id && (
                                  <Check size={18} className="text-[#23A6F0]" />
                                )}
                                <h3 className="font-montserrat font-semibold text-[14px] text-[#252B42]">
                                  {address.title}
                                </h3>
                              </div>
                              <p className="font-montserrat text-[13px] text-gray-700">
                                {address.name} {address.surname}
                              </p>
                              <p className="font-montserrat text-[12px] text-gray-600">
                                {address.phone}
                              </p>
                              <p className="font-montserrat text-[12px] text-gray-600 mt-1">
                                {address.neighborhood}, {address.district}/{address.city}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEdit(address);
                                }}
                                className="p-2 hover:bg-gray-100 rounded-full transition"
                                title="Düzenle"
                              >
                                <Edit2 size={16} className="text-gray-600" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete(address.id);
                                }}
                                className="p-2 hover:bg-red-50 rounded-full transition"
                                title="Sil"
                              >
                                <Trash2 size={16} className="text-red-500" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        setFormType('shipping');
                        setEditingAddress(null);
                        setFormData({
                          title: '',
                          name: '',
                          surname: '',
                          phone: '',
                          city: '',
                          district: '',
                          neighborhood: ''
                        });
                        setIsFormCollapsed(false);
                      }}
                      className="w-full px-4 py-3 border-2 border-dashed border-[#23A6F0] rounded-lg text-[#23A6F0] hover:bg-blue-50 transition font-montserrat font-semibold flex items-center justify-center gap-2"
                    >
                      <Plus size={18} />
                      Yeni Teslimat Adresi Ekle
                    </button>
                  </>
                )}
              </div>

              {/* Fatura Adresi */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="font-montserrat font-bold text-[18px] text-[#252B42] mb-4 flex items-center gap-2">
                  <MapPin size={20} className="text-[#FF6F00]" />
                  Fatura Adresi
                </h2>

                {/* Checkbox: Teslimat adresi ile aynı */}
                <div className="mb-4">
                  <label className="flex items-center gap-3 cursor-pointer p-3 border-2 border-gray-200 rounded-lg hover:border-gray-300 transition">
                    <input
                      type="checkbox"
                      checked={billingSameAsShipping}
                      onChange={(e) => handleBillingSameAsShippingChange(e.target.checked)}
                      className="w-5 h-5 text-[#23A6F0] rounded border-gray-300 focus:ring-[#23A6F0] cursor-pointer"
                    />
                    <span className="font-montserrat text-[14px] text-gray-700">
                      Fatura adresi, teslimat adresi ile aynı
                    </span>
                  </label>
                </div>

                {/* Farklı fatura adresi seçenekleri */}
                {!billingSameAsShipping && (
                  <>
                    {addresses.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="font-montserrat text-[14px] text-gray-600 mb-4">
                          Kayıtlı fatura adresiniz yok
                        </p>
                        <button
                          onClick={() => {
                            setFormType('billing');
                            setEditingAddress(null);
                            setFormData({
                              title: '',
                              name: '',
                              surname: '',
                              phone: '',
                              city: '',
                              district: '',
                              neighborhood: ''
                            });
                            setIsFormCollapsed(false);
                          }}
                          className="px-6 py-3 bg-[#FF6F00] text-white font-montserrat font-semibold rounded-lg hover:bg-[#E66300] transition flex items-center gap-2 mx-auto"
                        >
                          <Plus size={18} />
                          Yeni Fatura Adresi Ekle
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-3 mb-4">
                          {addresses.map(address => (
                            <div
                              key={address.id}
                              onClick={() => setSelectedBillingAddress(address)}
                              className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                                selectedBillingAddress?.id === address.id
                                  ? 'border-[#FF6F00] bg-orange-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    {selectedBillingAddress?.id === address.id && (
                                      <Check size={18} className="text-[#FF6F00]" />
                                    )}
                                    <h3 className="font-montserrat font-semibold text-[14px] text-[#252B42]">
                                      {address.title}
                                    </h3>
                                  </div>
                                  <p className="font-montserrat text-[13px] text-gray-700">
                                    {address.name} {address.surname}
                                  </p>
                                  <p className="font-montserrat text-[12px] text-gray-600">
                                    {address.phone}
                                  </p>
                                  <p className="font-montserrat text-[12px] text-gray-600 mt-1">
                                    {address.neighborhood}, {address.district}/{address.city}
                                  </p>
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleEdit(address);
                                    }}
                                    className="p-2 hover:bg-gray-100 rounded-full transition"
                                    title="Düzenle"
                                  >
                                    <Edit2 size={16} className="text-gray-600" />
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDelete(address.id);
                                    }}
                                    className="p-2 hover:bg-red-50 rounded-full transition"
                                    title="Sil"
                                  >
                                    <Trash2 size={16} className="text-red-500" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <button
                          onClick={() => {
                            setFormType('billing');
                            setEditingAddress(null);
                            setFormData({
                              title: '',
                              name: '',
                              surname: '',
                              phone: '',
                              city: '',
                              district: '',
                              neighborhood: ''
                            });
                            setIsFormCollapsed(false);
                          }}
                          className="w-full px-4 py-3 border-2 border-dashed border-[#FF6F00] rounded-lg text-[#FF6F00] hover:bg-orange-50 transition font-montserrat font-semibold flex items-center justify-center gap-2"
                        >
                          <Plus size={18} />
                          Yeni Fatura Adresi Ekle
                        </button>
                      </>
                    )}
                  </>
                )}

                {/* Seçili fatura adresi gösterimi (checkbox işaretliyken) */}
                {billingSameAsShipping && selectedShippingAddress && (
                  <div className="mt-4 p-4 bg-blue-50 border-2 border-[#23A6F0] rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Check size={18} className="text-[#23A6F0]" />
                      <h3 className="font-montserrat font-semibold text-[14px] text-[#252B42]">
                        {selectedShippingAddress.title}
                      </h3>
                    </div>
                    <p className="font-montserrat text-[13px] text-gray-700">
                      {selectedShippingAddress.name} {selectedShippingAddress.surname}
                    </p>
                    <p className="font-montserrat text-[12px] text-gray-600 mt-1">
                      {selectedShippingAddress.neighborhood}, {selectedShippingAddress.district}/{selectedShippingAddress.city}
                    </p>
                    <p className="font-montserrat text-[12px] text-gray-600">
                      {selectedShippingAddress.phone}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Sağ: Adres Ekleme/Düzenleme Formu - Her zaman görünür */}
            <div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="mb-6 pb-4 border-b border-gray-200">
                  <div 
                    onClick={() => !editingAddress && setIsFormCollapsed(!isFormCollapsed)}
                    className={`flex items-center justify-between ${!editingAddress ? 'cursor-pointer hover:text-[#23A6F0]' : ''} transition`}
                  >
                    <h2 className="font-montserrat font-bold text-[18px] text-[#252B42]">
                      {editingAddress ? 'Adresi Düzenle' : (
                        formType === 'shipping' ? 'Teslimat Adresi Ekle' : 'Fatura Adresi Ekle'
                      )}
                    </h2>
                    {!editingAddress && (
                      isFormCollapsed ? 
                        <ChevronDown size={20} className="text-gray-600" /> : 
                        <ChevronUp size={20} className="text-gray-600" />
                    )}
                  </div>
                  {editingAddress && (
                    <button
                      onClick={handleCancelForm}
                      className="mt-2 text-[#23A6F0] font-montserrat text-[13px] hover:underline"
                    >
                      Düzenlemeyi İptal Et
                    </button>
                  )}
                  {!editingAddress && formType === 'billing' && !isFormCollapsed && (
                    <p className="mt-2 text-[#FF6F00] font-montserrat text-[12px]">
                      Fatura adresi bilgilerini giriyorsunuz
                    </p>
                  )}
                </div>

                {(!isFormCollapsed || editingAddress) && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Adres Başlığı */}
                  <div>
                    <label className="block font-montserrat font-semibold text-[14px] text-[#252B42] mb-2">
                      Adres Başlığı <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Örn: Ev Adresi, İş Adresi"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg font-montserrat text-[14px] focus:outline-none focus:border-[#23A6F0]"
                      required
                    />
                  </div>

                  {/* Ad Soyad */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-montserrat font-semibold text-[14px] text-[#252B42] mb-2">
                        Ad <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg font-montserrat text-[14px] focus:outline-none focus:border-[#23A6F0]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-montserrat font-semibold text-[14px] text-[#252B42] mb-2">
                        Soyad <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="surname"
                        value={formData.surname}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg font-montserrat text-[14px] focus:outline-none focus:border-[#23A6F0]"
                        required
                      />
                    </div>
                  </div>

                  {/* Telefon */}
                  <div>
                    <label className="block font-montserrat font-semibold text-[14px] text-[#252B42] mb-2">
                      Telefon <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="05XXXXXXXXX"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg font-montserrat text-[14px] focus:outline-none focus:border-[#23A6F0]"
                      required
                    />
                  </div>

                  {/* İl */}
                  <div>
                    <label className="block font-montserrat font-semibold text-[14px] text-[#252B42] mb-2">
                      İl <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg font-montserrat text-[14px] focus:outline-none focus:border-[#23A6F0]"
                      required
                    >
                      <option value="">İl Seçiniz</option>
                      {CITIES.map(city => (
                        <option key={city} value={city.toLowerCase()}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* İlçe */}
                  <div>
                    <label className="block font-montserrat font-semibold text-[14px] text-[#252B42] mb-2">
                      İlçe <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg font-montserrat text-[14px] focus:outline-none focus:border-[#23A6F0]"
                      required
                    />
                  </div>

                  {/* Mahalle/Adres Detayları */}
                  <div>
                    <label className="block font-montserrat font-semibold text-[14px] text-[#252B42] mb-2">
                      Mahalle / Adres Detayları <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="neighborhood"
                      value={formData.neighborhood}
                      onChange={handleInputChange}
                      placeholder="Mahalle, Sokak, Bina No, Daire No"
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg font-montserrat text-[14px] focus:outline-none focus:border-[#23A6F0] resize-none"
                      required
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-4">
                    {editingAddress && (
                      <button
                        type="button"
                        onClick={handleCancelForm}
                        className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-montserrat font-semibold rounded-lg hover:bg-gray-50 transition"
                      >
                        İptal
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 px-6 py-3 bg-[#23A6F0] text-white font-montserrat font-semibold rounded-lg hover:bg-[#1a7ab8] disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      {loading ? 'Kaydediliyor...' : (editingAddress ? 'Güncelle' : 'Kaydet')}
                    </button>
                  </div>
                </form>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Ödeme Bilgileri Tab */}
        {activeTab === 'payment' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sol: Kayıtlı Kartlar */}
            <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center justify-center md:items-start md:justify-start lg:items-center lg:justify-center">
              <h2 className="font-montserrat font-bold text-[18px] text-[#252B42] mb-4 flex items-center gap-2">
                <CreditCard size={20} className="text-[#23A6F0]" />
                Kart Bilgileri
              </h2>

              {cards.length === 0 ? (
                <div className="text-center py-8">
                  <p className="font-montserrat text-[14px] text-gray-600 mb-4">
                    Henüz kayıtlı kartınız yok. Sağdaki formu kullanarak yeni kart ekleyin.
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-4 flex flex-col items-center">
                    {cards.map(card => {
                      // Kart numarasını formatla
                      const fullNumber = card.card_no;
                      const maskedNumber = `${fullNumber.slice(0, 4)} ${fullNumber.slice(4, 6)}** **** ${fullNumber.slice(-4)}`;
                      
                      return (
                        <div 
                          key={card.id}
                          onClick={() => setSelectedCard(card)}
                          className="cursor-pointer"
                          style={{ width: '220px' }}
                        >
                          {/* Kart Başlığı ve Radio Button */}
                          <div className="flex items-center justify-between mb-2" style={{width: '220px'}}>
                            {/* Sol: Radio Button + Title */}
                            <div className="flex items-center gap-2">
                              {/* Radio Button */}
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                selectedCard?.id === card.id
                                  ? 'border-[#23A6F0] bg-[#23A6F0]'
                                  : 'border-gray-300'
                              }`}>
                                {selectedCard?.id === card.id && (
                                  <div className="w-2 h-2 bg-white rounded-full"></div>
                                )}
                              </div>
                              
                              {/* Kart Başlığı */}
                              {card.card_title ? (
                                <span className="font-montserrat font-semibold text-[13px] text-[#252B42]">
                                  {card.card_title}
                                </span>
                              ) : (
                                <span className="font-montserrat font-semibold text-[13px] text-gray-400">
                                  Kartım
                                </span>
                              )}
                            </div>
                            
                            {/* Sağ: Edit/Delete Buttons */}
                            <div className="flex gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCardEdit(card);
                                }}
                                className="p-2 hover:bg-gray-100 rounded-md transition"
                                title="Düzenle"
                              >
                                <Edit2 size={14} className="text-gray-600" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCardDelete(card.id);
                                }}
                                className="p-2 hover:bg-red-50 rounded-md transition"
                                title="Sil"
                              >
                                <Trash2 size={14} className="text-red-500" />
                              </button>
                            </div>
                          </div>
                          
                          {/* Kart Seçim Kutucuğu */}
                          <div
                            className={`p-2 border-2 rounded-lg transition-all ${
                              selectedCard?.id === card.id
                                ? 'border-[#23A6F0] bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            style={{width: '220px'}}>
                            {/* Kart Ön Yüzü Tasarımı */}
                            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-3 text-white mb-1" style={{aspectRatio: '1.585', maxWidth: '220px'}}>
                            {/* Sağ Üst: Troy Logo */}
                            <div className="absolute top-3 right-3 flex items-center">
                              <img src={troyLogo} alt="Troy Logo" style={{ width: 38, height: 16, objectFit: 'contain' }} />
                            </div>

                              {/* Sol Üst: İsim Soyisim */}
                              <div className="absolute top-4 left-4">
                                <p className="text-[8px] text-gray-400 uppercase tracking-wide">Cardholder</p>
                                <p className="text-[11px] font-semibold mt-0.5 truncate">{card.name_on_card}</p>
                              </div>

                              {/* Tam Ortada: Kart Numarası */}
                              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full flex justify-center">
                                <p className="font-mono text-[13px] tracking-widest">{maskedNumber}</p>
                              </div>

                              {/* Sol Alt: E-com Bank */}
                              <div className="absolute bottom-4 left-4 text-left">
                                <p className="text-[10px] font-bold text-white tracking-wide">E-com Bank</p>
                              </div>
                              {/* Sağ Alt: Son Kullanma Tarihi */}
                              <div className="absolute bottom-4 right-4 text-right">
                                <p className="text-[7px] text-gray-400 uppercase">Valid Thru</p>
                                <p className="font-mono text-[11px]">{card.expire_month.toString().padStart(2, '0')}/{card.expire_year.toString().slice(-2)}</p>
                              </div>
                            </div>

                            {/* Kart Bilgileri */}
                            <div className="flex items-center justify-end">
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => {
                      setEditingCard(null);
                      setCardFormData({
                        card_title: '',
                        card_no: '',
                        expire_month: '',
                        expire_year: '',
                        name_on_card: '',
                        cvv: ''
                      });
                      setIsCardFormCollapsed(false);
                    }}
                    className="w-full px-4 py-3 border-2 border-dashed border-[#23A6F0] rounded-lg text-[#23A6F0] hover:bg-blue-50 transition font-montserrat font-semibold flex items-center justify-center gap-2"
                  >
                    <Plus size={18} />
                    Yeni Kart Ekle
                  </button>
                </>
              )}
            </div>

            {/* Sağ: Kart Formu */}
            {(!isCardFormCollapsed || editingCard) ? (
            <div className="bg-white rounded-lg shadow-sm p-6 self-start">
              <div className="mb-6">
                <div 
                  onClick={() => !editingCard && setIsCardFormCollapsed(!isCardFormCollapsed)}
                  className={`flex items-center justify-between ${!editingCard ? 'cursor-pointer hover:text-[#23A6F0]' : ''} transition`}
                >
                  <h2 className="font-montserrat font-bold text-[18px] text-[#252B42]">
                    {editingCard ? 'Kartı Düzenle' : 'Yeni Kart Ekle'}
                  </h2>
                  {!editingCard && (
                    isCardFormCollapsed ? 
                      <ChevronDown size={20} className="text-gray-600" /> : 
                      <ChevronUp size={20} className="text-gray-600" />
                  )}
                </div>
                {editingCard && (
                  <button
                    onClick={handleCancelCardForm}
                    className="mt-2 text-[#23A6F0] font-montserrat text-[13px] hover:underline"
                  >
                    Düzenlemeyi İptal Et
                  </button>
                )}
              </div>

              {(!isCardFormCollapsed || editingCard) && (
              <form onSubmit={handleCardSubmit} className="space-y-4">
                {/* Kart İsmi */}
                <div>
                  <label className="block font-montserrat font-semibold text-[14px] text-[#252B42] mb-2">
                    Kart İsmi
                  </label>
                  <input
                    type="text"
                    name="card_title"
                    value={cardFormData.card_title}
                    onChange={handleCardInputChange}
                    placeholder="Örn: İş Kartım, Ev Kartım"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg font-montserrat text-[14px] focus:outline-none focus:border-[#23A6F0]"
                  />
                </div>

                {/* Kart Üzerindeki İsim */}
                <div>
                  <label className="block font-montserrat font-semibold text-[14px] text-[#252B42] mb-2">
                    Kart Üzerindeki İsim <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name_on_card"
                    value={cardFormData.name_on_card}
                    onChange={handleCardInputChange}
                    placeholder="Ali Veli"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg font-montserrat text-[14px] focus:outline-none focus:border-[#23A6F0]"
                    required
                  />
                </div>

                {/* Kart Numarası */}
                <div>
                  <label className="block font-montserrat font-semibold text-[14px] text-[#252B42] mb-2">
                    Kart Numarası <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="card_no"
                    value={cardFormData.card_no}
                    onChange={handleCardInputChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength="16"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg font-montserrat text-[14px] tracking-wider focus:outline-none focus:border-[#23A6F0]"
                    required
                  />
                </div>

                {/* Son Kullanma Tarihi ve CVV */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block font-montserrat font-semibold text-[14px] text-[#252B42] mb-2">
                      Ay <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="expire_month"
                      value={cardFormData.expire_month}
                      onChange={handleCardInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg font-montserrat text-[14px] focus:outline-none focus:border-[#23A6F0]"
                      required
                    >
                      <option value="">Ay</option>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                        <option key={month} value={month}>
                          {month.toString().padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-montserrat font-semibold text-[14px] text-[#252B42] mb-2">
                      Yıl <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="expire_year"
                      value={cardFormData.expire_year}
                      onChange={handleCardInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg font-montserrat text-[14px] focus:outline-none focus:border-[#23A6F0]"
                      required
                    >
                      <option value="">Yıl</option>
                      {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(year => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-montserrat font-semibold text-[14px] text-[#252B42] mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={cardFormData.cvv}
                      onChange={handleCardInputChange}
                      placeholder="123"
                      maxLength="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg font-montserrat text-[14px] focus:outline-none focus:border-[#23A6F0]"
                    />
                  </div>
                </div>

                {/* 3D Secure */}
                <div className="mt-4">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-5 h-5 text-[#23A6F0] rounded border-gray-300 focus:ring-2 focus:ring-[#23A6F0]"
                    />
                    <span className="font-montserrat text-[14px] text-gray-700 group-hover:text-gray-900 flex items-center gap-2">
                      <Check size={16} className="text-green-600" />
                      3D Secure ile ödemek istiyorum
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-4 bg-[#23A6F0] text-white font-montserrat font-bold text-[16px] rounded-lg hover:bg-[#1a7ab8] disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {editingCard ? 'Kartı Güncelle' : 'Kartı Kaydet'}
                </button>
              </form>
              )}
            </div>
            ) : (
            <div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="mb-6 pb-4 border-b border-gray-200">
                  <div 
                    onClick={() => setIsCardFormCollapsed(false)}
                    className="flex items-center justify-between cursor-pointer hover:text-[#23A6F0] transition"
                  >
                    <h2 className="font-montserrat font-bold text-[18px] text-[#252B42]">
                      Yeni Kart Ekle
                    </h2>
                    <ChevronDown size={20} className="text-gray-600" />
                  </div>
                </div>
              </div>
            </div>
            )}
          </div>
          
        )} 
          </div>

          
          {/* Sağ: Sipariş Özeti */}
          <div className="lg:col-span-1">
            <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-6">
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
                    {cart.reduce((total, item) => total + (item.product.price * item.count), 0).toFixed(2)} TL
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="font-montserrat text-[14px] text-gray-600">
                    Kargo Toplamı
                  </span>
                  <span className="font-montserrat font-semibold text-[16px] text-[#252B42]">
                    29.99 TL
                  </span>
                </div>
                
                {cart.reduce((total, item) => total + (item.product.price * item.count), 0) >= 150 && (
                  <div className="flex justify-between items-center bg-green-50 -mx-2 px-2 py-2 rounded">
                    <span className="font-montserrat text-[14px] text-green-700 flex items-center gap-1">
                      <span className="w-4 h-4 flex items-center justify-center rounded-full bg-green-600">
                        <MdCheck size={12} color="#fff" />
                      </span>
                      150 TL ve Üzeri Kargo Bedava (Satıcı Karşılar)
                    </span>
                    <span className="font-montserrat font-semibold text-[16px] text-green-700">
                      -29.99 TL
                    </span>
                  </div>
                )}
                
                {appliedCoupon && (
                  <div className="flex justify-between items-center bg-orange-50 -mx-2 px-2 py-2 rounded">
                    <span className="font-montserrat text-[14px] text-orange-700 flex items-center gap-1">
                      <Check size={16} />
                      Kupon İndirimi ({appliedCoupon.code})
                    </span>
                    <span className="font-montserrat font-semibold text-[16px] text-orange-700">
                      -{(() => {
                        const subtotal = cart.reduce((total, item) => total + (item.product.price * item.count), 0);
                        if (appliedCoupon.type === 'percentage') {
                          return ((subtotal * appliedCoupon.discount) / 100).toFixed(2);
                        }
                        return appliedCoupon.discount.toFixed(2);
                      })()} TL
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
                    {(() => {
                      const subtotal = cart.reduce((total, item) => total + (item.product.price * item.count), 0);
                      const shipping = 29.99;
                      const discount = subtotal >= 150 ? 29.99 : 0;
                      let couponDiscount = 0;
                      if (appliedCoupon) {
                        if (appliedCoupon.type === 'percentage') {
                          couponDiscount = (subtotal * appliedCoupon.discount) / 100;
                        } else {
                          couponDiscount = appliedCoupon.discount;
                        }
                      }
                      return (subtotal + shipping - discount - couponDiscount).toFixed(2);
                    })()} TL
                  </span>
                </div>
              </div>

              {/* Ödeme Butonu - Sadece payment tab'ında */}
              {activeTab === 'payment' && (
                <>
                  {/* Ön Bilgilendirme ve Koşullar */}
                  <div className="mb-4 space-y-3">
                    {/* 3D Secure */}
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 text-[#23A6F0] rounded border-gray-300 focus:ring-2 focus:ring-[#23A6F0] cursor-pointer"
                      />
                      <span className="font-montserrat text-[12px] text-gray-700 group-hover:text-gray-900 flex items-center gap-2">
                        <Check size={16} className="text-green-600" />
                        3D Secure ile ödemek istiyorum.
                      </span>
                    </label>

                    {/* Terms */}
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        className="w-4 h-4 text-[#23A6F0] rounded border-gray-300 focus:ring-2 focus:ring-[#23A6F0] cursor-pointer mt-0.5 flex-shrink-0"
                      />
                      <span className="font-montserrat text-[12px] text-gray-700 group-hover:text-gray-900">
                        <a href="#" className="text-[#23A6F0] hover:underline">Ön Bilgilendirme Koşulları</a>'nı ve{' '}
                        <a href="#" className="text-[#23A6F0] hover:underline">Mesafeli Satış Sözleşmesi</a>'ni okudum, onaylıyorum.
                      </span>
                    </label>
                  </div>

                  <button
                    onClick={handleCompleteOrder}
                    disabled={!selectedCard || !termsAccepted || loading}
                    className="w-full px-6 py-4 bg-[#2DC071] text-white font-montserrat font-bold text-[16px] rounded-lg hover:bg-[#25a05f] disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    {loading ? 'İşleniyor...' : 'Ödemeyi Tamamla'}
                  </button>
                </>
              )}
            </div>

            {/* Navigation Button - Adres sayfasında sipariş özetinin altında */}
            {activeTab === 'address' && (
              <button
                onClick={() => setActiveTab('payment')}
                disabled={!selectedShippingAddress || (!billingSameAsShipping && !selectedBillingAddress)}
                className="w-full px-8 py-4 bg-[#FF6F00] text-white font-montserrat font-bold text-[16px] rounded-lg hover:bg-[#E66300] disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Ödeme Bilgilerine Geç →
              </button>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
