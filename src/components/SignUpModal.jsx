import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { X } from 'lucide-react';
import api from '../store/api';
import { fetchRoles } from '../store/thunks';
import { setUser } from '../store/actions';

const SignUpModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const roles = useSelector(state => state.client.roles);
  
  const { handleSubmit, control, watch, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      role_id: 3,
      store: {
        name: '',
        phone: '',
        tax_no: '',
        bank_account: '',
      },
    },
  });

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const selectedRole = watch('role_id');
  const password = watch('password');

  // Rolleri Redux'tan fetch et
  useEffect(() => {
    if (isOpen && roles.length === 0) {
      dispatch(fetchRoles());
    }
  }, [isOpen, dispatch, roles.length]);

  // ESC tuşu ile kapat
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Email validasyonu
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Şifre validasyonu
  const validatePassword = (pwd) => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$/;
    return passwordRegex.test(pwd);
  };

  // Türkiye telefon validasyonu
  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^(\+90|0)[1-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  // Vergi numarası validasyonu
  const validateTaxNo = (tax) => {
    const taxRegex = /^T\d{4}V\d{6}$/;
    return taxRegex.test(tax);
  };

  // IBAN validasyonu
  const validateIBAN = (iban) => {
    const ibanRegex = /^TR\d{24}$/;
    return ibanRegex.test(iban.replace(/\s/g, ''));
  };

  // Submit
  const onSubmit = async (data) => {
    setServerError('');
    setLoading(true);

    try {
      let submitData = {
        name: data.name,
        email: data.email,
        password: data.password,
        role_id: parseInt(data.role_id),
      };

      // Eğer role = Store ise, store bilgilerini ekle
      if (parseInt(data.role_id) === 2) {
        submitData.store = {
          name: data.store.name,
          phone: data.store.phone,
          tax_no: data.store.tax_no,
          bank_account: data.store.bank_account,
        };
      }

      const response = await api.post('/signup', submitData);

      // Redux'a user'ı kaydet
      dispatch(setUser({
        name: data.name,
        email: data.email,
        role_id: data.role_id,
      }));

      // Başarılı
      alert('Hesabınızı aktive etmek için email\'deki linke tıklamanız gerekiyor!');
      reset();
      onClose();
    } catch (error) {
      setServerError(
        error.response?.data?.message ||
        'Kayıt sırasında hata oluştu. Lütfen tekrar deneyin.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-2xl relative z-10 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition"
        >
          <X size={24} className="text-gray-600" />
        </button>

        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Hesap Oluştur
        </h1>

        {/* Server hatası mesajı */}
        {serverError && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md text-sm">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ad Soyad
            </label>
            <Controller
              name="name"
              control={control}
              rules={{
                required: 'Ad zorunludur',
                minLength: {
                  value: 3,
                  message: 'Ad en az 3 karakter olmalıdır',
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="Adınızı girin"
                />
              )}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Email zorunludur',
                validate: (value) =>
                  validateEmail(value) || 'Geçerli bir email girin',
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="email"
                  autoComplete="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="email@example.com"
                />
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Şifre
            </label>
            <Controller
              name="password"
              control={control}
              rules={{
                required: 'Şifre zorunludur',
                validate: (value) =>
                  validatePassword(value) ||
                  'Min 8 char, rakam, küçük, büyük, özel karakter (@$!%*?&)',
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="password"
                  autoComplete="new-password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="Şifrenizi girin"
                />
              )}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Password Confirmation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Şifre Doğrulama
            </label>
            <Controller
              name="passwordConfirm"
              control={control}
              rules={{
                required: 'Şifre doğrulaması zorunludur',
                validate: (value) =>
                  value === password || 'Şifreler eşleşmiyor',
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="password"
                  autoComplete="new-password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="Şifrenizi tekrar girin"
                />
              )}
            />
            {errors.passwordConfirm && (
              <p className="text-red-500 text-xs mt-1">
                {errors.passwordConfirm.message}
              </p>
            )}
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rol
            </label>
            <Controller
              name="role_id"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>

          {/* Store Fields */}
          {parseInt(selectedRole) === 2 && (
            <div className="border-t pt-3 mt-3">
              <h3 className="text-sm font-semibold mb-2 text-gray-700">
                Mağaza Bilgileri
              </h3>

              {/* Store Name */}
              <div className="mb-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Mağaza Adı
                </label>
                <Controller
                  name="store.name"
                  control={control}
                  rules={{
                    required: 'Mağaza adı zorunludur',
                    minLength: {
                      value: 3,
                      message: 'Mağaza adı en az 3 karakter olmalıdır',
                    },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="Mağaza adınız"
                    />
                  )}
                />
                {errors.store?.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.store.name.message}
                  </p>
                )}
              </div>

              {/* Store Phone */}
              <div className="mb-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Telefon (Türkiye)
                </label>
                <Controller
                  name="store.phone"
                  control={control}
                  rules={{
                    required: 'Telefon zorunludur',
                    validate: (value) =>
                      validatePhoneNumber(value) ||
                      'Geçerli Türkiye telefonu (+905XXXXXXXXX)',
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="tel"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="+905551234567"
                    />
                  )}
                />
                {errors.store?.phone && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.store.phone.message}
                  </p>
                )}
              </div>

              {/* Store Tax ID */}
              <div className="mb-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Vergi Numarası
                </label>
                <Controller
                  name="store.tax_no"
                  control={control}
                  rules={{
                    required: 'Vergi numarası zorunludur',
                    validate: (value) =>
                      validateTaxNo(value) ||
                      'Format: TXXXXVXXXXXX (T1234V567890)',
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="T1234V567890"
                    />
                  )}
                />
                {errors.store?.tax_no && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.store.tax_no.message}
                  </p>
                )}
              </div>

              {/* Store Bank Account */}
              <div className="mb-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Banka Hesabı (IBAN)
                </label>
                <Controller
                  name="store.bank_account"
                  control={control}
                  rules={{
                    required: 'IBAN zorunludur',
                    validate: (value) =>
                      validateIBAN(value) ||
                      'Türkiye IBAN\'ı (TR + 24 rakam)',
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="TR330006100519786457844452"
                    />
                  )}
                />
                {errors.store?.bank_account && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.store.bank_account.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md font-semibold text-white mt-4 flex items-center justify-center gap-2 text-sm ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? (
              <>
                <span className="animate-spin">⏳</span>
                Kaydediliyor...
              </>
            ) : (
              'Hesap Oluştur'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpModal;
