
import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";
import React, { useState } from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import Navbar from "./components/Navbar";
import Footer from "./layout/Footer";
import PageContent from "./layout/PageContent";

import LoginModal from "./components/LoginModal";

import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ContactPage from "./pages/ContactPage";
import TeamPage from "./pages/TeamPage";
import AboutUs from "./pages/AboutUs";

import ShoppingCartPage from "./pages/ShoppingCartPage";
import CreateOrderPage from "./pages/CreateOrderPage";
import PreviousOrdersPage from "./pages/PreviousOrdersPage";


function AppContent({ onSignUpClick }) {
	const location = useLocation();
	// Shop sayfasında yeşil, diğerlerinde koyu mavi
	const topBarColor = location.pathname === "/shop" ? "#23856D" : "#252B42";
	
	

	return (
		<>
			<PageContent>
				   <Switch>
					   <Route exact path="/" component={HomePage} />
					   <Route exact path="/shop" component={ShopPage} />
					   <Route path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId" component={ProductDetailPage} />
					   <Route path="/shop/:gender/:categoryName/:categoryId" component={ShopPage} />
					   <Route path="/product/:id" component={ProductDetailPage} />
					   <Route path="/cart" component={ShoppingCartPage} />
					   <Route path="/create-order" component={CreateOrderPage} />
					   <Route path="/previous-orders" component={PreviousOrdersPage} />
					   <Route path="/contact" component={ContactPage} />
					   <Route path="/team" component={TeamPage} />
					<Route path="/aboutus" component={AboutUs} />
				   </Switch>
			</PageContent>
			<Footer isShopPage={location.pathname === "/shop"} />
		</>
	);
}

export default function App() {

	const [showLoginModal, setShowLoginModal] = useState(false);

	return (
		<Provider store={store}>
			<Router>
				<AppWrapper 
				
					showLoginModal={showLoginModal}
					setShowLoginModal={setShowLoginModal}
				/>
			</Router>
		</Provider>
	);
}


import { useDispatch } from "react-redux";
import { setUser } from "./store/actions";
import { verifyToken, fetchCategories, fetchProducts } from "./store/thunks";
import { useEffect } from "react";

function AppWrapper({showLoginModal, setShowLoginModal }) {
	const location = useLocation();
	const dispatch = useDispatch();

	// App load'da token verify et ve categories fetch et
	useEffect(() => {
		// Tarayıcının otomatik scroll davranışını kapat
		if ('scrollRestoration' in window.history) {
			window.history.scrollRestoration = 'manual';
		}
		// Categories'i fetch et
		dispatch(fetchCategories());
		// Products'i fetch et
		dispatch(fetchProducts());
		
		const token = localStorage.getItem('token');
		
		if (token) {
			console.log('Token found in localStorage, verifying...');
			// Token varsa verify endpoint'ine request yap
			dispatch(verifyToken());
		} else {
			// Token yoksa localStorage'daki user'ı restore et (eski T10 flow)
			const storedUser = localStorage.getItem('user');
			if (storedUser) {
				try {
					const user = JSON.parse(storedUser);
					console.log('Restoring user from localStorage:', user);
					dispatch(setUser(user));
				} catch (error) {
					console.error('Error restoring user:', error);
					localStorage.removeItem('user');
				}
			}
		}
	}, [dispatch]);

	return (
		<>
			<Navbar 
				
				onLoginClick={() => {
					// Previous page'i localStorage'a kaydet
					localStorage.setItem('previousPage', location.pathname);
					setShowLoginModal(true);
				}}
				isShopPage={location.pathname === "/shop" || location.pathname.startsWith("/product") || location.pathname.startsWith("/shop/")}
			/>
			<AppContent />
			
			<LoginModal 
				isOpen={showLoginModal} 
				onClose={() => setShowLoginModal(false)}
			/>
		</>
	);
}
