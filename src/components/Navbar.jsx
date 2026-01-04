import React, { useState, useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CryptoJS from "crypto-js";
import { User, Search, ShoppingCart, Menu, ChevronDown, Heart, Phone, Mail, Instagram, Youtube, Facebook, Twitter, LogOut, Trash2 } from "lucide-react";
import { setUser, removeFromCart } from "../store/actions";

export default function Navbar({ topBarColor = "#252B42", onSignUpClick, onLoginClick, isShopPage = false }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const user = useSelector(state => state.client.user);
	const cart = useSelector(state => state.shoppingCart.cart);
	
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
	const dropdownRef = useRef(null);
	const shopBtnRef = useRef(null);
	const cartDropdownRef = useRef(null);
	const cartBtnRef = useRef(null);
	
	// Toplam ürün adedi
	const cartItemCount = cart.reduce((total, item) => total + item.count, 0);

	// Dropdown mouse enter/leave kontrolü için gecikmeli kapanış
	const closeDropdownTimeout = useRef();
	const handleShopMouseEnter = () => {
		if (closeDropdownTimeout.current) clearTimeout(closeDropdownTimeout.current);
		setDropdownOpen(true);
	};
	const handleShopMouseLeave = () => {
		closeDropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 120);
	};
	
	// Cart dropdown kontrolü
	const closeCartDropdownTimeout = useRef();
	const handleCartMouseEnter = () => {
		if (closeCartDropdownTimeout.current) clearTimeout(closeCartDropdownTimeout.current);
		setCartDropdownOpen(true);
	};
	const handleCartMouseLeave = () => {
		closeCartDropdownTimeout.current = setTimeout(() => setCartDropdownOpen(false), 120);
	};
	
	// Mobile cart dropdown açıkken body scroll'u engelle
	useEffect(() => {
		if (cartDropdownOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [cartDropdownOpen]);

	useEffect(() => {
		function handleClickOutside(event) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target) &&
				shopBtnRef.current &&
				!shopBtnRef.current.contains(event.target)
			) {
				setDropdownOpen(false);
			}
			if (
				cartDropdownRef.current &&
				!cartDropdownRef.current.contains(event.target) &&
				cartBtnRef.current &&
				!cartBtnRef.current.contains(event.target)
			) {
				setCartDropdownOpen(false);
			}
		}
		function handleEsc(event) {
			if (event.key === "Escape") {
				setDropdownOpen(false);
				setCartDropdownOpen(false);
			}
		}
		if (dropdownOpen || cartDropdownOpen) {
			document.addEventListener("mousedown", handleClickOutside);
			document.addEventListener("keydown", handleEsc);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleEsc);
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleEsc);
		};
	}, [dropdownOpen, cartDropdownOpen]);

	return (
		<>
			{/* Desktop Top Bar - Sadece lg ve üzeri ekranlarda göster */}
			<div className="hidden md:block w-full text-white" style={{ backgroundColor: actualTopBarColor }}>
				<div className="w-full">
					<div className="max-w-[1440px] mx-auto w-full h-[58px] flex items-center px-0">
						<div className="flex w-full h-[46px] items-center justify-between">
							{/* 1. col-md-4 */}
							<div className="flex items-center gap-2 pl-[25px]">
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
							<div className="mx-8 flex items-center justify-center">
								<h6 className="font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-white text-center">
									Follow Us  and get a chance to win 80% off
								</h6>
							</div>
							{/* 3. col-md-4 */}
							<div className="flex items-center gap-2 pr-[30px] justify-end">
								<h6 className="font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-white w-auto">
									Follow Us :
								</h6>
								<div className="flex gap-[10px] items-center">
									<a href="#" className="flex items-center justify-center w-[26px] h-[26px] p-[5px] rounded bg-transparent">
										<Instagram size={16} className="text-white" />
									</a>
									<a href="#" className="flex items-center justify-center w-[26px] h-[26px] p-[5px] rounded bg-transparent">
										<Youtube size={16} className="text-white" />
									</a>
									<a href="#" className="flex items-center justify-center w-[26px] h-[26px] p-[5px] rounded bg-transparent">
										<Facebook size={16} className="text-white" />
									</a>
									<a href="#" className="flex items-center justify-center w-[26px] h-[26px] p-[5px] rounded bg-transparent">
										<Twitter size={16} className="text-white" />
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* Desktop Navbar alt - Sadece lg ve üzeri ekranlarda göster */}
			<nav className="hidden md:block w-full bg-white shadow z-50 relative">
				<div className="w-full flex justify-center">
					<div className="w-[1437px] flex items-center h-[58px] mx-auto relative pr-[38px]">
						{/* Brand */}
						<div className="w-[187px] h-[58px] flex items-center pl-[38px]">
							<span className="font-montserrat font-bold text-[24px] leading-[32px] tracking-[0.1px] text-[#252B42]">Bandage</span>
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
										<svg className={`ml-2 transition-transform duration-200 ${dropdownOpen ? 'rotate-0' : '-rotate-90'}`} width="10" height="5.7" viewBox="0 0 10 5.7" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M1 1L5 5L9 1" stroke="#252B42" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
										</svg>
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
															className="font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#737373] hover:text-[#23A6F0] transition-colors cursor-pointer"
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
															className="font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#737373] hover:text-[#23A6F0] transition-colors cursor-pointer"
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
								<li className="w-[33px] h-[24px] flex items-center justify-center">
									<a href="#" className="w-[33px] h-[24px] flex items-center justify-center">
										<span className="font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-center text-[#737373]">Blog</span>
									</a>
								</li>
								   <li className="w-[58px] h-[24px] flex items-center justify-center">
									   <Link to="/contact" className="w-[58px] h-[24px] flex items-center justify-center">
										   <span className="font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-center text-[#737373]">Contact</span>
									   </Link>
								   </li>
								<li className="w-[44px] h-[24px] flex items-center justify-center">
									<a href="#" className="w-[44px] h-[24px] flex items-center justify-center">
										<span className="font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-center text-[#737373]">Pages</span>
									</a>
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
								<li className="w-[46px] h-[46px] flex items-center">
									<button className="flex items-center justify-center w-[46px] h-[46px] rounded-[37px] p-[15px] gap-[5px]">
										<Search size={16} className="text-[#23A6F0]" />
									</button>
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
														onClick={() => { setCartDropdownOpen(false); history.push('/create-order'); }}
														className="flex-1 px-4 py-2 bg-[#FF6F00] text-white font-montserrat font-semibold text-[14px] rounded hover:bg-[#E66300] transition"
													>
														Siparişi Tamamla
													</button>
												</div>
											)}
										</div>
									)}
								</li>
								<li className="w-[56px] h-[46px] flex items-center">
									<button className="flex items-center w-[56px] h-[46px] rounded-[37px] p-[15px] gap-[5px]">
										<Heart size={16} className="text-[#23A6F0]" />
										<span className="font-montserrat font-normal text-[12px] leading-[16px] tracking-[0.2px] text-[#23A6F0] w-[5px] h-[16px] flex items-center justify-center">0</span>
									</button>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</nav>
			{/* Mobile Navbar - Sadece lg altı ekranlarda göster */}
			<div className="block md:hidden w-full pl-[24px] pr-[24px] max-w-[414px] mx-auto">
				{/* Top Row - Logo and Icons */}
				<div className="flex items-center justify-between pt-[13px] pb-[13px]">
					{/* Logo */}
					<h1 
						className="font-montserrat font-bold text-[#252B42] text-[24px] leading-[32px] tracking-[0.1px] no-underline"
					>
						Bandage
					</h1>

					{/* Right Icons */}
					<div className="flex items-center gap-[25px] relative">
				{user ? (
					<div className="relative group">
						<div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition">
							<img 
								src={getGravatarUrl(user.email)} 
								alt={user.name}
								className="w-6 h-6 rounded-full object-cover"
								onError={(e) => {
									e.target.style.display = 'none';
									e.target.nextElementSibling.style.display = 'flex';
								}}
							/>
							<User size={16} className="text-gray-400 hidden" />
							<ChevronDown size={14} className="text-[#252B42]" />
						</div>
						
						{/* Mobile User Dropdown */}
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
					<button onClick={onLoginClick}>
						<User size={21} className="text-[#3C403D] cursor-pointer hover:text-[#23A6F0] transition" />
					</button>
				)}
						<Search size={24} className="text-[#3C403D] cursor-pointer" />
						
						{/* Mobile Shopping Cart with Badge */}
						<div className="relative">
							<button
								onClick={(e) => {
									e.stopPropagation();
									setCartDropdownOpen(!cartDropdownOpen);
								}}
								className="relative"
							>
								<ShoppingCart size={24} className="text-[#3C403D] cursor-pointer" />
								{cartItemCount > 0 && (
									<span className="absolute -top-2 -right-2 bg-[#23A6F0] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
										{cartItemCount}
									</span>
								)}
							</button>
							
							{/* Mobile Cart Dropdown */}
							{cartDropdownOpen && (
								<div 
									className="fixed inset-0 z-[9999] bg-black bg-opacity-50 flex items-end" 
									onMouseDown={(e) => {
										if (e.target === e.currentTarget) {
											setCartDropdownOpen(false);
										}
									}}
								>
									<div 
										className="w-full bg-white rounded-t-2xl shadow-2xl max-h-[85vh] overflow-hidden flex flex-col"
									>
									{/* Header */}
									<div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
										<h3 className="font-montserrat font-bold text-[16px] text-[#252B42]">
											Sepetim ({cart.length} Ürün)
										</h3>
										<button 
											onClick={() => setCartDropdownOpen(false)} 
											className="text-gray-400 hover:text-gray-600 p-2"
										>
											✕
										</button>
									</div>
									
									{/* Cart Items */}
									<div className="flex-1 overflow-y-auto">
										{cart.length === 0 ? (
											<div className="px-4 py-8 text-center">
												<ShoppingCart size={40} className="mx-auto text-gray-300 mb-2" />
												<p className="font-montserrat text-[12px] text-gray-500">Sepetiniz boş</p>
											</div>
										) : (
											cart.map((item, index) => (
												<div key={index} className="px-4 py-3 border-b border-gray-100 group">
													<div className="flex gap-3">
														<img 
															src={item.product.images?.[0]?.url || ''} 
															alt={item.product.name}
															className="w-12 h-12 object-cover rounded"
														/>
														<div className="flex-1 min-w-0">
															<h4 className="font-montserrat font-semibold text-[12px] text-[#252B42] line-clamp-2">
																{item.product.name}
															</h4>
															<p className="font-montserrat text-[11px] text-gray-600 mt-1">
																Adet: {item.count}
															</p>
															<p className="font-montserrat font-bold text-[12px] text-[#23A6F0] mt-1">
																{item.product.price} TL
															</p>
														</div>
														<button
															onMouseDown={(e) => {
																e.preventDefault();
																e.stopPropagation();
															}}
															onClick={(e) => {
																e.preventDefault();
																e.stopPropagation();
																dispatch(removeFromCart(item.product.id));
															}}
															className="p-1.5 hover:bg-red-50 rounded-full h-fit"
															title="Sepetten Çıkar"
														>
															<Trash2 size={14} className="text-red-500" />
														</button>
													</div>
												</div>
											))
										)}
									</div>
									
									{/* Footer Buttons */}
									{cart.length > 0 && (
										<div className="px-4 py-4 border-t border-gray-200 flex flex-col gap-3 bg-gray-50 flex-shrink-0">
											<button 
												type="button"
												onMouseDown={(e) => {
													e.preventDefault();
													e.stopPropagation();
												}}
												onClick={(e) => {
													e.preventDefault();
													e.stopPropagation();
													console.log('Sepete Git tıklandı!');
													setCartDropdownOpen(false);
													history.push('/cart');
												}}
												className="w-full px-4 py-4 border-2 border-[#23A6F0] text-[#23A6F0] font-montserrat font-bold text-[14px] rounded-lg active:scale-95"
												style={{ WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation', userSelect: 'none' }}
											>
												Sepete Git
											</button>
											<button 
												type="button"
												onMouseDown={(e) => {
													e.preventDefault();
													e.stopPropagation();
												}}
												onClick={(e) => {
													e.preventDefault();
													e.stopPropagation();
													setCartDropdownOpen(false);
													history.push('/create-order');
												}}
												className="w-full px-4 py-4 bg-[#FF6F00] text-white font-montserrat font-bold text-[14px] rounded-lg active:scale-95"
												style={{ WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation', userSelect: 'none' }}
											>
												Siparişi Tamamla
											</button>
										</div>
									)}
								</div>
								</div>
							)}
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
                           to="/team"
                           className="font-montserrat font-normal text-center text-[#737373] text-[30px] leading-[45px] tracking-[0.2px]"
                       >
                           Team
                       </Link>
					   <div
						   className="font-montserrat font-normal text-center text-[#737373] text-[30px] leading-[45px] tracking-[0.2px]"
					   >
						   Product
					   </div>
					   <div
						   className="font-montserrat font-normal text-center text-[#737373] text-[30px] leading-[45px] tracking-[0.2px]"
					   >
						   Pricing
					   </div>
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
