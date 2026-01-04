import ProductCard from "./ProductCard";

const productImages = [
	{ id: 1, src: "/src/assets/resimler/23057910d190d178c2a7b276e896b9d38b982bf6.jpg" },
	{ id: 2, src: "/src/assets/resimler/edfda1c222054dedce3ff32fe480d8fc8eb07474.jpg" },
	{ id: 3, src: "/src/assets/resimler/4a6a10161217dc07ba1cda4632e93a5851162bcb.jpg" },
	{ id: 4, src: "/src/assets/resimler/74e648e43f346f3e64ec6890751ec33b3c7f5197.jpg" },
	{ id: 5, src: "/src/assets/resimler/5077f785cbfd4a6cf9efad13d9b5d66b1b7cbf4f (1).jpg" },
	{ id: 6, src: "/src/assets/resimler/3e7f7eafd5316e4fa827cf3570a2a8c7855d5a94.jpg" },
	{ id: 7, src: "/src/assets/resimler/3e7f7eafd5316e4fa827cf3570a2a8c7855d5a94.jpg" },
	{ id: 8, src: "/src/assets/resimler/9da5ab42c0357746eb27e42fff6279478e2c8a48.jpg" },
];

const desktopRow3Images = [
	{ id: 9, src: "/src/assets/resimler/41ba1a582a6be5d0abdf4716fbac8cd3a73cb266.jpg" },
	{ id: 10, src: "/src/assets/resimler/a4b9d5defc9e3b83803619da05903140ffc77947.jpg" },
	{ id: 11, src: "/src/assets/resimler/110bc11c4432558f247264194359558513a225fe.jpg" },
	{ id: 12, src: "/src/assets/resimler/c91168410dcfe4d267b32aaf7b21288f7b9656f2.jpg" },
];

export default function ProductCards() {
	return (
		<section className="w-full h-auto bg-white flex justify-center">
			<div className="w-full flex flex-col items-center px-4 md:max-w-[1440px] md:px-0 md:mx-auto">
				{/* Container */}
				<div className="w-full flex flex-col items-center  pt-20 pb-20 gap-12 md:w-[1124px] md:gap-[80px] md:pt-[80px] md:pb-[80px]">
					{/* Row 1 - Text Section */}
					<div className="w-[300px] h-[154px] flex items-center justify-center md:w-[692px] md:h-[102px] md:mx-auto">
						<div className="w-[279px] h-[154px] flex flex-col gap-[10px] items-center justify-center md:w-[692px] md:h-[102px]">
							<div className="w-[261px] h-[154px] flex flex-col gap-[10px] items-center justify-center md:w-[692px] md:h-[102px]">
								<h3 className="font-montserrat w-auto h-[30px] text-[20px] font-normal leading-[30px] tracking-[0.2px] text-center text-[#737373] mx-auto whitespace-nowrap md:text-[20px] md:leading-[30px]">Featured Products</h3>
								<h2 className="font-montserrat font-bold w-[239px] h-[64px] text-[24px] leading-[32px] tracking-[0.1px] text-center text-[#252B42] mx-auto md:w-full md:h-[40px] md:text-[32px] md:leading-[40px]">BESTSELLER PRODUCTS</h2>
								<p className="font-montserrat w-[261px] h-[40px] text-[14px] font-normal leading-[20px] tracking-[0.2px] text-center text-[#737373] md:w-full md:h-[32px] md:text-[16px] md:leading-[24px]">Problems trying to resolve the conflict between</p>
							</div>
						</div>
					</div>
					{/* Row 2 - Product Cards */}
					<div className="w-[328px] flex flex-col gap-[30px] md:w-[1049px] md:h-[615px] md:flex-row md:gap-[30px]">
						 {productImages.slice(0, 4).map((item, idx) => (
						 <div
							 key={item.id}
							 className="w-[328px] h-auto mx-auto md:w-[238px] md:h-[615px]"
							 style={{ minWidth: '0' }}
						 >
							 <ProductCard
								 image={item.src}
								 id={item.id}
								 title="Graphic Design"
								 category="English Department"
								 price="$16.48"
								 salePrice="$6.48"
								 colors={["#23A6F0", "#23856D", "#E77C40", "#252B42"]}
							 />
						 </div>
						 ))}
					</div>
					{/* Row 3 - More Product Cards */}
					<div className="w-[328px] flex flex-col gap-[30px] mt-8 md:w-[1049px] md:h-[615px] md:flex-row md:gap-[30px] md:mt-0">
						{/* Mobilde eski resimler, desktopta yeni resimler */}
						 {productImages.slice(4, 8).map((item, idx) => (
						 <div
							 key={item.id}
							 className="w-[328px] h-auto mx-auto md:hidden"
							 style={{ minWidth: '0' }}
						 >
							 <ProductCard
								 image={item.src}
								 id={item.id}
								 title="Graphic Design"
								 category="English Department"
								 price="$16.48"
								 salePrice="$6.48"
								 colors={["#23A6F0", "#23856D", "#E77C40", "#252B42"]}
							 />
						 </div>
						 ))}
						{/* Desktop için özel resimler - arrayden çağır */}
						 {desktopRow3Images.map((item, idx) => (
						 <div
							 key={item.id}
							 className="hidden md:block w-[238px] h-[615px]"
						 >
							 <ProductCard
								 image={item.src}
								 id={item.id}
								 title="Graphic Design"
								 category="English Department"
								 price="$16.48"
								 salePrice="$6.48"
								 colors={["#23A6F0", "#23856D", "#E77C40", "#252B42"]}
							 />
						 </div>
						 ))}
					</div>
				</div>
			</div>
		</section>
	);
}
