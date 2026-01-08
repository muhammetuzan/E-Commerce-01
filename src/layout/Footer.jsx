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
		<footer className="w-full max-w-[325px] bg-white mx-auto lg:max-w-[1440px] lg:h-[488px] lg:mx-auto">
			{/* Top Section - Brand & Social */}
			<div className="w-full bg-[#fff] lg:max-w-[1440px] lg:h-[142px] lg:mx-auto lg:flex lg:items-center">
				<div className="w-[325px] h-[173.5px]  left-[44px] pt-[40px] pb-[40px] lg:w-[1050px] lg:h-[138px] lg:ml-[195px] lg:pt-[40px] lg:pb-[40px] lg:static lg:p-0">
					<div className="w-[243px] h-[93.5px] flex flex-col gap-[11.5px] lg:w-[1049.5px] lg:h-[58px] lg:gap-[577.5px] lg:flex-row lg:items-center">
						{/* Brand */}
						<div className="w-[236px] h-[58px] flex flex-col gap-[10px] lg:w-auto lg:h-full lg:justify-center lg:items-start">
							<div className="w-[187px] h-[58px] relative lg:w-auto lg:h-auto lg:relative lg:top-0 lg:left-0">
								<h3 className="font-montserrat w-[108px] h-[32px] relative top-[13px] left-[-0.5px] text-[24px] font-bold leading-[32px] tracking-[0.1px] text-[#252B42] lg:text-[32px] lg:w-auto lg:h-auto lg:static lg:top-0 lg:left-0 lg:mb-0">
									Bandage
								</h3>
							</div>
						</div>


						{/* Social Media */}
						<div className="w-[243px] h-[24px] lg:flex lg:justify-end lg:items-center">
							<div className="w-[112px] h-[24px] flex gap-[20px] lg:gap-4 lg:ml-8 lg:justify-end">
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
			<div className="hidden lg:block w-full" style={{height: 0}}>
				<div className="lg:w-[1057px] lg:h-0 lg:ml-[195px] lg:border-t lg:border-[#E6E6E6]" />
			</div>

			{/* Middle Section */}
			<div className="w-full lg:max-w-[1440px] lg:h-[272px] lg:mx-auto">
				<div className="w-[321px] h-[1071px] pt-[70px] pb-[70px]  left-[40.5px] lg:w-[1050px] lg:h-[270px] lg:ml-[195px] lg:pt-[50px] lg:pb-[50px] lg:static lg:p-0">
					{/* Row */}
					<div className="w-[321px] h-[931px] flex flex-col gap-[30px] lg:w-[1041px] lg:h-[170px] lg:gap-[30px] lg:flex-row lg:items-start">
						{/* Footer Links Columns */}
						{footerLinks.map((column, index) => (
							<div key={index} className="w-[148px] h-[170px] flex flex-col gap-[20px] lg:w-auto lg:h-auto lg:gap-4">
								<h5 className="font-montserrat h-[24px] text-[16px] font-bold leading-[24px] tracking-[0.1px] text-[#252B42] whitespace-nowrap lg:text-[18px] lg:mb-4">
									{column.title}
								</h5>
								<div className="h-[126px] flex flex-col gap-[10px] lg:h-auto lg:gap-2">
									{column.links.map((link, linkIndex) => (
											<span
												key={linkIndex}
												className="font-montserrat h-[24px] text-[14px] font-bold leading-[24px] tracking-[0.2px] text-[#737373] no-underline whitespace-nowrap lg:text-[16px] lg:font-normal lg:hover:text-[#23A6F0] lg:transition-colors cursor-default"
											>
												{link}
											</span>
									))}
								</div>
							</div>
						))}

						{/* Get In Touch Column */}
						<div className="w-[321px] h-[131px] flex flex-col gap-[20px] lg:w-auto lg:h-auto lg:ml-8">
							<h5 className="font-montserrat w-[103px] h-[24px] text-[16px] font-bold leading-[24px] tracking-[0.1px] text-[#252B42] whitespace-nowrap lg:text-[18px] lg:mb-4">
								Get In Touch
							</h5>
							{/* Subscribe Form */}
							<div className="w-[321px] h-[87px] relative lg:w-auto lg:h-auto lg:static">
								{/* Input Group */}
								<div className="w-[321px] h-[58px] relative lg:w-auto lg:h-auto lg:flex lg:items-center lg:gap-0">
									{/* Input */}
									<input
										type="email"
										placeholder="Your Email"
										className="font-montserrat w-[321px] h-[58px] rounded-[5px] border border-[#E6E6E6] bg-[#F9F9F9] pl-[20px] text-[14px] font-normal leading-[28px] tracking-[0.2px] text-[#737373] outline-none lg:w-[250px] lg:h-[48px] lg:rounded-l-md lg:pl-4 lg:text-[16px]"
									/>
									{/* Subscribe Button */}
									<button className="font-montserrat w-[117px] h-[58px] absolute left-[204px] top-0 bg-[#23A6F0] border border-[#E6E6E6] rounded-tr-[5px] rounded-br-[5px] text-[14px] font-normal leading-[28px] tracking-[0.2px] text-white text-center cursor-pointer lg:static lg:w-auto lg:h-[48px] lg:px-6 lg:rounded-r-md lg:text-[16px]">
										Subscribe
									</button>
								</div>
								{/* Form Text */}
								<p className="font-montserrat w-[155px] h-[28px] absolute top-[59px] left-[2px] text-[12px] font-normal leading-[28px] tracking-[0.2px] text-[#737373] lg:static lg:w-auto lg:h-auto lg:mt-2 lg:text-[14px]">
									Lore imp sum dolor Amit
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Section */}
			<div className="w-full bg-[#F9F9F9]">
				<div className="lg:max-w-[1440px] lg:h-[74px] lg:mx-auto w-full flex items-center">
					<div className="w-full lg:w-[1050px] lg:h-[74px] lg:ml-[195px] lg:pt-[25px] lg:pb-[25px] flex items-center">
						<div className="w-full lg:w-[600px] lg:h-[24px] lg:gap-[213px] flex items-center">
							{/* Mobilde iki satır, desktopta tek satır */}
							<p className="font-montserrat text-[14px] font-bold leading-[24px] tracking-[0.2px] text-[#737373] text-center w-full lg:hidden">
								Made With Love By <br /> Finland All Right Reserved
							</p>
							<p className="font-montserrat text-[16px] font-normal leading-[24px] tracking-[0.2px] text-[#737373] text-left w-full hidden lg:block">
								Made With Love By Finland All Right Reserved
							</p>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}