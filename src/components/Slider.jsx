import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import slideImageMobile from "../assets/resimler/product-slide-1.jpg";
import slideImageDesktop from "../assets/resimler/96c86912d491d421800e62998b9af7c838cc25d1.jpg";
import slideImageDesktop2 from "../assets/resimler/423043b5fa33ead140411b2645af5ca11e8d3429.jpg";

export default function Slider() {
	const [currentSlide, setCurrentSlide] = useState(0);

	const slides = [
		{
			id: 1,
			imageMobile: slideImageMobile,
			imageDesktop: slideImageDesktop,
			subtitle: "SUMMER 2020",
			title: "NEW COLLECTION",
			description: "We know how large objects will act, but things on a small scale.",
		},
		{
			id: 2,
			imageMobile: slideImageDesktop2,
			imageDesktop: slideImageDesktop2,
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
		<>
			{/* Mobile Only */}
			<div className="w-full max-w-[414px] mx-auto md:hidden">
				<div className="relative w-full overflow-hidden h-[753px]">
					{/* Slide Image */}
					<img
						src={slides[currentSlide].imageMobile}
						alt="Slider"
						className="absolute inset-0 w-full h-full object-cover"
					/>
					{/* Navigation Arrows */}
					<button
						onClick={prevSlide}
						className={`absolute z-50 left-[5px] top-[330px] text-white bg-transparent border-none cursor-pointer ${slides.length > 1 ? '' : 'opacity-50 cursor-not-allowed'}`}
						aria-label="Previous slide"
						disabled={slides.length <= 1}
					>
						<ChevronLeft size={80} strokeWidth={1} color="#FFFFFF" />
					</button>
					<button
						onClick={nextSlide}
						className={`absolute z-50 right-[5px] top-[330px] text-white bg-transparent border-none cursor-pointer ${slides.length > 1 ? '' : 'opacity-50 cursor-not-allowed'}`}
						aria-label="Next slide"
						disabled={slides.length <= 1}
					>
						<ChevronRight size={80} strokeWidth={1} color="#FFFFFF" />
					</button>
					{/* Content */}
					<div className="relative h-full flex flex-col items-center text-white px-8 z-10 pt-[200px] pointer-events-none">
						<h3 className="font-montserrat font-bold text-center text-[16px] leading-[24px] tracking-[0.1px] text-[#FFFFFF] mb-[30px]">
							{slides[currentSlide].subtitle}
						</h3>
						<h1 className="font-montserrat font-bold text-center text-[40px] leading-[50px] tracking-[0.2px] text-[#FFFFFF] max-w-[300px] mb-[35px]">
							{slides[currentSlide].title}
						</h1>
						<p className="font-montserrat font-normal text-center text-[20px] leading-[30px] tracking-[0.2px] text-[#FAFAFA] max-w-[300px] mb-[45px]">
							We know how large objects will act,<br /> but things on a small scale.
						</p>
						<div className="w-full flex items-center justify-center pointer-events-auto">
							<button className="font-montserrat font-bold text-center bg-[#2DC071] text-[#FFFFFF] text-[24px] leading-[32px] tracking-[0.1px] w-[221px] h-[62px] rounded-[5px] border-none cursor-pointer">
								SHOP NOW
							</button>
						</div>
					</div>
				</div>
			</div>
			{/* Desktop Only */}
			<div className="hidden md:block w-full max-w-[1440px] mx-auto h-[716px] rounded-[5px] border border-[#DEDEDE] relative overflow-hidden">
				<div className="relative w-full overflow-hidden h-[716px]">
					{/* Slide Image */}
					<img
						src={slides[currentSlide].imageDesktop}
						alt="Slider"
						className="absolute inset-0 w-full h-full object-cover rounded-[5px]"
					/>
					{/* Navigation Arrows */}
					<button
						onClick={prevSlide}
						className="absolute z-10 left-0 top-1/2 -translate-y-1/2 w-[80px] h-[80px] flex items-center justify-center"
						aria-label="Previous slide"
					>
						<ChevronLeft size={80} strokeWidth={1} color="#FFFFFF" />
					</button>
					<button
						onClick={nextSlide}
						className="absolute z-10 right-0 top-1/2 -translate-y-1/2 w-[80px] h-[80px] flex items-center justify-center"
						aria-label="Next slide"
					>
						<ChevronRight size={80} strokeWidth={1} color="#FFFFFF" />
					</button>
					{/* Content */}
					<div className="absolute top-[48px] left-1/2 -translate-x-1/2 w-[975px] h-[651px] pt-[162px] pb-[112px] flex flex-col items-start justify-start px-0">
						<h3 className="font-montserrat font-bold text-left w-[122px] h-[24px] text-[16px] leading-[24px] tracking-[0.1px] text-[#FFFFFF] mb-[30px] whitespace-nowrap">
							{slides[currentSlide].subtitle}
						</h3>
						<h1 className="font-montserrat font-bold text-left text-[58px] leading-[80px] tracking-[0.2px] text-[#FFFFFF] max-w-[548px] w-[548px] h-[80px] whitespace-nowrap mb-[35px]">
							{slides[currentSlide].title}
						</h1>
						<p className="font-montserrat font-normal text-left max-w-[376px] w-[376px] h-[60px] text-[20px] leading-[30px] tracking-[0.2px] text-[#FAFAFA] mb-[45px]">
							We know how large objects will act,<br /> but things on a small scale.
						</p>
						<div className="w-[221px] h-[62px] flex items-center justify-start">
							<button className="font-montserrat font-bold text-center bg-[#2DC071] text-[#FFFFFF] text-[24px] leading-[32px] tracking-[0.1px] w-[221px] h-[62px] rounded-[5px] border-none cursor-pointer px-[40px] py-[15px] whitespace-nowrap">
								SHOP NOW
							</button>
						</div>
							{/* Carousel Indicators - Desktop */}
						<div
							className="hidden md:flex absolute left-1/2 -translate-x-1/2"
							style={{ width: 126, height: 10, top: 650 }}
						>
							<div className="flex" style={{ width: 126, height: 10 }}>
								{/* Soldaki indicator */}
								<div
									style={{ width: 62, height: 10, background: '#FFFFFF', opacity: currentSlide === 0 ? 1 : 0.5, borderRadius: 5 }}
								></div>
								{/* Sağdaki indicator */}
								<div
									style={{ width: 62, height: 10, background: '#FFFFFF', opacity: currentSlide === 1 ? 1 : 0.5, borderRadius: 5, marginLeft: 2 }}
								></div>
							</div>
						</div> 
					</div>
				</div>
			</div>
		</>
	);
}
