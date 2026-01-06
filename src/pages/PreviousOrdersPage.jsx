import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { orderAPI } from "../store/api";
import { ChevronDown, ChevronUp, Package, Calendar, DollarSign } from "lucide-react";

export default function PreviousOrdersPage() {
  const history = useHistory();
  const user = useSelector(state => state.client.user);
  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  // Auth kontrolü - User yoksa login sayfasına yönlendir
  useEffect(() => {
    if (!user) {
      history.push('/');
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await orderAPI.getOrders();
        
        let ordersList = [];
        if (response.data && Array.isArray(response.data)) {
          ordersList = response.data;
        } else if (response.data && response.data.data) {
          ordersList = response.data.data;
        }
        
        console.log('API Response:', response.data);
        console.log('Orders List:', ordersList);
        
        // Filter out incomplete orders (null fields)
        const completeOrders = ordersList.filter(
          order => order.order_date && order.price !== null && order.address_id
        );
        
        console.log('Complete Orders:', completeOrders);
        
        setOrders(completeOrders);
        setError('');
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError(err.response?.data?.message || 'Siparişler yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, history]);

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="bg-[#FAFAFA] flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-[#FAFAFA] border-t-[#23A6F0] rounded-full animate-spin"></div>
          <p className="text-[#737373] font-montserrat text-lg">Siparişler yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAFA] pb-8">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-4 md:py-6 flex flex-col items-start md:items-center">
          <h1 className="font-montserrat font-bold text-[20px] md:text-[28px] text-[#252B42] text-center md:text-center w-full md:w-auto">
            Önceki Siparişlerim
          </h1>
          <p className="font-montserrat text-[14px] text-gray-600 mt-2 text-center md:text-center w-full md:w-auto">
            {user.name} - Toplam {orders.length} sipariş
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="font-montserrat text-[14px] text-red-700">{error}</p>
          </div>
        )}

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Package size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="font-montserrat text-[16px] text-gray-600">
              Henüz siparış vermemisiniz.
            </p>
            <button
              onClick={() => history.push('/shop')}
              className="mt-6 px-6 py-3 bg-[#23A6F0] text-white font-montserrat font-semibold rounded-lg hover:bg-[#1a7ab8] transition"
            >
              Alışverişe Başla
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                {/* Order Header - Always Visible */}
                <button
                  onClick={() =>
                    setExpandedOrderId(
                      expandedOrderId === order.id ? null : order.id
                    )
                  }
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
                >
                  {/* Left: Order Info */}
                  <div className="flex items-center gap-6 flex-1 text-left">
                    {/* Order ID & Date */}
                    <div>
                      <p className="font-montserrat font-semibold text-[14px] text-[#252B42]">
                        Sipariş #
                        {order.id}
                      </p>
                      <p className="font-montserrat text-[12px] text-gray-600 mt-1 flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(order.order_date).toLocaleDateString("tr-TR")}
                      </p>
                    </div>

                    {/* Order Status */}
                    <div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 font-montserrat text-[12px] font-semibold rounded-full">
                        Teslim Edildi
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-1">
                      <DollarSign size={16} className="text-[#FF6F00]" />
                      <p className="font-montserrat font-bold text-[16px] text-[#FF6F00]">
                        {order.price} TL
                      </p>
                    </div>
                  </div>

                  {/* Right: Expand Button */}
                  <button
                    type="button"
                    className="p-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedOrderId(
                        expandedOrderId === order.id ? null : order.id
                      );
                    }}
                  >
                    {expandedOrderId === order.id ? (
                      <ChevronUp size={20} className="text-[#23A6F0]" />
                    ) : (
                      <ChevronDown size={20} className="text-gray-400" />
                    )}
                  </button>
                </button>

                {/* Order Details - Expandable */}
                {expandedOrderId === order.id && (
                  <div className="border-t border-gray-200 px-6 py-6 bg-gray-50">
                    {/* Address Info */}
                    <div className="mb-6 pb-6 border-b border-gray-200">
                      <h3 className="font-montserrat font-bold text-[14px] text-[#252B42] mb-3">
                        Teslimat Adresi
                      </h3>
                      <p className="font-montserrat text-[13px] text-gray-700 mb-2">
                        Adres ID: {order.address_id}
                      </p>
                      <p className="font-montserrat text-[12px] text-gray-600">
                        Sipariş tarihi:{" "}
                        {new Date(order.order_date).toLocaleDateString("tr-TR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>

                    {/* Payment Info */}
                    <div className="mb-6 pb-6 border-b border-gray-200">
                      <h3 className="font-montserrat font-bold text-[14px] text-[#252B42] mb-3">
                        Ödeme Bilgileri
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="font-montserrat text-[11px] text-gray-600 mb-1">
                            Kart Adı
                          </p>
                          <p className="font-montserrat font-semibold text-[13px] text-[#252B42]">
                            {order.card_name}
                          </p>
                        </div>
                        <div>
                          <p className="font-montserrat text-[11px] text-gray-600 mb-1">
                            Kart Numarası
                          </p>
                          <p className="font-montserrat font-semibold text-[13px] text-[#252B42]">
                            **** **** **** {String(order.card_no).slice(-4)}
                          </p>
                        </div>
                        <div>
                          <p className="font-montserrat text-[11px] text-gray-600 mb-1">
                            Son Kullanma
                          </p>
                          <p className="font-montserrat font-semibold text-[13px] text-[#252B42]">
                            {String(order.card_expire_month).padStart(2, "0")}/
                            {order.card_expire_year}
                          </p>
                        </div>
                        <div>
                          <p className="font-montserrat text-[11px] text-gray-600 mb-1">
                            Tutar
                          </p>
                          <p className="font-montserrat font-bold text-[13px] text-[#FF6F00]">
                            {order.price} TL
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div>
                      <h3 className="font-montserrat font-bold text-[14px] text-[#252B42] mb-3">
                        Ürünler
                      </h3>
                      {Array.isArray(order.products) && order.products.length > 0 ? (
                        <div className="space-y-3">
                          {order.products.map((product, idx) => (
                            <div
                              key={idx}
                              className="flex gap-4 p-4 bg-white rounded border border-gray-100 hover:border-gray-200 transition"
                            >
                              {/* Product Image */}
                              {product.images && product.images.length > 0 && (
                                <img
                                  src={product.images[0].url}
                                  alt={product.name}
                                  className="w-16 h-16 object-cover rounded"
                                />
                              )}

                              {/* Product Info */}
                              <div className="flex-1">
                                <p className="font-montserrat font-semibold text-[13px] text-[#252B42] mb-1">
                                  {product.name}
                                </p>
                                {product.description && (
                                  <p className="font-montserrat text-[12px] text-gray-600 mb-2 line-clamp-2">
                                    {product.description}
                                  </p>
                                )}
                                <div className="flex items-center gap-4">
                                  <span className="font-montserrat text-[12px] text-gray-600">
                                    Fiyat: <span className="font-bold text-[#252B42]">{product.price} TL</span>
                                  </span>
                                  <span className="font-montserrat text-[12px] text-gray-600">
                                    Adet: <span className="font-bold text-[#252B42]">{product.count}</span>
                                  </span>
                                  <span className="font-montserrat text-[12px] text-[#FF6F00] font-bold">
                                    Toplam: {(product.price * product.count).toFixed(2)} TL
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="font-montserrat text-[12px] text-gray-600">
                          Ürün bilgisi bulunmuyor
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
