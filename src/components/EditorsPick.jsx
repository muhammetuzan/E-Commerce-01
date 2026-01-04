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
			<section className="w-full bg-[#FAFAFA] flex flex-col items-center py-20 md:max-w-[1440px] md:h-[770px] md:rounded-xl md:mx-auto md:justify-center">
				{/* Header */}
				<div className="flex flex-col gap-2 items-center mb-12">
					<h2 className="font-montserrat font-bold text-[24px] leading-[32px] tracking-[0.1px] text-[#252B42] text-center md:text-[32px] md:leading-[40px]">EDITOR'S PICK</h2>
					<p className="font-montserrat font-normal text-[14px] leading-[20px] tracking-[0.2px] text-[#737373] text-center md:text-[16px] md:leading-[24px]">
						Problems trying to resolve<br className="block md:hidden" /> the conflict between
					</p>
				</div>

				{/* Cards Layout */}
				<div
					className="flex flex-col gap-8 items-center w-full md:grid md:grid-cols-[510px_240px_240px] md:grid-rows-2 md:gap-x-[30px] md:gap-y-[16px] md:w-[1050px] md:h-[500px] md:mx-auto"
				>
					{/* MEN (big card, left) */}
					<div className="relative w-[324px] h-[500px] md:w-[510px] md:h-[500px] md:row-span-2">
						<img src={menImage} alt="Men" className="w-full h-full object-cover rounded" />
						<div className="absolute left-6 bottom-6 bg-white px-6 py-3 shadow-md md:w-[170px] md:h-[48px] md:left-[31px] md:top-[426px] md:bottom-auto flex items-center justify-center">
							<span className="font-montserrat font-bold text-[16px] leading-[24px] tracking-[0.1px] text-[#252B42]">MEN</span>
						</div>
					</div>

					{/* WOMEN (big card, middle) */}
					<div className="relative w-[325px] h-[500px] md:w-[240px] md:h-[500px] md:col-span-1 md:row-span-2">
						<img src={womenImage} alt="Women" className="w-full h-full object-cover rounded" />
						<div className="absolute left-6 bottom-6 bg-white px-6 py-3 shadow-md md:w-[136px] md:h-[48px] md:left-[21px] md:top-[434px] md:bottom-auto md:pt-[12px] md:pr-[48px] md:pb-[12px] md:pl-[48px] flex items-center justify-center">
							<span className="font-montserrat font-bold text-[16px] leading-[24px] tracking-[0.1px] text-[#252B42]">WOMEN</span>
						</div>
					</div>

					{/* ACCESSORIES (top, right) */}
					<div className="relative w-[325px] h-[242px] md:w-[240px] md:h-[242px] md:col-start-3 md:row-start-1">
						<img src={accessoriesImage} alt="Accessories" className="w-full h-full object-cover rounded" />
						<div className="absolute left-6 bottom-6 bg-white px-6 py-3 shadow-md md:w-[170px] md:h-[48px] md:left-[14px] md:top-[171px] md:bottom-auto md:pt-[12px] md:pr-[26px] md:pb-[12px] md:pl-[26px] flex items-center justify-center">
							<span className="font-montserrat font-bold text-[16px] leading-[24px] tracking-[0.1px] text-[#252B42]">ACCESSORIES</span>
						</div>
					</div>

					{/* KIDS (bottom, right) */}
					<div className="relative w-[325px] h-[242px] md:w-[240px] md:h-[242px] md:col-start-3 md:row-start-2">
						<img src={kidsImage} alt="Kids" className="w-full h-full object-cover rounded" />
						<div className="absolute left-6 bottom-6 bg-white px-6 py-3 shadow-md md:w-[120px] md:h-[48px] md:left-[18px] md:top-[176px] md:bottom-auto md:pt-[12px] md:pr-[40px] md:pb-[12px] md:pl-[40px] flex items-center justify-center">
							<span className="font-montserrat font-bold text-[16px] leading-[24px] tracking-[0.1px] text-[#252B42]">KIDS</span>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
