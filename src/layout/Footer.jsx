import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer({ isShopPage = false }) {
	const footerLinks = [
		{
			title: 'Company Info',
			links: ['About Us', 'Carrier', 'We are hiring', 'Blog']
		},
		{
			title: 'Legal',
			links: ['About Us', 'Carrier', 'We are hiring', 'Blog']
		},
		{
			title: 'Features',
			links: ['Business Marketing', 'User Analytic', 'Live Chat', 'Unlimited Support']
		},
		{
			title: 'Resources',
			links: ['IOS & Android', 'Watch a Demo', 'Customers', 'API']
		}
	];

	return (
		<footer className="w-full bg-white md:max-w-[1440px] md:h-[488px] md:mx-auto">
			{/* Top Section - Brand & Social */}
			<div className="w-full bg-[#fff] md:max-w-[1440px] md:h-[142px] md:mx-auto md:flex md:items-center">
				<div className="w-[325px] h-[173.5px] relative left-[44px] pt-[40px] pb-[40px] md:w-[1050px] md:h-[138px] md:ml-[195px] md:pt-[40px] md:pb-[40px] md:static md:p-0">
					<div className="w-[243px] h-[93.5px] flex flex-col gap-[11.5px] md:w-[1049.5px] md:h-[58px] md:gap-[577.5px] md:flex-row md:items-center">
						{/* Brand */}
						<div className="w-[236px] h-[58px] flex flex-col gap-[10px] md:w-auto md:h-full md:justify-center md:items-start">
							<div className="w-[187px] h-[58px] relative md:w-auto md:h-auto md:relative md:top-0 md:left-0">
								<h3 className="font-montserrat w-[108px] h-[32px] relative top-[13px] left-[-0.5px] text-[24px] font-bold leading-[32px] tracking-[0.1px] text-[#252B42] md:text-[32px] md:w-auto md:h-auto md:static md:top-0 md:left-0 md:mb-0">
									Bandage
								</h3>
							</div>
						</div>


						{/* Social Media */}
						<div className="w-[243px] h-[24px] md:flex md:justify-end md:items-center">
							<div className="w-[112px] h-[24px] flex gap-[20px] md:gap-4 md:ml-8 md:justify-end">
								{/* Facebook */}
								<div className="w-[24px] h-[24px]">
									<Facebook 
										size={24}
										fill="#23A6F0"
										color="#23A6F0"
										className="w-[24px] h-[24px]"
									/>
								</div>

								{/* Instagram */}
								<div className="w-[24px] h-[24px]">
									<Instagram 
										size={24}
										color="#23A6F0"
										className="w-[24px] h-[24px]"
									/>
								</div>

								{/* Twitter */}
								<div className="w-[24px] h-[24px]">
									<Twitter 
										size={24}
										fill="#23A6F0"
										color="#23A6F0"
										className="w-[24px] h-[24px]"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Divider (hr) - only desktop, reference: footer top */}
			<div className="hidden md:block w-full" style={{height: 0}}>
				<div className="md:w-[1057px] md:h-0 md:ml-[195px] md:border-t md:border-[#E6E6E6]" />
			</div>

			{/* Middle Section */}
			<div className="w-full md:max-w-[1440px] md:h-[272px] md:mx-auto">
				<div className="w-[321px] h-[1071px] pt-[70px] pb-[70px] relative left-[40.5px] md:w-[1050px] md:h-[270px] md:ml-[195px] md:pt-[50px] md:pb-[50px] md:static md:p-0">
					{/* Row */}
					<div className="w-[321px] h-[931px] flex flex-col gap-[30px] md:w-[1041px] md:h-[170px] md:gap-[30px] md:flex-row md:items-start">
						{/* Footer Links Columns */}
						{footerLinks.map((column, index) => (
							<div key={index} className="w-[148px] h-[170px] flex flex-col gap-[20px] md:w-auto md:h-auto md:gap-4">
								<h5 className="font-montserrat h-[24px] text-[16px] font-bold leading-[24px] tracking-[0.1px] text-[#252B42] whitespace-nowrap md:text-[18px] md:mb-4">
									{column.title}
								</h5>
								<div className="h-[126px] flex flex-col gap-[10px] md:h-auto md:gap-2">
									{column.links.map((link, linkIndex) => (
											<span
												key={linkIndex}
												className="font-montserrat h-[24px] text-[14px] font-bold leading-[24px] tracking-[0.2px] text-[#737373] no-underline whitespace-nowrap md:text-[16px] md:font-normal md:hover:text-[#23A6F0] md:transition-colors cursor-default"
											>
												{link}
											</span>
									))}
								</div>
							</div>
						))}

						{/* Get In Touch Column */}
						<div className="w-[321px] h-[131px] flex flex-col gap-[20px] md:w-auto md:h-auto md:ml-8">
							<h5 className="font-montserrat w-[103px] h-[24px] text-[16px] font-bold leading-[24px] tracking-[0.1px] text-[#252B42] whitespace-nowrap md:text-[18px] md:mb-4">
								Get In Touch
							</h5>
							{/* Subscribe Form */}
							<div className="w-[321px] h-[87px] relative md:w-auto md:h-auto md:static">
								{/* Input Group */}
								<div className="w-[321px] h-[58px] relative md:w-auto md:h-auto md:flex md:items-center md:gap-0">
									{/* Input */}
									<input
										type="email"
										placeholder="Your Email"
										className="font-montserrat w-[321px] h-[58px] rounded-[5px] border border-[#E6E6E6] bg-[#F9F9F9] pl-[20px] text-[14px] font-normal leading-[28px] tracking-[0.2px] text-[#737373] outline-none md:w-[250px] md:h-[48px] md:rounded-l-md md:pl-4 md:text-[16px]"
									/>
									{/* Subscribe Button */}
									<button className="font-montserrat w-[117px] h-[58px] absolute left-[204px] top-0 bg-[#23A6F0] border border-[#E6E6E6] rounded-tr-[5px] rounded-br-[5px] text-[14px] font-normal leading-[28px] tracking-[0.2px] text-white text-center cursor-pointer md:static md:w-auto md:h-[48px] md:px-6 md:rounded-r-md md:text-[16px]">
										Subscribe
									</button>
								</div>
								{/* Form Text */}
								<p className="font-montserrat w-[155px] h-[28px] absolute top-[59px] left-[2px] text-[12px] font-normal leading-[28px] tracking-[0.2px] text-[#737373] md:static md:w-auto md:h-auto md:mt-2 md:text-[14px]">
									Lore imp sum dolor Amit
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Section */}
			<div className="w-full bg-[#F9F9F9]">
				<div className="md:max-w-[1440px] md:h-[74px] md:mx-auto w-full flex items-center">
					<div className="w-full md:w-[1050px] md:h-[74px] md:ml-[195px] md:pt-[25px] md:pb-[25px] flex items-center">
						<div className="w-full md:w-[600px] md:h-[24px] md:gap-[213px] flex items-center">
							{/* Mobilde iki satır, desktopta tek satır */}
							<p className="font-montserrat text-[14px] font-bold leading-[24px] tracking-[0.2px] text-[#737373] text-center w-full md:hidden">
								Made With Love By <br /> Finland All Right Reserved
							</p>
							<p className="font-montserrat text-[16px] font-normal leading-[24px] tracking-[0.2px] text-[#737373] text-left w-full hidden md:block">
								Made With Love By Finland All Right Reserved
							</p>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}