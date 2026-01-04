import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import productImage from '../assets/resimler/c7a19f43aa4437b65bb40c3e3edb92e61a4d6184.png';
import slide2Background from '../assets/resimler/1aca44542643e83770bd4886880e082aecdda745.jpg';
import slide2Product from '../assets/resimler/da519ff7fee0eaecabd5f47e2ad5f6c8e9e4bd0d.png';

export default function Carousel() {
	const [currentSlide, setCurrentSlide] = useState(0);

	const nextSlide = () => {
		setCurrentSlide((prev) => (prev + 1) % 2);
	};

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev - 1 + 2) % 2);
	};

	return (
		<section
			className={`w-full max-w-[414px] h-[1230px] rounded-[5px] relative overflow-hidden mx-auto box-border md:max-w-[1440px] md:h-[709px] md:rounded-[5px] md:border md:border-solid md:border-[#E6E6E6] md:mx-auto md:mt-0 md:mb-0 ${currentSlide === 1 ? 'md:bg-[#2D9CDB]' : 'md:bg-[#23856D]'} bg-[#23856D]`}
		>
			{/* Responsive shared layout: Mobil ve Desktop aynı yapıda, className'larla ayrım */}
			<div className="w-full h-full flex flex-col md:flex-row md:items-center md:justify-center">
				{/* Container */}
				<div className="relative w-full h-full md:w-[1036px] md:h-[711px] md:flex md:flex-row md:gap-[80px] md:px-0 md:py-[112px] md:mx-auto">
					{/* Left: Texts */}
					<div className="absolute bottom-[580px] left-1/2 -translate-x-1/2 w-[599px] h-[429px] flex flex-col gap-[35px] items-center justify-end z-10
						md:static md:bottom-auto md:left-auto md:translate-x-0 md:w-[509px] md:h-[432px] md:pt-[60px] md:gap-[30px] md:items-start md:justify-end">
						{/* SUMMER 2020 */}
						<p className="font-montserrat w-[154px] h-[30px] text-[20px] font-normal leading-[30px] tracking-[0.2px] text-[#FAFAFA] text-center md:text-left">
							SUMMER 2020
						</p>
						{/* Vita Classic Product */}
						<h1 className="font-montserrat w-[291px] h-[90px] text-[40px] font-bold leading-[50px] tracking-[0.2px] text-center text-[#FAFAFA] md:w-[509px] md:h-[160px] md:text-[58px] md:leading-[80px] md:text-left">
							Vita Classic Product
						</h1>
						{/* Description */}
						<h4 className="font-montserrat w-[291px] h-[90px] text-[20px] font-normal leading-[30px] tracking-[0.2px] text-center text-[#FAFAFA] md:w-[341px] md:h-[40px] md:text-[14px] md:leading-[20px] md:text-left">
							We know how large objects will act, but things on a small scale.
						</h4>
						{/* Price and Button */}
						<div className="w-[184px] h-[104px] flex flex-col gap-[20px] items-center md:flex-row md:items-center md:gap-[34px] md:w-[292px] md:h-[52px] md:mt-[20px] md:mb-0 md:justify-start">
							<p className="font-montserrat w-[77px] h-[32px] text-[24px] font-bold leading-[32px] tracking-[0.1px] text-center text-[#FAFAFA] md:text-left">
								$16.48
							</p>
							<button className="font-montserrat w-[184px] h-[52px] pt-[15px] pr-[40px] pb-[15px] pl-[40px] bg-[#2DC071] text-[#FAFAFA] text-[14px] font-bold leading-[22px] tracking-[0.2px] text-center border-none rounded-[5px] cursor-pointer flex items-center justify-center gap-[10px] md:w-[184px] md:h-[52px] md:px-0 md:whitespace-nowrap md:ml-0">
								{currentSlide === 0 ? 'ADD TO CART' : 'SHOP NOW'}
							</button>
						</div>
					</div>

					{/* Right: Image */}
					<div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full flex items-end justify-center z-0
						md:static md:bottom-auto md:left-auto md:translate-x-0 md:w-[510px] md:h-[685px] md:flex md:items-center md:justify-end">
						{/* Slide 1 */}
						{currentSlide === 0 && (
							<div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[416px] h-[541px] overflow-hidden z-10
								md:static md:bottom-auto md:left-auto md:translate-x-0 md:w-[443px] md:h-[685px] md:overflow-visible md:flex md:items-center md:justify-end">
								<img
									src={productImage}
									alt="Product"
									className="w-[416px] h-[681px] object-cover md:w-[443px] md:h-[685px] md:ml-auto"
								/>
							</div>
						)}
						{/* Slide 2 */}
						{currentSlide === 1 && (
							<>
								{/* Mobilede arka plan görseli */}
								<div className="absolute top-0 left-0 w-full h-[1230px] overflow-hidden md:hidden z-0">
									<img
										src={slide2Background}
										alt="Background"
										className="w-full h-full object-cover"
									/>
								</div>
								<div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full flex items-end justify-center z-10
									md:static md:bottom-auto md:left-auto md:translate-x-0 md:w-[443px] md:h-[685px] md:flex md:items-center md:justify-end">
									<img
										src={slide2Product}
										alt="Product"
										className="w-auto h-auto max-w-full max-h-full object-contain md:w-[443px] md:h-[685px] md:object-cover md:ml-auto"
									/>
								</div>
							</>
						)}
					</div>
				</div>

				{/* Carousel Controls - Sadeleştirilmiş */}
				<button
					onClick={prevSlide}
					className="absolute z-10 bg-transparent border-none cursor-pointer w-[24px] h-[44.47px] top-[589px] left-0 md:w-[80px] md:h-[80px] md:top-1/2 md:-translate-y-1/2 md:left-[40px] md:bg-transparent md:rounded-none md:items-center md:justify-center md:flex"
				>
					<ChevronLeft className="block md:hidden" size={80} color="#FFFFFF" strokeWidth={1} />
					<ChevronLeft className="hidden md:block" size={80} color="#FFFFFF" strokeWidth={1} />
				</button>
				<button
					onClick={nextSlide}
					className="absolute z-10 bg-transparent border-none cursor-pointer w-[24px] h-[44.47px] top-[589px] left-[335px] md:w-[80px] md:h-[80px] md:top-1/2 md:-translate-y-1/2 md:right-[40px] md:left-auto md:bg-transparent md:rounded-none md:items-center md:justify-center md:flex"
				>
					<ChevronRight className="block md:hidden" size={80} color="#FFFFFF" strokeWidth={1} />
					<ChevronRight className="hidden md:block" size={80} color="#FFFFFF" strokeWidth={1} />
				</button>
				{/* Carousel Indicators */}
				<div className="hidden md:flex absolute w-[126px] h-[10px] top-[650px] left-[657px] items-center justify-between z-30">
					<div
						className={`w-[62px] h-[10px] rounded-[5px] transition-opacity duration-200 ${currentSlide === 0 ? 'opacity-100 bg-[#fff]' : 'opacity-50 bg-[#fff]'}`}
					/>
					<div
						className={`w-[62px] h-[10px] rounded-[5px] transition-opacity duration-200 ${currentSlide === 1 ? 'opacity-100 bg-[#fff]' : 'opacity-50 bg-[#fff]'}`}
					/>
				</div>
			</div>
		</section>
	);
}
