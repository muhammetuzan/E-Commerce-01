import React, { useState, useRef, useEffect } from "react";
import InstaWhite from '../assets/ikonvektorleri/insta-white.png';
import FbWhite from '../assets/ikonvektorleri/fbbeyaz.png';
import TwWhite from '../assets/ikonvektorleri/twbeyaz.png';
import YtWhite from '../assets/ikonvektorleri/ytbeyaz.png';
import ReactDOM from 'react-dom';
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CryptoJS from "crypto-js";
import { User, Search, ShoppingCart, Menu, ChevronDown, Heart, Phone, Mail, Instagram, Youtube, Facebook, Twitter, LogOut, Trash2 } from "lucide-react";
import { setUser, removeFromCart, removeFromLiked, addToLiked } from "../store/actions";
import api from "../store/api";

export default function Navbar({ topBarColor = "#252B42", onSignUpClick, onLoginClick, isShopPage = false }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const user = useSelector(state => state.client.user);
	const cart = useSelector(state => state.shoppingCart.cart);
	const likedProducts = useSelector(state => state.liked.liked);
	
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
	
	// Gravatar hash oluştur
	const getGravatarUrl = (email) => {
		if (!email) return null;
		const emailLower = email.trim().toLowerCase();
		const hash = CryptoJS.MD5(emailLower).toString();
		console.log('Gravatar Hash:', { email, emailLower, hash });
		const url = `https://www.gravatar.com/avatar/${hash}?s=40&d=identicon`;
		console.log('Gravatar URL:', url);
		return url;
	};

	const handleLogout = () => {
		// Remember Me checked ise token'ı koru, değilse sil
		const rememberMe = localStorage.getItem('rememberMe') === 'true';
		
		if (!rememberMe) {
			// Remember Me unchecked ise token'ı sil
			localStorage.removeItem('token');
		}
		
		localStorage.removeItem('user');
		// User'ı Redux'dan sil
		dispatch(setUser(null));
		console.log('Logged out. Remember Me:', rememberMe, '| Token removed:', !rememberMe);
	};
	
	// Shop sayfasında renk değişsin
	const actualTopBarColor = isShopPage ? "#23856D" : topBarColor;
	const categories = useSelector(state => state.product.categories);
	
	// Kategorileri gender'e göre group'la
	const buildShopDropdown = () => {
		const grouped = {
			k: [],
			e: [],
		};
		
		categories.forEach(cat => {
			if (cat.gender === 'k') {
				grouped.k.push({ id: cat.id, title: cat.title });
			} else if (cat.gender === 'e') {
				grouped.e.push({ id: cat.id, title: cat.title });
			}
		});
		
		return [
			{ label: "Kadın", items: grouped.k },
			{ label: "Erkek", items: grouped.e },
		];
	};
	
	const shopDropdown = buildShopDropdown();

	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [cartDropdownOpen, setCartDropdownOpen] = useState(false);
	const [likedDropdownOpen, setLikedDropdownOpen] = useState(false);
	const [searchOpen, setSearchOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [searchLoading, setSearchLoading] = useState(false);
	const [showMobileUserMenu, setShowMobileUserMenu] = useState(false);

	// refs for dropdowns/buttons (defined at top-level of component)
	const dropdownRef = useRef(null);
	const shopBtnRef = useRef(null);
	const cartDropdownRef = useRef(null);
	const cartBtnRef = useRef(null);
	const likedDropdownRef = useRef(null);
	const likedBtnRef = useRef(null);
	const searchDropdownRef = useRef(null);
	const searchInputRef = useRef(null);
	const closeDropdownTimeout = useRef();

	const cartItemCount = cart.reduce((acc, item) => acc + (item.count || 0), 0);

	// Desktop ve mobil için görünür sonuç sayısı
	const [visibleCount, setVisibleCount] = useState(5);
	const visibleResults = searchResults.slice(0, visibleCount);
	const hiddenCount = Math.max(0, searchResults.length - visibleResults.length);

	// Mobilde daha fazla göster fonksiyonu
	const handleMobileShowMore = () => {
		setVisibleCount((prev) => Math.min(prev + 5, searchResults.length));
	};

	// Desktop search dropdown scroll handler
	const handleDesktopSearchScroll = (e) => {
		const el = e.target;
		if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
			if (visibleCount < searchResults.length) {
				setVisibleCount((prev) => Math.min(prev + 5, searchResults.length));
			}
		}
	};

	// Reset visibleCount when searchQuery or searchOpen changes
	useEffect(() => {
		setVisibleCount(5);
	}, [searchQuery, searchOpen]);

	// Mobile Search Modal kaldırıldı, event handler kodu da temizlendi

	// Dropdown için event handler'lar
	const handleShopMouseEnter = () => {
		if (closeDropdownTimeout.current) clearTimeout(closeDropdownTimeout.current);
		setDropdownOpen(true);
	};
	const handleShopMouseLeave = () => {
		closeDropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 200);
	};
	const handleCartMouseEnter = () => {
		setCartDropdownOpen(true);
	};
	const handleCartMouseLeave = () => {
		setCartDropdownOpen(false);
	};
	const handleLikedMouseEnter = () => {
		setLikedDropdownOpen(true);
	};
	const handleLikedMouseLeave = () => {
		setLikedDropdownOpen(false);
	};

	const closeSearch = () => {
		setSearchOpen(false);
		setSearchQuery('');
		setSearchResults([]);
		setSearchLoading(false);
	};

	useEffect(() => {
		if (!searchQuery.trim()) {
			setSearchResults([]);
			return;
		}
		setSearchLoading(true);
		const timer = setTimeout(() => {
			api.get('/products', {
				params: {
					limit: 50,
					offset: 0,
					filter: searchQuery
				}
			})
				.then(res => {
					setSearchResults(res.data.products || []);
					setSearchLoading(false);
				})
				.catch(() => {
					setSearchResults([]);
					setSearchLoading(false);
				});
		}, 300);
		return () => clearTimeout(timer);
	}, [searchQuery]);

	// Sadece desktop için ESC ve dış tıklama ile search dropdown kapama
	useEffect(() => {
		if (!searchOpen) return;
		if (window.innerWidth <= 768) return; // Mobilde bu eventleri ekleme
		function handleKeyDown(e) {
			if (e.key === 'Escape') closeSearch();
		}
		function handleClick(e) {
			if (
				searchDropdownRef.current &&
				!searchDropdownRef.current.contains(e.target) &&
				searchInputRef.current &&
				!searchInputRef.current.contains(e.target)
			) {
				closeSearch();
			}
		}
		document.addEventListener('keydown', handleKeyDown);
		document.addEventListener('mousedown', handleClick);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.removeEventListener('mousedown', handleClick);
		};
	}, [searchOpen]);

	return (
		<>
			{/* Desktop Top Bar - Sadece lg ve üzeri ekranlarda göster */}
			<div className="hidden lg:block w-full text-white" style={{ backgroundColor: actualTopBarColor }}>
			  
				<div className="w-[1437px] flex items-center h-[58px] mx-auto relative px-6">
					<div className="flex items-center w-full h-[46px] flex-nowrap">
						{/* 1. col-md-4 */}
						<div className="w-[320px] h-[46px] flex  gap-[5px]  mr-auto">
							<button className="flex items-center gap-[5px] rounded-[5px] px-[10px] py-[10px] h-[44px] min-w-[145px]">
								<Phone size={16} className="text-white" />
								<h6 className="font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-white min-w-[104px]">(225) 555-0118</h6>
							</button>
							<button className="flex items-center gap-[5px] rounded-[5px] px-[10px] py-[10px] h-[44px] min-w-[260px]">
								<Mail size={16} className="text-white" />
								<h6 className="font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-white min-w-[180px]">michelle.rivera@example.com</h6>
							</button>
							</div>
							{/* 2. col-md-4 */}
							<div className="w-[332px] h-[46px] flex items-center justify-center mx-auto">
								<h6 className="font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-white text-center">
									Follow Us and get a chance to win 80% off
								</h6>
							</div>
							{/* 3. col-md-4 */}
							<div className="w-[233px] h-[46px] flex justify-center	 items-center gap-2 ml-3">
								<span className="font-montserrat font-bold text-[14px] leading-[4px] tracking-[0.2px] text-white">
									Follow Us :
								</span>
								<a href="#" className="flex items-center justify-center w-[26px] h-[26px] p-[5px] rounded bg-transparent">
									<img src={InstaWhite} alt="Instagram" className="w-[16px] h-[16px] object-contain" />
								</a>
								<a href="#" className="flex items-center justify-center w-[26px] h-[26px] p-[5px] rounded bg-transparent">
									<img src={YtWhite} alt="Youtube" className="w-[16px] h-[16px] object-contain" />
								</a>
								<a href="#" className="flex items-center justify-center w-[26px] h-[26px] p-[5px] rounded bg-transparent">
									<img src={FbWhite} alt="Facebook" className="w-[16px] h-[16px] object-contain" />
								</a>
								<a href="#" className="flex items-center justify-center w-[26px] h-[26px] p-[5px] rounded bg-transparent">
									<img src={TwWhite} alt="Twitter" className="w-[16px] h-[16px] object-contain" />
								</a>
							</div>
						</div>
					</div>
				
			</div>
			{/* Desktop Navbar alt - Sadece lg ve üzeri ekranlarda göster */}
			<nav className="hidden lg:block w-full bg-white shadow z-50 relative">
				<div className="w-full flex justify-center">
					<div className="w-[1437px] flex items-center h-[58px] mx-auto relative pr-[38px]">
						{/* Brand */}
						<div className="w-[187px] h-[58px] flex items-center pl-[38px]">
						<span className="font-montserrat font-bold text-[24px] leading-[32px] tracking-[0.1px] text-[#252B42] cursor-pointer" onClick={() => window.location.href = '/'}>Bandage</span>
						</div>
						{/* Main Nav */}
						<div className="flex items-center w-[1155px] h-[58px] ml-[70px] pr-[38px] justify-between">
							{/* Left Nav */}
							<ul className="flex items-center gap-[15px] w-[361px] h-[25px] mt-[16.5px]">
								<li className="w-[43px] h-[24px] flex items-center justify-center">
									<Link to="/" className="w-[43px] h-[24px] flex items-center justify-center">
										<span className="font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-center text-[#737373]">Home</span>
									</Link>
								</li>
								<li
									className="w-[63px] h-[25px] flex items-center gap-[10px] relative"
									onMouseEnter={handleShopMouseEnter}
									onMouseLeave={handleShopMouseLeave}
								>
									<Link
										to="/shop"
										ref={shopBtnRef}
										className="flex items-center font-montserrat font-medium text-[14px] leading-[28px] tracking-[0.2px] text-[#252B42] focus:outline-none"
									>
										<span className="w-[38px] h-[28px]">Shop</span>
										<ChevronDown 
											className={`ml-2 transition-transform duration-200 ${dropdownOpen ? 'rotate-0' : '-rotate-90'} text-[#252B42]`} 
											size={16} 
											strokeWidth={1.5} 
										/>
									</Link>
									{dropdownOpen && (
										<div
											ref={dropdownRef}
											className="absolute left-0 top-[36px] w-[396px] max-w-[90vw] h-[272px] bg-white shadow-lg rounded z-50 flex"
										>
											{/* Kadın */}
											<div className="flex flex-col w-[186px] h-full">
												<button
													className="w-[186px] h-[56px] px-6 py-4 font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#252B42] text-left hover:bg-gray-100 transition"
													style={{paddingTop:16,paddingBottom:16,paddingLeft:24,paddingRight:24}}
												>
													Kadın
												</button>
												<div className="w-[186px] h-[216px] px-6 py-4 flex flex-col gap-4 overflow-y-auto" style={{paddingTop:16,paddingBottom:16,paddingLeft:24,paddingRight:24}}>
													{shopDropdown[0].items.map((item) => (
														<Link
															key={item.id}
															to={`/shop/k/${item.title.toLowerCase()}/${item.id}`}
															onClick={() => setDropdownOpen(false)}
															className="font-montserrat font-normaltext-[14px] leading-[24px] tracking-[0.2px] text-[#737373] hover:text-[#23A6F0] transition-colors cursor-pointer"
														>
															{item.title}
														</Link>
													))}
												</div>
											</div>
											{/* Erkek */}
											<div className="flex flex-col w-[210px] h-full">
												<button
													className="w-[210px] h-[56px] px-6 py-4 font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#252B42] text-left hover:bg-gray-100 transition"
													style={{paddingTop:16,paddingBottom:16,paddingLeft:24,paddingRight:24}}
												>
													Erkek
												</button>
												<div className="w-[210px] h-[216px] px-6 py-4 flex flex-col gap-4 overflow-y-auto" style={{paddingTop:16,paddingBottom:16,paddingLeft:24,paddingRight:24}}>
													{shopDropdown[1].items.map((item) => (
														<Link
														key={item.id}
														to={`/shop/e/${item.title.toLowerCase()}/${item.id}`}
															onClick={() => setDropdownOpen(false)}
															className="font-montserrat font-normal text-[14px] leading-[24px] tracking-[0.2px] text-[#737373] hover:text-[#23A6F0] transition-colors cursor-pointer"
														>
															{item.title}
														</Link>
													))}
												</div>
											</div>
										</div>
									)}
								</li>
								<li className="w-[45px] h-[24px] flex items-center justify-center">
									<Link to="/aboutus" className="w-[45px] h-[24px] flex items-center justify-center">
										<span className="font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-center text-[#737373]">About</span>
									</Link>
								</li>
								<li className="w-[50px] h-[24px] flex items-center justify-center">
									<Link to="/team" className="w-[50px] h-[24px] flex items-center justify-center">
										<span className="font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-center text-[#737373]">Team</span>
									</Link>
								</li>
								   <li className="w-[58px] h-[24px] flex items-center justify-center">
									   <Link to="/contact" className="w-[58px] h-[24px] flex items-center justify-center">
										   <span className="font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-center text-[#737373]">Contact</span>
									   </Link>
								   </li>
							</ul>
							{/* Right Nav */}
							<ul className="flex items-center gap-[10px] w-auto h-[54px] ml-[40px]">
								<li className="h-[54px] flex items-center">
									{user ? (
										<div className="relative group">
											<div className="flex items-center gap-3 px-4 py-2 rounded-full hover:bg-gray-100 transition cursor-pointer">
												<img 
													src={getGravatarUrl(user.email)} 
													alt={user.name}
													className="w-8 h-8 rounded-full object-cover"
													onError={(e) => {
														e.target.style.display = 'none';
														e.target.nextElementSibling.style.display = 'flex';
													}}
												/>
												<User size={20} className="text-gray-400 hidden" />
												<div className="flex flex-col">
													<span className="font-montserrat font-bold text-[12px] text-[#23A6F0]">
														{user.name}
													</span>
													<span className="font-montserrat text-[10px] text-gray-600">
														{user.email}
													</span>
												</div>
											</div>

											{/* Dropdown Menu */}
											<div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
												<Link 
													to="/previous-orders"
													className="block px-4 py-3 font-montserrat text-[13px] text-[#252B42] hover:bg-gray-50 border-b border-gray-100 first:rounded-t-lg"
												>
													Önceki Siparişlerim
												</Link>
												<button 
													onClick={handleLogout}
													className="w-full text-left px-4 py-3 font-montserrat text-[13px] text-red-600 hover:bg-red-50 rounded-b-lg flex items-center gap-2"
												>
													<LogOut size={14} />
													Çıkış Yap
												</button>
											</div>
										</div>
									) : (
										<button onClick={onLoginClick} className="flex items-center gap-[5px] px-[15px] py-[15px] rounded-[37px] whitespace-nowrap overflow-hidden hover:bg-gray-100 transition">
											<User size={14} className="text-[#23A6F0] flex-shrink-0" />
											<span className="font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#23A6F0]">Login / Register</span>
										</button>
									)}
								</li>
								<li className="w-[46px] h-[46px] flex items-center relative">
									<button 
										ref={searchInputRef}
										onClick={() => setSearchOpen(!searchOpen)}
										className="flex items-center justify-center w-[46px] h-[46px] rounded-[37px] p-[15px] gap-[5px] hover:bg-gray-100 transition"
									>
										<Search size={16} className="text-[#23A6F0]" />
									</button>
									
									{/* Search Dropdown */}
									{searchOpen && (
										<div
											ref={searchDropdownRef}
											className="absolute right-0 top-[46px] w-[400px] bg-white shadow-2xl rounded-lg z-50 border border-gray-100"
										>
											{/* Search Input */}
											<div className="px-6 py-3 border-b border-gray-200">
												   <input 
													   type="text"
													   placeholder="Ürün ara..."
													   value={searchQuery}
													   onChange={(e) => setSearchQuery(e.target.value)}
													   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#23A6F0] font-montserrat text-[14px]"
													   autoFocus
													   inputMode="search"
													   style={{ fontSize: 16 }}
												   />
											</div>
											
											{/* Search Results */}
											<div className="max-h-[400px] overflow-y-auto" onScroll={handleDesktopSearchScroll}>
												{!searchQuery.trim() ? (
													<div className="px-6 py-8 text-center">
														<Search size={48} className="mx-auto text-gray-300 mb-3" />
														<p className="font-montserrat text-[14px] text-gray-500">Arama yapınız</p>
													</div>
												) : searchLoading ? (
													<div className="px-6 py-8 text-center">
														<p className="font-montserrat text-[14px] text-gray-500">Aranıyor...</p>
													</div>
												) : searchResults.length === 0 ? (
													<div className="px-6 py-8 text-center">
														<p className="font-montserrat text-[14px] text-gray-500">Sonuç bulunamadı</p>
													</div>
												) : (
													<>
														{visibleResults.map((product, index) => {
															const gender = product.category_id <= 8 ? 'k' : 'e';
															const catName = product.category?.title || 'category';
															const slug = createSlug(product.name);
															
															return (
																<div 
																	key={index}
																	role="button"
																	tabIndex={0}
																	onClick={() => {
																		console.log('Product clicked:', product, 'ID:', product.id);
																		setSearchOpen(false);
																		setSearchQuery('');
																		setTimeout(() => {
																			history.push(`/product/${product.id}`);
																		}, 100);
																	}}
																	className="px-6 py-3 border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer group flex gap-3"
																>
																	<img 
																		src={product.images?.[0]?.url || ''} 
																		alt={product.name}
																		className="w-12 h-12 object-cover rounded"
																	/>
																	<div className="flex-1">
																		<h4 className="font-montserrat font-semibold text-[13px] text-[#252B42] line-clamp-2">
																			{product.name}
																		</h4>
																		<p className="font-montserrat font-bold text-[12px] text-[#23A6F0] mt-1">
																			{product.price} TL
																		</p>
																	</div>
																</div>
															);
														})}
														
														{/* Show More Message */}
														{hiddenCount > 0 && (
															<div className="px-6 py-3 text-center border-t border-gray-200 bg-gray-50">
																<p className="font-montserrat text-[13px] text-gray-600">
																	+{hiddenCount} ürün daha
																</p>
															</div>
														)}
													</>
												)}
											</div>
										</div>
									)}
								</li>
								<li className="w-[56px] h-[46px] flex items-center relative">
									<button 
										ref={cartBtnRef}
										onMouseEnter={handleCartMouseEnter}
										onMouseLeave={handleCartMouseLeave}
										className="flex items-center w-[56px] h-[46px] rounded-[37px] p-[15px] gap-[5px]"
									>
										<ShoppingCart size={16} className="text-[#23A6F0]" />
										<span className="font-montserrat font-normal text-[12px] leading-[16px] tracking-[0.2px] text-[#23A6F0] w-[5px] h-[16px] flex items-center justify-center">
											{cartItemCount}
										</span>
									</button>
									
									{/* Cart Dropdown */}
									{cartDropdownOpen && (
										<div
											ref={cartDropdownRef}
											onMouseEnter={handleCartMouseEnter}
											onMouseLeave={handleCartMouseLeave}
											className="absolute right-0 top-[46px] w-[400px] bg-white shadow-2xl rounded-lg z-50 border border-gray-100"
										>
											{/* Header */}
											<div className="px-6 py-4 border-b border-gray-200">
												<h3 className="font-montserrat font-bold text-[16px] text-[#252B42]">
													Sepetim ({cart.length} Ürün)
												</h3>
											</div>
											
											{/* Cart Items */}
											<div className="max-h-[400px] overflow-y-auto">
												{cart.length === 0 ? (
													<div className="px-6 py-8 text-center">
														<ShoppingCart size={48} className="mx-auto text-gray-300 mb-3" />
														<p className="font-montserrat text-[14px] text-gray-500">Sepetiniz boş</p>
													</div>
												) : (
													cart.map((item, index) => (
														<div key={index} className="px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition group">
															<div className="flex gap-4">
																<img 
																	src={item.product.images?.[0]?.url || ''} 
																	alt={item.product.name}
																	className="w-16 h-16 object-cover rounded"
																/>
																<div className="flex-1">
																	<h4 className="font-montserrat font-semibold text-[14px] text-[#252B42] line-clamp-2">
																		{item.product.name}
																	</h4>
																	<p className="font-montserrat text-[12px] text-gray-600 mt-1">
																		Adet: {item.count}
																	</p>
																	<p className="font-montserrat font-bold text-[14px] text-[#23A6F0] mt-1">
																		{item.product.price} TL
																	</p>
																</div>
																<button
																	onClick={() => dispatch(removeFromCart(item.product.id))}
																	className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-50 rounded-full h-fit"
																	title="Sepetten Çıkar"
																>
																	<Trash2 size={16} className="text-red-500" />
																</button>
															</div>
														</div>
													))
												)}
											</div>
											
											{/* Footer Buttons */}
											{cart.length > 0 && (
												<div className="px-6 py-4 border-t border-gray-200 flex gap-3">
												<button 
													onClick={() => { setCartDropdownOpen(false); history.push('/cart'); }}
													className="flex-1 px-4 py-2 border border-[#23A6F0] text-[#23A6F0] font-montserrat font-semibold text-[14px] rounded hover:bg-[#23A6F0] hover:text-white transition"
												>
														Sepete Git
													</button>
													<button 
														onClick={() => { 
															console.log('Desktop - Siparişi Tamamla tıklandı! User:', user);
															setCartDropdownOpen(false); 
															if (user) {
																console.log('Desktop - User var, /create-order sayfasına yönlendiriliyor');
																history.push('/create-order');
															} else {
																console.log('Desktop - User yok, login modal açılıyor');
																onLoginClick();
															}
														}}
														className="flex-1 px-4 py-2 bg-[#FF6F00] text-white font-montserrat font-semibold text-[14px] rounded hover:bg-[#E66300] transition"
													>
														Siparişi Tamamla
													</button>
												</div>
											)}
										</div>
									)}
								</li>
								<li className="w-[56px] h-[46px] flex items-center relative">
									<button 
										ref={likedBtnRef}
										onMouseEnter={handleLikedMouseEnter}
										onMouseLeave={handleLikedMouseLeave}
										className="flex items-center w-[56px] h-[46px] rounded-[37px] p-[15px] gap-[5px]"
									>
										<Heart size={16} className="text-[#23A6F0]" />
										<span className="font-montserrat font-normal text-[12px] leading-[16px] tracking-[0.2px] text-[#23A6F0] w-[5px] h-[16px] flex items-center justify-center">
											{likedProducts.length}
										</span>
									</button>
									
									{/* Liked Products Dropdown */}
									{likedDropdownOpen && (
										<div
											ref={likedDropdownRef}
											onMouseEnter={handleLikedMouseEnter}
											onMouseLeave={handleLikedMouseLeave}
											className="absolute right-0 top-[46px] w-[400px] bg-white shadow-2xl rounded-lg z-50 border border-gray-100"
										>
											{/* Header */}
											<div className="px-6 py-4 border-b border-gray-200">
												<h3 className="font-montserrat font-bold text-[16px] text-[#252B42]">
													Beğenilenler ({likedProducts.length} Ürün)
												</h3>
											</div>
											
											{/* Liked Items */}
											<div className="max-h-[400px] overflow-y-auto">
												{likedProducts.length === 0 ? (
													<div className="px-6 py-8 text-center">
														<Heart size={48} className="mx-auto text-gray-300 mb-3" />
														<p className="font-montserrat text-[14px] text-gray-500">Beğenilen ürün yok</p>
													</div>
												) : (
													likedProducts.map((product, index) => {
														const gender = product.category_id <= 8 ? 'k' : 'e';
														const catName = product.category?.title || 'category';
														const slug = createSlug(product.name);
														
														return (
															<div key={index} className="px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition group">
																<div className="flex gap-4">
																	<img 
																		src={product.images?.[0]?.url || ''} 
																		alt={product.name}
																		className="w-16 h-16 object-cover rounded cursor-pointer hover:opacity-80 transition"
																		onClick={() => {
																			setLikedDropdownOpen(false);
																			history.push(`/shop/${gender}/${catName}/${product.category_id}/${slug}/${product.id}`);
																		}}
																	/>
																	<div 
																		className="flex-1 cursor-pointer hover:opacity-80 transition"
																		onClick={() => {
																			setLikedDropdownOpen(false);
																			history.push(`/shop/${gender}/${catName}/${product.category_id}/${slug}/${product.id}`);
																		}}
																	>
																		<h4 className="font-montserrat font-semibold text-[14px] text-[#252B42] line-clamp-2">
																			{product.name}
																		</h4>
																		<p className="font-montserrat font-bold text-[14px] text-[#23A6F0] mt-1">
																			{product.price} TL
																		</p>
																	</div>
																	<button
																		onClick={() => dispatch(removeFromLiked(product.id))}
																		className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-50 rounded-full h-fit"
																		title="Beğenilenlerden Çıkar"
																	>
																		<Trash2 size={16} className="text-red-500" />
																	</button>
																</div>
															</div>
														);
													})
												)}
											</div>
										</div>
									)}
								</li>
							</ul>
						</div>
					</div>
				</div>
			</nav>
			{/* Mobile Navbar - Sadece lg altı ekranlarda göster */}
			<div className="block lg:hidden w-full pl-[24px] pr-[24px] max-w-[414px] mx-auto">
				{/* Top Row - Logo and Icons */}
				<div className="flex items-center justify-between pt-[13px] pb-[13px]">
					{/* Logo */}
					<h1 
					className="font-montserrat font-bold text-[#252B42] text-[24px] leading-[32px] tracking-[0.1px] no-underline cursor-pointer"
					onClick={() => window.location.href = '/'}>Bandage
					</h1>

					{/* Right Icons */}
					<div className="flex items-center gap-[25px] relative">
				{user ? (
					<div className="relative">
						<div
							className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
							onClick={e => {
								e.stopPropagation();
								setShowMobileUserMenu(v => !v);
							}}
						>
							<img 
								src={getGravatarUrl(user.email)} 
								alt={user.name}
								className="w-6 h-6 rounded-full object-cover"
								onError={e => {
									e.target.style.display = 'none';
									e.target.nextElementSibling.style.display = 'flex';
								}}
							/>
							<User size={16} className="text-gray-400 hidden" />
							<ChevronDown size={14} className="text-[#252B42]" />
						</div>
						{showMobileUserMenu && (
							<>
								<div
									className="fixed inset-0 z-40"
									onClick={() => setShowMobileUserMenu(false)}
								/>
								<div className="left-1/2 -translate-x-1/2 absolute top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50 flex flex-col items-center" style={{ minWidth: '220px' }}>
									<Link 
										to="/previous-orders"
										className="block px-4 py-3 font-montserrat text-[14px] text-[#252B42] hover:bg-gray-50 border-b border-gray-100 first:rounded-t-lg text-center"
										onClick={() => setShowMobileUserMenu(false)}
									>
										Önceki Siparişlerim
									</Link>
									<button 
										onClick={() => { handleLogout(); setShowMobileUserMenu(false); }}
										className="w-full px-4 py-3 font-montserrat text-[14px] text-red-600 hover:bg-red-50 rounded-b-lg flex items-center gap-2 justify-center"
									>
										<LogOut size={14} />
										Çıkış Yap
									</button>
								</div>
							</>
						)}
					</div>
				) : (
					<button onClick={onLoginClick}>
						<User size={21} className="text-[#3C403D] cursor-pointer hover:text-[#23A6F0] transition" />
					</button>
				)}
						<button 
							onClick={() => (searchOpen ? closeSearch() : setSearchOpen(true))}
							className="relative hover:text-[#23A6F0] transition"
						>
							<Search size={24} className="text-[#3C403D] cursor-pointer" />
						</button>
						
						{/* Mobile Search Dropdown */}
						{searchOpen && (
							<div
								className="fixed inset-0 z-[9999] pointer-events-auto"
								onClick={closeSearch} // overlay click
								>
								{/* Overlay */}
								<div className="absolute inset-0 bg-black bg-opacity-50" />

								{/* Modal İçerik */}
								<div
								className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90vw] max-w-[400px] max-h-[85svh] bg-white rounded-t-2xl shadow-2xl flex flex-col overflow-hidden pointer-events-auto"
								onClick={(e) => e.stopPropagation()}
									onPointerDown={(e) => e.stopPropagation()}
								>
									{/* Search Header */}
									<div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
										<h3 className="font-montserrat font-bold text-[16px] text-[#252B42]">Ürün Ara</h3>
										<button 
											onClick={closeSearch} 
											className="text-gray-400 hover:text-gray-600 p-2"
										>
											✕
										</button>
									</div>
									
									{/* Search Input */}
									<div className="px-4 py-3 border-b border-gray-200">
										<input 
											type="text"
											placeholder="Ürün ara..."
											value={searchQuery}
											onChange={(e) => setSearchQuery(e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#23A6F0] font-montserrat text-[14px]"
											autoFocus
										/>
									</div>
									
									{/* Sonuçlar */}
									<div className="flex-1 overflow-y-auto">
										{!searchQuery.trim() ? (
											<div className="px-6 py-8 text-center">
												<Search size={48} className="mx-auto text-gray-300 mb-3" />
												<p className="font-montserrat text-[14px] text-gray-500">Arama yapınız</p>
											</div>
										) : searchLoading ? (
											<div className="px-6 py-8 text-center">
												<p className="font-montserrat text-[14px] text-gray-500">Aranıyor...</p>
											</div>
										) : searchResults.length === 0 ? (
											<div className="px-6 py-8 text-center">
												<p className="font-montserrat text-[14px] text-gray-500">Sonuç bulunamadı</p>
											</div>
										) : (
											<>
												{visibleResults.map((product, index) => (
													<div
														key={index}
														role="button"
														tabIndex={0}
														onClick={() => {
															history.push(`/product/${product.id}`);
															closeSearch();
														}}
														className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer flex gap-3"
													>
														<img
															src={product.images?.[0]?.url || ''} 
															alt={product.name}
															className="w-12 h-12 object-cover rounded"
														/>
														<div className="flex-1">
															<h4 className="font-montserrat font-semibold text-[13px] text-[#252B42] line-clamp-2">
																{product.name}
															</h4>
															<p className="font-montserrat font-bold text-[12px] text-[#23A6F0] mt-1">
																{product.price} TL
															</p>
														</div>
													</div>
												))}
												{hiddenCount > 0 && (
													<div 
														onClick={e => e.stopPropagation()} 
														onPointerDown={e => e.stopPropagation()} 
														className="px-6 py-3 text-center border-t border-gray-200 bg-gray-50">
														<button onClick={handleMobileShowMore} className="font-montserrat text-[13px] text-[#23A6F0] font-bold py-2 px-4 rounded bg-gray-100 hover:bg-gray-200 transition">
															Daha fazla göster (+{hiddenCount})
														</button>
													</div>
												)}
											</>
										)}
									</div>
								</div>
							</div>
						)}
						
<div className="relative"> 
	<button onClick={(e) => { e.stopPropagation(); setCartDropdownOpen(!cartDropdownOpen); }} className="relative" > 
		<ShoppingCart size={24} className="text-[#3C403D] cursor-pointer" />
		 {cartItemCount > 0 && ( <span className="absolute -top-2 -right-2 bg-[#23A6F0] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
			 {cartItemCount}
			  </span> )} 
			  </button> 
			  {/* Mobile Cart Dropdown */}
			   {cartDropdownOpen && (
				 <div className="fixed inset-0 z-[9999] bg-black bg-opacity-50 flex items-end justify-center" onMouseDown={(e) => { if (e.target === e.currentTarget) { setCartDropdownOpen(false); } }} >
					 <div className="w-full max-w-[411px] bg-white rounded-t-2xl shadow-2xl max-h-[85vh] overflow-hidden flex flex-col" onMouseDown={(e) => e.stopPropagation()} >
						 {/* Header */}
						  <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center"> 
							<h3 className="font-montserrat font-bold text-[16px] text-[#252B42]">
								 Sepetim ({cart.length} Ürün) </h3>
								  <button onClick={() => setCartDropdownOpen(false)} className="text-gray-400 hover:text-gray-600 p-2" > 
									✕ </button>
									 </div> 
									 {/* Cart Items */}
									  <div className="flex-1 overflow-y-auto"> {cart.length === 0 ? (
										 <div className="px-4 py-8 text-center">
											 <ShoppingCart size={40} className="mx-auto text-gray-300 mb-2" />
											  <p className="font-montserrat text-[12px] text-gray-500">Sepetiniz boş</p> 
											  </div> ) : ( cart.map((item, index) => ( 
												<div key={index} className="px-4 py-3 border-b border-gray-100 group">
													<div className="flex gap-3"> 
														<img src={item.product.images?.[0]?.url || ''} alt={item.product.name} className="w-12 h-12 object-cover rounded" /> 
														<div className="flex-1 min-w-0"> 
															<h4 className="font-montserrat font-semibold text-[12px] text-[#252B42] line-clamp-2"> {item.product.name} </h4>
															 <p className="font-montserrat text-[11px] text-gray-600 mt-1"> Adet: {item.count} </p>
															  <p className="font-montserrat font-bold text-[12px] text-[#23A6F0] mt-1"> {item.product.price} TL </p>
															   </div> <button onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }} onClick={(e) => { e.preventDefault(); e.stopPropagation(); dispatch(removeFromCart(item.product.id)); }} className="p-1.5 hover:bg-red-50 rounded-full h-fit" title="Sepetten Çıkar" >
																<Trash2 size={14} className="text-red-500" /> </button> </div> </div> )) )} </div> 
																{/* Footer Buttons */} 
																{cart.length > 0 && ( <div className="px-4 py-4 border-t border-gray-200 flex flex-col gap-3 bg-gray-50 flex-shrink-0">
																	 <button type="button" onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }} onClick={(e) => { e.preventDefault(); e.stopPropagation(); console.log('Sepete Git tıklandı!'); setCartDropdownOpen(false); history.push('/cart'); }} className="w-full px-4 py-4 border-2 border-[#23A6F0] text-[#23A6F0] font-montserrat font-bold text-[14px] rounded-lg active:scale-95" style={{ WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation', userSelect: 'none' }} > Sepete Git </button>
																	  <button type="button" onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }} onClick={(e) => { e.preventDefault(); e.stopPropagation(); console.log('Siparişi Tamamla tıklandı! User:', user); setCartDropdownOpen(false); if (user) { console.log('User var, /create-order sayfasına yönlendiriliyor'); history.push('/create-order'); }
																	  else { console.log('User yok, login modal açılıyor'); onLoginClick(); } }} className="w-full px-4 py-4 bg-[#FF6F00] text-white font-montserrat font-bold text-[14px] rounded-lg active:scale-95"
																	   style={{ WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation', userSelect: 'none' }} > Siparişi Tamamla </button> 
																	   </div> )}
																	    </div> 
																		</div> )}
																	    </div>





						
						<Menu size={24} className="text-[#3C403D] cursor-pointer" />
					</div>
				</div>

				{/* Navigation Menu */}
				<nav className="flex flex-col items-center gap-[30px] pt-[48px] pb-[48px]">
					   <Link
						   to="/"
						   className="font-montserrat font-normal text-center text-[#252B42] text-[30px] leading-[45px] tracking-[0.2px]"
					   >
						   Home
					   </Link>
					   <Link
						   to="/shop"
						   className="font-montserrat font-normal text-center text-[#737373] text-[30px] leading-[45px] tracking-[0.2px]"
					   >
						   Shop
					   </Link>
				   <Link
					   to="/aboutus"
					   className="font-montserrat font-normal text-center text-[#737373] text-[30px] leading-[45px] tracking-[0.2px]"
				   >
					   About
				   </Link>
                       <Link
                           to="/team"
                           className="font-montserrat font-normal text-center text-[#737373] text-[30px] leading-[45px] tracking-[0.2px]"
                       >
                           Team
                       </Link>					   
					   <Link
						   to="/contact"
						   className="font-montserrat font-normal text-center text-[#737373] text-[30px] leading-[45px] tracking-[0.2px]"
					   >
						   Contact
					   </Link>
				</nav>
			</div>
		</>
	);
}
