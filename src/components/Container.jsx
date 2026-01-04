import featureImage from '../assets/resimler/5f8ce73d1a41b674cbd12f927c7ea9a6ca0ce76c.png';

export default function Container() {
	return (
		<section className="w-full max-w-[414px] h-[999px] pt-[120px] mx-auto md:w-[1440px] md:h-[682px] md:pt-0 md:mx-auto md:flex md:items-center md:justify-center md:bg-white">
			{/* Row */}
			<div className="w-[414px] h-[911.25px] flex flex-col gap-[28.1px] md:w-[1439px] md:h-[682px] md:flex-row-reverse md:gap-[30px] md:items-center md:justify-between">
				{/* Col-md-5 - Content */}
				<div className="w-[394.33px] h-[476.15px] flex flex-col gap-[32.78px] items-center mx-auto md:w-[573px] md:h-[326px] md:gap-[30px] md:items-start md:mx-0">
					{/* Header Tag */}
					<h5 className="font-montserrat w-[122px] h-[24px] text-[16px] font-bold leading-[24px] tracking-[0.1px] text-[#BDBDBD] whitespace-nowrap md:w-[122px] md:h-[24px] md:text-left">
						SUMMER 2020
					</h5>

					{/* Headline */}
					<h1 className="font-montserrat w-[303.48px] h-[140.5px] text-[40px] font-bold leading-[50px] tracking-[0.2px] text-center text-[#252B42] md:w-[389px] md:h-[100px] md:text-[40px] md:leading-[50px] md:text-left">
						<span className="md:hidden">Part of the <br />Neural <br />Universe</span>
						<span className="hidden md:block">Part of the Neural<br />Universe</span>
					</h1>

					{/* Description */}
					<h4 className="font-montserrat w-[262.27px] h-[84.3px] text-[20px] font-normal leading-[30px] tracking-[0.2px] text-center text-[#737373] md:w-[376px] md:h-[60px] md:text-[20px] md:leading-[30px] md:text-left">
						We know how large objects will act, but things on a small scale.
					</h4>

					{/* CTA - Buttons */}
					<div className="w-[165px] h-[129px] flex flex-col gap-[25px] md:flex-row md:w-[339px] md:h-[52px] md:gap-[10px] md:items-center">
						{/* Buy Now Button */}
						<button className="font-montserrat w-[156px] h-[52px] pt-[15px] pr-[40px] pb-[15px] pl-[40px] bg-[#23A6F0] text-white text-[14px] font-bold leading-[22px] tracking-[0.2px] text-center border-none rounded-[5px] cursor-pointer flex items-center justify-center gap-[10px] md:w-[156px] md:h-[52px] md:rounded-[5px] md:bg-[#2DC071] md:pt-[15px] md:pr-[40px] md:pb-[15px] md:pl-[40px] md:gap-[10px] md:text-white md:whitespace-nowrap">
							BUY NOW
						</button>

						{/* Learn More Button */}
						<button className="font-montserrat w-[165px] h-[52px] pt-[15px] pr-[40px] pb-[15px] pl-[40px] bg-transparent text-[#23A6F0] text-[14px] font-bold leading-[22px] tracking-[0.2px] text-center border border-[#23A6F0] rounded-[5px] cursor-pointer flex items-center justify-center gap-[10px] md:w-[173px] md:h-[52px] md:rounded-[5px] md:border md:border-[#2DC071] md:pt-[15px] md:pr-[40px] md:pb-[15px] md:pl-[40px] md:gap-[10px] md:text-[#2DC071] md:bg-transparent md:font-bold md:text-[14px] md:leading-[22px] md:tracking-[0.2px] md:text-center md:whitespace-nowrap">
							<span className="md:hidden">Learn More</span>
							<span className="hidden md:inline-block uppercase">READ MORE</span>
						</button>
					</div>
				</div>

				{/* Col-md-6 - Image */}
				<div className="w-[414px] h-[407px] relative overflow-hidden md:w-[950px] md:h-[682px] md:static md:flex md:items-center md:justify-end">
					   <img
						   src={featureImage}
						   alt="Asian woman and man with winter clothes"
						   className="h-auto absolute bottom-[25px] right-[-70px] object-contain max-w-none md:static md:bottom-auto md:right-auto md:w-[950px] md:h-[682px] md:max-w-full md:object-contain"
						   style={{width: '150%'}}
					   />
				</div>
			</div>
		</section>
	);
}