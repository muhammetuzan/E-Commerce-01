import menImage from "../assets/resimler/9da5ab42c0357746eb27e42fff6279478e2c8a48.jpg";
import womenImage from "../assets/resimler/b384eba608bd8616723a95d25fce7dcb8f25ba9d.jpg";
import accessoriesImage from "../assets/resimler/5077f785cbfd4a6cf9efad13d9b5d66b1b7cbf4f (1).jpg";
import kidsImage from "../assets/resimler/media bg-cover (1).png";

export default function EditorsPick() {
	const shopDropdown = [
		{
			label: "Men",
			image: menImage,
		},
		{
			label: "Women",
			image: womenImage,
		},
		{
			label: "Accessories",
			image: accessoriesImage,
		},
		{
			label: "Kids",
			image: kidsImage,
		},
	];

	return (
		<div className="w-full flex justify-center">
			<section className="w-full bg-[#FAFAFA] flex flex-col items-center py-20 lg:max-w-[1440px] lg:h-[770px] lg:rounded-xl lg:mx-auto lg:justify-center">
				{/* Header */}
				<div className="flex flex-col gap-2 items-center mb-12">
					<h2 className="font-montserrat font-bold text-[24px] leading-[32px] tracking-[0.1px] text-[#252B42] text-center lg:text-[32px] lg:leading-[40px]">EDITOR'S PICK</h2>
					<p className="font-montserrat font-normal text-[14px] leading-[20px] tracking-[0.2px] text-[#737373] text-center lg:text-[16px] lg:leading-[24px]">
						Problems trying to resolve<br className="block lg:hidden" /> the conflict between
					</p>
				</div>

				{/* Cards Layout */}
				<div
					className="flex flex-col gap-8 items-center w-full lg:grid lg:grid-cols-[510px_240px_240px] lg:grid-rows-2 lg:gap-x-[30px] lg:gap-y-[16px] lg:w-[1050px] lg:h-[500px] lg:mx-auto"
				>
					{/* MEN (big card, left) */}
					<div className="relative w-[324px] h-[500px] lg:w-[510px] lg:h-[500px] lg:row-span-2">
						<img src={menImage} alt="Men" className="w-full h-full object-cover rounded" />
						<div className="absolute left-6 bottom-6 bg-white px-6 py-3 shadow-md lg:w-[170px] lg:h-[48px] lg:left-[31px] lg:top-[426px] lg:bottom-auto flex items-center justify-center">
							<span className="font-montserrat font-bold text-[16px] leading-[24px] tracking-[0.1px] text-[#252B42]">MEN</span>
						</div>
					</div>

					{/* WOMEN (big card, middle) */}
					<div className="relative w-[325px] h-[500px] lg:w-[240px] lg:h-[500px] lg:col-span-1 lg:row-span-2">
						<img src={womenImage} alt="Women" className="w-full h-full object-cover rounded" />
						<div className="absolute left-6 bottom-6 bg-white px-6 py-3 shadow-md lg:w-[136px] lg:h-[48px] lg:left-[21px] lg:top-[434px] lg:bottom-auto lg:pt-[12px] lg:pr-[48px] lg:pb-[12px] lg:pl-[48px] flex items-center justify-center">
							<span className="font-montserrat font-bold text-[16px] leading-[24px] tracking-[0.1px] text-[#252B42]">WOMEN</span>
						</div>
					</div>

					{/* ACCESSORIES (top, right) */}
					<div className="relative w-[325px] h-[242px] lg:w-[240px] lg:h-[242px] lg:col-start-3 lg:row-start-1">
						<img src={accessoriesImage} alt="Accessories" className="w-full h-full object-cover rounded" />
						<div className="absolute left-6 bottom-6 bg-white px-6 py-3 shadow-md lg:w-[170px] lg:h-[48px] lg:left-[14px] lg:top-[171px] lg:bottom-auto lg:pt-[12px] lg:pr-[26px] lg:pb-[12px] lg:pl-[26px] flex items-center justify-center">
							<span className="font-montserrat font-bold text-[16px] leading-[24px] tracking-[0.1px] text-[#252B42]">ACCESSORIES</span>
						</div>
					</div>

					{/* KIDS (bottom, right) */}
					<div className="relative w-[325px] h-[242px] lg:w-[240px] lg:h-[242px] lg:col-start-3 lg:row-start-2">
						<img src={kidsImage} alt="Kids" className="w-full h-full object-cover rounded" />
						<div className="absolute left-6 bottom-6 bg-white px-6 py-3 shadow-md lg:w-[120px] lg:h-[48px] lg:left-[18px] lg:top-[176px] lg:bottom-auto lg:pt-[12px] lg:pr-[40px] lg:pb-[12px] lg:pl-[40px] flex items-center justify-center">
							<span className="font-montserrat font-bold text-[16px] leading-[24px] tracking-[0.1px] text-[#252B42]">KIDS</span>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
