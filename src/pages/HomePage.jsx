import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from "../layout/Header";
import ShopCards from "../components/ShopCards";
import EditorsPick from "../components/EditorsPick";
import ProductCards from "../components/ProductCards";
import Carousel from "../components/Carousel";
import Container from "../components/Container";
import BlogSection from "../components/BlogSection";
import Footer from "../layout/Footer";
import { fetchRoles } from '../store/thunks';

export default function HomePage() {
	const dispatch = useDispatch();
	const roles = useSelector(state => state.client.roles);
	const fetchState = useSelector(state => state.product.fetchState);

	useEffect(() => {
		// Rolleri Redux'tan fetch et
		if (roles.length === 0) {
			dispatch(fetchRoles());
		}
	}, [dispatch, roles.length]);

	return (
		<div className="w-full">
			<Header />
			{/* Shop Cards - Top Categories */}
			<ShopCards />

			{/* Editor's Pick */}
			<EditorsPick />

			{/* Product Cards */}
			<ProductCards />

			{/* Carousel */}
			<Carousel />

			{/* Container */}
			<Container />

			{/* Blog Section */}
			<BlogSection />

			
		</div>
	);
}
