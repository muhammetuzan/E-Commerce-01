import featureImage from '../assets/resimler/5f8ce73d1a41b674cbd12f927c7ea9a6ca0ce76c.png';

export default function Container() {
	return (
		<section className="w-full max-w-[414px] h-[999px] pt-[120px] mx-auto lg:w-[1440px] lg:h-[682px] lg:pt-0 lg:mx-auto lg:flex lg:items-center lg:justify-center lg:bg-white">
			{/* Row */}
			<div className="w-[414px] h-[911.25px] flex flex-col gap-[28.1px] lg:w-[1439px] lg:h-[682px] lg:flex-row-reverse lg:gap-[30px] lg:items-center lg:justify-between">
				{/* Col-md-5 - Content */}
				<div className="w-[394.33px] h-[476.15px] flex flex-col gap-[32.78px] items-center mx-auto lg:w-[573px] lg:h-[326px] lg:gap-[30px] lg:items-start lg:mx-0">
					{/* Header Tag */}
					<h5 className="font-montserrat w-[122px] h-[24px] text-[16px] font-bold leading-[24px] tracking-[0.1px] text-[#BDBDBD] whitespace-nowrap lg:w-[122px] lg:h-[24px] lg:text-left">
						SUMMER 2020
					</h5>

					{/* Headline */}
					<h1 className="font-montserrat w-[303.48px] h-[140.5px] text-[40px] font-bold leading-[50px] tracking-[0.2px] text-center text-[#252B42] lg:w-[389px] lg:h-[100px] lg:text-[40px] lg:leading-[50px] lg:text-left">
						<span className="lg:hidden">Part of the <br />Neural <br />Universe</span>
						<span className="hidden lg:block">Part of the Neural<br />Universe</span>
					</h1>

					{/* Description */}
					<h4 className="font-montserrat w-[262.27px] h-[84.3px] text-[20px] font-normal leading-[30px] tracking-[0.2px] text-center text-[#737373] lg:w-[376px] lg:h-[60px] lg:text-[20px] lg:leading-[30px] lg:text-left">
						We know how large objects will act, but things on a small scale.
					</h4>

					{/* CTA - Buttons */}
					<div className="w-[165px] h-[129px] flex flex-col gap-[25px] lg:flex-row lg:w-[339px] lg:h-[52px] lg:gap-[10px] lg:items-center">
						{/* Buy Now Button */}
						<button className="font-montserrat w-[156px] h-[52px] pt-[15px] pr-[40px] pb-[15px] pl-[40px] bg-[#23A6F0] text-white text-[14px] font-bold leading-[22px] tracking-[0.2px] text-center border-none rounded-[5px] cursor-pointer flex items-center justify-center gap-[10px] lg:w-[156px] lg:h-[52px] lg:rounded-[5px] lg:bg-[#2DC071] lg:pt-[15px] lg:pr-[40px] lg:pb-[15px] lg:pl-[40px] lg:gap-[10px] lg:text-white lg:whitespace-nowrap">
							BUY NOW
						</button>

						{/* Learn More Button */}
						<button className="font-montserrat w-[165px] h-[52px] pt-[15px] pr-[40px] pb-[15px] pl-[40px] bg-transparent text-[#23A6F0] text-[14px] font-bold leading-[22px] tracking-[0.2px] text-center border border-[#23A6F0] rounded-[5px] cursor-pointer flex items-center justify-center gap-[10px] lg:w-[173px] lg:h-[52px] lg:rounded-[5px] lg:border lg:border-[#2DC071] lg:pt-[15px] lg:pr-[40px] lg:pb-[15px] lg:pl-[40px] lg:gap-[10px] lg:text-[#2DC071] lg:bg-transparent lg:font-bold lg:text-[14px] lg:leading-[22px] lg:tracking-[0.2px] lg:text-center lg:whitespace-nowrap">
							<span className="lg:hidden">Learn More</span>
							<span className="hidden lg:inline-block uppercase">READ MORE</span>
						</button>
					</div>
				</div>

				{/* Col-md-6 - Image */}
				<div className="w-[414px] h-[407px] relative overflow-hidden lg:w-[950px] lg:h-[682px] lg:static lg:flex lg:items-center lg:justify-end">
					   <img
						   src={featureImage}
						   alt="Asian woman and man with winter clothes"
						   className="h-auto absolute bottom-[25px] right-[-70px] object-contain max-w-none lg:static lg:bottom-auto lg:right-auto lg:w-[950px] lg:h-[682px] lg:max-w-full lg:object-contain"
						   style={{width: '150%'}}
					   />
				</div>
			</div>
		</section>
	);
}