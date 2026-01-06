import { Calendar, ChevronRight } from 'lucide-react';
import grafikIcon from '../assets/ikonvektorleri/grafik.png';
import blogImage1 from '../assets/resimler/6fa1d42dda5f231255f5a899906c50f4f3638388.jpg';
import blogImage2 from '../assets/resimler/3f46bc27bfdeda7c44028b59453c136c10512828.jpg';
import blogImage3 from '../assets/resimler/6e5a1e407b100e0e65dada874a961f311a92cfce.jpg';
import desktopImage1 from '../assets/resimler/679b3cdf17b8ec542ce1c452944dfb51f10ba010.jpg';
import desktopImage2 from '../assets/resimler/412d5bc5d51defa7e9522a5eb5f534d0442131b2.jpg';
import desktopImage3 from '../assets/resimler/af91645f60a447510f7b4e8aa158f122b0d1fe29.jpg';

export default function BlogSection() {
	const blogCards = [
		{ image: blogImage1, desktopImage: desktopImage1 },
		{ image: blogImage2, desktopImage: desktopImage2 },
		{ image: blogImage3, desktopImage: desktopImage3 }
	];

	return (
		<section className="w-full bg-[#FFFFFF] flex flex-col items-center py-20 md:max-w-[1440px] md:h-[1044px] md:rounded-xl md:mx-auto md:justify-center">
			{/* Container */}
			<div className="w-[414px] h-[2302px] flex flex-col gap-[80px] pt-[80px] pb-[80px] md:w-[1050px] md:h-[1044px] md:pt-[112px] md:pb-[112px] md:gap-[80px] md:mx-auto">
				{/* Row 1 - Text Section */}
				<div className="w-[300px] h-[184px] mx-auto md:w-[692px] md:h-[134px] md:mx-auto">
					{/* Main Content */}
					<div className="w-[279px] h-[184px] flex flex-col gap-[10px] items-center justify-center mx-auto">
						{/* Frame 1 */}
						<div className="w-[279px] h-[184px] flex flex-col gap-[10px] items-center justify-center mx-auto">
							{/* Section Tag */}
							<h6 className="font-montserrat w-auto h-[24px] text-[14px] font-bold leading-[24px] tracking-[0.2px] text-center text-[#23A6F0] mx-auto whitespace-nowrap
								md:w-[114px] md:h-[24px] md:font-montserrat md:font-bold md:text-[14px] md:leading-[24px] md:tracking-[0.2px] md:text-center">
								Practice Advice
							</h6>

							{/* Section Title */}
							<h3 className="font-montserrat text-[40px] font-bold leading-[50px] tracking-[0.2px] text-center text-[#252B42] mx-auto md:whitespace-nowrap">
								<span className="block md:hidden">Featured Products</span>
								<span className="hidden md:block">Featured Posts</span>
							</h3>

							{/* Paragraph */}
							<p className="font-montserrat font-[400] text-[15px] leading-[20px] tracking-[0.2px] text-center text-[#737373]">
								<span className="block md:hidden">Problems trying to resolve the <br/>conflict between the two major</span>
								<span className="md:block hidden max-w-[500px] whitespace-normal mx-auto  md:ml-[35px]">
									<span className="whitespace-nowrap">Problems trying to resolve the conflict between</span><br/>
									<span className="whitespace-nowrap">the two major realms of Classical physics: Newtonian mechanics</span>
								</span>
							</p>
						</div>
					</div>
				</div>

				{/* Row 2 - Blog Cards */}
				<div className="w-[329px] h-[1878px] flex flex-col gap-[30px] mx-auto md:w-[1045px] md:h-[606px] md:flex-row md:gap-[30px] md:justify-center">
					{blogCards.map((card, index) => (
						<div key={index} className="w-[328px] h-[606px] shadow-[0px_2px_4px_0px_#0000001A] md:w-[328px] md:h-[606px]">
							{/* Content Card */}
							<div className="w-[330px] h-[606px] md:w-[328px] md:h-[606px]">
								{/* Image Container */}
								<div className="w-[330px] h-[300px] relative md:w-[328px] md:h-[300px]">
									{/* Mobilde eski, desktopta yeni resim */}
									<img 
										src={card.image}
										alt="Blog post"
										className="w-[330px] h-[300px] object-cover md:hidden"
									/>
									<img
										src={card.desktopImage}
										alt="Blog post desktop"
										className="hidden md:block w-[348px] h-[300px] object-cover"
									/>
          
									{/* NEW Tag */}
									<div className="w-[58px] h-[24px] absolute top-[20px] left-[20px] pr-[10px] pl-[10px] bg-[#E74040] rounded-[3px] shadow-[0px_2px_4px_0px_#0000001A] flex items-center justify-center">
										<span className="font-montserrat w-[38px] h-[24px] text-[14px] font-bold leading-[24px] tracking-[0.2px] text-center text-[#FFFFFF]">
											NEW
										</span>
									</div>
								</div>

								{/* Frame 3 - Content */}
								<div className="w-[330px] h-[306px] flex flex-col gap-[10px] pt-[25px] pr-[25px] pb-[35px] pl-[25px]">
									{/* Tags */}
									<div className="w-[159px] h-[16px] flex gap-[15px]">
										<span className="font-montserrat w-[45px] h-[16px] text-[12px] font-normal leading-[16px] tracking-[0.2px] text-[#8EC2F2]">
											Google
										</span>
										<span className="font-montserrat w-[56px] h-[16px] text-[12px] font-normal leading-[16px] tracking-[0.2px] text-[#737373]">
											Trending
										</span>
										<span className="font-montserrat w-[28px] h-[16px] text-[12px] font-normal leading-[16px] tracking-[0.2px] text-[#737373]">
											New
										</span>
									</div>

									{/* Post Title */}
									<h4 className="font-montserrat w-[247px] h-[60px] text-[20px] font-normal leading-[30px] tracking-[0.2px] text-[#252B42]">
										Loudest à la Madison #1 (L'integral)
									</h4>

									{/* Post Description */}
									<p className="font-montserrat w-[280px] h-[60px] text-[14px] font-normal leading-[20px] tracking-[0.2px] text-[#737373]">
										We focus on ergonomics and meeting you where you work. It's only a keystroke away.
									</p>

									{/* Frame 1 - Meta Info */}
									<div className="w-[280px] h-[46px] flex justify-between pt-[15px] pb-[15px]">
										{/* Date */}
										<div className="w-[98px] h-[16px] flex gap-[5px] items-center">
											<Calendar 
												size={16}
												color="#23A6F0"
											/>
											<span className="font-montserrat w-[77px] h-[16px] text-[12px] font-normal leading-[16px] tracking-[0.2px] text-[#737373]">
												22 April 2021
											</span>
										</div>

										{/* Comments */}
										<div className="w-[105px] h-[16px] flex gap-[5px] items-center">
											  <img 
												src={grafikIcon} 
												alt="Comments" 
												width={16} 
												height={15} 
												className="w-[16px] h-[14.666666984558105px]" 
											  />
											<span className="font-montserrat w-[84px] h-[16px] text-[12px] font-normal leading-[16px] tracking-[0.2px] text-[#737373]">
												10 comments
											</span>
										</div>
									</div>

									{/* Learn More */}
									<div className="w-[130px] h-[24px] flex gap-[10px] items-center cursor-pointer">
										<span className="font-montserrat w-[85px] h-[24px] text-[14px] font-bold leading-[24px] tracking-[0.2px] text-[#737373]">
											Learn More
										</span>
										<ChevronRight 
											size={24}
											color="#23A6F0"
											strokeWidth={3}
											className="min-w-[24px] min-h-[24px]"
										/>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
