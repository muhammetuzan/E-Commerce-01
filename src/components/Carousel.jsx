import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import productImage from '../assets/resimler/c7a19f43aa4437b65bb40c3e3edb92e61a4d6184.png';
import slide2Background from '../assets/resimler/1aca44542643e83770bd4886880e082aecdda745.jpg';
import slide2Product from '../assets/resimler/da519ff7fee0eaecabd5f47e2ad5f6c8e9e4bd0d.png';

export default function Carousel() {
	const [currentSlide, setCurrentSlide] = useState(0);
	const history = useHistory();

	const nextSlide = () => {
		setCurrentSlide((prev) => (prev + 1) % 2);
	};

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev - 1 + 2) % 2);
	};

	return (
		<section
			className={`w-full max-w-[414px] h-[1230px] rounded-[5px] relative overflow-hidden mx-auto box-border lg:max-w-[1440px] lg:h-[709px] lg:rounded-[5px] lg:border lg:border-solid lg:border-[#E6E6E6] lg:mx-auto lg:mt-0 lg:mb-0 ${currentSlide === 1 ? 'lg:bg-[#2D9CDB]' : 'lg:bg-[#23856D]'} bg-[#23856D]`}
		>
			{/* Responsive shared layout: Mobil ve Desktop aynı yapıda, className'larla ayrım */}
			<div className="w-full h-full flex flex-col lg:flex-row lg:items-center lg:justify-center">
				{/* Container */}
				<div className="relative w-full h-full lg:w-[1036px] lg:h-[711px] lg:flex lg:flex-row lg:gap-[80px] lg:px-0 lg:py-[112px] lg:mx-auto">
					{/* Left: Texts */}
					<div className="absolute bottom-[580px] left-1/2 -translate-x-1/2 w-[599px] h-[429px] flex flex-col gap-[35px] items-center justify-end z-10
						lg:static lg:bottom-auto lg:left-auto lg:translate-x-0 lg:w-[509px] lg:h-[432px] lg:pt-[60px] lg:gap-[30px] lg:items-start lg:justify-end">
						{/* SUMMER 2020 */}
						<p className="font-montserrat w-[154px] h-[30px] text-[20px] font-normal leading-[30px] tracking-[0.2px] text-[#FAFAFA] text-center lg:text-left">
							SUMMER 2020
						</p>
						{/* Vita Classic Product */}
						<h1 className="font-montserrat w-[291px] h-[90px] text-[40px] font-bold leading-[50px] tracking-[0.2px] text-center text-[#FAFAFA] lg:w-[509px] lg:h-[160px] lg:text-[58px] lg:leading-[80px] lg:text-left">
							Vita Classic Product
						</h1>
						{/* Description */}
						<h4 className="font-montserrat w-[291px] h-[90px] text-[20px] font-normal leading-[30px] tracking-[0.2px] text-center text-[#FAFAFA] lg:w-[341px] lg:h-[40px] lg:text-[14px] lg:leading-[20px] lg:text-left">
							We know how large objects will act, but things on a small scale.
						</h4>
						{/* Price and Button */}
						<div className="w-[184px] h-[104px] flex flex-col gap-[20px] items-center lg:flex-row lg:items-center lg:gap-[34px] lg:w-[292px] lg:h-[52px] lg:mt-[20px] lg:mb-0 lg:justify-start">
							<p className="font-montserrat w-[77px] h-[32px] text-[24px] font-bold leading-[32px] tracking-[0.1px] text-center text-[#FAFAFA] lg:text-left">
								$16.48
							</p>
							<button onClick={() => currentSlide === 1 && (window.scrollTo(0, 0), history.push('/shop'))} className="font-montserrat w-[184px] h-[52px] pt-[15px] pr-[40px] pb-[15px] pl-[40px] bg-[#2DC071] text-[#FAFAFA] text-[14px] font-bold leading-[22px] tracking-[0.2px] text-center border-none rounded-[5px] cursor-pointer flex items-center justify-center gap-[10px] lg:w-[184px] lg:h-[52px] lg:px-0 lg:whitespace-nowrap lg:ml-0">
								{currentSlide === 0 ? 'ADD TO CART' : 'SHOP NOW'}
							</button>
						</div>
					</div>

					{/* Right: Image */}
					<div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full flex items-end justify-center z-0
						lg:static lg:bottom-auto lg:left-auto lg:translate-x-0 lg:w-[510px] lg:h-[685px] lg:flex lg:items-center lg:justify-end">
						{/* Slide 1 */}
						{currentSlide === 0 && (
							<div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[416px] h-[541px] overflow-hidden z-10
								lg:static lg:bottom-auto lg:left-auto lg:translate-x-0 lg:w-[443px] lg:h-[685px] lg:overflow-visible lg:flex lg:items-center lg:justify-end">
								<img
									src={productImage}
									alt="Product"
									className="w-[416px] h-[681px] object-cover lg:w-[443px] lg:h-[685px] lg:ml-auto"
								/>
							</div>
						)}
						{/* Slide 2 */}
						{currentSlide === 1 && (
							<>
								{/* Mobilede arka plan görseli */}
								<div className="absolute top-0 left-0 w-full h-[1230px] overflow-hidden lg:hidden z-0">
									<img
										src={slide2Background}
										alt="Background"
										className="w-full h-full object-cover"
									/>
								</div>
								<div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full flex items-end justify-center z-10
									lg:static lg:bottom-auto lg:left-auto lg:translate-x-0 lg:w-[443px] lg:h-[685px] lg:flex lg:items-center lg:justify-end">
									<img
										src={slide2Product}
										alt="Product"
										className="w-auto h-auto max-w-full max-h-full object-contain lg:w-[443px] lg:h-[685px] lg:object-cover lg:ml-auto"
									/>
								</div>
							</>
						)}
					</div>
				</div>

				{/* Carousel Controls - Sadeleştirilmiş */}
				<button
					onClick={prevSlide}
					className="absolute z-10 bg-transparent border-none cursor-pointer w-[24px] h-[44.47px] top-[589px] left-0 lg:w-[80px] lg:h-[80px] lg:top-1/2 lg:-translate-y-1/2 lg:left-[40px] lg:bg-transparent lg:rounded-none lg:items-center lg:justify-center lg:flex"
				>
					<ChevronLeft className="block lg:hidden" size={80} color="#FFFFFF" strokeWidth={1} />
					<ChevronLeft className="hidden lg:block" size={80} color="#FFFFFF" strokeWidth={1} />
				</button>
				<button
					onClick={nextSlide}
					className="absolute z-10 bg-transparent border-none cursor-pointer w-[24px] h-[44.47px] top-[589px] left-[335px] lg:w-[80px] lg:h-[80px] lg:top-1/2 lg:-translate-y-1/2 lg:right-[40px] lg:left-auto lg:bg-transparent lg:rounded-none lg:items-center lg:justify-center lg:flex"
				>
					<ChevronRight className="block lg:hidden" size={80} color="#FFFFFF" strokeWidth={1} />
					<ChevronRight className="hidden lg:block" size={80} color="#FFFFFF" strokeWidth={1} />
				</button>
				{/* Carousel Indicators */}
				<div className="hidden lg:flex absolute w-[126px] h-[10px] top-[650px] left-[657px] items-center justify-between z-30">
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
