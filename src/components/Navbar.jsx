import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CryptoJS from "crypto-js";
import { User, Search, ShoppingCart, Menu, ChevronDown, Heart, Phone, Mail, Instagram, Youtube, Facebook, Twitter, LogOut } from "lucide-react";
import { setUser } from "../store/actions";

export default function Navbar({ topBarColor = "#252B42", onSignUpClick, onLoginClick, isShopPage = false }) {
	const dispatch = useDispatch();
	const user = useSelector(state => state.client.user);
	
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
	const dropdownRef = useRef(null);
	const shopBtnRef = useRef(null);

	// Dropdown mouse enter/leave kontrolü için gecikmeli kapanış
	const closeDropdownTimeout = useRef();
	const handleShopMouseEnter = () => {
		if (closeDropdownTimeout.current) clearTimeout(closeDropdownTimeout.current);
		setDropdownOpen(true);
	};
	const handleShopMouseLeave = () => {
		closeDropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 120);
	};

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
		}
		function handleEsc(event) {
			if (event.key === "Escape") {
				setDropdownOpen(false);
			}
		}
		if (dropdownOpen) {
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
	}, [dropdownOpen]);

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
										<div className="flex items-center gap-3 px-4 py-2 rounded-full hover:bg-gray-100 transition">
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
											<button 
												onClick={handleLogout}
												className="p-2 hover:bg-red-50 rounded-full transition ml-2"
												title="Çıkış Yap"
											>
												<LogOut size={16} className="text-red-500" />
											</button>
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
								<li className="w-[56px] h-[46px] flex items-center">
									<button className="flex items-center w-[56px] h-[46px] rounded-[37px] p-[15px] gap-[5px]">
										<ShoppingCart size={16} className="text-[#23A6F0]" />
										<span className="font-montserrat font-normal text-[12px] leading-[16px] tracking-[0.2px] text-[#23A6F0] w-[5px] h-[16px] flex items-center justify-center">1</span>
									</button>
								</li>
								<li className="w-[56px] h-[46px] flex items-center">
									<button className="flex items-center w-[56px] h-[46px] rounded-[37px] p-[15px] gap-[5px]">
										<Heart size={16} className="text-[#23A6F0]" />
										<span className="font-montserrat font-normal text-[12px] leading-[16px] tracking-[0.2px] text-[#23A6F0] w-[5px] h-[16px] flex items-center justify-center">1</span>
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
					<div className="flex items-center gap-[25px]">
				{user ? (
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
						<button onClick={handleLogout} title="Çıkış Yap">
							<LogOut size={16} className="text-red-500" />
						</button>
					</div>
				) : (
					<button onClick={onLoginClick}>
						<User size={21} className="text-[#3C403D] cursor-pointer hover:text-[#23A6F0] transition" />
					</button>
				)}
						<Search size={24} className="text-[#3C403D] cursor-pointer" />
						<ShoppingCart size={24} className="text-[#3C403D] cursor-pointer" />
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
