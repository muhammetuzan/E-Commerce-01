import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import api from '../store/api';

const SignUpPage = () => {
  const history = useHistory();
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

  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const selectedRole = watch('role_id');
  const password = watch('password');

  // Rolleri fetch et
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await api.get('/roles');
        setRoles(response.data);
      } catch (error) {
        console.error('Rolleri getirirken hata:', error);
      }
    };
    fetchRoles();
  }, []);

  // Email validasyonu
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Şifre validasyonu (8+ char, sayı, küçük, büyük, özel karakter)
  const validatePassword = (pwd) => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$/;
    return passwordRegex.test(pwd);
  };

  // Türkiye telefon validasyonu
  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^(\+90|0)[1-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  // Vergi numarası validasyonu (TXXXXVXXXXXX)
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

      // Başarılı
      alert('Hesabınızı aktive etmek için email\'deki linke tıklamanız gerekiyor!');
      history.goBack(); // Önceki sayfaya git
    } catch (error) {
      setServerError(
        error.response?.data?.message ||
        'Kayıt sırasında hata oluştu. Lütfen tekrar deneyin.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4 relative">
      {/* Background Blur Effect */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/5"></div>
      
      {/* Form Container */}
      <div className="w-full max-w-lg bg-white/95 backdrop-blur-md p-12 rounded-2xl shadow-2xl relative z-10 border border-white/20">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
          Hesap Oluştur
        </h1>

        {/* Server hatası mesajı */}
        {serverError && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Adınızı girin"
                />
              )}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="email@example.com"
                />
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Şifre
            </label>
            <Controller
              name="password"
              control={control}
              rules={{
                required: 'Şifre zorunludur',
                validate: (value) =>
                  validatePassword(value) ||
                  'Şifre minimum 8 karakter, sayı, küçük harf, büyük harf ve özel karakter (@$!%*?&) içermelidir',
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Şifrenizi girin"
                />
              )}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Password Confirmation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Şifrenizi tekrar girin"
                />
              )}
            />
            {errors.passwordConfirm && (
              <p className="text-red-500 text-sm mt-1">
                {errors.passwordConfirm.message}
              </p>
            )}
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rol
            </label>
            <Controller
              name="role_id"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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

          {/* Store Fields (sadece role_id === 2 olunca göster) */}
          {parseInt(selectedRole) === 2 && (
            <div className="border-t pt-4 mt-4">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Mağaza Bilgileri
              </h3>

              {/* Store Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Mağaza adınız"
                    />
                  )}
                />
                {errors.store?.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.store.name.message}
                  </p>
                )}
              </div>

              {/* Store Phone */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefon (Türkiye)
                </label>
                <Controller
                  name="store.phone"
                  control={control}
                  rules={{
                    required: 'Telefon zorunludur',
                    validate: (value) =>
                      validatePhoneNumber(value) ||
                      'Geçerli bir Türkiye telefon numarası girin (+905XXXXXXXXX veya 05XXXXXXXXX)',
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="tel"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+905551234567"
                    />
                  )}
                />
                {errors.store?.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.store.phone.message}
                  </p>
                )}
              </div>

              {/* Store Tax ID */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vergi Numarası
                </label>
                <Controller
                  name="store.tax_no"
                  control={control}
                  rules={{
                    required: 'Vergi numarası zorunludur',
                    validate: (value) =>
                      validateTaxNo(value) ||
                      'Format: TXXXXVXXXXXX (örn: T1234V567890)',
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="T1234V567890"
                    />
                  )}
                />
                {errors.store?.tax_no && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.store.tax_no.message}
                  </p>
                )}
              </div>

              {/* Store Bank Account */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Banka Hesabı (IBAN)
                </label>
                <Controller
                  name="store.bank_account"
                  control={control}
                  rules={{
                    required: 'IBAN zorunludur',
                    validate: (value) =>
                      validateIBAN(value) ||
                      'Geçerli bir Türkiye IBAN\'ı girin (TR ile başlayan 24 haneli)',
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="TR330006100519786457844452"
                    />
                  )}
                />
                {errors.store?.bank_account && (
                  <p className="text-red-500 text-sm mt-1">
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
            className={`w-full py-3 rounded-md font-semibold text-white mt-6 flex items-center justify-center gap-2 ${
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

        {/* Login Link */}
        <p className="text-center mt-4 text-gray-600">
          Hesabın var mı?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Giriş Yap
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
