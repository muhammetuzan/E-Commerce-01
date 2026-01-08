import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import { loginUser } from '../store/thunks';
import api from '../store/api';
import { fetchRoles } from '../store/thunks';
import { setUser } from '../store/actions';

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (pwd) => {
  const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$/;
  return passwordRegex.test(pwd);
};

const validatePhoneNumber = (phone) => {
  const phoneRegex = /^(\+90|0)[1-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

const validateTaxNo = (tax) => {
  const taxRegex = /^T\d{4}V\d{6}$/;
  return taxRegex.test(tax);
};

const validateIBAN = (iban) => {
  const ibanRegex = /^TR\d{24}$/;
  return ibanRegex.test(iban.replace(/\s/g, ''));
};

const LoginModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const roles = useSelector(state => state.client.roles);
  const userState = useSelector(state => state.client.user);
  
  const [activeTab, setActiveTab] = useState('login'); // login | signup
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  // Login Form
  const loginForm = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  // SignUp Form
  const signupForm = useForm({
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

  const selectedRole = signupForm.watch('role_id');
  const password = signupForm.watch('password');

  // Rolleri fetch et
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
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // User state değişimini watch et ve localStorage'a kaydet
  useEffect(() => {
    if (userState) {
      console.log('Saving user to localStorage:', userState);
      localStorage.setItem('user', JSON.stringify(userState));
    }
  }, [userState]);

  // Modal açılınca localStorage'daki credentials'ı form'a doldur
  useEffect(() => {
    if (isOpen && activeTab === 'login') {
      const savedCredentials = localStorage.getItem('credentials');
      if (savedCredentials) {
        try {
          const creds = JSON.parse(savedCredentials);
          console.log('Restoring credentials:', creds);
          
          // Async olarak setValue çağır
          setTimeout(() => {
            loginForm.setValue('email', creds.email);
            loginForm.setValue('password', creds.password);
            loginForm.setValue('rememberMe', true);
            console.log('Credentials set to form');
          }, 0);
        } catch (error) {
          console.error('Error restoring credentials:', error);
        }
      }
    }
  }, [isOpen, activeTab, loginForm]);

  const onLoginSubmit = async (data) => {
    setLoading(true);
    setServerError('');

    console.log('Login submit data:', data);

    try {
      await dispatch(loginUser(data.email, data.password));

      if (data.rememberMe) {
        console.log('Saving credentials because rememberMe is true');
        localStorage.setItem('rememberMe', 'true');
        // Email ve password'u kaydet
        localStorage.setItem('credentials', JSON.stringify({
          email: data.email,
          password: data.password,
        }));
        console.log('Credentials saved:', JSON.stringify({
          email: data.email,
          password: data.password,
        }));
      } else {
        console.log('Removing credentials because rememberMe is false');
        // Beni hatırla unchecked ise credentials'ı sil
        localStorage.removeItem('credentials');
        localStorage.removeItem('rememberMe');
      }

      toast.success('Başarıyla giriş yaptınız!');
      // loginForm.reset(); // Reset etme, useEffect credentials restore etsin
      onClose();

      const previousPage = localStorage.getItem('previousPage');
      if (previousPage) {
        history.push(previousPage);
        localStorage.removeItem('previousPage');
      } else {
        history.push('/');
      }
    } catch (error) {
      setServerError(
        error.response?.data?.message ||
        'Giriş sırasında hata oluştu. Email ve şifreyi kontrol edin.'
      );
      toast.error('Giriş başarısız!');
    } finally {
      setLoading(false);
    }
  };

  const onSignupSubmit = async (data) => {
    setServerError('');
    setLoading(true);

    try {
      let submitData = {
        name: data.name,
        email: data.email,
        password: data.password,
        role_id: parseInt(data.role_id),
      };

      if (parseInt(data.role_id) === 2) {
        submitData.store = {
          name: data.store.name,
          phone: data.store.phone,
          tax_no: data.store.tax_no,
          bank_account: data.store.bank_account,
        };
      }

      await api.post('/signup', submitData);
      
      dispatch(setUser({
        name: data.name,
        email: data.email,
        role_id: data.role_id,
      }));

      alert('Hesabınızı aktive etmek için email\'deki linke tıklamanız gerekiyor!');
      signupForm.reset();
      setActiveTab('login');
      toast.success('Kayıt başarılı!');
    } catch (error) {
      setServerError(
        error.response?.data?.message ||
        'Kayıt sırasında hata oluştu. Lütfen tekrar deneyin.'
      );
      toast.error('Kayıt başarısız!');
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
      <div className="w-full max-w-[404px] bg-white p-6 rounded-2xl shadow-2xl relative z-10 max-h-[90vh] overflow-y-auto box-border">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition"
        >
          <X size={24} className="text-gray-600" />
        </button>

        {/* Tab Buttons */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => {
              setActiveTab('login');
              setServerError('');
            }}
            className={`flex-1 pb-2 font-semibold border-b-2 transition ${
              activeTab === 'login'
                ? 'text-blue-500 border-blue-500'
                : 'text-gray-600 border-gray-300 hover:text-gray-800'
            }`}
          >
            Giriş Yap
          </button>
          <button
            onClick={() => {
              setActiveTab('signup');
              setServerError('');
            }}
            className={`flex-1 pb-2 font-semibold border-b-2 transition ${
              activeTab === 'signup'
                ? 'text-blue-500 border-blue-500'
                : 'text-gray-600 border-gray-300 hover:text-gray-800'
            }`}
          >
            Kaydol
          </button>
        </div>

        {/* Login Tab */}
        {activeTab === 'login' && (
          <>
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Giriş Yap
            </h1>

            {serverError && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md text-sm">
                {serverError}
              </div>
            )}

            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Controller
                  name="email"
                  control={loginForm.control}
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
                {loginForm.formState.errors.email && (
                  <p className="text-red-500 text-xs mt-1">{loginForm.formState.errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Şifre
                </label>
                <Controller
                  name="password"
                  control={loginForm.control}
                  rules={{
                    required: 'Şifre zorunludur',
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="password"
                      autoComplete="current-password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="Şifrenizi girin"
                    />
                  )}
                />
                {loginForm.formState.errors.password && (
                  <p className="text-red-500 text-xs mt-1">{loginForm.formState.errors.password.message}</p>
                )}
              </div>

              <div className="flex items-center">
                <Controller
                  name="rememberMe"
                  control={loginForm.control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="checkbox"
                      className="w-4 h-4 text-blue-500 rounded focus:ring-2 focus:ring-blue-500"
                      id="rememberMe"
                    />
                  )}
                />
                <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
                  Beni Hatırla
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-medium py-2 px-4 rounded-md transition"
              >
                {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
              Test Kullanıcıları: store@commerce.com, customer@commerce.com (Şifre: 123456)
            </p>
          </>
        )}

        {/* SignUp Tab */}
        {activeTab === 'signup' && (
          <>
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Hesap Oluştur
            </h1>

            {serverError && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md text-sm">
                {serverError}
              </div>
            )}

            <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ad
                </label>
                <Controller
                  name="name"
                  control={signupForm.control}
                  rules={{
                    required: 'Ad zorunludur',
                    minLength: { value: 3, message: 'Min 3 karakter' },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="Adınız"
                    />
                  )}
                />
                {signupForm.formState.errors.name && (
                  <p className="text-red-500 text-xs mt-1">{signupForm.formState.errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Controller
                  name="email"
                  control={signupForm.control}
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
                {signupForm.formState.errors.email && (
                  <p className="text-red-500 text-xs mt-1">{signupForm.formState.errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Şifre
                </label>
                <Controller
                  name="password"
                  control={signupForm.control}
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
                {signupForm.formState.errors.password && (
                  <p className="text-red-500 text-xs mt-1">{signupForm.formState.errors.password.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Şifre Doğrulama
                </label>
                <Controller
                  name="passwordConfirm"
                  control={signupForm.control}
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
                {signupForm.formState.errors.passwordConfirm && (
                  <p className="text-red-500 text-xs mt-1">
                    {signupForm.formState.errors.passwordConfirm.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rol
                </label>
                <Controller
                  name="role_id"
                  control={signupForm.control}
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

              {parseInt(selectedRole) === 2 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mağaza Adı
                    </label>
                    <Controller
                      name="store.name"
                      control={signupForm.control}
                      rules={{ required: 'Mağaza adı zorunludur', minLength: { value: 3, message: 'Min 3 karakter' } }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          placeholder="Mağaza adı"
                        />
                      )}
                    />
                    {signupForm.formState.errors.store?.name && (
                      <p className="text-red-500 text-xs mt-1">{signupForm.formState.errors.store.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Telefon
                    </label>
                    <Controller
                      name="store.phone"
                      control={signupForm.control}
                      rules={{
                        required: 'Telefon zorunludur',
                        validate: (value) => validatePhoneNumber(value) || 'Geçerli bir telefon numarası girin',
                      }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="tel"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          placeholder="+90 5xx xxx xxxx"
                        />
                      )}
                    />
                    {signupForm.formState.errors.store?.phone && (
                      <p className="text-red-500 text-xs mt-1">{signupForm.formState.errors.store.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Vergi Numarası
                    </label>
                    <Controller
                      name="store.tax_no"
                      control={signupForm.control}
                      rules={{
                        required: 'Vergi numarası zorunludur',
                        validate: (value) => validateTaxNo(value) || 'Format: TXXXXVXXXXXX',
                      }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          placeholder="TXXXXVXXXXXX"
                        />
                      )}
                    />
                    {signupForm.formState.errors.store?.tax_no && (
                      <p className="text-red-500 text-xs mt-1">{signupForm.formState.errors.store.tax_no.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      IBAN
                    </label>
                    <Controller
                      name="store.bank_account"
                      control={signupForm.control}
                      rules={{
                        required: 'IBAN zorunludur',
                        validate: (value) => validateIBAN(value) || 'Format: TR + 24 rakam',
                      }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          placeholder="TRXXXXXXXXXXXXXXXXXXXXXXXXXX"
                        />
                      )}
                    />
                    {signupForm.formState.errors.store?.bank_account && (
                      <p className="text-red-500 text-xs mt-1">{signupForm.formState.errors.store.bank_account.message}</p>
                    )}
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-medium py-2 px-4 rounded-md transition"
              >
                {loading ? 'Kaydediliyor...' : 'Kaydol'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
