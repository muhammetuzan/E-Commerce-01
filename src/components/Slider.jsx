import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import slideImage from "../assets/product-slide-1.jpg";

export default function Slider() {
	const [currentSlide, setCurrentSlide] = useState(0);

	const slides = [
		{
			id: 1,
			image: slideImage,
			subtitle: "SUMMER 2020",
			title: "NEW COLLECTION",
			description: "We know how large objects will act, but things on a small scale.",
		},
	];

	const nextSlide = () => {
		setCurrentSlide((prev) => (prev + 1) % slides.length);
	};

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
	};

	return (
		<div className="relative w-full max-w-[414px] mx-auto overflow-hidden" style={{ height: '753px', borderRadius: '5px' }}>
			{/* Slide Image */}
			<img 
				src={slides[currentSlide].image} 
				alt="Slider" 
				className="absolute inset-0 w-full h-full object-cover"
			/>

			{/* Navigation Arrows */}
			<button
				onClick={prevSlide}
				className="absolute z-10"
				style={{ 
					left: '20px',
					top: '351px',
					color: 'white',
					background: 'transparent',
					border: 'none',
					cursor: 'pointer'
				}}
				aria-label="Previous slide"
			>
				<ChevronLeft size={50} strokeWidth={2} />
			</button>

			<button
				onClick={nextSlide}
				className="absolute z-10"
				style={{ 
					right: '20px',
					top: '351px',
					color: 'white',
					background: 'transparent',
					border: 'none',
					cursor: 'pointer'
				}}
				aria-label="Next slide"
			>
				<ChevronRight size={50} strokeWidth={2} />
			</button>

			{/* Content */}
			<div className="relative h-full flex flex-col items-center text-white px-8 z-10" style={{ paddingTop: '200px' }}>
				<h3 
					className="font-montserrat font-bold text-center"
					style={{
						fontSize: '16px',
						lineHeight: '24px',
						letterSpacing: '0.1px',
						color: '#FFFFFF',
						marginBottom: '20px'
					}}
				>
					{slides[currentSlide].subtitle}
				</h3>

				<h1 
					className="font-montserrat font-bold text-center"
					style={{
						fontSize: '40px',
						lineHeight: '50px',
						letterSpacing: '0.2px',
						color: '#FFFFFF',
						maxWidth: '300px',
						marginBottom: '25px'
					}}
				>
					{slides[currentSlide].title}
				</h1>

				<p 
					className="font-montserrat font-normal text-center"
					style={{
						fontSize: '20px',
						lineHeight: '30px',
						letterSpacing: '0.2px',
						color: '#FAFAFA',
						maxWidth: '300px',
						marginBottom: '45px'
					}}
				>
					{slides[currentSlide].description}
				</p>

				<button 
					className="font-montserrat font-bold text-center"
					style={{
						background: '#2DC071',
						color: 'white',
						fontSize: '24px',
						lineHeight: '32px',
						letterSpacing: '0.1px',
						width: '221px',
						height: '62px',
						borderRadius: '5px',
						border: 'none',
						cursor: 'pointer'
					}}
				>
					SHOP NOW
				</button>
			</div>
		</div>
	);
}
